- 前端模拟api数据
  1. npm install -g json-server
  2. 根目录上新建db.json伪造数据
  3. 在3004端口监听 json-server --watch --port 3004 db.json

- 请求api
  1. jQuery getJSON()
  2. axios get()

- 测试环境变量
  1. RecordsAPI.js  REACT_APP_
  2. get(RecordsAPI.api)
  3. 根目录新建.env.development.local => REACT_APP_RECORDS_API_URL=http://localhost:3004
  4. 可以放多个变量,由于涉及到以后的更新操作，用户字符串模板
    .get(`${RecordsAPI.api}/records`)
  5. react对input传值 ref