// components/people_list/people_list.js
var $http = require("../../utils/request.js");
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_follow: {type: Boolean},
    is_my: { type: Boolean }
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    community_list: [],
    stars: ['', '', '', '', '',],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    to_info(e) {
      let id = '';
      if (this.properties.is_follow) {
        id = e.currentTarget.dataset.item.CommunityId;
      }else {
        id = e.currentTarget.dataset.item.Id;
      }
      wx.navigateTo({
        url: '/pages/association_info/association_info?id='+id,
      })
    },
    to_map(e) {
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '/pages/map/map?address=' + item.Address + '&community=' + item.FullName,
      })
    },
    init_list(condition) {
      this.setData({ loading_state: true, page: 1});
      this.get_list('init',condition)
    },
    get_list(init, condition,callback) {
      if(init=='init') {
        this.setData({ loading_state: true, page: 1 });
      }
      if (!this.data.loading_state) {
        return false;
      }
      let that = this;
      let data = {
        CurrentPage: that.data.page,
        PageSize: that.data.page_size,
        City: '',
        Tag: '',
        NearBy: '',
        Lat: app.globalData.lat ? app.globalData.lat: '',
        Lng: app.globalData.lng ? app.globalData.lng : '',
        SortCode: ''
      }
      if (condition) {
        data.NearBy = condition.NearBy;
        data.Tag = condition.Tag;
        data.SortCode = condition.SortCode;
      }
      let url = '/api/community/GetCommunityList';
      if (this.properties.is_follow) {
        url = '/api/my/MyFollowList';
        data = {
          CurrentPage: that.data.page,
          PageSize: that.data.page_size,
          Type: '01'
        }
      }
      if (this.properties.is_my) {
        url = '/api/my/MyAttendCommunityList';
        data = {
          CurrentPage: that.data.page,
          PageSize: that.data.page_size,
        }
      }
      $http.request(true,url,data,(res)=>{
        if(typeof callback == 'function') {
          callback();
        }
        for(let item of res.data) {
          item.stars = new Array(item.Star);
          item.stars_ = new Array(5 - item.Star);
          item.tags = item.TagName.split(',');
        }
        if(init=='init') {
          this.setData({ community_list: res.data,})
          wx.stopPullDownRefresh();
        }else {
          this.setData({ community_list: [...that.data.community_list, ...res.data] })
        }
        that.setData({ page: that.data.page++ })
        

        if (res.data.length < that.data.page_size) {
          that.setData({
            loading_state: false
          })
        }
      })

    }
  }
})
