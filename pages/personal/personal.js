// pages/personal/personal.js
var $http = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    other_user: true, 
    personal: {}
  },
  get_personal(userid) {
    $http.request(true,'/api/my/MyInfo',{
      UserId: userid ? userid : wx.getStorageSync('uuid')
    },(res)=>{
      console.log(res.data)
      this.setData({personal: res.data});
    })
  },
  get_comment(userid) {
    this.selectComponent('#commentList').get_list(userid ? userid : wx.getStorageSync('uuid'), 'personal');
  },
  to_my_info() {
    wx.navigateTo({
      url: '/pages/my_info/my_info',
    })
  },
  to_post_comment() {
    wx.navigateTo({
      url: '/pages/post_comment/post_comment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.userid) {
      this.get_personal(options.userid);
      this.get_comment(options.userid, 'personal');
    }else {
      this.setData({ other_user: false});
      this.get_personal();
      this.get_comment(wx.getStorageSync('uuid'), 'personal');
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
    this.get_comment(wx.getStorageSync('uuid'), 'personal')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})