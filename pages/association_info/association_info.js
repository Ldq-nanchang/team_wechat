// pages/association_info/association_info.js
var $http = require("../../utils/request.js");
var util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    community: {},
    notice: [],

    people_nav: ['名人馆','社团成员'],
    people_active: 0,

    people_list: ['杜甫', '李白', '苏东坡','苏轼'],
    people_list_: ['莎士比亚', '丘吉尔', '梵高','莫泊桑',],

    information_activity_nav: [{title:'资讯',show:true},{title:'活动',show:false}],
    information_activity_active: 0,
    information: ['','',''],
    information_swiper_h: '846rpx',
    activity: []
  },
  onSwiperChange(e) {
  
    this.setData({ people_active: e.detail.current});
  },
  onSwiperChangeA(e) {
    let that = this;
    if (this.data.information_activity_nav[0].show && this.data.information_activity_nav[1].show) {
      util.domH('.information-activity-h-' + that.data.information_activity_active, (rect) => {
        that.setData({
          information_swiper_h: rect.height + 'px'
        })
      })
    }
    if (!this.data.information_activity_nav[e.detail.current].show) {
      this.get_community_activity(this.data.community.Id)
    }
    this.setData({ information_activity_active: e.detail.current });
  },
  // 请求数据
  get_community(id) {
    $http.request(true,'/api/community/GetCommunityDetails',{
      Id: id
    },(res)=>{
      console.log(res.data);
      this.setData({
        community: res.data
      });
    })
  },
  get_community_notice(id) {
    $http.request(false,'/api/community/GetCommunityNoticeList',{
      CommunityId: id,
      CurrentPage: 1,
      PageSize: 3
    },(res)=>{
      this.setData({notice:res.data})
    })
  },
  get_community_information(id) {
    let that = this;
    $http.request(false,'/api/community/GetCommunityInformList',{
      CommunityId: id,
      PageSize: 3,
      CurrentPage: 1
    },(res)=>{
      this.setData({ information: res.data})
      util.domH('.information-activity-h-' + that.data.information_activity_active, (rect) => {
        that.setData({
          information_swiper_h: rect.height + 'px'
        })
      })
    })
  },
  get_community_activity(id) {
    let that = this;
    $http.request(true,'/api/activity/GetActivityList',{
      City: '',
      CommunityId: id,
      Type: '',
      Category: '',
      Status: '-1',

      CurrentPage: 1,
      PageSize: 3
    },(res)=>{
      let nav = this.data.information_activity_nav;
      nav[1].show = true;
      this.setData({
        activity: res.data,
        information_activity_nav: nav
      });
      util.domH('.information-activity-h-' + that.data.information_activity_active, (rect) => {
        that.setData({
          information_swiper_h: rect.height + 'px'
        })
      })
    })
  },
  // 交互事件
  to_information_info(e) {
    wx.navigateTo({
      url: '/pages/information_info/information_info?id=' + e.currentTarget.dataset.id+'&type=is_community'
    })
  },
  to_activity_info(e) {
    wx.navigateTo({
      url: '/pages/activity_info/activity_info?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.get_community(options.id)
      this.get_community_notice(options.id);
      this.get_community_information(options.id)
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