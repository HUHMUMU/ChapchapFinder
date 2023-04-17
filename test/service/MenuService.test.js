const menuService=require("../../model/service/MenuService");
//const menuService=new MenuService();

describe("MenuService test",()=>{
    test("findAllMenu",async ()=>{
        const menus=await menuService.findAllMenu(1);
        console.log(menus);
    });


    test("insertMenu",async ()=>{
        const menuObj={
            name: "치즈닭갈비",
            img: "img",
            price: 20000,
            info: "매콤 고소 닭갈비",
            menu_type: "일반메뉴",
            status: 1,
            store_num: 1
        }
        const menus=await menuService.insertMenu(menuObj);
        console.log(menus);
    });

    test("modifyMenu",async ()=>{
        const menuObj={
            menu_num:2,
            name: "콘마요 닭갈비",
            img: "img",
            price: 20000,
            info: "매콤 고소 콘마요 닭갈비",
            menu_type: "신메뉴",
            status: 1,
            store_num: 1
        }
        const menus=await menuService.modifyMenu(menuObj);
        console.log(menus);
    });

    test("dropMenu",async ()=>{
        const menus=await menuService.dropMenu(6);
        console.log(menus);
    });

})