// pages/people/people.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: {},
    condition: [],
    condition_edit: {
      NearBy: '',
      Tag: '',
      SortCode: ''
    }
  },
  to_city_list() {
    wx.navigateTo({
      url: '/pages/citys/citys',
    })
  },
  to_search_before() {
    wx.navigateTo({
      url: '/pages/search_before/search_before',
    })
  },
  // 条件筛选
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为',e.target.id, e.detail.value,e)
    let index = Number(e.target.id);
    let index_ = Number(e.detail.value);

    let that = this;
    let condition = that.data.condition;

    condition[index].condition_name = condition[index].condition_value[index_].ItemName;
    condition[index].condition_code = condition[index].condition_value[index_].ItemCode;
    that.setData({
      condition,
      condition_edit: {
        NearBy: condition[1].condition_code,
        Tag: condition[0].condition_code,
        SortCode: condition[2].condition_code,
        // GroupCode: that.data.condition_edit.GroupCode,
        // TagCode: that.data.condition_edit.TagCode,
      }
    })
    console.log(that.data.condition,that.data.condition_edit)

    that.selectComponent("#peopleList").init_list(that.data.condition_edit);
  },
  /**
   * 获取子组件传来的condition
   */
  // getCondition(e) {
  //   this.setData({
  //     condition: e.detail.condition
  //   })
  // },
  // updataCondition(e) {
  //   this.setData({
  //     condition_edit: e.detail.condition_edit
  //   })
  // },
  init_condition() {
    let condition = [

      {
        condition_code: '',
        condition_name: '标签',
        condition_value: []
      },
      {
        condition_code: '',
        condition_name: '附近',
        condition_value: []
      },
      {
        condition_code: '',
        condition_name: '排序',
        condition_value: []
      },
    ];
    for (let item of app.globalData.near_list) {
      condition[1].condition_value.push({
        ItemName: item.NearByName,
        ItemCode: item.NearByCode
      })
    }
    for (let item of app.globalData.community_tag) {
      condition[0].condition_value.push({
        ItemName: item.TagName,
        ItemCode: item.TagCode
      })
    }
    for (let item of app.globalData.community_sort) {
      condition[2].condition_value.push({
        ItemName: item.SortName,
        ItemCode: item.SortCode
      })
    }
    this.setData({condition})
    console.log(this.data.condition)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init_condition();
    this.get_list();
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
    this.setData({ city: app.globalData.select_city });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.selectComponent('#peopleList').get_list('init',this.data.condition_edit);
  },

  /**
   * 获取社团列表
   */
  get_list: function() {
    this.selectComponent('#peopleList').get_list();
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