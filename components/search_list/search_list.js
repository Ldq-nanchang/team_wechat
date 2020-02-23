// components/search_list/search_list.js
var $http = require('../../utils/request')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    search_type: {type: String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    loading_state: true,
    list: [],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    to_info(e) {
      console.log()
      let item = e.currentTarget.dataset.item;
      switch (item.TypeCode) {
        case '01':
          wx.navigateTo({
            url: '/pages/association_info/association_info?id='+item.Id,
          })
          break;
        case '02':
          wx.navigateTo({
            url: '/pages/activity_info/activity_info?id=' + item.Id,
          })
          break;
        case '03':
          wx.navigateTo({
            url: '/pages/information_info/information_info?id=' + item.Id,
          })
          break;
      }
    },
    get_list(init,keywords) {
      if (init == 'init') {
        this.setData({ page: 1, loading_state: true});
      }
      if (!this.data.loading_state) {
        return false;
      }
      $http.request(true,'/api/index/GetPublicSearch',{
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        Type: this.properties.search_type,
        KeyWords: keywords ? keywords : ''
      },(res)=>{
        if(init=='init') {
          this.setData({list: res.data});
        }else {
          this.setData({list: [...this.data.list,...res.data]});
        }
        this.setData({page: this.data.page++});
        if(res.data.length<this.data.page_size) {
          this.setData({ loading_state: false})
        }
      })
    }
  }
})
