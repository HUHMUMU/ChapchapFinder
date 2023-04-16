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

    async findOneMenu(storeNum,menu_num) { //특정 메뉴 데이터 조회
        const menuList = await menuManagesEntity.findAll({
            where: {
                store_num: storeNum,
                menu_num: menu_num
            }
        });
        return menuList;
    }

    async insertMenu(name, img, price, info, menu_type, status, store_num) { //가게별 메뉴 추가
        const insertMenu = await menuManagesEntity.create({
            name: name,
            img: img,
            price: price,
            info: info,
            menu_type: menu_type,
            status: status,
            store_num: store_num
        });

        return insertMenu;
    };


    async modifyMenu(name, img, price, info, menu_type, status, store_num, menu_num) { //특정 메뉴 수정
        const modifyMenu = await menuManagesEntity.update({
                    name: name,
                    img: img,
                    price: price,
                    info: info,
                    menu_type: menu_type,
                    status: status,
                },{
            where : {
                store_num: store_num,
                menu_num: menu_num
            }
        });
        return modifyMenu;
    }

    async dropMenu(storeNum,menuNum) { //메뉴 삭제
        const dropMenu = await menuManagesEntity.destroy({
            where: {
                store_num: storeNum,
                menu_num: menuNum
            }
        });
        return dropMenu;
    }
}
module.exports=new MenuService();


