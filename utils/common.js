// jsdocs
/**
 * 서버 에러가 났을 때 실행될 코드 모음
 * @param {Response} err err 실제 에러 전달
 * @param {Error} err err 실제 에러 전달
 * @param {string} errMsgInServer 서버콘솔에 띄워줄 메세지
 * @param {string} errMsgInClient 클라이언트에게 보내줄 메세지
 * @param {number} statusCode 에러의 상태코드
 */

exports.errorlogs = (
  res,
  err,
  errMsgInServer = "Error",
  errMsgInClient = "server error",
  statusCode = 500
) => {
  console.log(errMsgInServer, err);
  res.status(statusCode).send("server error");
};
