// pages/goods_list/index.js
// 引入 发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList: []
  },
  // 搜索接口请求参数
  queryParams: {
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search", data:this.queryParams});
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.queryParams.pagesize);
    this.setData({
      // 拼接数据
      goodsList: [...this.data.goodsList,...res.goods]
    })

    // 关闭下拉刷新的效果
    wx.stopPullDownRefresh();
  },

  // 标题点击事件
  handleTabsItemChange(e){
    const {index} = e.detail;
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到 data 中
    this.setData({
      tabs
    })
  },

  // 滚动条触底事件
  onReachBottom(){
    // 判断是否有下一页数据
    if(this.queryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有数据了',
      })
    }else{
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      goodsList: []
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  }
})