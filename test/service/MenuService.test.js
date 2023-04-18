const menuService=require("../../model/service/MenuService");

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
            name: "콘마요닭갈비",
            img: "img",
            price: 20000,
            info: "고소 닭갈비",
            menu_type: "일반메뉴",
            status: 1,
            menu_num: 37
        }
        const menus=await menuService.modifyMenu(menuObj);
        console.log(menus);
    });

    test("dropMenu",async ()=>{
        const menus=await menuService.dropMenu(4);
        console.log(menus);
    });

})