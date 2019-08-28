// components/reply_list/reply_list.js
var util = require('../../utils/util.js');
const $http = require('../../utils/request.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment_id: { type: String },
    is_prize: { type: Number },
    prizes_num: { type: Number }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    comment: '',
    style: '',

    fixed_top: false,
    is_prize: 0,
    prizes_num: 0,

    total_count: 0,
    list: [],
    page_size: 10,
    page:1,
    loading_state: true,

    comment_item: {}
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.setData({
        is_prize: this.properties.is_prize,
        prizes_num: this.properties.prizes_num
      })
    },
    hide() { },
    resize() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // action_prize() {
    //   $http.request(true,'/api/Common/SavePrize',{
    //     Id: this.properties.comment_id
    //   },(res)=>{
        
    //   })
    // },
    fixed_top(state) {
      this.setData({fixed_top: state});
    },
    updata_prize() {
      let that = this;
      app.prize(that.properties.comment_id,(res)=>{
        that.setData({
          is_prize: res.data,
          prizes_num: res.data ? that.data.prizes_num + 1 : that.data.prizes_num - 1
        })
      })
      this.setData({is_prize, prizes_num});
    },
    get_list() {
      $http.request(this.data.page!=1,'/api/Common/GetCommentList',{
        Id: this.properties.comment_id,
        CurrentPage: this.data.page,
        PageSize: this.data.page_size
      },(res)=>{
        for(let item of res.data) {
          item.CommentDate = util.timeTransform(item.CommentDate);
          for (let item_ of item.CommentList) {
            item_.CommentDate = util.timeTransform(item_.CommentDate);
          }
        }
        let list = [];
        if(this.data.page==1) {
          list = res.data;
        }else {
          list = [...this.data.list, ...res.data];
        }
        if (res.data.length < this.data.page_size) {
          this.setData({loading_state: false})
        }
        
        this.setData({
          page: this.data.page++,
          total_count: res.totalCount,
          list
        })
      })
    },
    show_window() {
      this.setData({ visible: true });
    },
    foucus: function (e) {
      var that = this;
      let style = `bottom:150px!important`;
      that.setData({style})
    },
    blur(e) {
      this.setData({ style: ''})
    },
    close_window() {
      this.setData({ 
        visible: false,
        style: ''
      });
    },
    post_comment_before(e) {
      this.show_window();
      if (e&&e.currentTarget.dataset.item) {
        this.setData({ comment_item: e.currentTarget.dataset.item})
      }else {
        this.setData({ comment_item: {} })
      }
    },
    post_comment(e) {
      let item = this.data.comment_item;
      let that = this;
      let  data = {
        Id: item.Id ? item.Id : that.properties.comment_id,
        Content: e.detail.value.comment,
        Type: item.Id?'02':'01'
      }
      console.log(data)
      $http.request(true,'/api/Common/SaveComment',data,(res)=>{
        this.setData({
          page: 1,
          loading_state: true,
        });
        this.close_window();
        this.get_list();
      })
    },
    // 删除评论
    del_comment(e) {
      $http.request(true,'/api/Common/DeleteComment',{
        Id: e.currentTarget.dataset.item.Id
      },(res)=>{
        this.setData({
          page: 1,
          loading_state: true,
        });
        this.get_list();
      })
    }

  }
})
