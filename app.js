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
  get_code(callback) {
    wx.login({
      success(res) {
        if (res.code) {
          if(typeof callback == 'function') {
            callback(res.code)
          }
          // wx.setStorageSync('code', res.code)
        }
      }
    })
  },

  // 图片上传
  updata_img(tempFilePaths,callback) {
    let that = this;
    console.log(tempFilePaths)
    async function uploadImg(tempFilePaths) {
      let uploadedImgs = await localImgs2webImgs(tempFilePaths);
      // 使用上传成功之后的在线图片
      console.log(uploadedImgs);

    };
    const localImgs2webImgs = (localImgs = tempFilePaths) => {
      console.log(localImgs)
      // 上传的后端url
      const url = that.globalData.host + '/api/Common/UploadFile';
      // 因为多张图片且数量不定，这里遍历生成一个promiseList
      let promiseList = localImgs.map((item) => {
        return new Promise(resolve => {
          wx.uploadFile({
            url,
            filePath: item,
            name: 'images[]',
            success: (res) => {
              const data = JSON.parse(res.data).data[0];
              resolve(data);
            }
          });
        });
      });
      // 使用Primise.all来执行promiseList
      const result = Promise.all(promiseList).then((res) => {
        // 返回的res是个数据，对应promiseList中请求的结果，顺序与promiseList相同
        // 在这里也就是在线图片的url数组了
        if (typeof callback == 'function') {
          console.log(res)
          callback(res)
        }
        console.log(res)

        return res;
      }).catch((error) => {
        console.log(error);
      });
      console.log(result)

      return result;
    };
    uploadImg()
  },
  // 点赞
  prize(id,callback) {
    $http.request(true,'/api/Common/SavePrize',{Id: id},(res)=>{
      if(typeof callback == 'function') {
        callback(res);
      }
    })
  },
  // 关注
  follow(id, type_id, callback) {
    $http.request(true, '/api/Common/SaveFollow', { Id: id, ObjectCode: type_id }, (res) => {
      if (typeof callback == 'function') {
        callback(res);
      }
    })
  },

  // 收藏
  store(id, type_id, callback) {
    $http.request(true, '/api/Common/SaveStore', { Id: id, ObjectCode: type_id }, (res) => {
      if (typeof callback == 'function') {
        callback(res);
      }
    })
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
      res.data.unshift({
        StatusCode: '',
        StatusName: '全部'
      })
      this.globalData.activity_status = res.data;

    });
  },

  // 获取附近列表
  // "NearByCode": "00",
  // "NearByName": "全城"
  get_near_list() {
    $http.request(false, '/api/common/GetNearByList', {}, (res) => {
      // res.data.unshift({
      //   NearByCode: '',
      //   NearByName: '全部'
      // })
      this.globalData.near_list = res.data;
    });
  },

  // 获取社团标签
  // "TagCode": "01",
  // "TagName": "音乐"
  get_community_tag() {
    $http.request(false, '/api/Community/GetCommunityTagList', {}, (res) => {
      res.data.unshift({
        TagCode: '',
        TagName: '全部'
      })
      this.globalData.community_tag = res.data;
    });
  },
  // 获取社团排序
  // "SortCode": "01",
  // "SortName": "离我最近"
  get_community_sort() {
    $http.request(false, '/api/community/GetCommunitySortList', {}, (res) => {
      res.data.unshift({
        SortCode: '',
        SortName: '全部'
      })
      this.globalData.community_sort = res.data;
    });
  },

  globalData: {
    host: 'http://47.104.176.104:806',
    userInfo: null,

    citys: ['南昌市', '景德镇市'],
    acticity_class: [],
    activity_status: [],
    near_list: [],
    community_tag: [],
    community_sort: [],
    // 新增或编辑我的社团
    community: {},
    // province: [],

    // 认证社长
    authoriza: {},

    status: {
      // 创建编辑社团后刷新 我的社团数据
      init_my_community: false,
      // 登录后回退更新界面
      after_login: false
    }
  }
})