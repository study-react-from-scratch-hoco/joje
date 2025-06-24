const express = require('express');
const path = require('path');

const app = express(); //express 서버 생성
const PORT = process.env.PORT || 3000; //포트는 환경설정한 포트 또는 3000번

// 정적 파일 제공 : dist 폴더의 정적 파일들을 서빙.
app.use(express.static(path.join(__dirname, 'dist')));

// 모든 요청을 index.html로 라우팅
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//위에 설정한 포트
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 