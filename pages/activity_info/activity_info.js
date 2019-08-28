// pages/activity_info/activity_i.js
var $http = require("../../utils/request.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    community: {}
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