const ReviewsREpliesService=require("../../model/service/ReviewRepliesService");
const infoService = require("../../model/service/InfoService");

describe("ReviewsReplies Service test",()=> {

    test("댓글찾기", async function ()  {
        const reply =
            {
                review_num : "12",
                content : "이게 말이 돼!?",
            };
        let replies = 0;
        try {
             replies = await  ReviewsREpliesService.insert(reply);
            console.log("등록 : "+replies);
        }catch (e) {
            console.error(e)
        }

    });

});