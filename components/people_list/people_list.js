// components/people_list/people_list.js
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
    people_list: ['', '', ''],
    stars: ['', '', '', '', '',]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_list(list) {
      let that = this;
      this.setData({
        people_list: [...that.data.people_list,...list]
      })
    }
  }
})
