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
    to_info() {
      wx.navigateTo({
        url: '/pages/activity_info/activity_info',
      })
    },
    get_list() {
      if (!this.data.loading_state) {
        return false;
      }
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
        if (that.data.people_list.length > 15) {
          this.setData({
            loading_state: false
          });
        }
      },1000)
    },

    perview(e) {
      console.log()
      wx.previewImage({
        urls: [e.currentTarget.dataset.url],
      })
    }

  }
})
