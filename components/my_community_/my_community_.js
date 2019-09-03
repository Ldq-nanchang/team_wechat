// components/my_community_/my_community_.js
var $http = require('../../utils/request');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hive_community: 1,
    community: {},
    authorize: {},
    get_mobile_btn: false
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      // this.get_my_community();
      if (wx.getStorageSync('mobile')) {
        this.setData({ get_mobile_btn: false });
      } else {
        this.setData({ get_mobile_btn: true });
      }
    },
    hide() { },
    resize() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber(e) {
      app.get_code((code) => {
        $http.request(true, '/api/user/GetWechatMobile', {
          Code: code,
          IV: e.detail.iv,
          EN: e.detail.encryptedData
        }, (res) => {
          wx.setStorageSync('mobile', res.data.phoneNumber);
          this.to_add_community();
        })
      })
    },
    to_add_community() {
      let community = {};
      let community_ = this.data.community;
      let authorize = this.data.authorize;
      if (this.data.hive_community==-1) {
        community = {
          Id: '',
          Logo: '',
          CoverPic: '',
          FullName: '',
          Description: '',
          Mobile: wx.getStorageSync('mobile'),
          Province: '',
          ProvinceName: '',
          City: '',
          CityName: '',
          Address: '',
          SchoolId: '',
          SchoolName: '',
          Tag: '',
          TagName: '',
          IsAudit: 0
        }
      } else if (this.data.hive_community == 1) {
        community = {
          Id: community_.Id,
          Logo: community_.Logo,
          CoverPic: community_.CoverPic,
          FullName: community_.FullName,
          Description: community_.Description,
          Mobile: authorize.PresidentPhone,
          Province: community_.Province,
          ProvinceName: community_.ProvinceName,
          City: community_.City,
          CityName: community_.CityName,
          Address: community_.Address,
          SchoolId: community_.SchoolId,
          SchoolName: community_.SchoolName,
          Tag: community_.Tag,
          TagName: community_.TagName,
          IsAudit: community_.IsAudit
        }
      }

      app.globalData.community = community;
      wx.navigateTo({
        url: '/pages/add_community/add_community',
      })
    },
    to_authorize() {
      let authorize = this.data.authorize;
      let community = this.data.community;
      if (this.data.authorize.Id&&!this.data.authorize.IsAudit) {
          wx.showToast({
            title: '审核中...',
            icon: 'none'
          })
          return false;
      }
      app.globalData.authorize = {
        Mobile: authorize.PresidentPhone,
        PresidentName: authorize.PresidentName,
        CommunityId: community.Id,
        CommunityName: community.FullName,
        FrontIdCard: authorize.FrontIdCard,
        BackIdCard: authorize.BackIdCard
      }
      wx.navigateTo({
        url: '/pages/auth/auth',
      })

    },
    get_my_community() {
      $http.request(true,'/api/my/MyAddCommunity',{},(res)=>{
        if (res.data.communityInfo && res.data.communityInfo.Id) {

          let community = res.data.communityInfo;
          
          community.CreatorTime = community.CreatorTime.split(' ')[0];
          community.ValidityTime = community.ValidityTime.split(' ')[0];
          community.tags = community.TagName ? community.TagName.split(','):[];
          
          let authorize = res.data.authorizeInfo;
          authorize.AuditDate = authorize.AuditDate ? authorize.AuditDate.split(' ')[0] : '';  
          
          this.setData({
            hive_community: 1,
            community,
            authorize,
          })
        }else {
          this.setData({hive_community: -1});
        }
        app.globalData.status.init_my_community = false;
      })
    },
    to_cancel_community() {
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确定解散该社团吗？',
        confirmColor: '#ff9d20',
        success(res) {
          if (res.confirm) {
            that.cancel_community()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    cancel_community() {
      console.log('解散');
      $http.request(true,'/api/Community/DeleteCommunity',{
        CommunityId: this.data.community.Id
      },()=>{
        wx.switchTab({
          url: '/pages/my/my',
        });
      })
    }
  }
})
