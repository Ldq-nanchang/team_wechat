//index.js
//获取应用实例
const app = getApp()
var $http = require("../../utils/request.js");
Page({
  data: {
    citys: [],
    city_index: 0,
    search_shadow: false,
    banners: [],
    news: [],
    community_list: ['','',''],
    stars: ['', '', '', '', ''],
  },
  perview(e) {
    console.log(e.currentTarget.dataset.item)
    wx.previewImage({
      urls: [e.currentTarget.dataset.item],
    })
  },
  to_acctivity(e) {
    
    wx.navigateTo({
      url: '/pages/activity/activity?type='+e.currentTarget.dataset.type,
    })
  },
  to_new() {
    wx.navigateTo({ url: '/pages/new/new'})
  },
  to_association_info() {
    wx.navigateTo({
      url: '/pages/association_info/association_info',
    })
  },


  //事件处理函数
  swiperChange: function (e) {
    let that = this;
    // this.setData({
    //   swiper: {
    //     des: that.data.hot[Number(e.detail.current)].des,
    //     index: Number(e.detail.current) + 1,
    //   }
    // })
  },
  onPageScroll: function (e) {
    let that = this.data;
    if (e.scrollTop > 0) {
      this.setData({
        search_shadow: true
      });
    } else {
      this.setData({
        search_shadow: false
      });
    }
    
  },
  // 获取首页顶部信息
  get_index: function() {
    $http.request(true, '/api/index/GetIndexTopList',{},(res)=>{
      this.setData({
        banners: res.data.advList,
        community_list: res.data.communityList,
        news: res.data.informList
      });
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {

  },
  onLoad: function () {
    this.setData({
      citys: app.globalData.citys,
    });
    this.get_index();
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    let that = this;
    let component = "#activityList";

    console.log(this.selectComponent('#activityList'))
    this.selectComponent(component).get_list();
  },

})
