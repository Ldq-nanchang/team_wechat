// components/manage_member/manage_member.js
var $http = require('../../utils/request');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    check: {type: Number},
    community_id: {type: String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    page: 1,
    page_size: 10,
    loading_state: true,
    check: 0
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.setData({check: this.properties.check});
    },
    hide() { },
    resize() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    // 审核团员
    agree(e) {
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确定同意加入吗？',
        confirmColor: '#ff9d20',
        success(res) {
          if (res.confirm) {
              that.check(e.currentTarget.dataset.userid, 1)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          
        }
      })
      
    },
    refuse(e) {
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确定拒绝加入吗？',
        confirmColor: '#ff9d20',
        success(res) {
          if (res.confirm) {
            that.check(e.currentTarget.dataset.userid, 0)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    check(user_id,status) {
      // console.log(user_id, this.properties.community_id, status)
      // return;
      $http.request(true, '/api/Community/CheckCommunityUser',{
        UserId: user_id,
        CommunityId: this.properties.community_id,
        AuditStatus: status
      },()=>{
        let list = this.data.list;
        for (let i=0;i<list.length;i++) {
          if (list[i].UserId == user_id) {
            list.splice(i,1);
          }
        }
        this.setData({list});
      })
    },
    // 设置团员权限,退团员
    forbidden(e) {
      $http.request(true, '/api/Community/SaveSayStatus', { 
        UserId: e.currentTarget.dataset.item.UserId,
        CommunityId: this.properties.community_id,
        IsColse: e.currentTarget.dataset.item.IsClose?0:1
      },()=>{
        let list = this.data.list;
        for(let item of list) {
          if (e.currentTarget.dataset.item.UserId == item.UserId) {
            item.IsClose = e.currentTarget.dataset.item.IsClose?0:1
          }
        }
        this.setData({list});
      })
    },
    getout_before(e) {
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确定踢出该团员吗？',
        confirmColor: '#ff9d20',
        success(res) {
          if (res.confirm) {
            that.getout(e.currentTarget.dataset.userid)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    },
    getout(user_id) {
      $http.request(true, '/api/Community/DeleteCommunityUser', {
        CommunityId: this.properties.community_id,
        UserId: user_id
      }, () => {
        let list = this.data.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].UserId == user_id) {
            list.splice(i, 1);
          }
        }
        this.setData({ list });
      })
    },


    get_list(id, state, keywords, is_init,callback) {
      if (is_init == 'is_init') {
        this.setData({ page: 1, loading_state: true });
      }
      if (!this.data.loading_state) {
        return false;
      }

      $http.request(true,'/api/community/GetCommunityUserList',{
        CurrentPage: this.data.page,
        PageSize: this.data.page_size,
        CommunityId: id,
        State: state,
        KeyWords: keywords
      },(res)=>{

        if (is_init == 'is_init') {
          this.setData({list: res.data})
        }else {
          let list = this.data.list;
          this.setData({list: [...list,...res.data]});
        }
        this.setData({
          page: this.data.page++
        });
        if (res.data.length<this.data.page_size) {
          this.setData({ loading_state: false});
        }
        if (typeof callback == 'function') {
          callback();
        }
      });
    },
  }
})
