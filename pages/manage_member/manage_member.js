// pages/manage_member/manage_member.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    community_id: '',
    keywords: '',
    tabs: [{ title: '未审核', show: true }, { title: '已审核', show: false }],
    tab_index: 0,
    member_list_h: '668px',
    search_shadow: false
  },

  tabs_change(e) {
    this.setData({ tab_index: e.currentTarget.dataset.index});
    
  },
  onSwiperChange(e) {
    this.setData({ tab_index: e.detail.current});
    this.get_list('is_init');
  },
  search(e) {
    this.setData({ keywords: e.detail.value.keywords})
    this.get_list('is_init');
  },
  get_list(is_init) {
    this.selectComponent('#manageList' + this.data.tab_index).get_list(this.data.community_id, this.data.tab_index, this.data.keywords, is_init ? is_init:'',
    ()=>{
      util.domH('#manageList' + this.data.tab_index,(rect)=>{
        this.setData({ member_list_h: rect.height+'px'})
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({ community_id: options.id });
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
    this.get_list('is_init');
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
  onPageScroll: function (e) {
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