// pages/search_before/search_before.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: []
  },
  search(e) {
    let word = e.detail.value.keywords;
    let keywords = this.data.keywords;
    for (let i = 0; i < keywords.length;i++) {
      if (keywords[i]==word) {
        keywords.splice(i,1);
      }
    }
    keywords.unshift(word);

    wx.setStorageSync('keywords', keywords.join())

    wx.redirectTo({
      url: '/pages/search/search?keywords='+e.detail.value.keywords,
    })
  },
  to_search(e) {
    wx.navigateTo({
      url: '/pages/search/search?keywords=' + e.currentTarget.dataset.item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ keywords: wx.getStorageSync('keywords') ? wx.getStorageSync('keywords').split(','):[]});
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