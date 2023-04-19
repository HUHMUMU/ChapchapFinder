const ReviewsREpliesService=require("../../model/service/ReviewRepliesService");
const infoService = require("../../model/service/InfoService");

describe("ReviewsReplies Service test",()=> {

    test("댓글찾기", async function ()  {
        const reply =
            {
                review_num : "34",
                content : "이게 말이 돼!?",
            };
        let replies = 0;
        try {
             replies = await  ReviewsREpliesService.insert(reply);
            console.log("등록 : "+replies);
        }catch (e) {
            console.error(e)
        }
        if(replies){
            console.log("등록 성공");
        }
        else{
            console.log("등록 실패");
        }
    });

    test("댓글찾기2", async function ()  {
        const reply =
            {
                review_num : "61",
                content : "61번 여덟번째 수정입니다",
            };
        let replies = 0;
        try {
            replies = await  ReviewsREpliesService.modify(reply);
            console.log("수정 : "+replies);
        }catch (e) {
            console.error(e)
        }
    });

    test("댓글찾기3", async function ()  {
        let replies = 0;
        try {
            replies = await  ReviewsREpliesService.destroy(41);
            console.log("삭제 : "+replies);
        }catch (e) {
            console.error(e)
        }
    });

});