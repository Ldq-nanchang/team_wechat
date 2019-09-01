// pages/search_member/search_member.js
var $http = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: '',
    community_id: '',
    leader: '',
    search_shadow: false,
    list: [],
    page: 1,
    page_size: 10,
    loading_state: true,

  },
  search(e) {
    this.setData({
      page: 1,
      loading_state: true
    });
    this.get_list(e.detail.value.keywords,'is_init');
  },
  get_list(keywords,is_init) {
    if(!this.data.loading_state) {
      return false;
    }
    let data = {};
    let url = '';
    if (this.data.activity_id) {
      data = {
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        ActivityId: this.data.activity_id,
        KeyWords: keywords ? keywords : ''
      }
      url = '/api/Activity/GetActivityEnrollList';
    }else if(this.data.community_id&&!this.data.leader) {
      data = {
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        CommunityId: this.data.community_id,
        // State: '',
        KeyWords: keywords ? keywords : ''
      }
      url = '/api/community/GetCommunityUserList';
    } else if (this.data.community_id && this.data.leader) {
      data = {
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        CommunityId: this.data.community_id
      }
      url = '/api/community/GetCommunityLeaderList';
    }
    

    $http.request(true,url,data,(res)=>{
      let list = this.data.list;
      this.setData({
        list: is_init == 'is_init'?res.data : [...list,...res.data],
        page: this.data.page++
        });
      if(res.data.length<this.data.page_size) {
        this.setData({ loading_state: false});
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.activity_id) {
      this.setData({ activity_id: options.activity_id });
      this.get_list();
    } else if (options.community_id&&!options.leader) {
      this.setData({ community_id: options.community_id });
      this.get_list();
      wx.setNavigationBarTitle({
        title: '社团成员',
      })
    } else if (options.community_id && options.leader) {
      this.setData({ community_id: options.community_id, leader: options.leader});
      this.get_list();
      wx.setNavigationBarTitle({
        title: '名人馆',
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onPageScroll: function (e) {
    if (e.scrollTop > 0) {
      this.setData({
        search_shadow: true
      });
    } else {
      this.setData({
        search_shadow: false
      });
    }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.get_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})