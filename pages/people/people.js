// pages/people/people.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading_state: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '社团列表',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff9d20',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
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
   * 获取社团列表
   */
  get_list: function() {

    setTimeout(()=>{
      this.selectComponent('#peopleList').get_list(['','','']);
      
      if (this.selectComponent('#peopleList').people_list.length>9) {
        this.setData({
          loading_state: false
        });
      }

    },1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('sss')
    if (this.data.loading_state) {
     
      this.get_list();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})