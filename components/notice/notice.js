// components/notice/notice.js
let index = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news: {
      type: Array
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    news: []
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.setData({ news: this.properties.news})
    },
    hide() { },
    resize() { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(current, source) {
      index = current.detail.current;
    },
    to_notice_info: function() {
      wx.navigateTo({
        url: '/pages/information_info/information_info?id=' + this.data.news[index].Id+'&type=is_notice',
      })
    }
  }
})
