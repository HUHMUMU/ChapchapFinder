const ChapdealService=require("../../model/service/ChapdealService");
const chapdealService = new ChapdealService();

describe("ChapdealService test",()=>{
    test("findAlldeal",async ()=>{
        const deals=await chapdealService.findAlldeal();
        console.log(deals);
    });
    //
    // test("findByMenu",async ()=>{
    //     const menus=await menuService.findByMenu(1);
    //     console.log(menus);
    // });
    //
    // test("insertMenu",async ()=>{
    //     const menus=await menuService.insertMenu(2,"치즈닭갈비",null,11000,"매콤 고소 닭갈비","기존메뉴",1);
    //     console.log(menus);
    // });
    //
    // test("modifyMenu",async ()=>{
    //     const menus=await menuService.modifyMenu(2,3,"콘마요 닭갈비", null,12000,"매콤하지만 맛있는 닭갈비","기존메뉴",1);
    //     console.log(menus);
    // });
    //
    // test("dropMenu",async ()=>{
    //     const menus=await menuService.dropMenu(2,4);
    //     console.log(menus);
    // });

})