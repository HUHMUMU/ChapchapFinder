const sequelize=require("../chapchapSequelize");
const menuManagesEntity=require("../entity/MenuManagesEntity")(sequelize);
const {Op, where}=require("sequelize");

class MenuService{
    async findAllMenu(storeNum) {//가게별 모든 메뉴 데이터 조회
        const menuList = await menuManagesEntity.findAll({
            where: {
                store_num: storeNum
            }
        });
        return menuList;
    }

    async findOneMenu(menu_num) { //특정 메뉴 데이터 조회
        const menuList = await menuManagesEntity.findAll({
            where: {
                menu_num: menu_num
            }
        });
        return menuList;
    }

    async insertMenu(menuObj) { //가게별 메뉴 추가
        const insertMenu = await menuManagesEntity.create(menuObj);
        return insertMenu;
    };

    async modifyMenu(menuObj) { //특정 메뉴 수정
        const modifyMenu = await menuManagesEntity.update(menuObj,{
            where : {
                menu_num: menuObj.menu_num
            }
        });
        return modifyMenu;
    }

    async dropMenu(menuNum) { //메뉴 삭제
        const dropMenu = await menuManagesEntity.destroy({
            where: {
                menu_num: menuNum
            }
        });
        return dropMenu;
    }
}
module.exports=new MenuService();


