// components/store_list/store_list.js
var $http = require('../../utils/request.js')
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
    page: 1,
    page_size: 10,
    list: [],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toInfo(e) {
      console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/activity_info/activity_info?id=' + e.currentTarget.dataset.item.Id,
      })
    },
    get_list(init) {
      if(init=='init') {
        this.setData({ loading_state: true,page: 1});
      }
      if (!this.data.loading_state) {
        return false;
      }
      $http.request(true,'/api/my/MyStoreList',{
        CurrentPage: this.data.page,
        PageSize: this.data.page_size
      },(res)=>{
        if(init=='init') {
          this.setData({list: res.data});
        }else {
          this.setData({ list: [...this.data.list, ...res.data]})
        }
        this.setData({ page: this.data.page++});
        if(res.data.length<this.data.page_size) {
          this.setData({loading_state: false});
        }
      })
    }
  }
})
