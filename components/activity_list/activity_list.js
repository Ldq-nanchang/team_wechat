// components/activity_list/activity_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    people_list: ['', '', '', '', ''],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_list() {
      wx.showLoading({
        title: '加载中',
        icon: 'loading',
      });
      let that = this;
      let list = ['', '', '', '', '',]
      setTimeout(()=>{
        this.setData({
          people_list: [...that.data.people_list,...list]
        })
        wx.hideLoading();
      },1000)
    }
  }
})
