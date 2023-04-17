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
            {
            store_num : "11",
            store_name : "재연쓰의손맛",
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
            toilet : "공용",
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
            let resultUser = await infoService.findByStore(1);
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

    // 가게 방송출연
    test("findMedias", async ()=>{ // 가게 방송출연 정보 조회
        const medias = await infoService.findMedias(2)
        console.log("조회"+ JSON.stringify(medias));
    })
    test("insertMedias",async ()=>{ // 가게 방송출연 정보 등록
        const medias={
            store_num:"2",
            tv_num:"12",
            channal:"tv",
            episode:"12",
            tv_url:"https://example.com/tv12",
            tv_date:"2023-01-10",
        }
        let insert=0;
        try {
            insert= await infoService.insertMedias(medias);
            console.log("등록 : "+JSON.stringify(insert));
        }catch (e) {
            console.error(e)
        }
    })
    test("updateMedias", async () => { //가게 방송출연 정보 수정
        const medias = {
            store_num: "2",
            tv_num: "12",
            channal: "sss",
            episode: "754",
            tv_url: "https://example.com/tv25",
            tv_date: "2023-01-19",
        };
        try {
            const updateResult2 = await infoService.updateMedias(
                medias.tv_num,
                medias.channal,
                medias.episode,
                medias.tv_url,
                medias.tv_date,
                medias.store_num
            );
            let updateResult = await infoService.findByStore(1);
            console.log("수정" + JSON.stringify(updateResult2));
        } catch (e) {
            console.error(e);
        }
    });

    test("dropMedias", async () => { // 가게 방송출연 정보 삭제
        try{
            const media = await infoService.dropMedias(2,12);
            console.log("삭제 :" +media)
        }catch (e) {
            console.error(e)
        }
    });

    test("findByTypes", async ()=>{ // 가게 업종 조회
        const type = await infoService.findByTypes(1)
        console.log("조회"+ JSON.stringify(type));
    })

    test("findByBreaktime", async ()=>{
        const breaktime = await infoService.findByBreaktime(1)
        console.log("조회 " + JSON.stringify(breaktime));
    })

    test("insertBreaktime",async ()=>{
        const store = {
            store_num:"7",
            rest_num:"7",
            rest_start_time:"2023-04-15 14:30:00",
            test_end_time:"2023-04-15 16:30:00",
        }
        let insert=0;
        try {
            insert= await infoService.insertBreaktime(store);
            console.log("등록 : "+JSON.stringify(insert));
        }catch (e) {
            console.error(e)
        }
    })

    test("updateBreaktime", async () => { //가게 방송출연 정보 수정
        const store = {
            store_num: "7",
            rest_num : "7",
            rest_start_time : "2020-04-15 05:30:00",
            test_end_time :"2020-04-15 07:30:00"
        };
        try {
            let update = await infoService.updateByStoreInfo(store);
            console.log("수정 : " + JSON.stringify(update));
        } catch (e) {
            console.error(e);
        }
    });

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

    test("findtypeclasses", async () => { // 가게 휴무일 삭제
        try{
            const typeclass = await infoService.findTypeClasses(1)
            console.log(typeclass)
        }catch (e) {
            console.error(e)
        }
    });

    test("insertstoretypes", async () => { // 가게 휴무일 삭제
        try{
            const insertCate = await infoService.insertStoreTypes(1,2)
            console.log("등록 :" +insertCate)
        }catch (e) {
            console.error(e)
        }
    });

    test("findStoretypes", async () => { // 가게 휴무일 삭제
        try{
            const findCate = await infoService.findStoreTypes(1)
            console.log("등록 :" +findCate[0].category_num)
            console.log("등록 :" +findCate[1].category_num)

        }catch (e) {
            console.error(e)
        }
    });


})