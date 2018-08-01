const app = getApp();

var utils = require('../../utils/util.js');
const Toast = require('../../zanui/dist/toast/toast');

Page({
  data: {
    userInfo: {},
  },
  onLoad: function() {},
  onShow: function() {
    this.chakuaidi();
  },
  chakuaidi: function() {
    //查物流
    //快递公司和，快递单号
    var logistics = ["1266271", "7526a46e-3a2a-4f5b-8659-d72f361e3386"];
    var RequestData = "{'OrderCode':'','ShipperCode':'" + logistics[0] + "','LogisticCode':'" + logistics[1] + "'}"; //数据内容
    console.log(RequestData); //utf-8编码的数据内容
    var RequestDatautf = encodeURI(RequestData);
    console.log("RequestDatautf:" + RequestDatautf);
    //签名
    console.log(RequestData + 'apikey');
    var DataSign = encodeURI(utils.Base64((utils.md5(RequestData + 'apikey'))));
    console.log("DataSign:" + DataSign);
    if (logistics != null) {
      wx.request({
        url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
        data: {
          'RequestData': RequestDatautf, //数据内容(进行过url编码)
          'EBusinessID': logistics[0], //商户id 电商ID
          'RequestType': '1002', //请求指令类型：1002
          'DataSign': DataSign, //数据内容签名把（请求内容（未编码）+ApiKey）进行MD5加密，然后Base64编码，最后进行URL（utf-8）编码
          'DataType': '2', //请求、返回数据类型： 2-json；
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res)
//          that.setData({
//            data: res.data.Traces
//          })
        }
      })
    }
  }
})