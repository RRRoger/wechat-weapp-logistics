//快递鸟电商ID，登录用户账号查看
var CusBase64 = require('base64.js');
var MD5 = require('MD5.js');

var AppId = null;
var AppKey = null;


AppId = '***';  //需要申请
AppKey = '***';  //需要申请


//http://kdniao.com/ 加入domain
const url = "https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx";

const header = {
  'content-type': 'application/x-www-form-urlencoded'
}

//先进行MD5，然后Base64，最后UTF-8编码
//wx.request本身会进行编码，因此此步骤省略
function encrypt(content) {
  return CusBase64.CusBASE64.encoder(MD5.md5(JSON.stringify(content) + AppKey));
}

function queryExpress(expname, expCode, expNo, obj) {
  /*
    expname 物流公司name
    expCode 物流公司code
    expNo   物流单号
  */
  var post_body = {
    'ShipperCode': expCode,
    'LogisticCode': expNo
  };

  wx.request({
    url: url,
    data: {
      RequestData: JSON.stringify(post_body),
      EBusinessID: AppId,
      RequestType: '1002',
      DataSign: encrypt(post_body),
      DataType: "2"
    },
    header: header,
    method: 'POST',
    success: function(result) {
      console.log('查询物流的有效数据:', result.data);
      obj.setData({
        ExpressInfo: result.data
      })
    },

    fail: function({
      errMsg
    }) {
      wx.showToast({
          title: '查询物流失败!',
          icon: 'loading',
          duration: 1000
        });
    }
  })

}

function queryByNum(expNo, obj) {
  var post_body = {
    'LogisticCode': expNo
  };
  wx.request({
    url: url,
    data: {
      RequestData: JSON.stringify(post_body),
      EBusinessID: AppId,
      RequestType: '2002',
      DataSign: encrypt(post_body),
      DataType: "2"
    },
    header: header,
    method: 'POST',
    success: function(result) {
      var data = result.data.Shippers;
      console.log('Code success data', result.data);
      if (data != null && data[0] != null) {
        //如果有多个对应的快递编号，则提供前6个让客户选择
        if (data.length > 1) {
          var codelist = [];
          for (var i = 0; i < data.length; i++) {
            if (i >= 6) {
              break;
            };
            codelist[i] = data[i].ShipperName;
          }
          wx.showActionSheet({
            itemList: codelist,
            itemColor: '#dd7e6b',
            success: function(res) {
              if (res.tapIndex != null) {
                var code = data[res.tapIndex].ShipperCode;
                var expname = data[res.tapIndex].ShipperName;
                queryExpress(expname, code, expNo, obj);
              }
              console.log(res.tapIndex)
            },
            fail: function(res) {
              console.log(res.errMsg)
            }
          })

        } else {
          //如果只有一个，则直接查询, 可能快递鸟不知道要匹配哪家快递
          console.log('如果只有一个，则直接查询');
          console.log(data);
          queryExpress(data[0].ShipperName, data[0].ShipperCode, expNo, obj);
        }
      } else {
        obj.setData({
          ExpressInfo: null,
        });
        wx.showToast({
          title: '没有匹配的物流!',
          icon: 'loading',
          duration: 1000
        });
      }
    },

    fail: function({
      errMsg
    }) {
      console.log('fail', errMsg)
    }
  })

}
module.exports = {
  queryExpress: queryExpress,
  queryByNum: queryByNum
}