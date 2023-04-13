const sequelize=require("../chapchapSequelize");
const menuManagesEntity=require("../entity/MenuManagesEntity")(sequelize);
const {Op, where}=require("sequelize");

class MenuService{
    async findAllMenu() {// 모든 메뉴 데이터 조회
        const menu = await menuManagesEntity.findAll();
        return menu;
    }

    async findByMenu(storeNum) { //가게별 등록한 메뉴 출력
        const menuList = await menuManagesEntity.findAll({
            where: {
                store_num: storeNum
            }
        });
        return menuList;
    }

    async insertMenu(store_num, name, img, price, info, menu_type, status) { //가게별 메뉴 추가
        const insertMenu = await menuManagesEntity.create({
            store_num: store_num,
            name: name,
            img: img,
            price: price,
            info: info,
            menu_type: menu_type,
            status: status
        });
        return insertMenu;
    };

    //수정
    async modifyMenu(store_num, menu_num, name, img, price, info, menu_type, status) {
        const modifyMenu = await menuManagesEntity.update({
            name: name,
            img: img,
            price: price,
            info: info,
            menu_type: menu_type,
            status: status
        },{
            where: {
                store_num: store_num,
                menu_num: menu_num
            }
        });
        return modifyMenu;
    }

    async dropMenu(storeNum,menuNum) { //가게별 메뉴 삭제
        const dropMenu = await menuManagesEntity.destroy({
            where: {
                store_num: storeNum,
                menu_num: menuNum
            }
        });
        return dropMenu;
    }
}
module.exports=MenuService;


