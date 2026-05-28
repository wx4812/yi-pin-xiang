// 一品香蛋糕房 - 关于我们页面
const app = getApp();

Page({
  data: {
    orderCount: 0,
    pendingCount: 0,
    doneCount: 0,
    highlights: [
      { icon: '🍰', label: '新鲜现做' },
      { icon: '👨‍🍳', label: '手工制作' },
      { icon: '🌱', label: '优质原料' },
      { icon: '🚚', label: '快速配送' }
    ]
  },

  onShow() {
    this.calculateOrderStats();
  },

  calculateOrderStats() {
    const orders = app.globalData.orderList;
    const orderCount = orders.length;
    const pendingCount = orders.filter(o => o.status === '待发货').length;
    const doneCount = orders.filter(o => o.status === '已完成').length;
    
    this.setData({ orderCount, pendingCount, doneCount });
  }
});