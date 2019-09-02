// pages/activity_info/activity_i.js
var $http = require("../../utils/request.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    community: {},
    show_window: false
  },
  store() {
    let activity = this.data.activity;
    app.store(this.data.activity.Id, '02',(res)=>{
      activity.IsStore = res.data;
      this.setData({activity});
    })
  },
  follow() {
    let community = this.data.community;
    app.follow(this.data.community.Id,'01',(res)=>{
      community.IsFollow = res.data;
      this.setData({community});
    })
  },
  to_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.get_activity(options.id)
    }
  },
  get_activity(id) {
    $http.request(true,'/api/activity/GetActivityDetails',{
      Id: id
    },(res)=>{
      this.setData({
        activity: res.data.activityInfo,
        community: res.data.communityInfo
      });
      
    })
  },

  //获取手机号
  close_get_mobile() {
    this.setData({ window_show: false });
  },
  getPhoneNumber(e) {
    $http.request(true, '/api/user/GetWechatMobile', {
      Code: wx.getStorageSync('code'),
      IV: e.detail.iv,
      EN: e.detail.encryptedData
    }, (res) => {
      wx.setStorageSync('mobile', res.data.phoneNumber);
      this.enroll(res.data.phoneNumber)
    })
  },
  geted_mobile(e) {
    if (!(/^1\d{10}$/.test(Number(e.detail.value.mobile)))) {
      wx.showToast({
        title: '请输入真确的手机号',
        icon: 'none'
      });
      return false;
    }
    wx.setStorageSync('mobile', e.detail.value.mobile);
    this.enroll(e.detail.value.mobile)
  },
  to_enroll() {
    if (!wx.getStorageSync('uuid')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    let mobile = wx.getStorageSync('mobile');
    if (!mobile) {
      this.setData({ show_window: true });
      return false;
    }
    this.enroll(mobile);
  },
  enroll(mobile) {
    $http.request(true, '/api/activity/ActivityEnroll', {
      Mobile: mobile,
      ActivityId: this.data.activity.Id
    }, (res) => {
      let activity = this.data.activity;
      activity.IsEnroll = 1;
      this.setData({ activity, show_window: false });
    })
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