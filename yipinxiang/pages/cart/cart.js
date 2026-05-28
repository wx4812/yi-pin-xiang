// 一品香蛋糕房 - 购物车
const app = getApp();

Page({
  data: {
    cartItems: [],
    allSelected: true,
    totalPrice: '0.00',
    selectedCount: 0
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const cart = app.globalData.cart.map((item, index) => ({
      ...item,
      uniqueId: `${item.id}_${item.specId || 0}_${index}`
    }));
    
    const allSelected = cart.length > 0 && cart.every(item => item.selected);
    const selectedCount = cart.filter(item => item.selected).reduce((s, i) => s + i.quantity, 0);
    const totalPrice = app.getCartTotal();

    this.setData({
      cartItems: cart,
      allSelected,
      selectedCount,
      totalPrice
    });
  },

  toggleSelect(e) {
    const index = e.currentTarget.dataset.index;
    const cartItems = this.data.cartItems;
    cartItems[index].selected = !cartItems[index].selected;
    app.globalData.cart = cartItems.map(({ uniqueId, ...item }) => item);
    wx.setStorageSync('cart', app.globalData.cart);
    this.loadCart();
  },

  toggleAll() {
    const allSelected = !this.data.allSelected;
    const cartItems = this.data.cartItems.map(item => ({ ...item, selected: allSelected }));
    app.globalData.cart = cartItems.map(({ uniqueId, ...item }) => item);
    wx.setStorageSync('cart', app.globalData.cart);
    this.loadCart();
  },

  reduceItem(e) {
    const index = e.currentTarget.dataset.index;
    const cartItems = this.data.cartItems;
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      app.globalData.cart = cartItems.map(({ uniqueId, ...item }) => item);
      wx.setStorageSync('cart', app.globalData.cart);
      this.loadCart();
    }
  },

  addItem(e) {
    const index = e.currentTarget.dataset.index;
    const cartItems = this.data.cartItems;
    if (cartItems[index].quantity < 99) {
      cartItems[index].quantity += 1;
      app.globalData.cart = cartItems.map(({ uniqueId, ...item }) => item);
      wx.setStorageSync('cart', app.globalData.cart);
      this.loadCart();
    }
  },

  deleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartItems[index];
    wx.showModal({
      title: '提示',
      content: '确定要移除此商品吗？',
      success: (res) => {
        if (res.confirm) {
          const newCart = app.removeFromCart(item.id);
          const cartItems = newCart.map((item, i) => ({
            ...item,
            uniqueId: `${item.id}_${item.specId || 0}_${i}`
          }));
          this.loadCart();
        }
      }
    });
  },

  clearCart() {
    if (this.data.cartItems.length === 0) return;
    wx.showModal({
      title: '提示',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearCart();
          this.loadCart();
          wx.showToast({ title: '购物车已清空', icon: 'success' });
        }
      }
    });
  },

  checkout() {
    const selectedItems = this.data.cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }

    // 将选中商品信息存入订单
    const orderItems = selectedItems.map(({ uniqueId, selected, ...item }) => item);
    wx.setStorageSync('checkoutItems', orderItems);
    wx.setStorageSync('checkoutTotal', this.data.totalPrice);
    
    wx.navigateTo({ url: '/pages/order/checkout' });
  },

  goShopping() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});