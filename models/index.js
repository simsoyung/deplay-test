
const Sequelize = require("sequelize");
let config = require(__dirname + "/../config/config.js");
// console.log(config);
const env = process.env.NODE_ENV || "development";
// development 혹은 production / undefined 확률도 있기 때문에 기본값을 넣어야함
// 앞에 있는 값이 있다면 앞에 값을 넣고 없다면! 뒤에 값을 넣어줘!
// 어떤 환경에서 접근하느냐에 따라서 다른 문자열이 들어감
console.log("env", env);
console.log("NODE_ENV ", process.env.NODE_ENV);

config = config[env];
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
