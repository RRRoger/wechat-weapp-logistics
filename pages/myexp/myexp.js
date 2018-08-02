// pages/myexp/myexp.js
const Toast = require('../../zanui/dist/toast/toast');
const app = getApp();

Page({
  data: {
    expNos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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
      url: '../demo/demo',
    });
  },
})