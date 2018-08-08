const app = getApp();

var utils = require('../../utils/util.js');
const Toast = require('../../zanui/dist/toast/toast');
var express = require('../../utils/express.js');

Page({
  data: {
    userInfo: {},
    ExpressInfo: null,
    expNo: ''
  },
  onLoad: function (options) {
  },
  expNoInput: function (e) {
    this.setData({
      expNo: e.detail.detail.value
    })
  },
  queryExpress: function () {
    this.setData({
      ExpressInfo: null,
    });
    console.log("this.expNo", this.data.expNo);
    express.queryByNum(this.data.expNo, this);
  },
  onShow: function () {
    // 用store里面第一个快递单号
    // let expNos = wx.getStorageSync('expNos') || [];
    // if (expNos.length > 0) {
    //   this.setData({
    //     expNo: expNos[0].expNo,
    //   });
    // };
    if (app.globalData.globalExpNo) {
      this.setData({
        expNo: app.globalData.globalExpNo
      });
      app.globalData.globalExpNo = null;
    };
    // if (this.data.expNo){
    //   this.queryExpress();
    // }
  },
  onShareAppMessage: function () {
    let path = '/pages/index/index';
    let title = '快递查询';

    return {
      title: title,
      desc: title,
      path: path
    }
  },
  //关注
  attention: function () {

    let expNo = this.data.expNo;
    let expNos = wx.getStorageSync('expNos') || [];
    if (!expNo) {
      console.log("expNo is null!");
      return;
    };
    console.log(expNos);

    let exist_flag = false;
    for (var i = 0; i < expNos.length; i++) {
      if (expNos[i]['expNo'] === expNo) {
        exist_flag = true;
        break;
      }
    };
    if (exist_flag) {
      Toast({
        type: 'fail',
        message: '已关注过此单号!',
        selector: '#zan-toast-test',
        timeout: 1000
      });
    } else {
      this.addExpNo(expNo, expNos);
    }
  },
  addExpNo: function (expNo, expNos) {
    expNos.push({
      expNo: expNo
    });
    wx.setStorageSync('expNos', expNos);
    Toast({
      type: 'success',
      message: '关注成功!',
      selector: '#zan-toast-test',
      timeout: 1000
    });
    return;
  },
  scanExpNo: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.setData({
          expNo: res.result
        });
        this.queryExpress();
      }
    })
  },
  deleteTxt: function () {
    this.setData({
      expNo: ""
    });
  },
  clearPage: function () {
    this.setData({
      ExpressInfo: null
    })
  }
});