const express = require('express');
const app = express();

// 미들웨어 설정
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// 웨이팅 큐 데이터
let waitingQueue = [
  { id: 1, teamName: 'Team A', numPeople: 2, waitingTime: 5 },
  { id: 2, teamName: 'Team B', numPeople: 4, waitingTime: 7 },
  { id: 3, teamName: 'Team C', numPeople: 3, waitingTime: 3 },
  { id: 4, teamName: 'Team D', numPeople: 1, waitingTime: 10 },
  { id: 5, teamName: 'Team E', numPeople: 2, waitingTime: 6 },
  { id: 6, teamName: 'Team F', numPeople: 5, waitingTime: 8 },
  { id: 7, teamName: 'Team G', numPeople: 3, waitingTime: 2 },
  { id: 8, teamName: 'Team H', numPeople: 4, waitingTime: 4 },
  { id: 9, teamName: 'Team I', numPeople: 2, waitingTime: 9 },
  { id: 10, teamName: 'Team J', numPeople: 3, waitingTime: 5 },
  { id: 11, teamName: 'Team K', numPeople: 2, waitingTime: 1 },
  { id: 12, teamName: 'Team L', numPeople: 4, waitingTime: 12 },
  { id: 13, teamName: 'Team M', numPeople: 3, waitingTime: 8 },
  { id: 14, teamName: 'Team N', numPeople: 2, waitingTime: 4 },
  { id: 15, teamName: 'Team N', numPeople: 2, waitingTime: 4 },
  { id: 16, teamName: 'Team N', numPeople: 2, waitingTime: 4 },
];

// 라우터 설정
app.get('/', (req, res) => {
  // 대기 순서가 제일 가까운 3팀 추출
  const closestTeams = waitingQueue.slice(0, 3);

  // 그 외의 대기중인 팀 추출
  const otherTeams = waitingQueue.slice(3);

  // 렌더링
  res.render('index', { closestTeams, otherTeams });
});

app.post('/notify', (req, res) => {
  const teamId = req.body.teamId;
  const notifiedTeam = waitingQueue.find((team) => team.id === parseInt(teamId));
  // 입장 알림 보내는 로직 추가
  console.log(`${notifiedTeam.teamName}의 입장 알림을 보냈습니다.`);

  res.redirect('/');
});

app.post('/cancel', (req, res) => {
  const teamId = req.body.teamId;
  const canceledTeamIndex = waitingQueue.findIndex((team) => team.id === parseInt(teamId));
  waitingQueue.splice(canceledTeamIndex, 1);
  console.log(`${waitingQueue[canceledTeamIndex].teamName}의 입장 취소되었습니다.`);

  res.redirect('/');
});

// 서버 실행
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
