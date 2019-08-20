// components/activity_list/activity_list.js
var $http = require("../../utils/request.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String
    },
    is_page: {
      type: Boolean
    },
    type_: {
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
    init_list(condition) {
      this.setData({ loading_state: true, page: 1 });
      this.get_list(condition,'init')
    },
    get_list(condition,init) {
      if (!this.data.loading_state) {
        return false;
      }
      let that = this;
      let status = that.properties.status;
      console.log(this.properties.type_)
      let data = {
        City: '',
        Type: this.properties.type_ ? this.properties.type_ : '',
        NearBy: '',
        Category: '',
        Status: status,
        CurrentPage: that.data.page,
        PageSize: that.data.page_size,
      }
      if (condition) {
        data.NearBy = condition.NearBy;
        data.Category = condition.Category;
        data.Status = condition.Status
      }

      $http.request(that.properties.is_page||that.data.page != 1, '/api/activity/GetActivityList', data,(res)=>{
        let activity_list = that.data.activity_list;
        this.setData({
          page: that.data.page + 1,
          activity_list: init != 'init' ? [...activity_list, ...res.data] : res.data
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
