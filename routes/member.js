const router = require('express').Router();
const passport = require('passport');

const MemberModifyMethod = require('../controllers/member/modify_controller');

//為何這裡要這樣
memberModifyMethod = new MemberModifyMethod();

//google第三方登入，後面放的是一個middleware，可以參考passport官網
router.get('/google',passport.authenticate('google', { scope: ["profile", "email"] }));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    //res.setHeader('token', token);
    // localStorage.setItem('token',JSON.stringify(token));
    res.redirect('/helloworld');
  });

router.get('/register', memberModifyMethod.getRegister);

router.get('/login', memberModifyMethod.getLogin);

router.get('/update', memberModifyMethod.getUpdate);



router.post('/register', memberModifyMethod.postRegister);

router.post('/login', memberModifyMethod.postLogin);

router.put('/update', memberModifyMethod.putUpdate);

module.exports = router;
