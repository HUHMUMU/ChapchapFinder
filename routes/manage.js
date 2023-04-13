const express = require('express');
const router = express.Router();
const boardService=require("../model/service/MenuService");
router.get('/manage.do', async (req, res) => {
    res.render("menus/manage");
});

module.exports = router;