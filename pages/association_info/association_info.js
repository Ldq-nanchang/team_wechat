// pages/association_info/association_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people_nav: ['名人馆','社团成员'],
    people_active: 0,
    people_list: ['杜甫', '李白', '苏东坡','苏轼'],
    people_list_: ['莎士比亚', '丘吉尔', '梵高','莫泊桑',],
    information_activity_nav: ['资讯','活动'],
    information_activity_active: 0,
    news: ['','','']
  },
  onSwiperChange(e) {
    console.log(e.detail.current)
    this.setData({ people_active: e.detail.current});
  },
  onSwiperChangeA(e) {
    console.log(e.detail.current)
    this.setData({ information_activity_active: e.detail.current });
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