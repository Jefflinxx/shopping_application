var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/member/modify_controller');

//為何這裡要這樣
memberModifyMethod = new MemberModifyMethod();

router.post('/register', memberModifyMethod.postRegister);

router.post('/login', memberModifyMethod.postLogin);

router.put('/update', memberModifyMethod.putUpdate);

module.exports = router;
