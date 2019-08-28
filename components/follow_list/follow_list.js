// components/user_list/user_list.js
var $http = require('/../../utils/request.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list_type: {type: String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    list: [],
    loading_state: true,
    list_type: ''
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.setData({ list_type: this.properties.list_type })
    },
    hide() { },
    resize() { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    follow(e) {

      let list = this.data.list;
      app.follow(e.currentTarget.dataset.item.UserId, '06',(res)=>{
        for(let item of list) {
          if (item.UserId == e.currentTarget.dataset.item.UserId) {
            item.is_follow = res.data;
          }
        }

        this.setData({list});
      })
    },
    get_list() {
      console.log(this.properties.list_type)
      if (!this.data.loading_state) {
        return false;
      }
      let url = '/api/my/MyFollowList';
      let data = {
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        Type: '06'
      }
      switch (this.properties.list_type) {
        case 'fans':
          url = '/api/my/ReceiveFollowList';
          data = {
            CurrentPage: this.data.page,
            PageSize: this.data.page_size,
          }
          break;
      }

      $http.request(true, url,data,(res)=>{
        for(let item of res.data) {
          item.is_follow = 1;
        }
        this.setData({ list: [...this.data.list, ...res.data], page: this.data.page++})
        if(res.data.length<this.data.page_size) {
          this.setData({loading_state: false})
        }
      })
    }
  }
})
