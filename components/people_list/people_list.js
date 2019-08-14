// components/people_list/people_list.js
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
    people_list: ['', '', '','',''],
    stars: ['', '', '', '', '',],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_list(list) {
      // let that = this;
      // this.setData({
      //   people_list: [...that.data.people_list,...list]
      // })
      if (!this.data.loading_state) {
        return false;
      }
      wx.showLoading({
        title: '加载中',
        icon: 'loading',
      });
      setTimeout(() => {
        wx.hideLoading();
        let that = this;
        let list = ['', '', '', '', '',]
        // this.selectComponent('#peopleList').get_list(['', '', '', '', '']);
        this.setData({
          people_list: [...that.data.people_list, ...list]
        })
        if (this.data.people_list.length > 9) {
          this.setData({
            loading_state: false
          });
        }

      }, 1000)
    }
  }
})