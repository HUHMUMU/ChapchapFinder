const infoService=require("../../model/service/InfoService");
const chapdealService = require("../../model/service/ChapdealService");

describe("InfoService test",()=> {

    //가게
    test("findAllStoreInfo", async () => { //모든 가게 정보 조회
        const infoList = await infoService.findAllStoreInfo();
        console.log(JSON.stringify(infoList));
    });

    test("findByStore", async () => { //가게 정보 조회
        const store = await infoService.findByStore(1);
        console.log(store)
    });

    test("insertStoreInfo", async () => { //가게 정보 등록
        const store =
            {
                store_num: "11",
                store_name: "재연쓰의손마맛",
                main_img: "logo.png",
                detail_info: "강렬한 손맛",
                short_info: "짠맛인건가",
                madein: "미영이",
                address: "재연쓰의집",
                opentime: "10:00 - 22:00",
                lastorder: "21:30",
                waiting_closetime: "01:00",
                blogurl: null,
                youtubeurl: null,
                facebookurl: null,
                instaurl: null,
                s_rstatus: "공개",
                parking: 1,
                wifi: 1,
                toilet: 1,
                smokingroom: 1,
                babychair: 1
            };
        let insert = 0;
        try {
            insert = await infoService.insertStoreInfo(store);
            console.log("등록 : " + insert);
        } catch (e) {
            console.error(e)
        }
    });

    // test("insertStoreInfo",async()=>{
    //     const store=await infoService.insertStoreInfoo("1","룰루랄라","강렬한 손맛","짠맛인건가","미영이","재연쓰의 집", "10:00 - 22:00", "21:30", "01:00", "ㄴㄴ", "ㄴㄴ", "ㄴㄴ", "ㄴㄴ", "공개", "ㄴㅇㄹ","공개","1","1","1","1","1")
    //     console.log(store)
    // })

    test("updateByStoreInfo", async () => { //가게 정보 수정
        const store = {
            store_num: "1",
            store_name: "재연쓰의 손맛",
            main_img: "1.png",
            detail_info: "그냥그냥한 손맛",
            short_info: "단맛인건가",
            madein: "방실쓰",
            address: "승호쓰의집",
            opentime: "10:00 - 20:00",
            lastorder: "21:00",
            waiting_closetime: "00:00",
            blogurl: null,
            youtubeurl: null,
            facebookurl: null,
            instaurl: null,
            s_rstatus: "비공개",
            parking: 1,
            wifi: 1,
            toilet: 1,
            smokingroom: 1,
            babychair: 1
        };
        try {
            let update = await infoService.updateByStoreInfo(store);
            let resultUser = await infoService.findByStore(11);
            console.log("수정 : " + JSON.stringify(resultUser));
            // delete store.store_name;
            // delete store.detail_info;
            // delete store.short_info;
            // delete store.madein;
            // delete store.address;
            // delete store.opentime;
            // delete store.lastorder;
            // delete store.waiting_closetime;
            // delete store.s_rstatus;
            //
            // expect(update).toBe(1);
            // expect(store).toEqual(expect.objectContaining(resultUser));
        } catch (e) {
            console.error(e);
        }
    });
    test("dropStoreInfo", async () => { // 가게 삭제
        try {
            const holiday = await infoService.dropAllHoliday( 1)
            console.log("삭제 :" + holiday)
        } catch (e) {
            console.error(e)
        }
        try {
            const storeType = await infoService.dropAllStoreTypes( 1)
            console.log("삭제 :" + storeType)
        } catch (e) {
            console.error(e)
        }
        try {
            const breaktime = await infoService.dropAllBreaktime( 1)
            console.log("삭제 :" + breaktime)
        } catch (e) {
            console.error(e)
        }
        try {
            const dropStoreImg = await infoService.dropAllImg(1)
            console.log("삭제 :" + dropStoreImg)
        } catch (e) {
            console.error(e)
        }
        try {
            const dropStoreImg = await infoService.dropAllImg(1)
            console.log("삭제 :" + dropStoreImg)
        } catch (e) {
            console.error(e)
        }
        const store = await infoService.dropStoreInfo(1);
        console.log(store)
    });


    //휴무일
    test("findHolidaysByStore", async () => { // 가게 휴무일 조회
        const holidays = await infoService.findHolidaysByStore(1)
        console.log("조회" + JSON.stringify(holidays));
    })

    test("insertHolidays", async () => { // 가게 휴무일 등록
        const holiday = {
            store_num: "2",
            holi_num: "18",
            week: "일",
            date: "2023-04-01",
            regular: 1
        }
        let insert = 0;
        try {
            insert = await infoService.insertHolidays(holiday);
            console.log("등록 : " + JSON.stringify(insert));
        } catch (e) {
            console.error(e)
        }
    })

    test("updateHolidays", async () => { //가게 휴무일 수정
        const holiday = {
            store_num: "1",
            holi_num: "1",
            week: null,
            date: "2023-05-01",
            regular: 0
        };
        try {
            let update = await infoService.updateHolidays(holiday)
            let resultHoli = await infoService.findHolidaysByStore(1)
            console.log("수정 : " + JSON.stringify(resultHoli));
        } catch (e) {
            console.error(e);
        }
    })

    test("dropHoliday", async () => { // 가게 휴무일 삭제
        try {
            const holiday = await infoService.dropHoliday(11, 2)
            console.log("삭제 :" + holiday)
        } catch (e) {
            console.error(e)
        }
    });


    //가게 업종
    test("findtypeclasses", async () => { // 가게 카테고리 찾기
        try {
            const typeclass = await infoService.findTypeClasses(1)
            console.log(typeclass)
        } catch (e) {
            console.error(e)
        }
    });

    test("insertStoreTypes", async () => { // 가게 이미지 등록 //왜 안되냐
        const cate = {
            storetype_id: "12",
            category_num: "3",
            store_num:"1"
        }
        let insert = 0;
        try {
            insert = await infoService.insertStoreTypes(cate,1);
            console.log("등록 : " + JSON.stringify(insert));
        } catch (e) {
            console.error(e)
        }
    })

    test("insertStoreTypes2",async ()=>{
        const cate={
            storetype_id: "11",
            category_num: "3",
            store_num:"11"
        }
        let insert=0;
        try {
            insert = await infoService.insertStoreTypes2(cate)
            console.log("등록 : " + JSON.stringify(insert));
        } catch (e) {
            console.error(e)

        }})

    test("findStoretypes", async () => { // 가게 카테고리 찾기
        try {
            const findCate = await infoService.findStoreTypes(1)
            console.log("등록 :" + findCate[0].category_num)
            console.log("등록 :" + findCate[1].category_num)

        } catch (e) {
            console.error(e)
        }
    });

    test("updateStoretypes", async () => { //가게 카테고리 수정
        try {
            const updateCate = await infoService.updateStoreTypes(1, 1, 5)
            console.log("수정 : " + JSON.stringify(updateCate));
        } catch (e) {
            console.error(e);
        }
    })

    test("dropStoreTypes", async () => { // 가게 휴무일 삭제
        try {
            const storeType = await infoService.dropStoreTypes(13, 1)
            console.log("삭제 :" + storeType)
        } catch (e) {
            console.error(e)
        }
    });


    //브레이크타임
    test("findBreaktimesByStore", async () => { // 가게 브레이크타임 조회
        const breaktime = await infoService.findBreaktimesByStore(1)
        console.log("조회" + JSON.stringify(breaktime));
    })

    test("insertBreaktime", async () => { // 가게 브레이크타임 등록
        const breaktime = {
            rest_num: "16",
            rest_start_time: "12:30:00",
            rest_end_time: "15:30:00",
            store_num: "21"
        }
        let insert = 0;
        try {
            insert = await infoService.insertBreaktime(breaktime);
            console.log("등록 : " + JSON.stringify(insert));
        } catch (e) {
            console.error(e)
        }
    })

    test("updateBreaktime", async () => { //가게 브레이크타임 수정
        const breaktime = {
            store_num: "1",
            rest_start_time: "18:08:00",
            rest_end_time: "18:38:00",
            rest_num:"1"
        };
        try {
            let update = await infoService.updateBreaktime(breaktime)
            let resultBreaktime = await infoService.findBreaktimesByStore(1)
            console.log("수정 : " + JSON.stringify(resultBreaktime));
        } catch (e) {
            console.error(e);
        }
    })

    test("dropBreaktime", async () => { // 가게 휴무일 삭제
        try {
            const breaktime = await infoService.dropBreaktime(21, 1)
            console.log("삭제 :" + breaktime)
        } catch (e) {
            console.error(e)
        }
    });


    //이미지
    test("findImgByStore", async () => { // 가게 이미지 조회
        const imgs = await infoService.findImg(1)
        console.log("조회" + JSON.stringify(imgs));
    })


    test("insertImg", async () => { // 가게 이미지 등록
        const img = {
            img_num: "26",
            store_img: "/images/storeImg/store1_img4.jpg",
            store_num: "1"
        }
        let insert = 0;
        try {
            insert = await infoService.insertImg(img);
            console.log("등록 : " + JSON.stringify(insert));
        } catch (e) {
            console.error(e)
        }
    })





    test("updateImg", async () => { //가게 이미지 수정 //왜 안되냐
        const img = {
            store_num: "1",
            store_img:"777777jpg",
            img_num:"12"
        };
        try {
            let update = await infoService.updateImg(img)
            let result = await infoService.findImg(1)
            console.log("수정 : " + update);
            console.log("수정 : " + JSON.stringify(result));
        } catch (e) {
            console.error(e);
        }
    })

    test("dropStoreImg", async () => { // 가게 이미지 삭제
        try {
            const dropStoreImg = await infoService.dropImg(1, 1)
            console.log("삭제 :" + dropStoreImg)
        } catch (e) {
            console.error(e)
        }
    });



})