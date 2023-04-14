DROP DATABASE CHAPCHAP;
CREATE DATABASE CHAPCHAP;

use CHAPCHAP;

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
    coment     VARCHAR(255)                       NULL COMMENT '한줄평',
    img        VARCHAR(255)                       NULL COMMENT '가게 메뉴사진',
    date       DATETIME                           NOT NULL COMMENT '날짜',
    star       INT                                NOT NULL COMMENT '별점',
    r_rstatus  enum ('공개', '심사', '비공개')           NOT NULL COMMENT '신고상태',
    user_id    VARCHAR(255)                       NOT NULL COMMENT '유저아이디',
    store_num  INT                                NOT NULL COMMENT '가게 고유번호'
);

CREATE TABLE grades
(
    user_grade VARCHAR(255) NOT NULL COMMENT '유저등급',
    grade_low  INT          NOT NULL COMMENT 'low범위',
    grade_high INT          NOT NULL COMMENT 'high범위'
);

CREATE TABLE reports
(
    report_num      int auto_increment primary key NOT NULL COMMENT '신고번호',
    report_store_id VARCHAR(255)                   NULL COMMENT '신고한 사장님 아이디',
    report_content  VARCHAR(255)                   NULL COMMENT '신고내용',
    report_user_id  VARCHAR(255)                   NULL COMMENT '신고한 유저 아이디',
    review_num      INT(10)                        NULL COMMENT '리뷰 고유번호',
    user_id         VARCHAR(255)                   NULL COMMENT '신고당한 유저 아이디',
    chap_num        INT                            NULL COMMENT '챱스토리 번호',
    store_num       INT                            NULL COMMENT '가게 고유번호'
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
    chs_rstatus ENUM ('공개', '심사', '비공개')       NOT NULL COMMENT '신고상태'
);

CREATE TABLE visited_store_lists
(
    visited_store_order INT          NOT NULL COMMENT '다녀온 가게 번호',
    visited_date        DATE         NOT NULL COMMENT '다녀온 날짜(웨이팅한 날짜)',
    user_nickname       VARCHAR(255) NOT NULL COMMENT '유저 닉네임',
    store_name          VARCHAR(255) NOT NULL COMMENT '가게 이름',
    address             VARCHAR(255) NOT NULL COMMENT '가게 주소'
);

CREATE TABLE recommend_stores
(
    recommend_store_num INT primary key auto_increment NOT NULL COMMENT '추천가게고유번호',
    comment             VARCHAR(255)                   NULL COMMENT '한줄평',
    user_id             VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    store_num           INT(10)                        NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE store_manages
(
    store_id     VARCHAR(255) primary key NOT NULL COMMENT '사장아이디',
    pw           VARCHAR(255)             NOT NULL COMMENT '사장비밀번호',
    business_num VARCHAR(255)             NOT NULL COMMENT '사업자번호',
    store_call   VARCHAR(255)             NOT NULL COMMENT '가게전화번호',
    phone        VARCHAR(255)             NOT NULL COMMENT '사장전화번호',
    email        VARCHAR(255)             NOT NULL COMMENT '사장이메일',
    store_num    INT                      NULL COMMENT '가게고유번호'
);

CREATE TABLE menu_manages
(
    menu_num  INT primary key auto_increment      NOT NULL COMMENT '메뉴번호',
    name      VARCHAR(255)                        NOT NULL COMMENT '메뉴이름',
    img       VARCHAR(255)                        NULL COMMENT '메뉴사진',
    price     INT                                 NOT NULL COMMENT '메뉴가격',
    info      VARCHAR(255)                        NULL COMMENT '메뉴설명',
    menu_type ENUM ('대표메뉴', '신메뉴', '이벤트', '일반메뉴') NOT NULL COMMENT '메뉴종류',
    status    BOOLEAN                             NOT NULL COMMENT '메뉴상태',
    store_num INT                                 NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE jjim_manages
(
    jjim_num  int primary key auto_increment NOT NULL COMMENT '즐겨찾기 번호',
    jj_status ENUM ('공개', '비공개')             NOT NULL COMMENT '공개여부',
    user_id   VARCHAR(255)                   NOT NULL COMMENT '유저아이디',
    store_num INT(10)                        NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE reviewlikes
(
    rl_id      INT primary key      NOT NULL COMMENT '좋아요 아이디',
    rl_status  ENUM ('LIKE', 'BAD') NOT NULL COMMENT '좋아요 싫어요',
    user_id    VARCHAR(255)         NOT NULL COMMENT '유저 아이디',
    review_num INT(10)              NOT NULL COMMENT '리뷰 고유번호'
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
    store_num    INT                               NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE storeswaiting
(
    admin_waiting INT primary key                   NOT NULL COMMENT '웨이팅 테이블',
    closing_time  VARCHAR(255)                      NOT NULL COMMENT '웨이팅 마감시간',
    max_people    INT                               NOT NULL COMMENT '웨이팅 최대 인원수',
    waiting_onoff BOOLEAN                           NOT NULL COMMENT '웨이팅 on/off',
    time_setup    INT                               NOT NULL COMMENT '웨이팅 시간 설정',
    enter_cancel  ENUM ('대기', '완료', '유저취소', '사장취소') NOT NULL COMMENT '웨이팅 입장/강제취소',
    store_ads     VARCHAR(255)                      NULL COMMENT '가게홍보 url',
    store_num     INT                               NOT NULL COMMENT '가게 고유번호'
);

CREATE TABLE stores
(
    store_num         INT primary key auto_increment NOT NULL COMMENT '가게고유번호',
    store_name        VARCHAR(255)                   NOT NULL COMMENT '가게이름',
    detail_info       VARCHAR(255)                   NOT NULL COMMENT '가게디테일설명',
    short_info        VARCHAR(255)                   NOT NULL COMMENT '가게한줄설명',
    madein            VARCHAR(255)                   NOT NULL COMMENT '원산지표시',
    address           VARCHAR(255)                   NOT NULL COMMENT '가게주소',
    opentime          VARCHAR(255)                   NOT NULL COMMENT '영업시간',
    lastorder         VARCHAR(255)                   NULL COMMENT '라스트오더',
    waiting_closetime VARCHAR(255)                   NULL COMMENT '웨이팅마감시간',
    blogurl           VARCHAR(255)                   NULL COMMENT '블로그url',
    youtubeurl        VARCHAR(255)                   NULL COMMENT '유튜브url',
    facebookurl       VARCHAR(255)                   NULL COMMENT '페북url',
    instaurl          VARCHAR(255)                   NULL COMMENT '인스타url',
    s_rstatus         ENUM ('공개','심사','비공개')         NOT NULL COMMENT '신고상태',
    parking           BOOLEAN                        NOT NULL COMMENT '주차장',
    wifi              BOOLEAN                        NOT NULL COMMENT '와이파이',
    toilet            ENUM ('없음','구분','공용')          NOT NULL COMMENT '화장실구분',
    smokingroom       BOOLEAN                        NOT NULL COMMENT '흡연실',
    babychair         BOOLEAN                        NOT NULL COMMENT '애기의자'
);

CREATE TABLE medias
(
    tv_num    INT primary key auto_increment NOT NULL COMMENT '방송출연정보고유번호',
    channal   VARCHAR(255)                   NULL COMMENT '채널명',
    episode   INT                            NULL COMMENT '회차',
    tv_url    VARCHAR(255)                   NULL COMMENT 'tv프로url',
    tv_date   DATE                           NULL COMMENT '방송날짜',
    store_num INT                            NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE storetypes
(
    type_id      VARCHAR(255) primary key auto_increment NOT NULL COMMENT '업종id',
    store_num    INT                      NOT NULL COMMENT '가게고유번호',
    category_num INT                      NOT NULL COMMENT '업종카테고리'
);

CREATE TABLE type_classes
(
    category_num  INT                    NOT NULL COMMENT '업종카테고리',
    main_category ENUM ('음식점','카페','술집') NOT NULL COMMENT '대분류',
    sub_category  VARCHAR(255)           NOT NULL COMMENT '소분류'
);

CREATE TABLE breaktimes
(
    rest_num        INT primary key auto_increment NOT NULL COMMENT '휴식시간',
    rest_start_time DATETIME                       NULL COMMENT '휴식시작시간',
    test_end_time   DATETIME                       NULL COMMENT '휴식 끝시간',
    store_num       INT                            NOT NULL COMMENT '가게고유번호'
);

CREATE TABLE holidays
(
    num       int unsigned primary key auto_increment NOT NULL COMMENT '휴일번호',
    store_num INT                                     NOT NULL COMMENT '가게고유번호',
    week      ENUM ('0','1','2','3','4','5','6')      NULL COMMENT '요일',
    date      DATE                                    NULL COMMENT '일',
    reqular   BOOLEAN                                 NULL COMMENT '정규/비정규'
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
    event_end       DATE                           NULL COMMENT '이벤트 끝나는기간'
);

CREATE TABLE points
(
    point_num    INT primary key auto_increment NOT NULL,
    point_date   DATE                           NULL,
    point_plus   INT                            NULL,
    point_reason VARCHAR(255)                   NULL,
    user_id      VARCHAR(255)                   NOT NULL
);

CREATE TABLE chapstoryimgs
(
    chs_num  INT UNSIGNED primary key auto_increment NOT NULL COMMENT '챱스토리 고유번호',
    chap_num INT                                     NOT NULL COMMENT '챱스토리 번호',
    img      VARCHAR(255)                            NOT NULL COMMENT '이미지 경로(path)'
);

CREATE TABLE userstatus
(
    user_id VARCHAR(255) primary key NOT NULL COMMENT '유저아이디',
    status  ENUM ('활동','휴면','탈퇴')    NOT NULL COMMENT '활동,휴면,탈퇴'
);

CREATE TABLE review_replies
(
    rr_num     INT primary key auto_increment NOT NULL COMMENT '리뷰에 사장님의 대댓글',
    review_num INT(10)                        NOT NULL COMMENT '리뷰 고유번호',
    post_date  date                           NOT NULL COMMENT '작성 날짜',
    content    VARCHAR(255)                   NOT NULL COMMENT '작성 내용'
);

CREATE TABLE store_imgs
(
    store_num INT primary key NOT NULL COMMENT '가게고유번호',
    store_img VARCHAR(255)    NULL COMMENT '가게사진'
);

ALTER TABLE menu_manages
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE jjim_manages
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE reviewlikes
    ADD FOREIGN KEY (review_num) REFERENCES reviews (review_num);

ALTER TABLE userswaiting
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE storeswaiting
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE medias
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE storetypes
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE breaktimes
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE holidays
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE chap_deals
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE points
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE chapstoryimgs
    ADD FOREIGN KEY (chap_num) REFERENCES chapstorys (chap_num);

ALTER TABLE userstatus
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE review_replies
    ADD FOREIGN KEY (review_num) REFERENCES reviews (review_num);

ALTER TABLE store_imgs
    ADD FOREIGN KEY (store_num) REFERENCES stores (store_num);

ALTER TABLE jjim_manages
    ADD UNIQUE (user_id, store_num);

ALTER TABLE recommend_stores
    ADD UNIQUE (user_id, store_num);