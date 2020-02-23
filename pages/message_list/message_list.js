// pages/message_list/message_list.js
var $http = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    loading_status: true,
    list: []
  },
  get_list(init) {
    if(init=='init') {
      this.setData({page: 1, loading_status: true});
    }
    if(!this.data.loading_status) {
      return false;
    }
    $http.request(true,'/api/index/GetMessageList',{
      CurrentPage: this.data.page,
      PageSize: this.data.page_size,
      KeyWords: ''
    },(res)=>{
      if (init == 'init') {
        this.setData({list: res.data});
      }else {
        this.setData({list: [...this.data.list,...res.data]});
      }
      this.setData({page: this.data.page++});
      if (res.data.length< this.data.page_size) {
        this.setData({loading_status: false});
      }
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
    this.get_list('init');
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