// const Visitor = require("../model/Visitor");
const models = require("../models");
const { errorlogs } = require("../utils/common");
// console.log(Visitor.getVisitors());

// /로 들어 왔을때 get요청
exports.main = (req, res) => {
  res.render("index");
};

// /visitor로 들어 왔을때 get요청 <a href="/visitor">여기 쓴거랑 같아야 함
// 모델에 있는 데이터를 가져와서 두번째 인자에 넣어줌!!
exports.visitor = (req, res) => {
  // db 연결 전
  // res.render("visitor", { data: Visitor.getVisitors() });

  // db 연결 후 Sequelize 전
  // Visitor.getVisitors((result) => {
  //   // console.log(result);
  //   res.render("visitor", { data: result });
  // });

  // Sequelize 이후
  // SELECT * FROM visitor === findAll
  models.Visitor.findAll()
    .then((result) => {
      // 객체의 배열로 들어옴!
      // console.log(result);
      // res.send(result);
      res.render("visitor", { data: result });
    })
    .catch((err) => {
      console.log("getvisitor controller err", err);
      res.status(500).send("server err!");
    });
};

// visitorID GET
exports.getVisitorID = async (req, res) => {
  // db 연결 후 Sequelize 전
  // console.log(req.params.id);
  // Visitor.getVisitorID(req.params.id, (result) => {
  //   console.log(result);
  //   res.send(result);
  // });

  // Sequelize 이후
  // 모델에서 visitor 데이터베이스에 가서 찾아라!
  // `SELECT * FROM visitor WHERE id=${id}` === findOne
  // findOne은 시간이 걸리기 떄문에 async와 await를 써준다
  try {
    const result = await models.Visitor.findOne({
      where: { id: req.params.id },
    });
    console.log("findeOne", result);
    res.send(result);
  } catch (error) {
    console.log("findOne err", err);
    res.status(500).send("server error");
  }
};

// visitor POST 등록
exports.postVisitor = (req, res) => {
  // console.log(req.body);
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log(result);
  //   res.send({ id: result, comment: req.body.comment, name: req.body.name });
  // });

  // Sequelize 이후
  // INSERT INTO VALUE === create
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      // console.log("insert", result);
      //  dataValues: { id: 9, name: '공민수', comment: '바보' },
      // _previousDataValues: { name: '공민수', comment: '바보', id: 9 },
      // uniqno: 1,
      // _changed: Set(0) {},
      // _options: {
      //   isNewRecord: true,
      //   _schema: null,
      //   _schemaDelimiter: '',
      //   attributes: undefined,
      //   include: undefined,
      //   raw: undefined,
      //   silent: undefined
      // },
      // isNewRecord: false
      res.send(result);
    })
    .catch((error) => {
      console.log("insert err", err);
      res.status(500).send("server error");
    });
};

/* /visitor DELETE, 삭제 */
exports.deleteVisitor = async (req, res) => {
  // console.log(req.body); // { id: '3' }
  // console.log(req.body.id); // '3'
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 id 삭제완료");
  // });

  // Sequelize 이후
  // DELETE FROM == destroy
  try {
    const result = await models.Visitor.destroy({
      where: {
        id: req.body.id,
      },
    });
    console.log(result);
    // result = 1(true) 삭제 성공
    // result = 0(false) 삭제 실패 -> 객체가 존재하지 않다면 0 그래서 실패!\
    if (Boolean(result)) {
      console.log(req.body.id + "번 id 삭제 완료");
      res.send(req.body.id);
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (error) {
    console.log("DELETE err", err);
    res.status(500).send("server error");
  }
};

/* /visitor PATCH, 수정 */
exports.patchVisitor = async (req, res) => {
  // console.log(req.body);
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("수정 완료");
  // });
  // res.send("response patch!");

  // Sequelize 이후
  // `UPDATE visitor
  // SET name="${data.name}", comment="${data.comment}"
  // WHERE id=${data.id}` === update
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(result); // [1],[0]
    if (Boolean(result)) {
      res.send("수정완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (error) {
    // console.log("update err", err);
    // res.status(500).send("server error");
    errorlogs(res, err,'patch controller 내부 에러', '수정에러가 났어요')
  }
};
