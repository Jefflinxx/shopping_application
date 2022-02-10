const getProductData = require('../../models/product/all_product');

module.exports = class GetProduct {
    // 取得全部產品資料
    getAllProduct(req, res, next) {
      getProductData().then(result => {
        res.json({
            result: result
        })
      }, (err) => {
        res.json({
            result: err
        })
      })
    } 
}