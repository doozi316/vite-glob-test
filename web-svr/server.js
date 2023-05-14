const express = require('express');
const app = express();
const path = require('path');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));

// 기본 경로 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
