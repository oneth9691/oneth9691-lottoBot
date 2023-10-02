// server.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 시작 코드
if (require.main === module) {
  app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  });
}

// 서버를 내보내거나 필요한 곳에서 사용할 수 있도록 함수를 내보냅니다.
module.exports = {
  startServer: () => {
    app.listen(port, () => {
      console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
    });
  },
};