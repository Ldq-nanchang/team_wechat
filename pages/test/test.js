// pages/test/test.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "",  //背景图
    dataImg: "http://47.104.176.104:808/Uploads/image/20190824/41539248386847_posterimage4.jpg",   //内容缩略图
    ewrImg: "http://47.104.176.104:808/Upload/WX/20190830101218061_wx3bd5d28649a77b1e.o6zAJs6BzGREOCpcDoD1RrnFSRlA.3sw9EdCGRgLaa5116e590c6320b154cdb163164b5d45.jpg",  //小程序二维码图片
    systemInfo: null,  //系统类型
    canvasWidth: '100%',   //canvas的宽
    canvasHeight: '100%'   //canvas的高
  },
    convas: function(bgImg, dataImg, ewrImg) {
         let that = this;

        wx.getSystemInfo({
          success(res) {
            that.setData({ systemInfo: res})
          }
        })

         var ctx = wx.createCanvasContext('myCanvas');

         var scWidth = that.data.systemInfo.windowWidth;
         var scHeight = that.data.systemInfo.screenHeight;
         var defaultHeight = 0.020 * that.data.systemInfo.screenHeight;
        
        ctx.drawImage(ewrImg, 0, 0, 40, 40);

        ctx.setFontSize(0.04 * scWidth)
        ctx.setFillStyle('#ff9d20')
        ctx.setTextAlign('left')
        ctx.fillText("新麦教育",50,15)
        ctx.setFontSize(0.03 * scWidth)
        ctx.setFillStyle('#1a1a1a')
        ctx.setTextAlign('left')
        ctx.fillText("邀请你一起来参加活动，快来报名吧~", 50, 35)
         //第一步：刻画背景图
        //  ctx.drawImage(bgImg, 0, 0, scWidth, scHeight);
         //第二步：刻画背景色
        //  ctx.setFillStyle('white');
        //  ctx.fillRect(0, 0, scWidth - 40, scHeight - 60);
         //第三步：刻画内容缩略图
        //  var imgHeight = parseInt(this.imageProportion());
          var imgHeight = 150;
         ctx.drawImage(dataImg, 0, 50, scWidth - 40, imgHeight);
         //第三步：刻画标题
        //  ctx.setFontSize(0.056 * scWidth);
        //  ctx.setFillStyle('#333333');
        //  ctx.setTextAlign('center');
        //  ctx.fillText("食物美容，远离肌肤衰老", (scWidth) / 2, imgHeight + 63 + defaultHeight);
         //第四步：刻画内容;(备注：canvas好像没有自动换行，有需要此步骤的同学，可根据canvas宽度，设置文字个数)
         ctx.setFontSize(0.044 * scWidth)
         ctx.setFillStyle('#1a1a1a');
         ctx.setTextAlign('left');
         ctx.fillText("【一元抢398元英语启蒙课】Hita...", 0, imgHeight + 70 + defaultHeight);
         ctx.setFontSize(0.04 * scWidth)
         ctx.setFillStyle('#333333');
         ctx.setTextAlign('left');
         ctx.fillText("08-12 18:00", 28, imgHeight + 95 + defaultHeight);
         ctx.fillText("线上活动", 28, imgHeight + 120 + defaultHeight);

      ctx.drawImage('../../assets/time.png', 0, imgHeight + 83 + defaultHeight, 16, 16)
      ctx.drawImage('../../assets/address.png', 0, imgHeight + 108 + defaultHeight, 16, 16)



        //  ctx.fillText("，抗衰老工程也正式展开。", 35, imgHeight + 175 + defaultHeight);
       //  第五步：刻画小程序码
      console.log(that.data, that.data.canvasWidth)
      ctx.drawImage('../../assets/think.png', (that.data.canvasWidth/2) - 40, imgHeight + 130 + defaultHeight, 80, 80);
         //第六步：提示用户，长按图片下载或分享
         ctx.setFontSize(0.03 * scWidth)
         ctx.setFillStyle('#999999')
         ctx.setTextAlign('center');
      ctx.fillText('长按码查看详情', that.data.canvasWidth / 2, imgHeight + 225 + defaultHeight);
        //  ctx.fillText('小程序名字', 165, imgHeight + 280 + defaultHeight);
         //第七步将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中

         ctx.draw(false, function (e) {
           console.log(e)
             //第八步：生成图片并预览
            //  that.imageGeneratePreview();
      
    });
    
  },
   imageGeneratePreview: function() {
         let that = this;
         //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
         wx.canvasToTempFilePath({
             width: this.data.systemInfo.windowWidth,
             height: this.data.systemInfo.screenHeight,
             destWidth: this.data.systemInfo.windowWidth * 3,
             destHeight: this.data.systemInfo.screenHeight * 3,
             canvasId: 'myCanvas',
             success: function(res) {
                 //预览图片
                 wx.previewImage({
                     urls: res.tempFilePath.split(','),   // 需要预览的图片http链接列表
                     fail: function(res) {
                         console.log("预览图片失败" + res)
            
          }
         })
        
      },
             fail: function(res) {
                 console.log("出错了:" + JSON.stringify(res));
        
      }, complete: function () {
                 wx.hideLoading();
        
      }
     })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.domH('.canvas-wrapper',(rect)=>{
      this.setData({
        canvasWidth: rect.width,
        canvasHeight: rect.height
      })
      this.convas(this.data.bgImg, this.data.dataImg, this.data.ewrImg);
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