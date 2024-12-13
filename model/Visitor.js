// db 연결 전

// exports.getVisitors = () => {
//   return [
//     { id: 1, name: "공민수", comment: "나는 공민수" },
//     { id: 2, name: "심소영", comment: "으라차차" },
//   ];
// };

const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "0000",
  database: "visitor",
});

// db 연결 후
exports.getVisitors = (cb) => {
  conn.query("SELECT * FROM visitor", (err, rows) => {
    if (err) throw err;
    console.log("Visitor.js 전체목록:", rows);
    cb(rows);
  });
};

// 2. 특정 데이터 조회
exports.getVisitorID = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    console.log("Visitor.js 데이터 하나 조회:", rows);
    cb(rows[0]);
  });
};

// 3. 데이터 등록
// visitor 테이블에 데이터 삽입
exports.postVisitor = (data, cb) => {
  // data= req.body,comment와 name 정보가 있는 객체 형태
  conn.query(
    // 문자열은 따옴표안에 둘러싸야 함
    `INSERT INTO VALUE(null, "${data.name}", "${data.comment}")`,
    (err, rows) => {
      if (err) throw err;
      console.log("model post", rows);
      /* 
  OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 5, // 현재 넣어진 id
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
        }
      */
      cb(rows.insertId);
    }
  );
};

// 4. 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id} `, (err, rows) => {
    if (err) throw err;
    console.log("모델 Visitor.js 특정 데이터 삭제", rows);
    /* 
    OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
    }
    */
    cb();
  });
};

exports.patchVisitor = (data, cb) => {
  console.log("model data", data);
  // {id, name, comment}
  conn.query(
    `UPDATE visitor 
    SET name="${data.name}", comment="${data.comment}" 
    WHERE id=${data.id}`,
    (err, rows) => {
      if (err) throw err;
      console.log("Visitor.js 수정", rows);
      /* 
      OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 0  Warnings: 0',
      protocol41: true,
      changedRows: 0
        }
      */
      cb();
    }
  );
};
