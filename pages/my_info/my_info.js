// pages/my_info/my_info.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personal: {},
    sex: '男',
    date: '',
  },

  updata_img() {
    let that = this;
    let personal = this.data.personal;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        app.updata_img(tempFilePaths, (res_) => {
          personal.HeadPic = res_[0].Url;
          that.setData({ personal })
        })
      }
    })
  },
  sex_change(e) {
    this.setData({ sex: e.detail.value});
  },
  bindDateChange(e) {
    this.setData({ date: e.detail.value});
  },
  save_my_info(e) {
    console.log(e.detail.value)
    if (!e.detail.value.nick_name) {
      wx.showToast({
        title: '请填写昵称',
        icon: 'none'
      });
      return false;
    }
    if (!e.detail.value.user_name) {
      wx.showToast({
        title: '请填写用户名',
        icon: 'none'
      });
      return false;
    }
    if (this.data.date =='请选择') {
      wx.showToast({
        title: '请选择生日',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sex) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return false;
    }
    if (!e.detail.value.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      });
      return false;
    }
    $http.request(true,'/api/my/SaveMyInfo',{
      HeadPic: this.data.personal.HeadPic,
      NickName: e.detail.value.nick_name,
      TrueName: e.detail.value.user_name,
      Birthday: this.data.date,
      Sex: this.data.sex,
      Mobile: e.detail.value.mobile
    },()=>{
        wx.switchTab({
          url: '/pages/my/my',
        })
    })

  },
  get_personal() {
    $http.request(true, '/api/my/MyInfo', {
      UserId: wx.getStorageSync('uuid')
    }, (res) => {
      let date = res.data.Birthday?res.data.Birthday.split(' ')[0]:'请选择';
      let sex = res.data.Sex;
      this.setData({ personal: res.data, date});
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_personal()
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