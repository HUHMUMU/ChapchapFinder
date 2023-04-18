const chapdealService=require("../../model/service/ChapdealService");

describe("ChapdealService test",()=>{
    test("findAllDeal",async ()=>{
        const deals=await chapdealService.findAllDeal(1);
        console.log(deals);
    });

    test("findOneDeal",async ()=>{
        const deals=await chapdealService.findOneDeal(1);
        console.log(deals);
    });

    test("insertDeal",async ()=>{
        const eventObj ={
            event_title: "선착순 할인",
            event_condition: "선착순 100명",
            event_reward: "10% 할인",
            event_img: null,
            event_start: "2023-04-28",
            event_end: "2023-04-29",
            store_num: 1
        };
        const deals=await chapdealService.insertDeal(eventObj);
        console.log(deals);
    });

    test("modifyDeal",async ()=>{
        const eventObj ={
            event_title: "선착순 할인",
            event_condition: "선착순 100명",
            event_reward: "100% 할인",
            event_img: null,
            event_start: "2023-04-28",
            event_end: "2023-04-29",
            event_num: 15
        };
        const deals=await chapdealService.modifyDeal(eventObj);
        console.log(deals);
    });

    test("dropDeal",async ()=>{
        const deals=await chapdealService.dropDeal(15);
        console.log(deals);
    });

})