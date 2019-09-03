// pages/login/login.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onGotUserInfo(e) {
    app.get_code((code)=>{
      $http.request(true, '/api/user/WechatLogin', {
        Code: code,
        AvatarUrl: e.detail.userInfo.avatarUrl,
        NickName: e.detail.userInfo.nickName,
        Gender: e.detail.userInfo.gender
      }, (res) => {
        wx.setStorageSync('uuid', res.uuid);
        wx.setStorageSync('htoken', res.htoken);
        wx.setStorageSync('mobile', res.data.userInfo.Mobile);
        $http.initHtoken();

        app.globalData.status.after_login = true
        wx.navigateBack();
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})