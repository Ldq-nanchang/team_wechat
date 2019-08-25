// pages/comment_info/comment_info.js
const $http = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    comment_id: ''
  },

  // 获取图片实际长宽
  img_load(e) {
    let width = e.detail.width;
    let height = e.detail.height;
    let item = this.data.item;
    console.log(width / height)
    if (width / height < 0.9) {
      item.img_style = 'height:480rpx;width:' + width / height * 480 + 'rpx';
      this.setData({ item });
    }
  },
  // 图片预览
  perview(e) {
    console.log(e.currentTarget.dataset.item)
    wx.previewImage({
      urls: [e.currentTarget.dataset.item],
    })
  },
  get_comment(id) {
    $http.request(true,'/api/community/GetCommunityCycleDetails',{
      Id: id
    },(res)=>{
      let item = res.data;
      console.log(item);
      item.imgs = [];
      item.img_style = '';
      if (item.FileUrl) {
        item.imgs = item.FileUrl.split(',');
      }
      this.setData({item: res.data});
    })
  },
  post_comment() {
    this.selectComponent('#replyList').post_comment_before()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({comment_id: options.id})
    if(options.id) {
      this.get_comment(options.id);
      this.selectComponent('#replyList').get_list()
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