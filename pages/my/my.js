// pages/my/my.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personal: {}
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
        // wx.setStorageSync('mobile', res.data.userInfo.Mobile);
        $http.initHtoken();
        this.get_personal();
      })
    })
  },
  get_personal() {
    $http.request(true, '/api/my/MyInfo', {
      UserId: wx.getStorageSync('uuid')
    }, (res) => {
      this.setData({ personal: res.data });
    })
  },
  to_peronsal() {
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },
  to_my_community() {
    wx.navigateTo({
      url: '/pages/my_community/my_community',
    })
  },
  to_browse() {
    wx.navigateTo({
      url: '/pages/browse/browse',
    })
  },
  to_reponsible_activity() {
    wx.navigateTo({
      url: '/pages/reponsible_activity/reponsible_activity',
    })
  },
  to_join_activity() {
    wx.navigateTo({
      url: '/pages/join_activity/join_activity',
    })
  }, 
  sanCode () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('uuid')) {
      this.get_personal()
    }
    
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