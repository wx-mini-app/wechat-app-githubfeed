import services from '../../utils/services';

Page({
  data: {
    items: [],
    page: 1
  },

  onLoad(options) {
    this.setData({
      user_name: options.login
    });

    this.fetchFollowingsData(this._reloadUrl());
  },

  _reloadUrl() {
    return `https://api.github.com/users/${this.data.user_name}/following?page=${this.data.page}`;
  },

  fetchFollowingsData(url) {
    this.showLoadingToast();
    services.fetch(url).then(res => {
      if (res.data) {
        this.setData({
          items: this.data.items.concat(res.data),
        });
        this.hideLoadingToast();
      }
    });
  },

  loadMoreData() {
    this.setData({
      page: ++this.data.page
    });
    this.fetchFollowingsData(this._reloadUrl());
  },

  showLoadingToast() {
    wx.showToast({
      title: 'Loading',
      icon: 'loading', 
      duration: 10000
    });
  },

  hideLoadingToast() {
    wx.hideToast();
  }
});