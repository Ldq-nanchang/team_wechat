// components/people_list/people_list.js
var $http = require("../../utils/request.js");
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
    page: 1,
    page_size: 10,
    community_list: [],
    stars: ['', '', '', '', '',],
    loading_state: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_list() {
      if (!this.data.loading_state) {
        return false;
      }
      let that = this;
      $http.request(true,'/api/community/GetCommunityList',{
        CurrentPage: that.data.page,
        PageSize: that.data.page_size,
        City: '',
        Tag: '',
        NearBy: '',
        Lat: '',
        Lng: '',
        SortCode: ''
      },(res)=>{
        console.log(res.data)
        
        that.setData({
          community_list: [...that.data.community_list,...res.data],
          page: that.data.page++
        })
        if (res.data.length < that.data.page_size) {
          that.setData({
            loading_state: false
          })
        }
      })

    }
  }
})
