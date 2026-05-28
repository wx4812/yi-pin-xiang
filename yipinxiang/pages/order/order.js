// 一品香蛋糕房 - 订单页面
const app = getApp();

Page({
  data: {
    tabs: ['全部', '待发货', '已发货', '已完成'],
    currentTab: 0,
    allOrders: [],
    filteredOrders: []
  },

  onShow() {
    this.loadOrders();
  },

  loadOrders() {
    const orders = app.globalData.orderList;
    this.setData({ 
      allOrders: orders,
      filteredOrders: this.filterOrders(orders, this.data.currentTab)
    });
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      currentTab: index,
      filteredOrders: this.filterOrders(this.data.allOrders, index)
    });
  },

  filterOrders(orders, tabIndex) {
    if (tabIndex === 0) return orders;
    const statusMap = ['待发货', '已发货', '已完成'];
    const targetStatus = statusMap[tabIndex - 1];
    return orders.filter(order => order.status === targetStatus);
  },

  goShopping() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});