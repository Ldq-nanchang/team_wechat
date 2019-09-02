// pages/association_info/association_info.js
var $http = require("../../utils/request.js");
var util = require("../../utils/util");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    community: {},
    notice: [],

    people_nav: [{title:'名人馆',show:true},{title:'社团成员',show:false}],
    people_active: 0,

    leader_list: [],
    leader_list_: [],
    member_list: [],
    member_list_: [],

    information_activity_nav: [{title:'资讯',show:true},{title:'活动',show:false}],
    information_activity_active: 0,
    information: ['','',''],
    information_swiper_h: '846rpx',
    activity: [],

    show_window: false,
  },

  onSwiperChange(e) {
    if (!this.data.people_nav[e.detail.current].show) {
      this.get_community_member(this.data.community.Id)
    }
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
  // 关注
  follow() {
    let community = this.data.community;
    app.follow(community.Id, '01', (res)=>{
      community.IsFollow = res.data;
      this.setData({ community})
    })
  },
  // 请求数据
  // 获取社团详情
  get_community(id) {
    $http.request(true,'/api/community/GetCommunityDetails',{
      Id: id
    },(res)=>{
      this.setData({
        community: res.data
      });
    })
  },
  // 获取社团详情公告
  get_community_notice(id) {
    $http.request(false,'/api/community/GetCommunityNoticeList',{
      CommunityId: id,
      CurrentPage: 1,
      PageSize: 3
    },(res)=>{
      this.setData({notice:res.data})
    })
  },
  //获取社团详情名人列表
  get_community_leader(id) {
    $http.request(false,'/api/community/GetCommunityLeaderList',{
      CurrentPage: 1,
      PageSize: 4,
      CommunityId: id
    },(res)=>{
      if (res.data.length<4) {
        this.setData({ leader_list_: new Array(4 - res.data.length)})
      }
      this.setData({leader_list: res.data})
    });
  },
  //获取社团详情成员列表
  get_community_member(id) {
    console.log(id)
    $http.request(true, '/api/community/GetCommunityUserList', {
      CurrentPage: 1,
      PageSize: 4,
      CommunityId: id,
      KeyWords: ''
    }, (res) => {
      if (res.data.length < 4) {
        this.setData({ member_list_: new Array(4 - res.data.length) })
      }
      let nav = this.data.people_nav;
      nav[1].show = false;
      this.setData({ member_list: res.data, people_nav: nav})
    });
  },
  // 获取社团详情资讯
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
  // 获取社团详情活动
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
  get_comment() {
    this.selectComponent('#commentList').get_list(this.data.community.Id);
  },
  // 交互事件
  to_information_info(e) {
    wx.navigateTo({
      url: '/pages/information_info/information_info?id=' + e.currentTarget.dataset.id+'&type=is_community'
    })
  },
  to_search_member(e) {
    let keywords = '';
    if(e.currentTarget.dataset.keywords=='leader') {
      keywords = '&leader=1';
    }
    wx.navigateTo({
      url: '/pages/search_member/search_member?community_id=' + this.data.community.Id + keywords,
    })
  },
  to_activity_info(e) {
    wx.navigateTo({
      url: '/pages/activity_info/activity_info?id=' + e.currentTarget.dataset.id
    })
  },
  to_index() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  to_post_comment() {
    if(!this.data.community.IsAdd) {
      wx.showToast({
        title: '请先加入社团',
        icon: 'none',
      })
      return false;
    }
    wx.navigateTo({
      url: '/pages/post_comment/post_comment?id=' + this.data.community.Id + '&name=' + this.data.community.FullName,
    })
  },
  share() {},
  //获取手机号
  close_get_mobile() {
    this.setData({window_show: false});
  },
  getPhoneNumber(e) {
    $http.request(true, '/api/user/GetWechatMobile', {
      Code: wx.getStorageSync('code'),
      IV: e.detail.iv,
      EN: e.detail.encryptedData
    }, (res) => {
      wx.setStorageSync('mobile', res.data.phoneNumber);
      this.join(res.data.phoneNumber)
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
    this.join(e.detail.value.mobile)
  },



  // 加入社团
  join_community() {
    if (!wx.getStorageSync('uuid')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    let mobile = wx.getStorageSync('mobile');
    if(!mobile) {
      this.setData({show_window: true});
      return false;
    }
    this.join(mobile);

  },
  join(mobile) {
    $http.request(true, '/api/Community/ApplyInCommunity', {
      Mobile: mobile,
      CommunityId: this.data.community.Id
    }, (res) => {
      let community = this.data.community;
      community.IsAdd = 1;
      this.setData({ community, show_window: false});
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.get_community(options.id)
      this.get_community_notice(options.id);
      this.get_community_leader(options.id);
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
    this.get_comment();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})