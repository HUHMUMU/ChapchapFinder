const infoService=require("../../model/service/InfoService");

describe("InfoService test",()=>{

    //가게
    test("findAllStoreInfo",async ()=>{ //모든 가게 정보 조회
        const infoList=await infoService.findAllStoreInfo();
        console.log(JSON.stringify(infoList));
    });

    test("findByStore",async ()=>{ //가게 정보 조회
        const store=await infoService.findByStore(1);
        console.log(store)
    });

    test("insertStoreInfo", async ()=>{ //가게 정보 등록
        const store =
            {store_num : "11",
            store_name : "재연쓰의손마맛",
            main_img : "logo.png",
            detail_info : "강렬한 손맛",
            short_info : "짠맛인건가",
            madein : "미영이",
            address : "재연쓰의집",
            opentime : "10:00 - 22:00",
            lastorder : "21:30",
            waiting_closetime : "01:00",
            blogurl : null,
            youtubeurl : null,
            facebookurl : null,
            instaurl : null,
            s_rstatus : "공개",
            parking : 1,
            wifi : 1,
            toilet : 1,
            smokingroom : 1,
            babychair : 1
        };
        let insert=0;
        try {
            insert= await infoService.insertStoreInfo(store);
            console.log("등록 : "+insert);
        }catch (e) {
            console.error(e)
        }
    });

    // test("insertStoreInfo",async()=>{
    //     const store=await infoService.insertStoreInfoo("1","룰루랄라","강렬한 손맛","짠맛인건가","미영이","재연쓰의 집", "10:00 - 22:00", "21:30", "01:00", "ㄴㄴ", "ㄴㄴ", "ㄴㄴ", "ㄴㄴ", "공개", "ㄴㅇㄹ","공개","1","1","1","1","1")
    //     console.log(store)
    // })

    test("updateByStoreInfo",async ()=>{ //가게 정보 수정
        const store = {
            store_num : "11",
            store_name : "재연쓰의 손맛",
            detail_info : "그냥그냥한 손맛",
            short_info : "단맛인건가",
            madein : "방실쓰",
            address : "승호쓰의집",
            opentime : "10:00 - 20:00",
            lastorder : "21:00",
            waiting_closetime : "00:00",
            blogurl : null,
            youtubeurl : null,
            facebookurl : null,
            instaurl : null,
            s_rstatus : "비공개",
            parking : 1,
            wifi : 1,
            toilet : "공용",
            smokingroom : 1,
            babychair : 1
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
        const store = await infoService.dropStoreInfo(11);
        console.log(store)
    });


    //휴무일
    test("findHolidaysByStore", async ()=>{ // 가게 휴무일 조회
        const holidays = await infoService.findHolidaysByStore(1)
        console.log("조회"+ JSON.stringify(holidays));
    })

    test("insertHolidays",async ()=>{ // 가게 휴무일 등록
        const holiday = {
            store_num:"2",
            holi_num:"11",
            week:"일",
            date:null,
            regular:1
        }
        let insert=0;
        try {
            insert= await infoService.insertHolidays(holiday);
            console.log("등록 : "+JSON.stringify(insert));
        }catch (e) {
            console.error(e)
        }
    })

    test("updateHolidays", async () => { //가게 휴무일 수정
        const holiday = {
            store_num:"1",
            holi_num:"1",
            week:null,
            date:"2023-05-01",
            regular:0
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
        try{
            const holiday = await infoService.dropHoliday(11,2)
            console.log("삭제 :" +holiday)
        }catch (e) {
            console.error(e)
        }
    });


    //브레이크타임
    test("findBreaktimesByStore", async ()=>{ // 가게 브레이크타임 조회
        const breaktime = await infoService.findBreaktimesByStore(1)
        console.log("조회"+ JSON.stringify(breaktime));
    })

    test("insertBreaktime",async ()=>{ // 가게 브레이크타임 등록
        const breaktime = {
            store_num:"1",
            rest_num:"21",
            rest_start_time:"17:07:00",
            rest_end_time:"17:37:00"
        }
        let insert=0;
        try {
            insert= await infoService.insertBreaktime(breaktime);
            console.log("등록 : "+JSON.stringify(insert));
        }catch (e) {
            console.error(e)
        }
    })

    test("updateBreaktime", async () => { //가게 브레이크타임 수정
        const breaktime = {
            store_num:"1",
            rest_start_time:"18:08:00",
            rest_end_time:"18:38:00"
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
        try{
            const breaktime = await infoService.dropBreaktime(21,1)
            console.log("삭제 :" +breaktime)
        }catch (e) {
            console.error(e)
        }
    });

})