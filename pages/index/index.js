//index.js
//获取应用实例
var bmap = require('../../utils/bmap-wx.js');
const app = getApp()
var $http = require("../../utils/request.js");
Page({
  data: {
    city: {},
    msgcount: 0,

    search_shadow: false,
    banners: [],
    news: [],
    community_list: ['','',''],
    stars: ['', '', '', '', ''],
  },
  to_message_list() {
    wx.navigateTo({
      url: '/pages/message_list/message_list',
    })
  },
  to_city_list() {
    wx.navigateTo({
      url: '/pages/citys/citys',
    })
  },
  to_search_before() {
    wx.navigateTo({
      url: '/pages/search_before/search_before',
    })
  },
  perview(e) {
    console.log(e.currentTarget.dataset.item)
    wx.previewImage({
      urls: [e.currentTarget.dataset.item],
    })
  },

  to_acctivity(e) {
    
    wx.navigateTo({
      url: '/pages/activity/activity?type='+e.currentTarget.dataset.type,
    })
  },
  to_new() {
    wx.navigateTo({ url: '/pages/new/new'})
  },
  to_association_info(e) {
    wx.navigateTo({
      url: '/pages/association_info/association_info?id='+e.currentTarget.dataset.id,
    })
  },
  to_map(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/map/map?address=' + item.Address + '&community=' + item.FullName
    })
  },


  //事件处理函数
  swiperChange: function (e) {
    let that = this;
    // this.setData({
    //   swiper: {
    //     des: that.data.hot[Number(e.detail.current)].des,
    //     index: Number(e.detail.current) + 1,
    //   }
    // })
  },
  onPageScroll: function (e) {
    let that = this.data;
    if (e.scrollTop > 0) {
      this.setData({
        search_shadow: true
      });
    } else {
      this.setData({
        search_shadow: false
      });
    }
    
  },
  // 获取首页顶部信息
  get_index: function() {
    $http.request(true, '/api/index/GetIndexTopList',{},(res)=>{
      app.globalData.citys_code = res.data.cityList;
      for (let item of res.data.communityList) {
        item.stars = new Array(item.Star);
        item.stars_ = new Array(5 - item.Star);
        item.tags = item.TagName.split(',');
      }
      for (let item of res.data.informList) {
        if (item.PublishDate) {
          item.PublishDate = item.PublishDate.split(' ')[0];
        }
      }

      this.setData({
        msgcount: res.data.msgCount,
        banners: res.data.advList,
        community_list: res.data.communityList,
        news: res.data.informList
      });
      wx.stopPullDownRefresh();
    })
  },
  location_before() {
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置', 
            content: '需要获取您的地理位置，请确认授权', 
            success: function (res) {
              if (res.cancel) { 
                wx.showToast({ title: '拒绝授权', icon: 'none', duration: 1000 }) 
              } else if(res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({ title: '授权成功', icon: 'success', duration: 1000 })                      
                      //再次授权，调用wx.getLocation的API
                        this.get_location();                                       
                      } else {                      
                        wx.showToast({ title: '授权失败', icon: 'none', duration: 1000 })                    
                      }                  
                    }                
                  })              
                }            
              }          
            })        
        } else if (res.authSetting['scope.userLocation'] == undefined) {
           //调用wx.getLocation的API
          this.get_location();
        }else{
          //调用wx.getLocation的API
          this.get_location();
        }
      }
      })


  },
  get_location(){
    // 获取定位地理位置
    // 新建bmap对象
    var BMap = new bmap.BMapWX({
      ak: 'yPpzXirf2qQM9HnmWZVzQ0iDbquFFZRC'
    });
    let fail = function (data) {
      console.log(data);
    };
    let success = function (data) {
      // 返回数据内，已经包含经纬度
      console.log(data);
      // 使用wxMarkerData获取数据

      var originalData = data.originalData;
      var lat = originalData.result.location.lat;
      var lng = originalData.result.location.lng;
      app.globalData.lat = lat;
      app.globalData.lng = lng;
      // 把所有数据放在初始化data内
      
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {

  },
  onLoad: function () {
    this.location_before();
    this.get_index();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.get_index();
    this.selectComponent("#activityList").init_list();
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    let that = this;
    let component = "#activityList";

    this.selectComponent(component).get_list();
  },
  onShow() {
    this.setData({ city: app.globalData.select_city});

  }

})
