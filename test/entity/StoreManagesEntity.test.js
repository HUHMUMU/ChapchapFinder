const storeManagesEntityTest=require("../../model/entity/StoreManagesEntity");

describe("StoreManagesEntity Test", () => {
    test("findAll", async () => {
        const storemanages = await storeManagesEntityTest.findAll();
        console.log(storemanages);
    });

    test("findByPk", async () => {
        const storemanages = await storeManagesEntityTest.findByPk("store005");
        console.log(storemanages);
    });

    test("findAll(paging", async () => {
        const storeManagesUser=await storeManagesEntityTest.findAll({
            offset : 5,
            limit : 5
        })
        console.log(storeManagesUser);
    });

    test("create() 등록", async () => {
        const storeManagesUser={
            store_id: 'store11',
            pw: '1234',
            business_num: '4039334933',
            store_call: '02-1111-2222',
            phone: '010-3333-4444',
            email: 'store11@naver.com',
            store_num: 12
        }
        let result;
        try {
            result=await storeManagesEntityTest.create(storeManagesUser);
        } catch (e) {
            console.error(e);
        }
        console.log(result);
    });

    test("update 수정", async ()=> {
        const storeManagesUser={
            store_id: 'store11',
            pw: '12345',
            business_num: '123456789',
            store_call: '02-1234-0000',
            phone: '010-1212-5555',
            email: 'store11@gmail.com',
            store_num: 12
        }
        let result;
        try {
            result=await storeManagesEntityTest.update(storeManagesUser,{
                where:{store_id:"store11"}
            });
        } catch (e) {
            console.error(e);
        }
        console.log(result);
    });

    test("destroy 삭제", async () => {
        let result;
        try {
            result=await storeManagesEntityTest.destroy({
                where:{store_id:"store11"}
            });
        } catch (e) {
            console.error(e);
        }
        console.log(result);
    })
});