// pages/add_community/add_community.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_list: [],
    community: {},
    multiArray: [[], []],
    multiIndex: [0, 0],
    show_school: true
  },
  get_province(callback) {
    $http.request(false,'/api/common/GetSelectAreaList',{},(res)=>{
      let multiArray = this.data.multiArray;
      multiArray[0] = res.data;
      this.setData({ multiArray });
      if (typeof callback == 'function') {
        callback(res.data);
      }
    })
  },
  get_city(id,callback) {
    $http.request(false, '/api/common/GetSelectAreaList', {
      ParentId: id
    }, (res) => {
      let multiArray = this.data.multiArray;
      multiArray[1] = res.data;
      let multiIndex = this.data.multiIndex;
      multiIndex[1] = 0;
      this.setData({ multiArray, multiIndex });
      if (typeof callback == 'function') {
        callback(res.data);
      }
    })
  },

  bindMultiPickercancel(e) {
    console.log(e, this.data.multiIndex)
  },
  bindMultiPickerChange(e) {
    console.log(e, this.data.multiIndex);
  },
  bindMultiPickerColumnChange(e) {
    console.log(e.detail.column);

    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex;
    
    switch (e.detail.column) {
      case 0:
        multiIndex[0] = e.detail.value;
        this.get_city(multiArray[0][e.detail.value].Id);
        break;
      case 1:
        multiIndex[1] = e.detail.value;

        break;
    }
  },
  show_school(e) {

    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex;
    $http.request(true,'/api/common/GetSelectSchoolList',{
      City: multiArray[1][multiIndex[1]].Id,
      keyWords: e&&e.detail.value&&e.detail.value.search_word ? e.detail.value.search_word : ''
    },(res)=>{
      this.setData({ school_list: res.data, show_school: true})
    })
  },

  close_school() {
    this.setData({show_school: false})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({community: app.globalData.community});

    let multiIndex = this.data.multiIndex;

    if (this.data.community.Province && this.data.community.City) {
      this.get_province((list)=>{
        for (let key in list) {
          if (this.data.community.Province == list[key].Id) {
            multiIndex[0] = key;
          }
        }
        this.setData({ multiIndex })
      });
      this.get_city(this.data.community.Province,(list)=>{
        for (let key in list) {
          if (this.data.community.City == list[key].Id) {
            multiIndex[1] = key;
          }
        }
        this.setData({ multiIndex })
      })
      
    }else {
      this.get_province((list)=>{
        this.get_city(list[0].Id)
      });
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