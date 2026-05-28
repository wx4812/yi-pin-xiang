App({
  globalData: {
    cart: [],
    userInfo: null,
    orderList: []
  },

  onLaunch() {
    const cart = wx.getStorageSync('cart');
    if (cart) {
      this.globalData.cart = cart;
    }
    const orders = wx.getStorageSync('orders');
    if (orders) {
      this.globalData.orderList = orders;
    }
  },

  addToCart(product) {
    const cart = this.globalData.cart;
    const index = cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      cart[index].quantity += product.quantity || 1;
    } else {
      cart.push({
        ...product,
        quantity: product.quantity || 1,
        selected: true
      });
    }
    this.globalData.cart = cart;
    wx.setStorageSync('cart', cart);
  },

  removeFromCart(productId) {
    const cart = this.globalData.cart.filter(item => item.id !== productId);
    this.globalData.cart = cart;
    wx.setStorageSync('cart', cart);
    return cart;
  },

  clearCart() {
    this.globalData.cart = [];
    wx.setStorageSync('cart', []);
  },

  getCartTotal() {
    return this.globalData.cart
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  },

  getCartCount() {
    return this.globalData.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  addOrder(order) {
    const orders = this.globalData.orderList;
    orders.unshift({
      ...order,
      id: 'ORD' + Date.now(),
      createTime: new Date().toLocaleString(),
      status: '待发货'
    });
    this.globalData.orderList = orders;
    wx.setStorageSync('orders', orders);
  }
});