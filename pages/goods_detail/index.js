// pages/goods_detail/index.js
// 引入 发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  //商品图片信息
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.goodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        pics: goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        // iphone部分手机 不识别webp图片格式
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },

  // 点击轮播图预览
  handlePreviewImage(e){
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current
    })
  },

  //点击加入购物车
  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      // 不存在购物车中
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo);
    }else{
      // 存在购物车中
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  }
})