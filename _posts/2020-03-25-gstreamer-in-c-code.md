---
title: Basic GStreamer Guide in C
date: 2020-03-25
categories: development
tags: HLS Server Streaming
toc: true
toc_sticky: true

---

Written By [Nuri Na](https://github.com/nurring), VCANUS

## Basic Concepts

Media Source, demuxer, decoder, encoder, converter, sink등 각각 하나의 기능을 가진 element들로 pipeline을 조합하고 Pipline의 상태를 play하는 것이 기본 컨셉이다.   

주요 용어는 다음과 같다.

### Element

파이프라인 내에서 수행할 기능은 각각 하나의 element로 준비되어있다. element들을 엮어 pipeline을 구성한다.

### Pad

element를 연결해주는 고리(혹은 플러그나 포트)로, 한 element에서 나가는 쪽을 Sink Pad, 다음 element로 들어가는 쪽을 Source Pad라고 한다.   element의 성격에 따라 하나의 pad만을 가지기도 한다.(예를 들면, src 혹은 sink elements)

### Cap

pad에서 지원하는 데이터 type을 필터링한다. (사이즈, 프레임수 등) 주로 converter뒤에 위치한다.

### Bin

여러 element를 묶어서 하나의 bin으로 만들어 관리할 수 있다. bin 전체를 하나의 element처럼 연결하고, 상태를 관리한다.

### Pipeline

가장 높은 레벨의 bin이다. PAUSE나 PLAYING 상태를 설정하여 데이터의 흐름을 제어한다. pipeline은 하나의 쓰레드로 재생된다.

### Bus

pipeline loop가 돌 때 상태를 체크한다. bus에 메세지 핸들러를 붙여 사용한다.

## Example

RTSPfmf 소스로 받아 HLS 프로토콜 형식으로 파일을 만드는 파이프라인을 구현해 보자.   

쉘에서 gst-launch-1.0을 이용해 실행하는 명령어는 다음과 같다.

```bash
gst-launch-1.0 /
rtspsrc location="rtsp://192.168.0.70:8554/start" ! /
rtph264depay ! /
video/x-h264,stream-format=avc ! /
h264parse ! /
avdec_h264 ! /
x264enc ! /
mpegtsmux ! /
hlssink max-files=15 target-duration=5 location=/nginx/hls/segment%05d.ts
playlist-location=/nginx/hls/playlist.m3u8
```

이를 c (혹은 c++)로 구현하기 위해 파이프라인 구성 요소들을 분석하였다.

```bash
rtspsrc #element
location="rtsp://192.168.0.70:8554/start" # configure rtspsrc
! rtph264depay #element
! video/x-h264,stream-format=avc #caps
! h264parse #element
! avdec_h264 #element
! x264enc #element
! mpegtsmux #element
! hlssink #element
max-files=15 target-duration=5 location=/nginx/hls/segment%05d.ts playlist-location=/nginx/hls/playlist.m3u8 #configure hlssink
```



### 전체 코드

위 파이프라인을 c(c++) 코드로 구현하면 아래와 같다.

```c++
#include <gst/gst.h>

static void on_pad_added (GstElement *element, GstPad *pad, gpointer data)
{
    gchar *name;
    GstCaps * p_caps;
    gchar * description;
    GstElement *p_rtph264depay;

    name = gst_pad_get_name(pad);
    g_print("A new pad %s was created \n", name);

    p_caps = gst_pad_get_pad_template_caps (pad);

    description = gst_caps_to_string(p_caps);
    g_free(description);

    p_rtph264depay = GST_ELEMENT(data);

    if(!gst_element_link_pads(element, name, p_rtph264depay, "sink"))
    {
        g_print("Failed to link elements 3 \n");
    }

    g_free(name);
}

typedef struct _CustomData
{
    GstElement *pipeline;
    GstElement *source; //rtspsrc
    GstElement *depay; //rtph264depay
    GstCaps *filtercaps; //video/x-h264,stream-format=avc
    GstElement *filter;
    GstElement *parse; //h264parse
    GstElement *decode; //avdec_h264
    GstElement *encode; //x264enc
    GstElement *mux; //mpegtsmux
    GstElement *sink; //hlssink
} CustomData;

int main(int argc, char **argv) {
    CustomData data;
    GstBus *bus;
    GstMessage *msg_err;
    GstMessage *msg_eos;
    GstStateChangeReturn ret;

    gst_init (&argc, &argv);

    data.source = gst_element_factory_make ("rtspsrc", "source");
    data.depay = gst_element_factory_make ("rtph264depay", "depay");
    data.filter = gst_element_factory_make ("capsfilter", "filter");
    data.filtercaps = gst_caps_new_simple("video/x-h264", "stream-format", G_TYPE_STRING, "avc", NULL);
    data.parse = gst_element_factory_make("h264parse", "parse");
    data.decode = gst_element_factory_make("avdec_h264", "decode");
    data.encode = gst_element_factory_make("x264enc", "encode");
    data.mux = gst_element_factory_make("mpegtsmux", "mux");
    data.sink = gst_element_factory_make("hlssink", "sink");
    data.pipeline = gst_pipeline_new ("rtsp-to-hls-pl");

    g_object_set (data.source, "location", "rtsp://192.168.0.70:8554/test", NULL);
    g_object_set (data.sink, "max-files", 10, "target-duration", 5, "location", "/nginx/hls/segment%05d.ts", "playlist-location", "/nginx/hls/playlist.m3u8", NULL);
    g_object_set (data.filter, "caps", data.filtercaps, NULL);
    gst_caps_unref (data.filtercaps);

        if (!data.pipeline || !data.source || !data.depay || !data.filter
        || !data.parse || !data.decode || !data.encode || !data.mux || !data.sink)
    {
        g_printerr ("Not all elements could be created. \n");
        return -1;
    }

    if (! g_signal_connect (data.source , "pad-added", G_CALLBACK (on_pad_added), data.depay))
    {
        g_warning ( "no.......");

    }

    gst_bin_add_many (GST_BIN(data.pipeline), data.source, data.depay, data.filter,
                      data.parse, data.decode, data.encode, data.mux, data.sink, NULL);

    if (!gst_element_link_many (data.depay, data.filter, data.parse, data.decode, data.encode, data.mux, data.sink, NULL))
    {
        g_printerr ("Elements could not be linked. \n");
        gst_object_unref (data.pipeline);
        return -1;
    }

    ret = gst_element_set_state (data.pipeline, GST_STATE_PLAYING);
    if (ret == GST_STATE_CHANGE_FAILURE)
    {
        g_printerr ("Unable to set the pipeline to the playing state. \n");
        gst_object_unref (data.pipeline);
        return -1;
    }

    bus = gst_element_get_bus (data.pipeline);
    msg_err = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,GST_MESSAGE_ERROR);
    msg_eos = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,GST_MESSAGE_EOS);

    if (msg_err != NULL || msg_eos != NULL) {
        GError *err;
        gchar *debug_info;

        if (msg_err != NULL) {
            gst_message_parse_error(msg_err, &err, &debug_info);
            g_printerr("Error received from element %s: %s\n",
                       GST_OBJECT_NAME (msg_err->src), err->message);
            g_printerr("Debugging information: %s\n",
                       debug_info ? debug_info : "none");
            g_clear_error(&err);
            g_free(debug_info);
            //break;
        }
        else if (msg_eos != NULL){
            g_print ("End-Of-Stream reached.\n");
            //break;
        }
        else{
            g_printerr ("Unexpected message received.\n");
            //break;
        }
        gst_message_unref (msg_err);
        gst_message_unref (msg_eos);
    }

    gst_object_unref (bus);
    gst_element_set_state (data.pipeline, GST_STATE_NULL);
    gst_object_unref (data.pipeline);
    return 0;
}
```

### 코드 분석

```c++
gst_init (&argc, &argv);
```

GStreamer를 Initialize한다.

```c++
data.source = gst_element_factory_make ("rtspsrc", "source");
data.depay = gst_element_factory_make ("rtph264depay", "depay");
data.filter = gst_element_factory_make ("capsfilter", "filter");
data.filtercaps = gst_caps_new_simple("video/x-h264", "stream-format", G_TYPE_STRING, "avc", NULL);
data.parse = gst_element_factory_make("h264parse", "parse");
data.decode = gst_element_factory_make("avdec_h264", "decode");
data.encode = gst_element_factory_make("x264enc", "encode");
data.mux = gst_element_factory_make("mpegtsmux", "mux");
data.sink = gst_element_factory_make("hlssink", "sink");
data.pipeline = gst_pipeline_new ("rtsp-to-hls-pl");
```

element들은 `gst_element_factory_make(<element_이름>, <변수명>)`로 element factory를 만든다.   

caps는 `gst_caps_new_simple()`을 이용하였고, caps를 감싸서 하나의 element로 만들기 위해 data.filter도 선언하였다. (꼭 element로 감쌀 필요 없이, `gst_elemnt_filtered(<앞 element>,<해당 caps>, <뒤 element>)`를 이용해 연결하는 방식도 가능하다. 모든 요소를 element화 시켜야 나중에 파이프라인을 연결하기 편리하여 이 방법을 선택하였다. )   

pipeline도 `gst_pipeline_new()`로 선언하였다.

```c++
g_object_set (data.source, "location", "rtsp://192.168.0.70:8554/test", NULL);
g_object_set (data.sink, "max-files", 10, "target-duration", 5, "location", "/nginx/hls/segment%05d.ts", "playlist-location", "/nginx/hls/playlist.m3u8", NULL);
g_object_set (data.filter, "caps", data.filtercaps, NULL);
gst_caps_unref (data.filtercaps);
```

각 element에 필요한 세부 사항을 `g_object_set()`으로 정의한다. 여기서 caps(filtercaps)를 element 안에 담는다(filter).

**중요!!**

```c++
g_signal_connect (data.source , "pad-added", G_CALLBACK (on_pad_added), data.depay)
```

`g_signal_connect() ` 는 data.source의 변화를 감지하여 Callback 함수를 호출한다.

rtspsrc는 sinkpad를 만들어 연결해주는 작업이 추가적으로 필요하다. element들은 언제나 연결될 수 있는 pad를 가지고 있는 것이 아니다. 각각 성질에 따라 pad가 항상 준비 된 경우(Always), 재생 시에 생성되는 경우(Sometimes), 필요에 따라 만들어야 하는 경우(On request)로 나뉜다. gst-inspect-1.0 명령어를 이용해 rtspsrc의 정보를 확인해보자.

```bash
gst-inspect-1.0 rtspsrc
```

결과는 다음과 같다.

```bash
Pad Templates:
  SRC template: 'src_%u'
    Availability: On request ### Pad Templates 항목의 Availability를 확인한다.
    Capabilities:
      ANY
```

On request이므로 따라서 재생 시 pad를 생성해주는 작업이 필요하다.

```c++
static void on_pad_added (GstElement *element, GstPad *pad, gpointer data)
{
    gchar *name;
    GstCaps * p_caps;
    gchar * description;
    GstElement *p_rtph264depay;

    name = gst_pad_get_name(pad);
    g_print("A new pad %s was created \n", name);

    p_caps = gst_pad_get_pad_template_caps (pad);

    description = gst_caps_to_string(p_caps);
    g_free(description);

    p_rtph264depay = GST_ELEMENT(data);

    if(!gst_element_link_pads(element, name, p_rtph264depay, "sink"))
    {
        g_print("Failed to link elements 3 \n");
    }

    g_free(name);
}
```

새 pad를 만들고 `gst_element_link_pads()` 를 이용해 element들을 pad로 연결한다.

```c++
gst_bin_add_many (GST_BIN(data.pipeline), data.source, data.depay, data.filter,
                  data.parse, data.decode, data.encode, data.mux, data.sink, NULL);

if (!gst_element_link_many (data.depay, data.filter, data.parse, data.decode, data.encode, data.mux, data.sink, NULL))
```

`gst_bin_add_many()` 에 pipeline과, 파이프라인을 구성할 element들을 넣는다.   

`gst_element_link_many()` 는 element들을 순서대로 넣어서 링크될 수 있도록 한다.   

이제 재생을 위한 준비가 모두 끝났다.

```c++
gst_element_set_state (data.pipeline, GST_STATE_PLAYING);
```

pipeline의 state를 GST_STATE_PLAYING으로 설정해주면 데이터가 흘러가며 재생된다. 이제 bus로 오류와 스트림 끝을 감지하여 pipeline을 종료하는 일만 남았다.

```c++

    bus = gst_element_get_bus (data.pipeline);
    msg_err = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,GST_MESSAGE_ERROR);
    msg_eos = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,GST_MESSAGE_EOS);

    if (msg_err != NULL || msg_eos != NULL) {
        GError *err;
        gchar *debug_info;

        if (msg_err != NULL) {
            gst_message_parse_error(msg_err, &err, &debug_info);
            g_printerr("Error received from element %s: %s\n",
                       GST_OBJECT_NAME (msg_err->src), err->message);
            g_printerr("Debugging information: %s\n",
                       debug_info ? debug_info : "none");
            g_clear_error(&err);
            g_free(debug_info);
            //break;
        }
        else if (msg_eos != NULL){
            g_print ("End-Of-Stream reached.\n");
            //break;
        }
        else{
            g_printerr ("Unexpected message received.\n");
            //break;
        }
        gst_message_unref (msg_err);
        gst_message_unref (msg_eos);
    }

    gst_object_unref (bus);
    gst_element_set_state (data.pipeline, GST_STATE_NULL);
    gst_object_unref (data.pipeline);
```

bus는 pipeline을 감시하여 메세지를 전달한다. 종료나 EOS(End of Stream) 메세지가 발생하는지 지켜보고 콘솔에 상태를 보고, pipeline 상태를 NULL로 만들어 스트림을 종료한다. 