// 一品香蛋糕房 - 结算页面
const app = getApp();

Page({
  data: {
    address: null,
    orderItems: [],
    totalPrice: '0.00',
    deliveryFee: '5.00',
    discount: '0.00',
    actualPrice: '0.00',
    remark: ''
  },

  onLoad() {
    this.loadOrderData();
  },

  loadOrderData() {
    const orderItems = wx.getStorageSync('checkoutItems') || [];
    const totalPrice = wx.getStorageSync('checkoutTotal') || '0.00';
    const deliveryFee = '5.00';
    const discount = '0.00';
    const actualPrice = (parseFloat(totalPrice) + parseFloat(deliveryFee) - parseFloat(discount)).toFixed(2);
    
    this.setData({
      orderItems,
      totalPrice,
      deliveryFee,
      discount,
      actualPrice
    });
  },

  selectAddress() {
    // 模拟地址选择
    const address = {
      name: '张先生',
      phone: '138****8888',
      detail: '广州市天河区花城大道88号 一品香蛋糕房'
    };
    this.setData({ address });
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  submitOrder() {
    if (!this.data.address) {
      wx.showToast({ title: '请选择收货地址', icon: 'none' });
      return;
    }

    if (this.data.orderItems.length === 0) {
      wx.showToast({ title: '订单商品为空', icon: 'none' });
      return;
    }

    const order = {
      products: this.data.orderItems,
      address: this.data.address,
      totalPrice: this.data.actualPrice,
      remark: this.data.remark,
      deliveryFee: this.data.deliveryFee,
      discount: this.data.discount
    };

    app.addOrder(order);
    app.clearCart();
    
    wx.showModal({
      title: '下单成功',
      content: '订单已提交，我们将在30分钟内为您配送！',
      showCancel: false,
      success: () => {
        wx.removeStorageSync('checkoutItems');
        wx.removeStorageSync('checkoutTotal');
        wx.switchTab({ url: '/pages/order/order' });
      }
    });
  }
});