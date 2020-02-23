// pages/activity_info/activity_i.js
var $http = require("../../utils/request.js");
var app = getApp();
import util from '../../utils/util'

var WXParse = require('../../wxParse/wxParse.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    community: {},
    show_window: false,

    show_select_share: false,
    show_share: false,
    // canvas绘图
    bgImg: "",  //背景图
    dataImg: "",   //内容缩略图
    ewrImg: "",  //小程序二维码图片
    systemInfo: null,  //系统类型
    // canvasWidth: 0,   //canvas的宽
    canvasHeight: 0,   //canvas的高
    title: '',
    time: '',
    address: '',
    top: 0
  },
  store() {
    let activity = this.data.activity;
    app.store(this.data.activity.Id, '02',(res)=>{
      activity.IsStore = res.data;
      this.setData({activity});
    })
  },
  follow() {
    let community = this.data.community;
    app.follow(this.data.community.Id,'01',(res)=>{
      community.IsFollow = res.data;
      this.setData({community});
    })
  },
  to_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.get_activity(options.id)
    }
  },
  get_activity(id) {
    $http.request(true,'/api/activity/GetActivityDetails',{
      Id: id
    },(res)=>{
      let activity = res.data.activityInfo;
      if (activity.SignStartTime) {
        activity.SignStartTime = activity.SignStartTime.split(' ')[0]
      }
      if (activity.SignEndTime) {
        activity.SignEndTime = activity.SignEndTime.split(' ')[0]
      }
      if (activity.StartTime) {
        activity.StartTime = activity.StartTime.split(' ')[0]
      }
      if (activity.EndTime) {
        activity.EndTime = activity.EndTime.split(' ')[0]
      }

      let community = res.data.communityInfo;

      this.setData({
        activity,
        community,

        bgImg: community.Logo,
        dataImg: activity.CoverPic,
        title: activity.Title.length > 10 ? activity.Title.substr(0, 10) + '...' : activity.Title,
        time: activity.SignStartTime,
        address: activity.Address
      });
        const that = this;
        var temp = WXParse.wxParse('article', 'html', activity.Content, that, 5);

    })
  },

  //获取手机号
  close_get_mobile() {
    this.setData({ window_show: false });
  },
  getPhoneNumber(e) {
    app.get_code((code)=>{
      $http.request(true, '/api/user/GetWechatMobile', {
        Code: code,
        IV: e.detail.iv,
        EN: e.detail.encryptedData
      }, (res) => {
        wx.setStorageSync('mobile', res.data.phoneNumber);
        this.enroll(res.data.phoneNumber)   
      })
    })
  },
  geted_mobile(e) {
    if (!(/^1\d{10}$/.test(Number(e.detail.value.mobile)))) {
      wx.showToast({
        title: '请输入真确的手机号',
        icon: 'none'
      });
      return false;
    }
    wx.setStorageSync('mobile', e.detail.value.mobile);
    this.enroll(e.detail.value.mobile)
  },
  to_enroll() {
    if (!wx.getStorageSync('uuid')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    let mobile = wx.getStorageSync('mobile');
    if (!mobile) {
      this.setData({ show_window: true });
      return false;
    }
    this.enroll(mobile);
  },
  enroll(mobile) {
    $http.request(true, '/api/activity/ActivityEnroll', {
      Mobile: mobile,
      ActivityId: this.data.activity.Id
    }, (res,status) => {
      let activity = this.data.activity;
      switch (status) {
        case '0002':
          activity.IsEnroll = 1;
          break;
      }
      this.setData({ activity, show_window: false });
    })
  },
  select_share() {
    let show_select_share = this.data.show_select_share;
    this.setData({ show_select_share: !show_select_share });
  },
  share_friend() {},
  share_circle() {
    this.select_share();
    this.switch_share();
  },
  switch_share() {
    
    let show_share = this.data.show_share;
    this.setData({ show_share: !show_share});
    this.downloadImages()
    
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
    if(app.globalData.status.after_login) {
      this.get_activity(activity.Id)
    }
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

  share(sharetype) {
    let activity = this.data.activity;
    app.share(activity.Id, activity.Title, '', '/pages/activity_info/activity_info?id=' + activity.Id, '02', sharetype);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.share('Wechat');
    this.select_share()
    return {
      title: '活动详情',
      desc: this.data.activity.Title,
      path: '/pages/activity_info/activity_info?id=' + this.data.activity.Id,
    }
  },
  downloadImages: function () {
    
    let that = this;

    wx.downloadFile({  //背景图
      url: that.data.bgImg,
      success: function (res) {

        wx.downloadFile({  //内容缩略图
          url: that.data.dataImg,
          success: function (res1) {

            that.convas(res.tempFilePath, res1.tempFilePath, '../../assets/think.png');
            wx.downloadFile({
              url: that.data.ewrImg,
              success: function (res2) {//  小程序二维码图

                that.convas(res.tempFilePath, res1.tempFilePath, res2.tempFilePath);
              },
              fail: function () {
                
              }
            });
          }
        });
      },
    })
    
  },
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle('transparent')
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)
    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
  },
  convas: function (bgImg, dataImg, ewrImg) {

    let that = this;
    let activity = this.data.activity;
    let community = this.data.community;
    wx.getSystemInfo({
      success(res) {
        that.setData({ 
          systemInfo: {
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight,
            screenHeight: res.screenHeight
          } 
        })
      }
    })

    var ctx = wx.createCanvasContext('myCanvas');

    var scWidth = that.data.systemInfo.windowWidth - 40;
    var scHeight = that.data.systemInfo.windowHeight - 100;
    var defaultHeight = 0.020 * that.data.systemInfo.screenHeight;
    var imgHeight = (scWidth - 20) * 0.618;

    that.setData({ canvasHeight: imgHeight + 235 + defaultHeight });
    that.roundRect(ctx, 0, 0, scWidth, scHeight, 6)

    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, scWidth, scHeight);

    ctx.save()
    ctx.arc(30, 30, 20, 0,Math.PI * 2, false);
    ctx.clip()
    ctx.drawImage(bgImg, 10, 10, 40, 40);
    ctx.restore();

    ctx.setFontSize(0.04 * scWidth)
    ctx.setFillStyle('#ff9d20')
    ctx.setTextAlign('left')
    ctx.fillText(community.FullName, 60, 25)
    ctx.setFontSize(0.03 * scWidth)
    ctx.setFillStyle('#1a1a1a')
    ctx.setTextAlign('left')
    ctx.fillText("邀请你一起来参加活动，快来报名吧~", 60, 45)
    //第一步：刻画背景图
    //  ctx.drawImage(bgImg, 0, 0, scWidth, scHeight);
    //第二步：刻画背景色
    //  ctx.setFillStyle('white');
    //  ctx.fillRect(0, 0, scWidth - 40, scHeight - 60);
    //第三步：刻画内容缩略图
    //  var imgHeight = parseInt(this.imageProportion());
    // var imgHeight = (scWidth - 20)*0.618;
    ctx.drawImage(dataImg, 10, 60, scWidth-20, imgHeight);
    //第三步：刻画标题
    //  ctx.setFontSize(0.056 * scWidth);
    //  ctx.setFillStyle('#333333');
    //  ctx.setTextAlign('center');
    //  ctx.fillText("食物美容，远离肌肤衰老", (scWidth) / 2, imgHeight + 63 + defaultHeight);
    //第四步：刻画内容;(备注：canvas好像没有自动换行，有需要此步骤的同学，可根据canvas宽度，设置文字个数)
    ctx.setFontSize(0.044 * scWidth)
    ctx.setFillStyle('#1a1a1a');
    ctx.setTextAlign('left');
    ctx.fillText(that.data.title, 10, imgHeight + 70 + defaultHeight);
    ctx.setFontSize(0.04 * scWidth)
    ctx.setFillStyle('#333333');
    ctx.setTextAlign('left');
    ctx.fillText(that.data.time, 32, imgHeight + 95 + defaultHeight);
    ctx.fillText(that.data.address, 32, imgHeight + 120 + defaultHeight);

    ctx.drawImage('../../assets/time.png', 10, imgHeight + 83 + defaultHeight, 16, 16)
    ctx.drawImage('../../assets/address.png', 10, imgHeight + 108 + defaultHeight, 16, 16)



    //  ctx.fillText("，抗衰老工程也正式展开。", 35, imgHeight + 175 + defaultHeight);
    //  第五步：刻画小程序码

    ctx.drawImage(ewrImg, (scWidth / 2) - 40, imgHeight + 130 + defaultHeight, 80, 80);
    //第六步：提示用户，长按图片下载或分享
    ctx.setFontSize(0.03 * scWidth)
    ctx.setFillStyle('#999999')
    ctx.setTextAlign('center');
    ctx.fillText('长按码查看详情', scWidth / 2, imgHeight + 225 + defaultHeight);
    that.setData({
      top: (that.data.systemInfo.windowHeight - (imgHeight + 225 + defaultHeight)) / 2,
    })

    //  ctx.fillText('小程序名字', 165, imgHeight + 280 + defaultHeight);
    //第七步将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
    ctx.draw(false, function (e) {
      //第八步：生成图片并预览
      //  that.imageGeneratePreview();

    });


  },
  imageGeneratePreview: function () {
    let that = this;
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
    wx.canvasToTempFilePath({
      width: this.data.windowWidth,
      height: this.data.screenHeight,
      destWidth: (this.data.systemInfo.windowWidth - 20)*3,
      destHeight: this.data.canvasHeight*3,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res)
        //预览图片
        wx.previewImage({
          urls: res.tempFilePath.split(','),   // 需要预览的图片http链接列表
          fail: function (res) {
            console.log("预览图片失败" + res)

          }
        })

      },
      fail: function (res) {
        console.log("出错了:" + JSON.stringify(res));

      }, complete: function () {
        wx.hideLoading();

      }
    })
    this.share('WechatMoments');
  },
})