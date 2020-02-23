// pages/citys/citys.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alphabet: [],
    toView: 'A'
  },
  get_list() {
    $http.request(true,'/api/common/GetSelectCityList',{},(res)=>{
      let list = [];
      Object.keys(res.data).forEach((key)=>{
        list.push({
          initial: key,
          cells: res.data[key]
        })
      });
      this.setData({ alphabet: list})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_list()
  },
  onChange(e) {
    this.setData({ toView: e.detail.name})
  },
  select_city(e) {
    console.log(e.currentTarget.dataset.item);
    let item_click = e.currentTarget.dataset.item;
    let hive = false;

    for(let item of app.globalData.citys_code) {
      if (item == item_click.Code) {
        hive = true;
        break;
      }
    }
    if(hive) {
      app.globalData.select_city = {
        Name: item_click.Name,
        Code: item_click.Code
      }
      wx.navigateBack()
    }else {
      wx.showToast({
        title: '该城市没有社团',
        icon: 'none',
        success() {
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }
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