// pages/reponsible_activity/reponsible_activity.js
var $http = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    page_size: 10,
    loading_state: true
  },
  get_list() {
    if (!this.data.loading_state) {
      return false;
    }
    $http.request(true,'/api/my/MyManageActivityList',{
      CurrentPage: this.data.page,
      PageSize: this.data.page_size
    },(res)=>{
      let list = this.data.list;
      this.setData({
        list: [...list,...res.data],
        page: this.data.page++
      });
      if(res.data.length<this.data.page_size) {
        this.setData({loading_state: false});
      }
      console.log()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_list();
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
    this.get_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})