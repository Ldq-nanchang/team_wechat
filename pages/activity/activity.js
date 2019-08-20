// pages/activity/activity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: [],
    condition_edit: {
      NearBy: '',
      Category: '',
      Status: ''
    },
    type_: ''
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
        Category: condition[0].condition_code,
        Status: condition[2].condition_code,
        // GroupCode: that.data.condition_edit.GroupCode,
        // TagCode: that.data.condition_edit.TagCode,
      }
    })
    console.log(that.selectComponent("#activityList"))
    that.selectComponent("#activityList").init_list(that.data.condition_edit);
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
        condition_name: '分类',
        condition_value: []
      },
      {
        condition_code: '',
        condition_name: '附近',
        condition_value: []
      },

      {
        condition_code: '',
        condition_name: '状态',
        condition_value: []
      },
    ];
    for (let item of app.globalData.near_list) {
      condition[1].condition_value.push({
        ItemName: item.NearByName,
        ItemCode: item.NearByCode
      })
    }
    for (let item of app.globalData.acticity_class) {
      condition[0].condition_value.push({
        ItemName: item.TypeName,
        ItemCode: item.TypeCode
      })
    }
    for (let item of app.globalData.activity_status) {
      condition[2].condition_value.push({
        ItemName: item.StatusName,
        ItemCode: item.StatusCode
      })
    }
    this.setData({ condition })
    console.log(this.data.condition, app.globalData)
  },
  get_list() {
    this.selectComponent('#activityList').get_list();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({ type_: options.type})
    }
    this.init_condition()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})