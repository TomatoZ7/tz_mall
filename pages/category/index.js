// pages/category/index.js
// 引入 发送请求的方法
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 左侧菜单点击
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  
  // 获取左侧分类栏数据
  getCates(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(res=>{
      this.cates = res.data.message;
      // 构造左侧滚动栏数据
      let leftMenuList = this.cates.map(v=>v.cat_name);
      // 构造右侧商品栏数据
      let rightContent = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      });
    })
  },
})