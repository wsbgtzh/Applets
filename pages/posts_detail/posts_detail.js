const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    postsCollected: false,
    _pid: null,
    _mgr: null,
  },

  onMusic(event) {
    const mgr = this.data._mgr;
    app.isPlaying = !app.isPlaying;
    mgr.onPlay(() => {
      app.isPlaying = true;
      this.setData({
        is_playing: app.isPlaying,
      });
    });
    mgr.onPause(() => {
      app.isPlaying = false;
      this.setData({
        is_playing: app.isPlaying,
      });
    });
    const pid = this.data._pid - 1;
    mgr.title = this.data.postData.music.title;
    if (app.isPlaying === false)
      mgr.pause();
    else mgr.src = this.data.postData.music.url; 
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
    let postData = {}
    wx.request({
      url: 'http://127.0.0.1:8000/api/posts/' + options.pid + '/',
      success: res=> {
        postData = res.data
        this.data._mgr = wx.getBackgroundAudioManager();
        this.data._pid = options.pid;
        const postsCollected = wx.getStorageSync('posts_collected');
        const collected = postsCollected[this.data._pid];
        this.data._mgr.onPlay(() => {
          app.isPlaying = true;
          this.setData({
            is_playing: app.isPlaying,
          });
        });
        this.data._mgr.onPause(() => {
          app.isPlaying = false;
          this.setData({
            is_playing: app.isPlaying,
          });
        });
        this.setData({
          collected,
          postData: postData,
          is_playing: app.isPlaying,
        });
          }  
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