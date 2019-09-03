// pages/manage_member/manage_member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    tabs: [{ title: '未审核', show: true }, { title: '已审核', show: false }],
    tab_index: 0,
    member_list_h: '668px'

  },

  tabs_change(e) {

  },
  onSwiperChange(e) {

  },
  search(e) {
    this.setData({
      page: 1,
      loading_state: true
    });
    this.get_list(e.detail.value.keywords, 'is_init');
  },
  get_list() {
    
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