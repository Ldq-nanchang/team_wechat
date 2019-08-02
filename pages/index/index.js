//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    citys: [],
    city_index: 0,
    search_shadow: false,
    hot:['',''],
    people_list: ['','',''],
    stars: ['', '', '', '', ''],
    swiper_h: ''
  },
  //事件处理函数
  swiperChange: function (e) {
    let that = this;
    this.setData({
      swiper: {
        des: that.data.hot[Number(e.detail.current)].des,
        index: Number(e.detail.current) + 1,
      }
    })
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
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '首页',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff9d20',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  onLoad: function () {
    this.setData({
      citys: app.globalData.citys,
    });
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    let that = this;
    let component = "#activityList";
    console.log(component)
    console.log(this.selectComponent('#activityList'))
    this.selectComponent(component).get_list('', '', '', () => {
      // util.domH(component, (rect) => {
      //   that.setData({
      //     swiper_h: rect.height + 'px'
      //   })
      // })
    });
  },

})
