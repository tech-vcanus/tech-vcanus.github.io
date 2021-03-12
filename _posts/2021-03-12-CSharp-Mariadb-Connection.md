---
title: "CSharp-Mariadb-Connection"
tags: Mariadb
toc: true
toc_sticky: true
---

Written By [mskoo](https://github.com/mskoo-vcanus), VCANUS

C# 에서 Mariadb 연결하는 법에 대한 내용이다.
<br>
Mariadb CRUD 및 간단한 Winform 적용 예 

## Nuget 추가

### Mysql.Data 설치
![nuget다운](https://user-images.githubusercontent.com/75176643/110900205-beae2d00-8345-11eb-9fc5-2960895a1626.PNG)

----------
## Programing

### Connection

connection 정보를 String 변수로 선언하여 연결한다.
connection.Open() 으로 연결

```
public Boolean ConnectionDB()
        {
            if (IsConnection())
            {
                return true;
            }
            try
            {
                connectionString =
		 "server=" + server + ";port=" + port + ";user=" + user + ";database=" + database + ";password=" + password;
                connection = new MySqlConnection(connectionString);
                connection.Open();
            }
            catch(Exception e)
            {
                return false;
            }
            return true;
            
        }

```

### quary(insert, delete, alter....)
쿼리실행 후 update row 개수 결과값을 받는다
 
```
public Boolean CommandDB(String sql) 
        {         
            try
            {
                if (ConnectionDB())
                {
                    MySqlCommand mySqlCommand = new MySqlCommand(sql, connection);
                    if (mySqlCommand.ExecuteNonQuery() >= 1)
                    {
                        return true;
                    }
                    disConnection();
                }         
            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString());
            }
            return false;
        }
```

### quary(select...)
쿼리실행 후 결과 row들을  MySqlDataReader로 읽은 후 DataTable객체에 Load 할 수 있다.
 
```
public DataTable SelectDB(String sql)
        {
            var dataTable = new DataTable();
            try
            {
                if (ConnectionDB())
                {
                    MySqlCommand mySqlCommand = new MySqlCommand(sql, connection);
                    MySqlDataReader mySqlDataReader = mySqlCommand.ExecuteReader();
                    dataTable.Load(mySqlDataReader);
                    disConnection();
                }
            } catch (Exception e) 
            {
                MessageBox.Show(e.ToString());
            }
            return dataTable;
        }
```


### Winform example
Mariadb wrapper class 생성 후 winform 에서 쿼리 후 결과 확인
dataGridView에 바인딩
```
private void btn_select_Click(object sender, EventArgs e)
        {
            string quary = txt_select.Text;
            DataTable dt = mariadb.SelectDB(quary);
            if (dt != null)
            {
                dataGridView1.DataSource = dt;
                lbl_result.Text = "select complete";
            }
        }
```
![winform](https://user-images.githubusercontent.com/75176643/110900208-c077f080-8345-11eb-842a-0c17f2b0e365.PNG)


----------
