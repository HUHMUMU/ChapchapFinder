DROP DATABASE CHAPCHAP;
CREATE DATABASE CHAPCHAP;

use CHAPCHAP;

CREATE TABLE store_manages
(
    store_id     VARCHAR(255) primary key  NOT NULL COMMENT '사장아이디',
    pw           VARCHAR(255)              NOT NULL COMMENT '사장비밀번호',
    business_num VARCHAR(255)              NOT NULL COMMENT '사업자번호',
    store_call   VARCHAR(255)              NOT NULL COMMENT '가게전화번호',
    phone        VARCHAR(255)              NOT NULL COMMENT '사장전화번호',
    email        VARCHAR(255)              NOT NULL COMMENT '사장이메일',
    store_num    INT auto_increment UNIQUE NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE stores
(
    store_num         INT primary key        NOT NULL COMMENT '가게고유번호',
    store_name        VARCHAR(255)           NOT NULL COMMENT '가게이름',
    detail_info       VARCHAR(255)           NOT NULL COMMENT '가게디테일설명',
    short_info        VARCHAR(255)           NOT NULL COMMENT '가게한줄설명',
    madein            VARCHAR(255)           NOT NULL COMMENT '원산지표시',
    address           VARCHAR(255)           NOT NULL COMMENT '가게주소',
    main_img          VARCHAR(255)           NULL COMMENT '대표사진',
    opentime          VARCHAR(255)           NOT NULL COMMENT '영업시간',
    lastorder         VARCHAR(255)           NULL COMMENT '라스트오더',
    waiting_closetime VARCHAR(255)           NULL COMMENT '웨이팅마감시간',
    blogurl           VARCHAR(255)           NULL COMMENT '블로그url',
    youtubeurl        VARCHAR(255)           NULL COMMENT '유튜브url',
    facebookurl       VARCHAR(255)           NULL COMMENT '페북url',
    instaurl          VARCHAR(255)           NULL COMMENT '인스타url',
    tvshow            VARCHAR(255)           NULL COMMENT '방송출연정보직접입력',
    s_rstatus         ENUM ('공개','심사','비공개') NOT NULL COMMENT '신고상태',
    parking           BOOLEAN                NOT NULL COMMENT '주차장',
    wifi              BOOLEAN                NOT NULL COMMENT '와이파이',
    toilet            BOOLEAN                NOT NULL COMMENT '화장실구분',
    smokingroom       BOOLEAN                NOT NULL COMMENT '흡연실',
    babychair         BOOLEAN                NOT NULL COMMENT '애기의자',
    FOREIGN KEY (store_num) REFERENCES store_manages (store_num)
);

CREATE TABLE users
(
    user_id        VARCHAR(255) primary key unique NOT NULL COMMENT '유저아이디',
    nickname       VARCHAR(255) unique             NOT NULL COMMENT '유저닉네임',
    pw             VARCHAR(255)                    NOT NULL COMMENT '비밀번호',
    name           VARCHAR(255)                    NOT NULL COMMENT '이름',
    birth          DATE                            NOT NULL COMMENT '생년월일',
    gender         ENUM ('MALE', 'FEMALE')         NOT NULL COMMENT '성별',
    address        VARCHAR(255)                    NOT NULL COMMENT '주소',
    detail_address VARCHAR(255)                    NOT NULL COMMENT '상세주소',
    email          VARCHAR(255) unique             NOT NULL COMMENT '이메일',
    insta_url      VARCHAR(255)                    NULL COMMENT '인스타url',
    face_url       VARCHAR(255)                    NULL COMMENT '페이스북url',
    youtube_url    VARCHAR(255)                    NULL COMMENT '유튜브url',
    profile_img    VARCHAR(255)                    NULL COMMENT '프로필사진',
    introduce      VARCHAR(255)                    NULL COMMENT '자기소개',
    u_rstatus      ENUM ('공개', '심사', '비공개')        NOT NULL COMMENT '신고상태'
);

CREATE TABLE reviews
(
    review_num INT(10) primary key auto_increment NOT NULL COMMENT '리뷰 고유번호',
    content    TEXT                               NULL COMMENT '리뷰 작성내용',
    comment    VARCHAR(255)                       NULL COMMENT '한줄평',
    img        VARCHAR(255)                       NULL COMMENT '가게 메뉴사진',
    date       DATETIME                           NOT NULL COMMENT '날짜',
    star       INT                                NOT NULL COMMENT '별점1~5',
    r_rstatus  enum ('공개', '심사', '비공개')           NOT NULL COMMENT '신고상태',
    user_id    VARCHAR(255)                       NOT NULL COMMENT '유저아이디',
    store_num  INT                                NOT NULL COMMENT '가게 고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE chapstorys
(
    chap_num    INT auto_increment primary key NOT NULL COMMENT '챱스토리번호',
    title       VARCHAR(255)                   NOT NULL COMMENT '제목',
    content     VARCHAR(255)                   NOT NULL COMMENT '내용',
    viewcount   INT                            NOT NULL COMMENT '조회수',
    date        DATE                           NOT NULL COMMENT '작성날짜',
    likes       INT                            NOT NULL COMMENT '좋아요',
    profile     VARCHAR(255)                   NULL COMMENT '프로필',
    main_img    VARCHAR(255)                   NULL COMMENT '대표사진',
    update_time TIMESTAMP                      NOT NULL COMMENT '수정날짜',
    user_id     VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    chs_rstatus ENUM ('공개', '심사', '비공개')       NOT NULL COMMENT '신고상태',
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE grades
(
    user_grade VARCHAR(255) NOT NULL COMMENT '유저등급',
    grade_low  INT          NOT NULL COMMENT 'low범위',
    grade_high INT          NOT NULL COMMENT 'high범위'
);

CREATE TABLE visited_store_lists
(
    visited_store_order INT          NOT NULL COMMENT '다녀온 가게 번호',
    visited_date        DATE         NOT NULL COMMENT '다녀온 날짜(웨이팅한 날짜)',
    user_id             VARCHAR(255) NOT NULL COMMENT '유저아이디',
    store_name          VARCHAR(255) NOT NULL COMMENT '가게 이름',
    address             VARCHAR(255) NOT NULL COMMENT '가게 주소'
);

CREATE TABLE menu_manages
(
    menu_num  INT primary key auto_increment NOT NULL COMMENT '메뉴번호',
    name      VARCHAR(255)                   NOT NULL COMMENT '메뉴이름',
    img       VARCHAR(255)                   NULL COMMENT '메뉴사진',
    price     INT                            NOT NULL COMMENT '메뉴가격',
    info      VARCHAR(255)                   NULL COMMENT '메뉴설명',
    menu_type ENUM ('대표메뉴', '신메뉴', '일반메뉴')   NOT NULL COMMENT '메뉴종류',
    status    BOOLEAN                        NOT NULL COMMENT '메뉴상태',
    store_num INT                            NOT NULL COMMENT '가게고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE recommend_stores
(
    recommend_store_num INT primary key auto_increment NOT NULL COMMENT '추천가게고유번호',
    comment             VARCHAR(255)                   NULL COMMENT '한줄평',
    user_id             VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    store_num           INT(10)                        NOT NULL COMMENT '가게고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    UNIQUE (user_id, store_num) # 같은가게 추천 두번 못하게
);

CREATE TABLE jjim_manages
(
    jjim_num  int primary key auto_increment NOT NULL COMMENT '즐겨찾기 번호',
    jj_status ENUM ('공개', '비공개')             NOT NULL COMMENT '공개여부',
    user_id   VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    store_num INT(10)                        NOT NULL COMMENT '가게고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    UNIQUE (user_id, store_num) # 같은가게 찜 두번 못하게
);

CREATE TABLE reviewlikes
(
    rl_id      INT primary key auto_increment NOT NULL COMMENT '좋아요 아이디',
    rl_status  ENUM ('LIKE', 'BAD')           NOT NULL COMMENT '좋아요 싫어요',
    user_id    VARCHAR(255)                   NOT NULL COMMENT '유저 아이디',
    review_num INT(10)                        NOT NULL COMMENT '리뷰 고유번호',
    FOREIGN KEY (review_num) REFERENCES reviews (review_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE userswaiting
(
    waiting_num  INT primary key auto_increment    NOT NULL COMMENT '웨이팅 고유번호',
    user_people  INT                               NOT NULL COMMENT '유저 인원수',
    wait_num     INT                               NOT NULL COMMENT '대기 번호',
    waiting_date DATE                              NOT NULL COMMENT '웨이팅 날짜',
    start_time   VARCHAR(255)                      NOT NULL COMMENT '웨이팅 등록시간',
    end_time     VARCHAR(255)                      NULL COMMENT '웨이팅 입장시간',
    enter_status ENUM ('대기', '완료', '유저취소', '사장취소') NOT NULL COMMENT '입장완료상태체크',
    user_id      VARCHAR(255)                      NOT NULL COMMENT '유저아이디',
    store_num    INT                               NOT NULL COMMENT '가게고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE storeswaiting
(
    admin_waiting INT primary key NOT NULL COMMENT '웨이팅 테이블',
    closing_time  VARCHAR(255)    NOT NULL COMMENT '웨이팅 마감시간',
    max_people    INT             NOT NULL COMMENT '웨이팅 최대 인원수',
    waiting_onoff BOOLEAN         NOT NULL COMMENT '웨이팅 on/off',
    time_setup    INT             NOT NULL COMMENT '웨이팅 시간 설정',
    store_ads     VARCHAR(255)    NULL COMMENT '가게홍보 url',
    store_num     INT             NOT NULL COMMENT '가게 고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE type_classes
(
    category_num  INT primary key        NOT NULL COMMENT '업종카테고리',
    main_category ENUM ('음식점','카페','술집') NOT NULL COMMENT '대분류',
    sub_category  VARCHAR(255)           NOT NULL COMMENT '소분류'
);

CREATE TABLE storetypes
(
    storetype_id INT primary key auto_increment NOT NULL COMMENT '업종id',
    store_num    INT                            NOT NULL COMMENT '가게고유번호',
    category_num INT                            NOT NULL COMMENT '업종카테고리',
    FOREIGN KEY (store_num) REFERENCES stores (store_num),
    FOREIGN KEY (category_num) REFERENCES type_classes (category_num)
);

CREATE TABLE breaktimes
(
    rest_num        INT primary key auto_increment NOT NULL COMMENT '휴식시간',
    rest_start_time DATETIME                       NULL COMMENT '휴식시작시간',
    rest_end_time   DATETIME                       NULL COMMENT '휴식 끝시간',
    store_num       INT                            NOT NULL COMMENT '가게고유번호',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE holidays
(
    holi_num       int unsigned primary key auto_increment NOT NULL COMMENT '휴일번호',
    store_num INT                                     NOT NULL COMMENT '가게고유번호',
    week      ENUM ('월','화','수','목','금','토','일')      NULL COMMENT '요일',
    date      DATE                                    NULL COMMENT '일',
    regular   BOOLEAN                                 NULL COMMENT '정규/비정규',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE chap_deals
(
    event_num       INT primary key auto_increment NOT NULL COMMENT '이벤트보드번호',
    store_num       INT                            NULL COMMENT '가게고유번호',
    event_title     VARCHAR(255)                   NULL COMMENT '이벤트 제목',
    event_condition VARCHAR(255)                   NULL COMMENT '이벤트 조건',
    event_reward    VARCHAR(255)                   NULL COMMENT '이벤트 보상',
    event_img       VARCHAR(255)                   NULL COMMENT '이벤트 이미지',
    event_start     DATE                           NULL COMMENT '이벤트 시작기간',
    event_end       DATE                           NULL COMMENT '이벤트 끝나는기간',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE points
(
    point_num    INT primary key auto_increment NOT NULL COMMENT '포인트 고유번호',
    point_date   DATE                           NULL COMMENT '포인트 적립날짜',
    point_plus   INT                            NULL COMMENT '적립포인트',
    point_reason VARCHAR(255)                   NULL COMMENT '포인트 받은 이유',
    user_id      VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE chapstoryimgs
(
    chs_num  INT primary key auto_increment NOT NULL COMMENT '챱사진 고유번호',
    chap_num INT                            NOT NULL COMMENT '챱스토리 번호',
    img      VARCHAR(255)                   NOT NULL COMMENT '이미지 경로(path)',
    FOREIGN KEY (chap_num) REFERENCES chapstorys (chap_num)
);

CREATE TABLE userstatus
(
    user_id VARCHAR(255) primary key NOT NULL COMMENT '유저아이디',
    status  ENUM ('활동','휴면','탈퇴')    NOT NULL COMMENT '활동,휴면,탈퇴',
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE review_replies
(
    rr_num     INT primary key auto_increment NOT NULL COMMENT '리뷰에 사장님의 대댓글',
    review_num INT(10)                        NOT NULL COMMENT '리뷰 고유번호',
    post_date  date                           NOT NULL COMMENT '작성 날짜',
    content    VARCHAR(255)                   NOT NULL COMMENT '작성 내용',
    FOREIGN KEY (review_num) REFERENCES reviews (review_num)
);

CREATE TABLE store_imgs
(
    img_num   INT primary key auto_increment NOT NULL COMMENT '이미지 고유번호',
    store_num INT                            NOT NULL COMMENT '가게고유번호',
    store_img VARCHAR(255)                   NULL COMMENT '가게사진',
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
);

CREATE TABLE reports
(
    report_num      int auto_increment primary key NOT NULL COMMENT '신고번호',
    report_store_id VARCHAR(255)                   NULL COMMENT '신고한 사장님 아이디',
    report_user_id  VARCHAR(255)                   NULL COMMENT '신고한 유저 아이디',
    report_content  VARCHAR(255)                   NULL COMMENT '신고내용',
    review_num      INT(10)                        NULL COMMENT '리뷰 고유번호',
    user_id         VARCHAR(255)                   NULL COMMENT '신고당한 유저 아이디',
    chap_num        INT                            NULL COMMENT '챱스토리 번호',
    store_num       INT                            NULL COMMENT '가게 고유번호',
    FOREIGN KEY (review_num) REFERENCES reviews (review_num),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (chap_num) REFERENCES chapstorys (chap_num),
    FOREIGN KEY (store_num) REFERENCES stores (store_num)
    # report_store_id 와 report_user_id 둘중 하나는 NULL 이어야 함.
    # review_num 와 user_id 와 chap_num 와 store_num 의 4개중 3개는 NULL 이어야 함.
);

#여기부터 더미데이터
INSERT INTO store_manages (store_id, pw, business_num, store_call, phone, email) VALUES
 ('store001', 'pw123456', '1234567890', '02-1234-5678', '010-1111-2222', 'store001_owner@email.com'),
 ('store002', 'pw234567', '2345678901', '02-2345-6789', '010-2222-3333', 'store002_owner@email.com'),
 ('store003', 'pw345678', '3456789012', '02-3456-7890', '010-3333-4444', 'store003_owner@email.com'),
 ('store004', 'pw456789', '4567890123', '02-4567-8901', '010-4444-5555', 'store004_owner@email.com'),
 ('store005', 'pw567890', '5678901234', '02-5678-9012', '010-5555-6666', 'store005_owner@email.com'),
 ('store006', 'pw678901', '6789012345', '02-6789-0123', '010-6666-7777', 'store006_owner@email.com'),
 ('store007', 'pw789012', '7890123456', '02-7890-1234', '010-7777-8888', 'store007_owner@email.com'),
 ('store008', 'pw890123', '8901234567', '02-8901-2345', '010-8888-9999', 'store008_owner@email.com'),
 ('store009', 'pw901234', '9012345678', '02-9012-3456', '010-9999-0000', 'store009_owner@email.com'),
 ('store010', 'pw012345', '0123456789', '02-0123-4567', '010-0000-1111', 'store010_owner@email.com');

INSERT INTO stores (store_num, store_name, detail_info, short_info, madein, address, main_img, opentime, lastorder, waiting_closetime, blogurl, youtubeurl, facebookurl, instaurl, s_rstatus, parking, wifi, toilet, smokingroom, babychair) VALUES
    (1, '맛있는 햄버거집', '다양한 햄버거와 사이드 메뉴를 즐길 수 있는 가게입니다.', '햄버거 천국', '미국', '서울시 강남구 역삼동 123-45', 'logo.png', '10:00 - 22:00', '21:30', '21:00', 'http://burger-blog.com', NULL, 'http://facebook.com/burger', 'http://instagram.com/burger', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (2, '닭갈비 전문점', '신선한 닭고기와 야채로 만든 맛있는 닭갈비를 즐길 수 있는 곳입니다.', '닭갈비의 정석', '한국', '서울시 강남구 역삼동 234-56', 'logo.png', '11:00 - 23:00', '22:30', '22:00', 'http://dakgalbi-blog.com', NULL, 'http://facebook.com/dakgalbi', 'http://instagram.com/dakgalbi', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (3, '탕수육명가', '존맛탱 탕수육을 즐길 수 있는 중국요리 전문점입니다.', '탕수육의 정석', '중국', '서울시 강남구 역삼동 345-67', 'logo.png', '10:00 - 22:00', '21:30', '21:00', 'http://tangsuyuk-blog.com', NULL, 'http://facebook.com/tangsuyuk', 'http://instagram.com/tangsuyuk', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (4, '쌀국수 파라다이스', '베트남 전통 쌀국수를 맛볼 수 있는 가게입니다.', '쌀국수 천국', '베트남', '서울시 강남구 역삼동 456-78', 'logo.png', '10:00 - 22:00', '21:30', '21:00', 'http://pho-blog.com', NULL, 'http://facebook.com/pho', 'http://instagram.com/pho', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (5, '빵 맛집', '다양한 종류의 빵을 판매하는 베이커리입니다.', '빵의 세계', '한국', '서울시 강남구 역삼동 567-89', 'logo.png', '09:00 - 21:00', '20:30', '20:00', 'http://bread-blog.com', NULL, 'http://facebook.com/bread', 'http://instagram.com/bread', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (6, '초밥 천국', '신선한 회로 만든 초밥을 즐길 수 있는 일본요리 전문점입니다.', '초밥의 정석', '일본', '서울시 강남구 역삼동 678-90', 'logo.png', '11:00 - 23:00', '22:30', '22:00', 'http://sushi-blog.com', NULL, 'http://facebook.com/sushi', 'http://instagram.com/sushi', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (7, '족발 맛집', '부드러운 족발을 판매하는 한식 전문점입니다.', '족발의 세계', '한국', '서울시 강남구 역삼동 789-01', 'logo.png', '16:00 - 02:00', '01:30', '01:00', 'http://jokbal-blog.com', NULL, 'http://facebook.com/jokbal', 'http://instagram.com/jokbal', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (8, '치킨 프라자', '맛있는 치킨을 판매하는 프라이드치킨 전문점입니다.', '치킨의 정석', '한국', '서울시 강남구 역삼동 890-12', 'logo.png', '16:00 - 02:00', '01:30', '01:00', 'http://chicken-blog.com', NULL, 'http://facebook.com/chicken', 'http://instagram.com/chicken', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (9, '돈까스 천국', '바삭바삭한 돈까스를 판매하는 일본요리 전문점입니다.', '돈까스의 정석', '일본', '서울시 강남구 역삼동 901-23', 'logo.png', '11:00 - 22:00', '21:30', '21:00', 'http://donkatsu-blog.com', NULL, 'http://facebook.com/donkatsu', 'http://instagram.com/donkatsu', '공개', TRUE, TRUE, TRUE, FALSE, TRUE),
    (10, '파스타 레스토랑', '다양한 종류의 파스타를 판매하는 이탈리아 요리 전문점입니다.', '파스타 천국', '이탈리아', '서울시 강남구 역삼동 912-34', 'logo.png', '11:00 - 23:00', '22:30', '22:00', 'http://pasta-blog.com', NULL, 'http://facebook.com/pasta', 'http://instagram.com/pasta', '공개', TRUE, TRUE, TRUE, FALSE, TRUE);


INSERT INTO users (user_id, nickname, pw, name, birth, gender, address, detail_address, email, insta_url, face_url, youtube_url, profile_img, introduce, u_rstatus)VALUES
   ('admin', '관리자', '1234', '관리자', '1999-11-12', 'MALE', '서울특별시 마포구', '에이콘아카데미', 'admin@example.com', NULL, NULL, NULL, NULL, '관리자', '공개'),
   ('user01', '철수', 'password123', '김철수', '1990-01-01', 'MALE', '서울시 강남구 역삼동', '아파트 101호', 'chulsoo@example.com', 'https://www.instagram.com/chulsoo', NULL, NULL, NULL, '안녕하세요, 김철수입니다.', '공개'),
   ('user02', '영희', 'password123', '박영희', '1995-05-05', 'FEMALE', '서울시 서초구 반포동', '빌라 201호', 'younghee@example.com', NULL, 'https://www.facebook.com/younghee', NULL, NULL, '안녕하세요, 박영희입니다.', '심사'),
   ('user03', '수민', 'password123', '이수민', '1985-10-10', 'MALE', '경기도 부천시 원미구', '오피스텔 302호', 'soomin@example.com', NULL, NULL, 'https://www.youtube.com/soomin', NULL, '안녕하세요, 이수민입니다.', '비공개'),
   ('user04', '민지', 'password123', '김민지', '2000-03-03', 'FEMALE', '인천광역시 부평구', '아파트 501호', 'minji@example.com', 'https://www.instagram.com/minji', NULL, NULL, NULL, '안녕하세요, 김민지입니다.', '공개'),
   ('user05', '준호', 'password123', '박준호', '1992-12-12', 'MALE', '대구광역시 중구', '오피스텔 201호', 'junho@example.com', NULL, 'https://www.facebook.com/junho', NULL, NULL, '안녕하세요, 박준호입니다.', '공개'),
   ('user06', '보검', 'password123', '박보검', '1993-06-16', 'MALE', '서울특별시 강남구', '언주로 12길 29', 'test01@gmail.com', 'https://www.instagram.com/pbg', NULL, NULL, 'https://image.com/pbg.jpg', '안녕하세요, 박보검입니다.', '공개'),
   ('user07', '예진', 'password123', '손예진', '1982-01-11', 'FEMALE', '서울특별시 강서구', '등촌로 123', 'test02@gmail.com', 'https://www.instagram.com/yejinhand', NULL, NULL, 'https://image.com/yejin.jpg', '안녕하세요, 손예진입니다.', '공개'),
   ('user08', '종석', 'password123', '이종석', '1987-08-04', 'MALE', '경기도 수원시 영통구', '대학로 123', 'test03@gmail.com', 'https://www.instagram.com/jongsuk0206', NULL, NULL, 'https://image.com/jongsuk.jpg', '안녕하세요, 이종석입니다.', '공개'),
   ('user09', '효주', 'password123', '한효주', '1987-02-22', 'FEMALE', '서울특별시 종로구', '돈화문로 21길 12', 'test04@gmail.com', 'https://www.instagram.com/hyozzang', NULL, NULL, 'https://image.com/hyozzang.jpg', '안녕하세요, 한효주입니다.', '공개'),
   ('user10', '남준', 'password5678', '김남준', '1994-09-12', 'MALE', '서울특별시 용산구', '이태원로 3길 30', 'test05@gmail.com', 'https://www.instagram.com/bts.bighitofficial', NULL, 'https://www.youtube.com/channel/UC3IZKseVpdzPSBaWxBxundA', 'https://image.com/bts.jpg', '안녕하세요, 김남준입니다.', '공개'),
   ('user11', '민수', 'password123', '이민수', '1989-03-22', 'MALE', '부산광역시 동래구', '아파트 301호', 'minsuyy@example.com', 'https://www.instagram.com/minsuyy', NULL, NULL, NULL, '안녕하세요, 이민수입니다.', '공개'),
   ('user12', '유나', 'password123', '김유나', '1998-08-08', 'FEMALE', '인천광역시 계양구', '빌라 102호', 'yuna_kim@example.com', NULL, 'https://www.facebook.com/yuna_kim', NULL, NULL, '안녕하세요, 김유나입니다.', '심사'),
   ('user13', '성민', 'password123', '김성민', '1987-07-07', 'MALE', '대전광역시 유성구', '아파트 701호', 'smkim@example.com', NULL, NULL, 'https://www.youtube.com/smkim', NULL, '안녕하세요, 김성민입니다.', '비공개'),
   ('user14', '영호', 'password123', '이영호', '2001-01-01', 'MALE', '서울특별시 강서구', '오피스텔 201호', 'young_ho@example.com', 'https://www.instagram.com/young_ho', NULL, NULL, NULL, '안녕하세요, 이영호입니다.', '공개'),
   ('user15', '진아', 'password123', '박진아', '1994-04-15', 'FEMALE', '경기도 안양시', '빌라 501호', 'jinapark@example.com', NULL, 'https://www.facebook.com/jinapark', NULL, NULL, '안녕하세요, 박진아입니다.', '공개'),
   ('user16', '서준', 'password123', '김서준', '1996-06-16', 'MALE', '경기도 하남시', '오피스텔 501호', 'seojun@example.com', 'https://www.instagram.com/seojun', NULL, NULL, NULL, '안녕하세요, 김서준입니다.', '공개'),
   ('user17', '민영', 'password123', '이민영', '1988-12-25', 'FEMALE', '서울특별시 마포구', '아파트 102호', 'minyoung@example.com', NULL, 'https://www.facebook.com/minyoung', NULL, NULL, '안녕하세요, 이민영입니다.', '공개'),
   ('user18', '준기', 'password123', '김준기', '1999-09-09', 'MALE', '서울특별시 송파구', '아파트 302호', 'junki@example.com', 'https://www.instagram.com/junki', NULL, NULL, NULL, '안녕하세요, 김준기입니다.', '공개'),
   ('user19', '진수', 'password123', '박진수', '1993-07-01', 'MALE', '서울특별시 동작구', '오피스텔 201호', 'jinsu@example.com', NULL, 'https://www.facebook.com/jinsu', NULL, NULL, '안녕하세요, 박진수입니다.', '공개'),
   ('user20', '은지', 'password123', '김은지', '1995-11-20', 'FEMALE', '인천광역시 서구', '아파트 601호', 'eunji_kim@example.com', NULL, NULL, 'https://www.youtube.com/eunji_kim', NULL, '안녕하세요, 김은지입니다.', '심사');

INSERT INTO chapstorys (title, content, viewcount, date, likes, profile, main_img, update_time, user_id, chs_rstatus)
VALUES ('The best sushi in town', 'I have tried sushi in many places, but this restaurant truly stands out. The quality of the fish is amazing.', 170, '2023-04-11', 32, 'profile11.jpg', 'main_img11.jpg', '2023-04-11 13:00:00', 'user01', '공개'),
       ('A wonderful bakery', 'This bakery offers a wide variety of breads and pastries, all of them fresh and delicious.', 160, '2023-04-12', 31, 'profile12.jpg', 'main_img12.jpg', '2023-04-12 14:00:00', 'user02', '공개'),
       ('A delightful tea house', 'I visited this tea house with my friends and we had a great time trying out different teas and snacks.', 140, '2023-04-13', 29, 'profile13.jpg', 'main_img13.jpg', '2023-04-13 15:00:00', 'user03', '공개'),
       ('A vegan paradise', 'I am a vegan and this restaurant offers a fantastic selection of plant-based dishes. I will definitely be coming back!', 190, '2023-04-14', 36, 'profile14.jpg', 'main_img14.jpg', '2023-04-14 16:00:00', 'user04', '공개'),
       ('A fantastic burger joint', 'This place serves some of the juiciest and most flavorful burgers I have ever had. Don\'t miss out!', 210, '2023-04-15', 42, 'profile15.jpg', 'main_img15.jpg', '2023-04-15 17:00:00', 'user05', '공개'),
       ('An authentic Italian experience', 'This restaurant transports you straight to Italy with its amazing pasta dishes and warm atmosphere.', 220, '2023-04-16', 45, 'profile16.jpg', 'main_img16.jpg', '2023-04-16 18:00:00', 'user06', '공개'),
       ('A great place for desserts', 'If you have a sweet tooth, this place is a must-visit. The selection of desserts is amazing.', 240, '2023-04-17', 48, 'profile17.jpg', 'main_img17.jpg', '2023-04-17 19:00:00', 'user07', '공개'),
       ('A cozy and friendly pub', 'This pub has a great selection of beers and a warm atmosphere. I always have a great time here.', 230, '2023-04-18', 46, 'profile18.jpg', 'main_img18.jpg', '2023-04-18 20:00:00', 'user08', '공개'),
       ('A fantastic seafood restaurant', 'The seafood at this restaurant is incredibly fresh and the dishes are expertly prepared.', 250, '2023-04-19', 50, 'profile19.jpg', 'main_img19.jpg', '2023-04-19 21:00:00', 'user09', '공개'),
       ('A wonderful dining experience', 'I had an amazing time at this restaurant. The food was fantastic and the atmosphere was perfect.', 100, '2023-04-01', 25, 'profile1.jpg', 'main_img1.jpg', '2023-04-01 12:00:00', 'user01', '공개'),
       ('A cozy little cafe', 'I found this hidden gem of a cafe in my neighborhood. Great coffee and delicious pastries!', 80, '2023-04-02', 15, 'profile2.jpg', 'main_img2.jpg', '2023-04-02 14:00:00', 'user02', '공개'),
       ('Amazing cocktails', 'This bar serves the best cocktails in town. The bartenders are very skilled and friendly.', 120, '2023-04-03', 20, 'profile3.jpg', 'main_img3.jpg', '2023-04-03 18:00:00', 'user03', '공개'),
       ('A disappointing experience', 'I had high expectations for this restaurant, but the food was bland and the service was slow.', 60, '2023-04-04', 5, 'profile4.jpg', 'main_img4.jpg', '2023-04-04 19:00:00', 'user04', '공개'),
       ('A great spot for brunch', 'I love coming to this place for brunch with my friends. The food is delicious and the atmosphere is relaxed.', 150, '2023-04-05', 30, 'profile5.jpg', 'main_img5.jpg', '2023-04-05 20:00:00', 'user05', '공개'),
       ('Delicious street food', 'I stumbled upon this street food vendor and was blown away by the taste and quality of their food.', 200, '2023-04-06', 40, 'profile6.jpg', 'main_img6.jpg', '2023-04-06 21:00:00', 'user06', '공개'),
       ('A hidden gem', 'This small restaurant offers some of the best food I have ever tasted. The service is also impeccable.', 180, '2023-04-07', 35, 'profile7.jpg', 'main_img7.jpg', '2023-04-07 22:00:00', 'user07', '공개'),
       ('A unique dining experience', 'I had a truly unique and memorable dining experience at this restaurant. The chef is very creative.', 90, '2023-04-08', 10, 'profile8.jpg', 'main_img8.jpg', '2023-04-08 23:00:00', 'user08', '공개'),
       ('A great place for a date', 'I took my date to this restaurant and we both loved the food and the romantic atmosphere.', 110, '2023-04-09', 22, 'profile9.jpg', 'main_img9.jpg', '2023-04-09 12:00:00', 'user09', '공개');

INSERT INTO type_classes (category_num,main_category, sub_category)
VALUES
    (1,'음식점', '고기'),
    (2,'음식점', '돈까스,회,일식'),
    (3,'음식점', '탕,찜,찌개'),
    (4,'음식점', '양식'),
    (5,'음식점', '중식'),
    (6,'음식점', '아시안'),
    (7,'음식점', '패스트푸드'),
    (8,'음식점', '백반,국수'),
    (9,'음식점', '분식'),
    (10,'음식점', '기타'),
    (11,'술집', '호프집'),
    (12,'술집', '바'),
    (13,'술집', '이자카야'),
    (14,'술집', '포차'),
    (15,'술집', '와인바'),
    (16,'술집', '기타'),
    (17,'카페', '커피전문점'),
    (18,'카페', '디저트카페'),
    (19,'카페', '차전문점'),
    (20,'카페', '베이커리카페'),
    (21,'카페', '기타');

INSERT INTO storetypes (store_num, category_num)
VALUES
    (1, 7),
    (2, 8),
    (3, 5),
    (4, 6),
    (5, 20),
    (6, 2),
    (7, 1),
    (8, 7),
    (9, 2),
    (10, 4);
INSERT INTO reviews (content, comment, img, date, star, r_rstatus, user_id, store_num) VALUES
   ('맛있는 치킨이었습니다. 분위기도 좋았어요.', '맛있는 치킨', 'chicken1.jpg', '2023-04-01 19:00:00', 10, '공개', 'user01', 1),
   ('피자가 아주 맛있었습니다. 다음에 또 올게요!', '최고의 피자', 'pizza1.jpg', '2023-04-02 20:00:00', 8, '공개', 'user02', 2),
   ('초밥이 신선하고 맛있었습니다. 서비스도 좋았습니다.', '신선한 초밥', 'sushi1.jpg', '2023-04-03 18:30:00', 10, '공개', 'user03', 3),
   ('김밥이 너무 맛있어요! 가격도 저렴해서 좋았습니다.', '저렴한 김밥', 'kimbap1.jpg', '2023-04-04 12:00:00', 9, '공개', 'user04', 4),
   ('떡볶이가 매콤하고 맛있었습니다. 포장해서 먹었어요.', '떡볶이 추천', 'tteokbokki1.jpg', '2023-04-05 17:00:00', 7, '공개', 'user05', 5),
   ('삼겹살이 아주 부드럽고 맛있었습니다. 배부르게 먹었어요.', '부드러운 삼겹살', 'samgyeopsal1.jpg', '2023-04-06 20:30:00', 7, '공개', 'user06', 6),
   ('파스타가 존맛탱이었습니다. 소스도 좋았어요.', '맛있는 파스타', 'pasta1.jpg', '2023-04-07 13:00:00', 8, '공개', 'user07', 7),
   ('커피가 진짜 맛있었어요. 디저트도 추천합니다.', '커피 맛집', 'coffee1.jpg', '2023-04-08 15:00:00', 7, '공개', 'user08', 8),
   ('라멘이 정말 맛있었습니다. 국물이 진해요.', '라멘 맛집', 'ramen1.jpg', '2023-04-09 18:00:00', 10, '공개', 'user09', 9),
   ('짜장면이 아주 맛있었습니다. 짬뽕도 시켜봤는데 좋았어요.', '중화요리 추천', 'jajangmyeon1.jpg', '2023-04-10 19:00:00', 8, '공개', 'user10', 10),
   ('햄버거가 아주 맛있었습니다. 다양한 메뉴가 있어 좋았어요.', '맛있는 햄버거', 'burger1.jpg', '2023-04-11 13:30:00', 8, '공개', 'user11', 1),
   ('닭갈비가 아주 맛있었습니다. 야채도 신선해요!', '닭갈비 최고', 'dakgalbi1.jpg', '2023-04-12 18:00:00', 9, '공개', 'user12', 2),
   ('탕수육이 존맛탱이었습니다. 짬뽕도 좋았어요.', '중식 맛집', 'tangsuyuk1.jpg', '2023-04-13 12:30:00', 9, '공개', 'user13', 3),
   ('쌀국수가 정말 맛있었습니다. 국물이 진해요.', '쌀국수 맛집', 'pho1.jpg', '2023-04-14 19:30:00', 10, '공개', 'user14', 4),
   ('빵이 너무 맛있어요! 친절한 서비스도 좋았습니다.', '빵 맛집', 'bread1.jpg', '2023-04-15 16:00:00', 10, '공개', 'user15', 5),
   ('돈까스가 아주 부드럽고 맛있었습니다. 소스도 좋았어요.', '돈까스 추천', 'donkatsu1.jpg', '2023-04-16 12:00:00', 10, '공개', 'user16', 6),
   ('샐러드가 정말 신선하고 맛있었습니다. 다양한 메뉴가 있어요.', '샐러드 맛집', 'salad1.jpg', '2023-04-17 14:00:00', 8, '공개', 'user17', 7),
   ('냉면이 아주 맛있었습니다. 여름에 먹기 좋아요!', '냉면 맛집', 'naengmyeon1.jpg', '2023-04-18 18:30:00', 8, '공개', 'user18', 8),
   ('참치회가 신선하고 맛있었습니다. 소주랑 잘 어울려요.', '참치회 추천', 'chamchi1.jpg', '2023-04-19 20:00:00', 10, '공개', 'user19', 9),
   ('케이크가 정말 맛있었습니다. 다양한 종류가 있어 고르기 어려웠어요.', '케이크 맛집', 'cake1.jpg', '2023-04-20 15:30:00', 10, '공개', 'user20', 10),
   ('두부김치가 아주 맛있었습니다. 매운맛이 좋았어요.', '두부김치 맛집', 'dubukimchi1.jpg', '2023-04-21 18:00:00', 7, '공개', 'user11', 1),
   ('감자탕이 정말 맛있었습니다. 국물이 진해요.', '감자탕 추천', 'gamjatang1.jpg', '2023-04-22 19:30:00', 6, '공개', 'user20', 2),
   ('생선회가 신선하고 맛있었습니다. 와사비랑 잘 어울려요.', '생선회 맛집', 'sashimi1.jpg', '2023-04-23 20:00:00', 8, '공개', 'user13', 3),
   ('김치찌개가 아주 맛있었습니다. 배부르게 먹었어요.', '김치찌개 추천', 'kimchijjigae1.jpg', '2023-04-24 18:00:00', 9, '공개', 'user14', 4),
   ('해물파전이 정말 맛있었습니다. 소주랑 잘 어울려요.', '해물파전 맛집', 'haemulpajeon1.jpg', '2023-04-25 17:30:00', 10, '공개', 'user15', 5),
   ('갈비탕이 아주 부드럽고 맛있었습니다. 감동이었어요.', '갈비탕 추천', 'galbitang1.jpg', '2023-04-26 12:30:00', 10, '공개', 'user06', 6),
   ('치즈돈까스가 정말 맛있었습니다. 치즈가 풍성해요.', '치즈돈까스 맛집', 'cheesedonkatsu1.jpg', '2023-04-27 13:00:00', 7, '공개', 'user07', 7),
   ('짬뽕이 아주 맛있었습니다. 매콤한맛이 좋았어요!', '짬뽕 추천', 'jjamppong1.jpg', '2023-04-28 19:00:00', 6, '공개', 'user18', 8),
   ('불고기가 정말 맛있었습니다. 소고기가 부드러워요.', '불고기 맛집', 'bulgogi1.jpg', '2023-04-29 18:30:00', 5, '공개', 'user19', 9),
   ('크림파스타가 아주 맛있었습니다. 크림이 부드러워요.', '크림파스타 추천', 'creampasta1.jpg', '2023-04-30 14:00:00', 7, '공개', 'user20', 10),
   ('햄버거가 아주 맛있었습니다. 다음에 또 오고 싶어요.', '햄버거 최고!', 'hamburger1.jpg', '2023-04-01 14:30:00', 10, '공개', 'user13', 7),
   ('닭갈비가 아주 맛있어요. 양념도 좋고 고기도 신선해요.', '닭갈비 맛집', 'dakgalbi2.jpg', '2023-04-02 16:45:00', 8, '공개', 'user05', 2),
   ('탕수육이 바삭바삭하고 소스도 달지 않아서 좋아요.', '최고의 탕수육', 'tangsuyuk3.jpg', '2023-04-03 18:00:00', 10, '공개', 'user20', 1),
   ('쌀국수가 시원하고 맛있어요. 국물이 정말 좋아요.', '쌀국수 맛집', 'pho4.jpg', '2023-04-04 12:15:00', 9, '공개', 'user07', 4),
   ('빵이 정말 부드럽고 맛있어요. 다양한 종류의 빵이 있어요.', '빵의 천국', 'bread5.jpg', '2023-04-05 10:30:00', 8, '공개', 'user12', 5),
   ('초밥이 신선하고 맛있어요. 회도 부드럽고 좋아요.', '초밥 천국', 'sushi6.jpg', '2023-04-06 20:45:00', 10, '공개', 'user19', 6),
   ('족발이 부드럽고 맛있어요. 소스도 좋아요.', '족발의 세계', 'jokbal7.jpg', '2023-04-07 18:30:00', 6, '공개', 'user01', 7),
   ('치킨이 바삭바삭하고 맛있어요. 소스도 좋아요.', '치킨의 정석', 'chicken8.jpg', '2023-04-08 19:15:00', 5, '공개', 'user16', 8),
   ('돈까스가 바삭하고 맛있어요. 소스도 좋아요.', '돈까스의 정석', 'donkatsu9.jpg', '2023-04-09 13:00:00', 10, '공개', 'user02', 9),
   ('파스타가 맛있어요. 다양한 종류의 파스타가 있어요.', '파스타 천국', 'pasta10.jpg', '2023-04-10 14:30:00', 10, '공개', 'user17', 10),
   ('햄버거가 아주 맛있었습니다. 다음에 또 오고 싶어요.', '햄버거 최고!', 'hamburger11.jpg', '2023-04-11 15:45:00', 8, '공개', 'user09', 1),
   ('닭갈비가 아주 맛있어요. 양념도 좋고 고기도 신선해요.', '닭갈비 맛집', 'dakgalbi12.jpg', '2023-04-12 16:15:00', 8, '공개', 'user14', 2),
   ('탕수육이 바삭바삭하고 소스도 달지 않아서 좋아요.', '최고의 탕수육', 'tangsuyuk13.jpg', '2023-04-13 17:30:00', 10, '공개', 'user11', 3),
   ('쌀국수가 시원하고 맛있어요. 국물이 정말 좋아요.', '쌀국수 맛집', 'pho14.jpg', '2023-04-14 12:45:00', 5, '공개', 'user18', 4),
   ('빵이 정말 부드럽고 맛있어요. 다양한 종류의 빵이 있어요.', '빵의 천국', 'bread15.jpg', '2023-04-15 10:00:00', 8, '공개', 'user03', 5),
   ('초밥이 신선하고 맛있어요. 회도 부드럽고 좋아요.', '초밥 천국', 'sushi16.jpg', '2023-04-16 21:15:00', 10, '공개', 'user06', 6),
   ('족발이 부드럽고 맛있어요. 소스도 좋아요.', '족발의 세계', 'jokbal17.jpg', '2023-04-17 18:45:00', 10, '공개', 'user08', 7),
   ('치킨이 바삭바삭하고 맛있어요. 소스도 좋아요.', '치킨의 정석', 'chicken18.jpg', '2023-04-18 19:00:00', 10, '공개', 'user15', 8),
   ('돈까스가 바삭하고 맛있어요. 소스도 좋아요.', '돈까스의 정석', 'donkatsu19.jpg', '2023-04-19 13:15:00', 8, '공개', 'user10', 9),
   ('파스타가 맛있어요. 다양한 종류의 파스타가 있어요.', '파스타 천국', 'pasta20.jpg', '2023-04-20 14:45:00', 10, '공개', 'user04', 10),
   ('피자가 얇고 바삭하면서도 맛있어요. 다양한 토핑이 있어요.', '피자 맛집', 'pizza21.jpg', '2023-04-21 15:30:00', 8, '공개', 'user05', 1),
   ('라멘이 진하고 맛있어요. 면도 쫄깃하고 좋아요.', '라멘 천국', 'ramen22.jpg', '2023-04-22 16:00:00', 10, '공개', 'user07', 2),
   ('떡볶이가 매콤하고 맛있어요. 고기도 많아서 좋아요.', '떡볶이 맛집', 'tteokbokki23.jpg', '2023-04-23 17:15:00', 8, '공개', 'user12', 3),
   ('갈비가 부드럽고 맛있어요. 소스도 좋아요.', '갈비 천국', 'galbi24.jpg', '2023-04-24 18:30:00', 9, '공개', 'user10', 4),
   ('김밥이 신선하고 맛있어요. 다양한 종류의 김밥이 있어요.', '김밥 맛집', 'kimbap25.jpg', '2023-04-25 12:00:00', 8, '공개', 'user15', 5),
   ('비빔밥이 고소하고 맛있어요. 야채도 신선해요.', '비빔밥의 정석', 'bibimbap26.jpg', '2023-04-26 13:45:00', 10, '공개', 'user03', 6),
   ('된장찌개가 진하고 맛있어요. 밥도 맛있고 좋아요.', '된장찌개 맛집', 'doenjangjjigae27.jpg', '2023-04-27 14:30:00', 7, '공개', 'user08', 7),
   ('갈비탕이 진하고 맛있어요. 고기도 부드럽고 좋아요.', '갈비탕 천국', 'galbitang28.jpg', '2023-04-28 15:15:00', 10, '공개', 'user11', 8),
   ('냉면이 시원하고 맛있어요. 면도 쫄깃하고 좋아요.', '냉면 맛집', 'naengmyeon29.jpg', '2023-04-29 16:00:00', 8, '공개', 'user06', 9),
   ('칼국수가 시원하고 맛있어요. 면도 쫄깃하고 좋아요.', '칼국수 천국', 'kalguksu30.jpg', '2023-04-30 17:30:00', 10, '공개', 'user14', 2),
   ('샐러드가 다양하고 맛있어요. 드레싱도 좋아요.', '샐러드 맛집', 'salad31.jpg', '2023-05-01 12:15:00', 8, '공개', 'user01', 1),
   ('볶음밥이 고소하고 맛있어요. 야채도 신선해요.', '볶음밥의 정석', 'friedrice32.jpg', '2023-05-02 13:45:00', 10, '공개', 'user09', 2),
   ('떡국이 시원하고 맛있어요. 떡도 쫄깃하고 좋아요.', '떡국 맛집', 'tteokguk33.jpg', '2023-05-03 14:30:00', 9, '공개', 'user16', 3),
   ('오므라이스가 부드럽고 맛있어요. 소스도 좋아요.', '오므라이스 천국', 'omurice34.jpg', '2023-05-04 15:15:00', 9, '공개', 'user19', 4),
   ('스테이크가 부드럽고 맛있어요. 소스도 좋아요.', '스테이크의 정석', 'steak35.jpg', '2023-05-05 16:00:00', 9, '공개', 'user05', 5),
   ('샌드위치가 다양하고 맛있어요. 빵도 신선해요.', '샌드위치 맛집', 'sandwich36.jpg', '2023-05-06 17:30:00', 9, '공개', 'user13', 6),
   ('치즈돈까스가 바삭하고 맛있어요. 소스도 좋아요.', '치즈돈까스 천국', 'cheesedonkatsu37.jpg', '2023-05-07 12:15:00', 8, '공개', 'user07', 7),
   ('라떼가 부드럽고 맛있어요. 커피도 좋아요.', '라떼의 정석', 'latte38.jpg', '2023-05-08 13:45:00', 10, '공개', 'user20', 8),
   ('케이크가 부드럽고 맛있어요. 다양한 종류의 케이크가 있어요.', '케이크 맛집', 'cake39.jpg', '2023-05-09 14:30:00', 8, '공개', 'user02', 9),
   ('찹쌀떡이 쫄깃하고 맛있어요. 다양한 종류의 찹쌀떡이 있어요.', '찹쌀떡 천국', 'chapssalddeok40.jpg', '2023-05-10 15:15:00', 10, '공개', 'user04', 10);
INSERT INTO grades (user_grade, grade_low, grade_high)
VALUES
    ('브론즈', 0, 499),
    ('실버', 500, 1499),
    ('골드', 1500, 2999),
    ('플래티넘', 3000, 5999),
    ('다이아', 6000, 9999);

INSERT INTO reports (
    report_store_id, report_user_id, report_content, review_num, user_id, chap_num, store_num
) VALUES
      (NULL, 'user01', '리뷰1에 대한 신고입니다.', 1, NULL, NULL, NULL),
      (NULL, 'user02', '유저 신고1입니다.', NULL, 'user04', NULL, NULL),
      (NULL, 'user03', '챱스토리1에 대한 신고입니다.', NULL, NULL, 1, NULL),
      (NULL, 'user04', '가게1에 대한 신고입니다.', NULL, NULL, NULL, 1),
      ('store001', NULL, '리뷰2에 대한 신고입니다.', 2, NULL, NULL, NULL),
      ('store002', NULL, '유저 신고2입니다.', NULL, 'user05', NULL, NULL),
      ('store003', NULL, '챱스토리2에 대한 신고입니다.', NULL, NULL, 2, NULL),
      ('store004', NULL, '가게2에 대한 신고입니다.', NULL, NULL, NULL, 2);

#웨이팅 관련 더미데이터
INSERT INTO storeswaiting VALUES (1, '18:00:00', 50, true, 15, 'https://store1.com', 1);
INSERT INTO storeswaiting VALUES (2, '19:00:00', 40, true, 20, 'https://store2.com', 2);
INSERT INTO storeswaiting VALUES (3, '17:30:00', 60, true, 10, 'https://store3.com', 3);
INSERT INTO storeswaiting VALUES (4, '20:00:00', 30, true, 30, 'https://store4.com', 4);
INSERT INTO storeswaiting VALUES (5, '18:30:00', 45, true, 25, 'https://store5.com', 5);

INSERT INTO userswaiting (user_people, wait_num, waiting_date, start_time, end_time, enter_status, user_id, store_num) VALUES (3, 1, '2023-04-20', '17:30:00', NULL, '대기', 'user01', 1);
INSERT INTO userswaiting (user_people, wait_num, waiting_date, start_time, end_time, enter_status, user_id, store_num) VALUES (4, 2, '2023-04-21', '18:00:00', NULL, '대기', 'user02', 2);
INSERT INTO userswaiting (user_people, wait_num, waiting_date, start_time, end_time, enter_status, user_id, store_num) VALUES (5, 3, '2023-04-22', '17:45:00', NULL, '대기', 'user03', 3);
INSERT INTO userswaiting (user_people, wait_num, waiting_date, start_time, end_time, enter_status, user_id, store_num) VALUES (2, 4, '2023-04-23', '19:30:00', NULL, '대기', 'user04', 4);
INSERT INTO userswaiting (user_people, wait_num, waiting_date, start_time, end_time, enter_status, user_id, store_num) VALUES (3, 5, '2023-04-24', '18:15:00', NULL, '대기', 'user05', 5);

INSERT INTO visited_store_lists VALUES (1, '2023-04-10', 'user01', '맛있는 햄버거집', '서울시 강남구 역삼동 123-45');
INSERT INTO visited_store_lists VALUES (2, '2023-04-11', 'user02', '닭갈비 전문점', '서울시 강남구 역삼동 234-56');
INSERT INTO visited_store_lists VALUES (3, '2023-04-12', 'user03', '탕수육명가', '서울시 강남구 역삼동 345-67');
INSERT INTO visited_store_lists VALUES (4, '2023-04-13', 'user04', '쌀국수 파라다이스', '서울시 강남구 역삼동 456-78');
INSERT INTO visited_store_lists VALUES (5, '2023-04-14', 'user05', '빵 맛집', '서울시 강남구 역삼동 567-89');

INSERT INTO breaktimes (rest_start_time, rest_end_time, store_num) VALUES
    ('2023-04-15 12:30:00', '2023-04-15 13:30:00', 1),
    ('2023-04-15 15:00:00', '2023-04-15 15:30:00', 1),
    ('2023-04-15 14:00:00', '2023-04-15 14:30:00', 2),
    ('2023-04-15 18:00:00', '2023-04-15 18:30:00', 2),
    ('2023-04-15 16:00:00', '2023-04-15 16:30:00', 3),
    ('2023-04-15 12:00:00', '2023-04-15 12:30:00', 4),
    ('2023-04-15 13:30:00', '2023-04-15 14:00:00', 4),
    ('2023-04-15 17:00:00', '2023-04-15 17:30:00', 5),
    ('2023-04-15 11:30:00', '2023-04-15 12:00:00', 5),
    ('2023-04-15 14:30:00', '2023-04-15 15:00:00', 6);

INSERT INTO menu_manages (name, img, price, info, menu_type, status, store_num) VALUES
    ('불고기햄버거', 'https://example.com/burger.jpg', 7000, '맛있는 햄버거', '대표메뉴', true, 1),
    ('치즈버거', NULL, 8000, '치즈가 듬뿍 들어간 햄버거', '일반메뉴', true, 1),
    ('감자튀김', NULL, 5000, '바삭한 감자튀김', '일반메뉴', true, 1),
    ('매운닭갈비', 'https://example.com/dakgalbi.jpg', 15000, '매콤한 닭갈비', '대표메뉴', true, 2),
    ('치즈닭갈비', NULL, 17000, '치즈를 뿌린 닭갈비', '일반메뉴', true, 2),
    ('불고기', NULL, 15000, '맛있는 불고기', '일반메뉴', true, 2),
    ('찹쌀탕수육', 'https://example.com/tangsuyuk.jpg', 12000, '바삭한 탕수육', '대표메뉴', true, 3),
    ('잡채', NULL, 10000, '고기와 채소가 들어간 잡채', '일반메뉴', true, 3),
    ('울면', NULL, 9000, '매콤한 울면', '일반메뉴', true, 3),
    ('베트남쌀국수', 'https://example.com/pho.jpg', 8000, '시원한 쌀국수', '대표메뉴', true, 4),
    ('불고기쌀국수', NULL, 10000, '불고기와 쌀국수의 환상조합', '일반메뉴', true, 4),
    ('야채쌀국수', NULL, 8000, '시원한 야채쌀국수', '일반메뉴', true, 4),
    ('바게트', 'https://example.com/bread.jpg', 3000, '부드러운 빵', '대표메뉴', true, 5),
    ('크로와상', NULL, 3500, '버터향 가득한 크로와상', '일반메뉴', true, 5),
    ('마카롱', NULL, 2000, '색다른 마카롱', '일반메뉴', true, 5),
    ('초밥', 'https://example.com/sushi.jpg', 20000, '신선한 초밥', '대표메뉴', true, 6),
    ('족발', 'https://example.com/jokbal.jpg', 18000, '맛있는 족발', '대표메뉴', true, 7),
    ('치킨', 'https://example.com/chicken.jpg', 16000, '바삭한 치킨', '대표메뉴', true, 8),
    ('돈까스', 'https://example.com/porkcutlet.jpg', 9000, '고소한 돈까스', '대표메뉴', true, 9),
    ('파스타', 'https://example.com/pasta.jpg', 13000, '크리미한 파스타', '대표메뉴', true, 10);

INSERT INTO jjim_manages (jj_status, user_id, store_num) VALUES
     ('공개', 'user01', 1),
     ('비공개', 'user01', 2),
     ('공개', 'user02', 3),
     ('공개', 'user02', 4),
     ('비공개', 'user03', 5),
     ('공개', 'user04', 6),
     ('비공개', 'user04', 7),
     ('공개', 'user05', 8),
     ('비공개', 'user05', 9),
     ('공개', 'user06', 10);

INSERT INTO recommend_stores (comment, user_id, store_num) VALUES
   ('훌륭한 햄버거!', 'user01', 1),
   ('맛있는 닭갈비집!', 'user01', 2),
   ('최고의 탕수육!', 'user01', 3),
   ('맛있는 쌀국수!', 'user02', 4),
   ('신선한 초밥!', 'user02', 6),
   ('맛있는 치킨집!', 'user02', 8),
   ('부드러운 빵이 좋아요', 'user03', 5),
   ('맛있는 돈까스집!', 'user03', 9),
   ('커리가 맛있는 파스타집!', 'user03', 10),
   ('족발이 정말 맛있어요!', 'user04', 7);

INSERT INTO reviewlikes (rl_status, user_id, review_num) VALUES
    ('LIKE', 'user01', 1),
    ('LIKE', 'user02', 2),
    ('BAD', 'user03', 3),
    ('LIKE', 'user04', 4),
    ('BAD', 'user05', 5),
    ('LIKE', 'user01', 6),
    ('BAD', 'user02', 7),
    ('LIKE', 'user03', 8),
    ('BAD', 'user04', 9),
    ('LIKE', 'user05', 10);

INSERT INTO holidays (store_num, week, date, regular) VALUES
  (1, '월', NULL, true),
  (2, '월', NULL, true),
  (3, '화', NULL, true),
  (4, '수', NULL, true),
  (5, '목', NULL, true),
  (6, NULL, '2023-05-01', false),
  (7, NULL, '2023-05-02', false),
  (8, NULL, '2023-05-03', false),
  (9, NULL, '2023-05-04', false),
  (10, NULL, '2023-05-05', false);

INSERT INTO points (point_date, point_plus, point_reason, user_id) VALUES
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user01'),
   ('2023-04-02', 300, '이벤트 참여 포인트', 'user01'),
   ('2023-04-03', 200, '리뷰 작성 포인트', 'user01'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user02'),
   ('2023-04-04', 100, '추천가게 등록 포인트', 'user02'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user03'),
   ('2023-04-05', 150, '친구 추천 포인트', 'user03'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user04'),
   ('2023-04-06', 200, '리뷰 작성 포인트', 'user04'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user05'),
   ('2023-04-07', 300, '이벤트 참여 포인트', 'user05'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user06'),
   ('2023-04-08', 100, '추천가게 등록 포인트', 'user06'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user07'),
   ('2023-04-09', 150, '친구 추천 포인트', 'user07'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user08'),
   ('2023-04-10', 200, '리뷰 작성 포인트', 'user08'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user09'),
   ('2023-04-11', 300, '이벤트 참여 포인트', 'user09'),
   ('2023-04-01', 500, '회원가입 축하 포인트', 'user10'),
   ('2023-04-12', 100, '추천가게 등록 포인트', 'user10');

INSERT INTO userstatus (user_id, status)
VALUES
    ('user16', '휴면'),
    ('user15', '탈퇴');

INSERT INTO review_replies (review_num, post_date, content)
VALUES
    (1, '2023-04-01', '감사합니다. 더욱 노력하겠습니다!'),
    (2, '2023-04-02', '좋은 평가 감사드립니다!'),
    (3, '2023-04-03', '다음에 또 방문해 주세요!'),
    (4, '2023-04-04', '고객님의 의견 반영하겠습니다.'),
    (5, '2023-04-05', '소중한 리뷰 감사합니다.'),
    (6, '2023-04-06', '늘 최선을 다하겠습니다.'),
    (7, '2023-04-07', '방문해 주셔서 감사합니다.'),
    (8, '2023-04-08', '기회가 된다면 다시 찾아주세요!'),
    (9, '2023-04-09', '맛있게 드셨다니 기쁩니다.'),
    (10, '2023-04-10', '좋은 리뷰 감사드립니다!');

INSERT INTO store_imgs (store_num, store_img) VALUES
    (1, '/images/storeImg/store1_img1.jpg'),
    (1, '/images/storeImg/store1_img2.jpg'),
    (1, '/images/storeImg/store1_img3.jpg'),
    (2, '/images/storeImg/store2_img1.jpg'),
    (3, '/images/storeImg/store3_img1.jpg'),
    (4, '/images/storeImg/store4_img1.jpg'),
    (4, '/images/storeImg/store4_img2.jpg'),
    (5, '/images/storeImg/store5_img1.jpg'),
    (6, '/images/storeImg/store6_img1.jpg'),
    (7, '/images/storeImg/store7_img1.jpg'),
    (8, '/images/storeImg/store8_img1.jpg');

INSERT INTO chapstoryimgs (chap_num, img) VALUES
    (1, '/images/chapstoryimg/chapstory1-1.jpg'),
    (1, '/images/chapstoryimg/chapstory1-2.jpg'),
    (1, '/images/chapstoryimg/chapstory1-3.jpg'),
    (2, '/images/chapstoryimg/chapstory2-1.jpg'),
    (2, '/images/chapstoryimg/chapstory2-2.jpg'),
    (3, '/images/chapstoryimg/chapstory3-1.jpg'),
    (3, '/images/chapstoryimg/chapstory3-2.jpg'),
    (4, '/images/chapstoryimg/chapstory4-1.jpg'),
    (4, '/images/chapstoryimg/chapstory4-2.jpg'),
    (5, '/images/chapstoryimg/chapstory5-1.jpg');

INSERT INTO chap_deals (store_num, event_title, event_condition, event_reward, event_img, event_start, event_end) VALUES
  (1, '해피 아워 할인', '오후 5시부터 오후 7시 방문', '음료 50% 할인', 'event2.jpg', '2023-04-16', '2023-04-25'),
  (2, '주말 브런치 이벤트', '주말 브런치 메뉴 주문 시 커피 무료', '커피 1잔 무료', 'event9.jpg', '2023-04-30', '2023-05-15'),
  (3, '데이트 코스 할인', '데이트 코스 메뉴 주문 시 와인 무료', '와인 1병 무료', 'event10.jpg', '2023-05-01', '2023-05-20'),
  (4, '샐러드 데이 이벤트', '샐러드 구매 시 음료 무료', '음료수 1잔 무료', 'event8.jpg', '2023-04-28', '2023-05-07'),
  (5, '베이커리 세일', '빵 구매 시 커피 무료', '커피 1잔 무료', 'event3.jpg', '2023-04-20', '2023-05-05'),
  (5, '한정 메뉴 할인', '한정 메뉴 주문 시 디저트 무료', '디저트 1개 무료', 'event7.jpg', '2023-04-26', '2023-05-12'),
  (6, '스시 특별 할인', '2인분 주문 시 1인분 무료', '스시 1인분 무료', 'event1.jpg', '2023-04-15', '2023-04-30'),
  (8, '치킨 가족 할인', '4인분 주문 시 1인분 무료', '치킨 1인분 무료', 'event4.jpg', '2023-04-18', '2023-04-28'),
  (10, '피자 콤보 할인', '피자와 사이드메뉴 함께 주문', '음료수 무료', 'event5.jpg', '2023-04-22', '2023-05-02'),
  (10, '파스타 및 와인 이벤트', '파스타 2인분 주문 시 와인 1병 무료', '와인 1병 무료', 'event6.jpg', '2023-04-24', '2023-05-09');
