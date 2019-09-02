// pages/class/class.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_h:'',
    index: 0,
    tabs: [
      {
        key: 'tab1',
        title: '关注的人',
        content: 'Content of tab 1',
        active: true
      },
      {
        key: 'tab2',
        title: '粉丝',
        content: 'Content of tab 2',
        active: false
      },
      {
        key: 'tab3',
        title: '社团',
        content: 'Content of tab 3',
        active: false
      },
      {
        key: 'tab4',
        title: '收藏',
        content: 'Content of tab 4',
        active: false
      },
    ]
  },
  onTabsChange(e) {
    // this.updata_height();

    const { key } = e.detail
   
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
    console.log(this.data.tabs[index].active)
    // if(!this.data.tabs[index].active) {
    //   let tabs = this.data.tabs;
    //   tabs[index].active = true;
    //   this.setData({tabs});
    //   this.get_list();
    // }
    
  },
  onSwiperChange(e) {
    // this.updata_height();
    console.log( e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
    console.log(this.data.key, this.data.index)
    // if (!this.data.tabs[index].active) {
      let tabs = this.data.tabs;
      tabs[index].active = true;
      this.setData({ tabs });
      this.get_list();
    // }
  },
  get_list() {
    let that = this;
    let active = '#peopleList';
    console.log(this.data.index)
    switch(this.data.index) {
      case 0:
        active = "#followList";
        break;
      case 1:
        active = "#fansList";
        break;
      case 2:
        active = "#peopleList";
        break;
      case 3:
        active = "#storeList";
        break;
    }
    console.log('ss')
    this.selectComponent(active).get_list();
    // util.domH(active, (rect) => {
    //   that.setData({
    //     swiper_h: rect.height + 'px'
    //   })
    // })
    
  },
  updata_height() {
    let that = this;
    let active = '#peopleList';
    console.log(this.data.index)
    switch (this.data.index) {
      case 0:
        active = "#followList";
        break;
      case 1:
        active = "#peopleList";
        break;

      case 2:
        active = "";
        break;
    }
    console.log('ss')
    // this.selectComponent(active).get_list();
    util.domH(active, (rect) => {
      that.setData({
        swiper_h: rect.height + 'px!important'
      })
    })
    console.log(this.data.swiper_h)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // this.get_list();
  },
  follow_down() {
   
    this.get_list();
  },
  remmber_down() {
    this.get_list();
  },
  store_down() {
    this.get_list();
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
    console.log('sss')
    this.get_list();
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
    console.log('sss')
    // this.get_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})