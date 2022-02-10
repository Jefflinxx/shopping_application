var express = require('express');
var router = express.Router();

const OrderGetMethod = require('../controllers/order/get_controller');
const OrderModifyMethod = require('../controllers/order/modify_controller');

orderGetMethod = new OrderGetMethod();
orderModifyMethod = new OrderModifyMethod();


// 取得全部訂單資料，先不用，因為應該是不會讓用戶看到所有人的訂單內容
//router.get('/order', orderGetMethod.getAllOrder);

// 取得單一顧客的訂單資料
router.get('/order/member', orderGetMethod.getOneOrder);

// 下訂訂單
router.post('/order', orderModifyMethod.postOrderAllProduct);

// 修改訂單
router.put('/order', orderModifyMethod.putOrderData);

// 刪除訂單資料
router.delete('/order', orderModifyMethod.deleteOrderProduct);

// 訂單已完成
router.put('/order/complete', orderModifyMethod.putProductComplete);


module.exports = router;
