require("dotenv").config();

const express = require("express");
const db = require("./models"); // 이름이 index면 생략가능!
const app = express();

const PORT = process.env.PORT;

// 미들웨어 설정
app.set("view engine", "ejs");
// app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));

// 바디 parse 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 라우터 불러오기
// 라우터에서 설정한 값을 연결해주는 역할
const router = require("./routes");
// /로 들어오면 user로 연결된다 즉, 처음 화면을 설정한것!
app.use("/", router);

// 404 설정
app.get("*", (req, res) => {
  res.render("404");
});

// 만들어진거 삭제안하고 쓸거야!
// force: true는 테이블을 다 없애고 다시 만든다!
db.sequelize
  .sync({ force: false })
  .then((result) => {
    console.log("db 연결 성공");
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("db 연결 에러ㅠㅠ");
  });

// MVC가 아니라면 이렇게 불러왔을텐데!
// app.get('/', (req, res)=> {
//     res.send('응답완료')
// })
