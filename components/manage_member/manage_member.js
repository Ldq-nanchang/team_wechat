// components/manage_member/manage_member.js
var $http = require('../../utils/request');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    check: {type: Number}
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    page: 1,
    page_size: 10,
    loading_state: true,
    check: 0
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.setData({check: this.properties.check});
    },
    hide() { },
    resize() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    agree(e) {
      
    },
    refuse(e) {

    },
    check() {
      $http.request(true, '/api/Community/CheckCommunityUser',{
        Mobile: '',
        CommunityId: '',
        AuditStatus: ''
      },()=>{

      })
    },
    get_list(id, state, keywords, is_init,callback) {
      if (is_init == 'is_init') {
        this.setData({ page: 1, loading_state: true });
      }
      if (!this.data.loading_state) {
        return false;
      }

      $http.request(true,'/api/community/GetCommunityUserList',{
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        CommunityId: id,
        State: state,
        KeyWords: keywords
      },(res)=>{

        if (is_init == 'is_init') {
          this.setData({list: res.data})
        }else {
          let list = this.data.list;
          this.setData({list: [...list,...res.data]});
        }
        this.setData({
          page: this.data.page++
        });
        if (res.data.length<this.data.page_size) {
          this.setData({ loading_state: false});
        }
        if (typeof callback == 'function') {
          callback();
        }
      });
    },
  }
})
