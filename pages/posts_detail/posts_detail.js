import {content} from '../data/posts_data';

// pages/posts_detail/posts_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    postsCollected: false,
    _pid: null,
  },

  async onShare(event) {
    const res = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信'],
    });
  },

  onCollect() {
    const postsCollected = wx.getStorageSync('posts_collected');
    const flag = postsCollected[this.data._pid];
    postsCollected[this.data._pid] = !flag;
    this.data.postsCollected = !flag;
    this.setData({
      collected: !flag,
    })
    wx.setStorageSync('posts_collected', postsCollected);
    wx.showToast({
      title: this.data.postsCollected ? "收藏成功" : "取消收藏",
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postData = content[options.pid - 1];
    this.data._pid = options.pid;
    const postsCollected = wx.getStorageSync('posts_collected');
    const collected = postsCollected[this.data._pid];
    this.setData({
      collected,
      postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})