// components/user_list/user_list.js
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
    list: ['', '', '', '', '', '', '', '', '', '',],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_list() {
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
          list: [...that.data.list, ...list]
        })
        if (this.data.list.length > 20) {
          this.setData({
            loading_state: false
          });
        }

      }, 1000)

    }
  }
})
