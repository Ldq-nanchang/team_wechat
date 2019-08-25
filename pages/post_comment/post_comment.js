// pages/post_comment/post_comment.js
const app = getApp();
var $http = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    img_list: [],
    file_id: '',
    community: {id:'',name:''}
  },

  get_comment(e) {
    this.setData({comment: e.detail.value})
    console.log(this.data.comment)
  },
  // 上传图片
  updata_img_list(e) {
    let item = e.currentTarget.dataset.item ? e.currentTarget.dataset.item: {};
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths.splice(0, 9 - that.data.img_list.length);

        app.updata_img(tempFilePaths,(res_)=>{
          
          if(!item.Id) {
            that.add_img(res_);
          }else {
            that.change_img(res_,item);
          }
        })
      }
    })
  },
  // 添加图片
  add_img(res) {
    let img_list = [...this.data.img_list,...res];
    this.setData({ img_list});
  },
  // 修改图片
  change_img(res,item) {
    let img_list = this.data.img_list;
    for(let i=0;i<img_list.length;i++) {
      if (img_list[i].Id == item.Id) {
        img_list[i] = res[0];
      }
    }
    this.setData({img_list});
  },
  del_img(e) {
    console.log(e.currentTarget.dataset.id)
    let img_list = this.data.img_list;
    for(let i=0;i<img_list.length;i++) {
      if(img_list[i].Id == e.currentTarget.dataset.id) {
        img_list.splice(i,1);
      }
    }
    this.setData({img_list});
  },
  post_comment() {
    let that = this;
    let file = '';
    if(this.data.img_list.length>0) {
      for(let item of this.data.img_list) {
        file = file + item.Id;
      }
    }
    if (!this.data.community.id) {
      wx.showToast({
        title: '请选择社团',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!this.data.comment&&!file) {
      wx.showToast({
        title: '请填写内容或者上传图片',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    $http.request(true,'/api/Community/SaveCommunityCycle',{
      Title: that.data.comment,
      CommunityId: that.data.community.id,
      FileId: file
    },(res)=>{
      console.log(res);
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let community = {
          id: options.id,
          name: options.name
        };
    if (options.id) {
      this.setData({
        community
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