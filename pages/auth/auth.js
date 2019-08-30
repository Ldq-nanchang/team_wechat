// pages/auth/auth.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorize: {}
  },
  updata_img(e) {
    let authorize = this.data.authorize;
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        app.updata_img(tempFilePaths, (res_) => {
          console.log(res_[0].Url);
          if (e.currentTarget.dataset.keyword == 'front') {
            authorize.FrontIdCard = res_[0].Url;
          } else if (e.currentTarget.dataset.keyword == 'back') {
            authorize.BackIdCard = res_[0].Url;
          }
          that.setData({ authorize });

        })
      }
    })
  },
  post_form(e) {
    let authorize = this.data.authorize;
    authorize.PresidentName = e.detail.value.authorize_name;
    authorize.Mobile = e.detail.value.mobile;

    if (!authorize.PresidentName) {
      wx.showToast({
        title: '请填写社长姓名',
      });
      return false;
    }
    if (!authorize.Mobile) {
      wx.showToast({
        title: '请填写社长手机号',
      });
      return false;
    }
    if (!authorize.FrontIdCard) {
      wx.showToast({
        title: '请上传身份证正面',
      });
      return false;
    }
    if (!authorize.BackIdCard) {
      wx.showToast({
        title: '请上传身份证反面',
      });
      return false;
    }
    this.setData({authorize});
    $http.request(true,'/api/Community/AuthCommunity',this.data.authorize,()=>{
      app.globalData.status.init_my_community = true;
      wx.navigateBack();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({authorize: app.globalData.authorize});
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