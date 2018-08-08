// pages/myexp/myexp.js
const Toast = require('../../zanui/dist/toast/toast');
const app = getApp();

Page({
  data: {
    expNos: [],
    hiddenmodalput: true,
    note: ''
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function (e, a) {
    let _index = e.currentTarget.dataset.exp_index;
    console.log(_index);
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      tap_index: _index
    });
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e, a) {
    this.addNote(this.data.tap_index, this.data.note);
    let expNos = wx.getStorageSync('expNos') || [];
    console.log(expNos);
    this.setData({
      note: '',
      hiddenmodalput: true,
    });
  },
  noteInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      note: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let expNos = wx.getStorageSync('expNos') || [];
    this.setData({
      expNos: expNos
    });
  },

  clearExpNos: function() {
    wx.setStorageSync('expNos', []);
    Toast({
      type: 'success',
      message: '清除成功!',
      selector: '#zan-toast-test',
      timeout: 1000
    });
    this.setData({
      expNos: []
    });
    return;
  },
  turn2query: function (e, a) {
    /*
    tip1: tabBar 跳转用 `switchTab`
    tip2: tabBar 跳转用 不能携带queryString 解决方案: 用 `globalData` 变量
    tip3: wxml里面 `dataset` 的大小写和中划线变量命名问题, 参考微信小程序文档
    */
    console.log("turn2query");
    app.globalData.globalExpNo = e.currentTarget.dataset.exp_no;
    wx.switchTab({
      url: '../index/index',
    });
  },
  deleteExpno: function(e, a){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success: function (res) {
        if (res.confirm) {
          let _index = e.currentTarget.dataset.exp_index;
          let expNos = wx.getStorageSync('expNos') || [];
          expNos.splice(_index, 1);
          that._setD(expNos);
          Toast({
            type: 'success',
            message: '删除成功!',
            selector: '#zan-toast-test',
            timeout: 500
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
    return;
  },
  addNote: function (tap_index, note){
    let expNos = wx.getStorageSync('expNos') || [];
    expNos[tap_index].note = note;
    this._setD(expNos);
    return;
  },
  _setD: function (expNos){
    this.setData({
      expNos: expNos
    });
    wx.setStorageSync('expNos', expNos);
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  }
})