// pages/map/map.js
var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },
  makertap: function (e) {
    // var that = this;
    // var id = e.markerId;
    // that.showSearchInfo(wxMarkerData, id);
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'yPpzXirf2qQM9HnmWZVzQ0iDbquFFZRC'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {

      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      console.log(that.data.latitude, that.data.longitude)
    }
    // 发起regeocoding检索请求 

    BMap.geocoding({
      address: options.address,
      fail: fail,
      success: success,
      iconPath: '../../assets/marker_red.png',
      iconTapPath: '../../assets/marker_red.png'
    });

    that.setData({
      rgcData: {
        address: options.address,
        desc: options.community ? options.community : ''
      }
    })
  },
  showSearchInfo: function (data, i) {
    var that = this;
    console.log(data)
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business
      }
    });
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