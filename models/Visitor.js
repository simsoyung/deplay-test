const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
    }, // 컬럼 정의
    {
      // 데이터 추가/수정 컬럼을 자동으로 만들어서 기록 / 기본값 true
      timestamps: false,
      //첫번째 인자로 전달을 해준 모델 이름 그래도 테이블 이름을 고정하겠다!
      // 기본값 false
      freezeTableName: true,
    }
  );
  return model;
};

module.exports = Visitor; // models/index.js에서 사용할 예정
