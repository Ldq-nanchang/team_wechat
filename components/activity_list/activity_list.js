// components/activity_list/activity_list.js
var $http = require("../../utils/request.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    activity_list: [],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    to_info(e) {
      wx.navigateTo({
        url: '/pages/activity_info/activity_info?id=' + e.currentTarget.dataset.id,
      })
    },
    get_list() {
      if (!this.data.loading_state) {
        return false;
      }
      let that = this;
      $http.request(that.data.page!=1,'/api/activity/GetActivityList',{
        City: '',
        Type: '',
        Category: '',
        Status: that.properties.status,
        CurrentPage: that.data.page,
        PageSize: that.data.page_size,

      },(res)=>{
        let activity_list = that.data.activity_list;
        this.setData({
          page: that.data.page + 1,
          activity_list: [...activity_list, ...res.data]
        });
        if (res.data.length<that.data.page_size) {
          this.setData({
            loading_state: false
          })
        }
      })
    },

    perview(e) {
      console.log()
      wx.previewImage({
        urls: [e.currentTarget.dataset.url],
      })
    }

  }
})
