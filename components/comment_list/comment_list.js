// components/component_list/comment_list.js
const $http = require('../../utils/request.js');
var app = getApp();
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
    to_info(e) {
      wx:wx.navigateTo({
        url: '/pages/comment_info/comment_info?id='+e.currentTarget.dataset.id,
      })
    },
    prize(e) {
      app.prize(e.currentTarget.dataset.id,(res)=>{
        console.log(res);
        let list = this.data.list;
        for(let item of list) {
          if (item.Id == e.currentTarget.dataset.id) {
            item.IsPrize = res.data;
            item.PrizesNum = res.data ? item.PrizesNum + 1 : item.PrizesNum - 1
          }
        }
        this.setData({list});
      })
    },
    // 获取图片实际长宽
    img_load(e) {
      let width = e.detail.width;
      let height = e.detail.height;
      let list = this.data.list;
      console.log(width / height)
      if(width/height<0.9) {
        for(let item of list) {
          if (item.Id == e.currentTarget.dataset.id) {
            item.img_style = 'height:480rpx;width:'+width/height*480+'rpx';
          }
        }
        this.setData({list});
      }
    },
    // 图片预览
    perview(e) {
      console.log(e.currentTarget.dataset.item)
      wx.previewImage({
        urls: [e.currentTarget.dataset.item],
      })
    },
    del_comment(e) {
      $http.request(true,'/api/Community/DeleteCommunityCycle',{
        Id: e.currentTarget.dataset.item.Id
      },(res)=>{
        let list = this.data.list;
        for(let i=0;i<list.length;i++) {
          if (list[i].Id == e.currentTarget.dataset.item.Id) {
            list.splice(i,1)
          }
        }
        this.setData({list});
      })
    }, 

    // 获取动态列表
    get_list(id) {
      if(!this.data.loading_state) {
        return false;
      }
      let that = this;
      $http.request(that.data.page != 1,'/api/community/GetCommunityCycleList',{
        CurrentPage: that.data.page,
        PageSize: that.data.page_size,
        CommunityId: id
      },(res)=>{
        // res.data[0].FileUrl = res.data[0].HeadPic;
        for(let item of res.data) {
          item.is_del = false;
          if (item.UserId == wx.getStorageSync('uuid')) {
            item.is_del = true;
          }

          item.imgs = [];
          item.img_style = '';
          if (item.FileUrl) {
            item.imgs = item.FileUrl.split(',');
          }
        }
        this.setData({
          page: that.data.page++,
          list: [...that.data.list,...res.data]
        });
        console.log(this.data.list);
        if(res.data.length<that.data.page_size) {
          this.setData({ loading_state: false})
        }
      })
    }
  }
})
