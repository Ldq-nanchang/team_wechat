// pages/information_info/information.js
var util = require("../../utils/util.js");
const $http = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id) {
      this.get_information(options.id,options.type)
    }
  },
  get_information(id,type) {
    console.log(type)
    let url = '/api/information/GetInformationDetails';
    if (type=='is_notice') {
      url = '/api/community/GetCommunityDetails';
    } else if (type == 'is_community') {
      url = '/api/community/GetCommunityInformDetails';
    }
    $http.request(true,url,{
      Id: id
    },(res)=>{
      console.log(res.data);
      res.data.date = util.timeTransform(res.data.PublishDate)
      this.setData({
        information: res.data
      })
    })
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