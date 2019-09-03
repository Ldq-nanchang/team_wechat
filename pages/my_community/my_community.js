// pages/my_community/my_community.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alphabet: [],
    tabs: [
      
      {
        key: 'tab1',
        title: '我创建的',
        content: 'Content of tab 1',
        show: true
      },
      {
        key: 'tab2',
        title: '我加入的',
        content: 'Content of tab 2',
        show: false
      }
    ],
  },
  onTabsChange(e) {
    console.log('onTabsChange', e);
    const { key } = e.detail;
    const index = this.data.tabs.map((n) => n.key).indexOf(key);

    this.setData({
      key,
      index,
    });

  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e);

    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index];
    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
    if (!this.data.tabs[1].show) {
      console.log('ss')
      this.get_list();
    }
  },
  lower() {
    console.log('ss')
  },
  get_list() {
    let that = this;
    let tabs = this.data.tabs;
    this.selectComponent('#communityList').get_list({},'init',()=>{
      tabs[1].show = true;
      that.setData({ tabs});
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectComponent('#myCommunity').get_my_community();

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
    if(app.globalData.status.init_my_community) {
      this.selectComponent('#myCommunity').get_my_community();
    }

    
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