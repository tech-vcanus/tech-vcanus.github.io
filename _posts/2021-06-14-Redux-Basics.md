---
title: "Redux Basics"
data: 2021-06-14 17:00:00 -0000
categories: development
tags: react Javascript
---

# Redux
## 1. Redux?
- 글로벌 상태관리의 편의성을 제공
- 상태 업데이트 로직과 컴포넌트의 분리  
  -> 로직 모듈과 UI 컴포넌트가 각각 유지보수성/재사용성이 증가함  
  -> 기존에는 컴포넌트마다 상태관리 코드를 작성하고, Props를 사용해서 여러 단계에 걸쳐 다른 컴포넌트에 전달 함

## 2. Redux 사용 규칙
### 1) 하나의 스토어 사용
여러 개의 스토어를 생성할 수도 있으나, 디버깅 시 상태 추적이 어려움

### 2) 상태는 읽기전용
리액트에서는 불변성 유지가 중요하므로, 리덕스에서도 이를 따른다.

### 3) 리듀서는 순수함수
redux는 리듀서를 사용해서 변화를 일으키는데, 다음 사항을 준수하는 순수함수여야 한다.
- 이전 상태와 액션 객체를 파라미터로 받는다.
- 이전 상태를 직접 변경하지 않고, 변화를 일으킨 새로운 상태를 반환한다.
- 같은 파라미터를 입력 받으면 항상 같은 결과값을 반환해야 한다.

new Date(), 난수생성, API 요청 등 요청시마다 결과값이 달라지는 작업은 리듀서 바깥이나 리덕스 미들웨어를 사용해야 한다.

## 3. Redux에서 사용되는 개념
### 1) Action

상태 변화가 필요할 때 액션을 발생시킨다. 액션은 객체 형태이며, 직접 정의하거나 액션 생성 함수로 생성한다.

```js
export const example = (index) => ({
    // 필수 필드
    type: 'EXAMPLE_VALUE',
    // 개발자 정의 필드들. 필요에 따라 자유롭게 생성
    data: {
        value1: 0
        value2: '기본 액션'
    },
    color: 'blue',
    index
});
```

### 2) 액션 생성 함수

파라미터를 받아서 액션 객체를 생성하는 함수. 액션 생성을 자동화 함.

전달 받은 데이터를 payload 필드에 매핑해 준다.

```js
import { createAction } from 'redux-actions';

// 1. 기본
const TYPE_A = 'action/A';
const actionA = createAction(TYPE_A);
...
actionA('hello?');
/*
{type: 'action/A', payload: 'hello?'}
*/

// 2. payload 생성 함수 전달
const TYPE_B = 'action/B';
const actionB = createAction(TYPE_B, text => `${text} world`);
...
actionB('hello');
/*
{type: 'action/B', payload: 'hello world'}
*/
```

### 3) 리듀서 Reducer

변화를 일으키는함수. 현재 상태와 액션을 전달받아서 새로운 상태를 반환

```js
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color
      };
    default:
      return state;
  }
}
```

### 4) 스토어 Store

리덕스에서 상태를 관리하는 메모리 공간.

현재의 앱 상태, 리듀서, 내장함수들로 구성됨.

### 5) 디스패치 Dispatch

액션을 발생시키는 내장함수

```js
//action.js
const ACTION_SAMPLE = 'action/sample';
const actionHello = createAction(ACTION_SAMPLE, text => {`hello, ${text}`});
...

//sample.js
//hook
import { useDispatch } = from 'react-redux';
import { actionHello } = from './action';
const dispatch = useDispatch();
dispatch(actionHello('VCANUS'));
/*
{type: 'action/sample', payload: 'hello, VCANUS'}
*/
```

### 6) 구독 Subscribe

스토어의 변화를 감지한다. 스토어에 변화가 있을 때 값을 읽거나, 함수를 실행시킬 수 있다.

직접 사용하기보다는, react-redux 라이브러리의 connect 함수 또는 useSelector Hook을 사용해서 리덕스 스토어의 상태를 구독한다.

## 4. Example code

https://github.com/vcanus/vjs-react-redux-example.git