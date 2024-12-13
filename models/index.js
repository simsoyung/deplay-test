"use strict";

const Sequelize = require("sequelize");
let config = require(__dirname + "/../config/config.js");
console.log(config);
config = config["development"];
console.log("config", config);
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 설정 정보를 db에 있는 sequelize라는 키 안에 넣어주는 중
db.sequelize = sequelize;

// const Sequelize = require("sequelize");
// 맨 위에서 만든 Sequelize 모듈을 db안에 있는 키에 넣어주는 중
db.Sequelize = Sequelize;

db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {
//   sequelize : sequelize,
//   Sequelize : Sequelize,
//   Visitor : visitor의 모델
// }

// 그걸 다른곳에서 쓸 수 있도록 내보내는 중!!
module.exports = db;
