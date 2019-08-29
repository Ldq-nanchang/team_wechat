// pages/add_community/add_community.js
var $http = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    community: {},
    multiArray: [[], []],
    multiIndex: [0, 0],

    show_school: false,
    school_list: [],

    show_targs: false,
    targs: [],
    checkbox: [],
    checkbox_: []
  },
  // 获取省市列表
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
      this.setData({ school_list: res.data, show_school: true});
    });
  },
  select_school(e) {
    let community = this.data.community;
    community.SchoolName = e.currentTarget.dataset.item.FullName;
    community.SchoolId = e.currentTarget.dataset.item.Id;
    this.setData({community,show_school: false});
  },
  close_school() {
    this.setData({show_school: false});
  },
  // 上传图片
  updata_img(e) {
    let community = this.data.community;
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        app.updata_img(tempFilePaths,(res_)=>{
          console.log(res_[0].Url);
          if (e.currentTarget.dataset.keyword=='cover') {
            community.CoverPic = res_[0].Url;
          } else if (e.currentTarget.dataset.keyword == 'logo') {
            community.Logo = res_[0].Url;
          }
          that.setData({ community });

        })
      }
    })
  },
  // 获取标签列表
  // 显示标签列表
  updata_targs(list) {

    for (let item of list) {

      if (this.data.checkbox.length == 2) {
        if (item.TagCode == this.data.checkbox[0] || item.TagCode == this.data.checkbox[1]) {
          item.disable = false;
        } else {
          item.disable = true;
        }
      } else {
        item.disable = false;
      }
    }
    this.setData({ targs: list, show_targs: true });
  },
  show_targs() {
    if(this.data.targs.length<1) {
      $http.request(true,'/api/Community/GetCommunityTagList',{},(res)=>{
        this.updata_targs(res.data)
      })
    }else {
      this.setData({show_targs: true});
    }
  },
  close_targs() {
    this.setData({ show_targs: false });
    console.log(this.data.checkbox.join(','), this.data.checkbox_.join(','));
    let community = this.data.community;
    community.Tag = this.data.checkbox.join(',');
    community.TagName = this.data.checkbox_.join(',');
    this.setData({community})
  },
  onChange(e) {
    let tag_name = [];
    for (let item of e.detail.selectedIndex) {
      tag_name.push(e.detail.cols[item].title)
    }
    this.setData({ checkbox: e.detail.selectedValue, checkbox_: tag_name})
    this.updata_targs(this.data.targs);

  },


  // 提交创建社团
  post_form(e) {
    let community = this.data.community;
    let that = this;
    community.FullName = e.detail.value.community_name;
    community.Address = e.detail.value.address;
    community.Description = e.detail.value.des;
    this.setData({community});
    if (!community.CoverPic) {
      wx.showToast({
        title: '请选择封面图',
        icon: 'none'
      });
      return false;
    }
    if (!community.Logo) {
      wx.showToast({
        title: '请选择LOGO',
        icon: 'none'
      });
      return false;
    }
    if (!community.FullName) {
      wx.showToast({
        title: '请输入社团名称',
        icon: 'none'
      });
      return false;
    }
    if (!community.City) {
      wx.showToast({
        title: '请选择城市',
        icon: 'none'
      });
      return false;
    }
    if (!community.Address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      });
      return false;
    }
    if (!community.Description) {
      wx.showToast({
        title: '请输入简介',
        icon: 'none'
      });
      return false;
    }
    console.log(that.data.community)
    return;
    $http.request(true,'/api/Community/SaveCommunity',that.data.community,(res)=>{
      wx.navigateBack();
    });

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
      if (this.data.community.Tag) {
        this.setData({ 
          checkbox: this.data.community.Tag.split(','),
          checkbox_: this.data.community.TagName.split(','),
        })
      }
      
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