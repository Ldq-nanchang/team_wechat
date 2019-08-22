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
    get_list() {
      if (!this.data.loading_state) {
        return false;
      }
      $http.request(true,'/api/my/MyStoreList',{
        CurrentPage: this.data.page,
        PageSize: this.data.page_size
      },(res)=>{
        this.setData({list:[...this.data.list,...res.data],page_size: this.data.page++});
        if(res.data.length<this.data.page_size) {
          this.setData({loading_state: false});
        }
      })
    }
  }
})
