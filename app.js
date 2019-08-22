//app.js
var util = require("/utils/util.js");
const $http = require("/utils/request.js");
App({
  onLaunch: function () {
    this.get_acticity_class();
    this.get_activity_status();
    this.get_near_list();
    this.get_community_tag();
    this.get_community_sort();
  },

  // 获取活动分类
  // "TypeCode": "01",
  // "TypeName": "运动与健康"
  get_acticity_class() {
    $http.request(false,'/api/activity/GetActivityClassList',{},(res)=>{
      this.globalData.acticity_class = res.data;

    });
  },
  // 获取活动状态
  // "StatusCode": "00",
  // "StatusName": "未开始"
  get_activity_status() {
    $http.request(false, '/api/Activity/GetActivityStatusList', {}, (res) => {
      this.globalData.activity_status = res.data;

    });
  },

  // 获取附近列表
  // "NearByCode": "00",
  // "NearByName": "全城"
  get_near_list() {
    $http.request(false, '/api/common/GetNearByList', {}, (res) => {
      this.globalData.near_list = res.data;

    });
  },

  // 获取社团标签
  // "TagCode": "01",
  // "TagName": "音乐"
  get_community_tag() {
    $http.request(false, '/api/Community/GetCommunityTagList', {}, (res) => {
      this.globalData.community_tag = res.data;

    });
  },
  // 获取社团排序
  // "SortCode": "01",
  // "SortName": "离我最近"
  get_community_sort() {
    $http.request(false, '/api/community/GetCommunitySortList', {}, (res) => {
      this.globalData.community_sort = res.data;

    });
  },

  globalData: {
    userInfo: null,
    citys: ['南昌市', '景德镇市'],
    acticity_class: [],
    activity_status: [],
    near_list: [],
    community_tag: [],
    community_sort: []
  }
})