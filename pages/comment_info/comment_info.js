// pages/comment_info/comment_info.js
const $http = require('../../utils/request');
var util = require('../../utils/util');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    comment_id: '',
    comment_item_h: 0
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
    let that = this;
    $http.request(true,'/api/community/GetCommunityCycleDetails',{
      Id: id
    },(res)=>{
      let item = res.data;
      item.imgs = [];
      item.img_style = '';
      if (item.FileUrl) {
        item.imgs = item.FileUrl.split(',');
      }
      this.setData({item: res.data});

      wx.nextTick(() => {
        console.log('sss')
        util.domH('.comment-item', (rect) => {
          that.setData({
            comment_item_h: rect.height
          })
        })
      })

    })
  },
  // post_comment() {
  //   this.selectComponent('#replyList').post_comment_before()
  // },
  // prize() {
  //   app.prize(this.data.comment_id,(res)=>{

  //   })
  // },
  fixed_top(state) {
    this.selectComponent('#replyList').fixed_top(state);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({comment_id: options.id});

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
  // 监听页面滚动事件
  onPageScroll: function(e) {
    console.log(this.data.comment_item_h)
    if (this.data.comment_item_h > 0 && e.scrollTop >= this.data.comment_item_h) {
      this.fixed_top(true);
    }else {
      this.fixed_top(false);
    }
    
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