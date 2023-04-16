const ReviewsService=require("../../model/service/ReviewsService");

describe("ReviewsService test",()=> {

    test("댓글찾기", async function ()  {
        const replies = await  ReviewsService.findByRrNum(11,1);
        console.log(replies);
    });



    test("댓글찾기", async function ()  {
        const replies = await  ReviewsService.findByRrNum();
        console.log(replies);
    });
});