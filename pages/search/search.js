// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    tab_list: [{ title: '社团', type: '01',show:true }, { title: '活动', type: '02' ,show:false}, { title: '资讯', type: '03',show:false }],
    tab_active: 0
  },
  search(e) {
    this.setData({ keywords: e.detail.value.keywords})
    this.get_list('init', e.detail.value.keywords);
    let tab_list = this.data.tab_list;
    for(let i=0;i<tab_list.length;i++) {
      if(this.data.tab_active!=i) {
        tab_list[i].show = false;
      }
    }
    this.setData({tab_list});
  },
  select_tab(e) {
    this.setData({ tab_active: e.currentTarget.dataset.index})
  },
  swiper_change(e) {
    let tab_list = this.data.tab_list;
    this.setData({ tab_active: e.detail.current});
    if (!tab_list[this.data.tab_active].show) {
      this.get_list('init', this.data.keywords);
      tab_list[this.data.tab_active].show = true;
      this.setData({tab_list});
    }
   
  },

  get_list_() {
    this.get_list('',this.data.keywords);
  },
  get_list(init,keywords) {
    this.selectComponent('#shareList' + this.data.tab_active).get_list(init ? init : '', keywords ? keywords: '');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({keywords: options.keywords})
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
    this.get_list('init',this.data.keywords)
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