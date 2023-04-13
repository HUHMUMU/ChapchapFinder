const {Sequelize} = require("sequelize");
//mysql2 모듈을 사용해서 접속이 가능하고 mysql2.pool 을 사용 가능
//db 접속은 sequelize 모듈이 직접한다.
//Sequelize : orm 정의한 entity를 기반으로 자동으로 query 생성 해준다.
const sequelize=new Sequelize("CHAPCHAP","root","mysql123", {
    host:"localhost",
    port:3306,
    dialect:"mysql",
    pool : {
        //max : 최대 5명까지 접속 가능
        max:5,
        //min : 접속이 없어도 유지 가능
        min:0,
        //정해준 시간까지 접속이 없으면 접속을 끊어라
        acquire: 30000,
        //요청 후 데이터베이스를 가져오는데 까지 걸리는 시간
        idle:10000
    },
    //자동으로 생성하는 쿼리를 로그로 출력(성능저하가 있기 때문에 배포시 false)
    logging:true
});
module.exports=sequelize;