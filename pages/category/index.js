// pages/category/index.js
// 引入 发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
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
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储数据并判断
    const cates = wx.getStorageSync('cates');
    if(!cates){
      this.getCates();
    }else{
      if(Date.now()-cates.time>1000*60*30){
        // 数据过期
        this.getCates();
      }else{
        this.cates = cates.data;
        // 构造左侧滚动栏数据
        let leftMenuList = this.cates.map(v=>v.cat_name);
        // 构造右侧商品栏数据
        let rightContent = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },
  
  // 获取左侧分类栏数据
  async getCates(){
    // request({url:"/categories"})
    // .then(res=>{
      // this.cates = res.data.message;
      // // 数据缓存本地
      // wx.setStorageSync('cates', {'time':Date.now(), data:this.cates});
      // // 构造左侧滚动栏数据
      // let leftMenuList = this.cates.map(v=>v.cat_name);
      // // 构造右侧商品栏数据
      // let rightContent = this.cates[0].children;
      // this.setData({
      //   leftMenuList,
      //   rightContent
      // });
    // })

    // es7
    const res = await request({url:"/categories"});
    this.cates = res;
    // 数据缓存本地
    wx.setStorageSync('cates', {'time':Date.now(), data:this.cates});
    // 构造左侧滚动栏数据
    let leftMenuList = this.cates.map(v=>v.cat_name);
    // 构造右侧商品栏数据
    let rightContent = this.cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    });
  },

  // 左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    // 构造右侧商品栏数据
    let rightContent = this.cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    });
  }
})