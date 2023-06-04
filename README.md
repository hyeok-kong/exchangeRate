# exchangeRate
KRW / USD 환율 CRUD

## 개발 환경
 - node.js v19.4.0
 - express
 - mongoose(MongoDB)
 - graphql(express-graphql)


## 실행방법
 1. DB 주소 : localhost:27017/exchange 
 2. exchange 디렉토리로 이동
 3. 이후 npm start
 4. localhost:5110/graphql 접속


### 쿼리문
 - - -
 - create : 
 ```
   mutation($code: String!, $price: String!, $date: String!, $time: String!) {
    createExchange(code: $code, price: $price, date: $date, time: $time) {
      code
      price
      date
      time
    }
  }
 ```
   - input data : {
    "code": "USD",
    "price": "1332.92",
    "date": "2023-06-02",
    "time": "15:22:45"
}
 - read : 
 ```
   query {
    exchange(code: "USD") {
      code
      price
      date
      time
    }
  }
 ```
 - update :
 ```
   mutation($code: String!) {
    updateExchange(code: $code) {
      time
    }
  }
 ```
   - input data : { "code": "USD" }
 - delete :
 ```
   mutation($code: String!) {
    deleteExchange(code: $code) {
      code
    }
  }
 ```
   - input data : { "code": "USD" }
