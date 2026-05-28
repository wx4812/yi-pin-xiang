// 一品香蛋糕房 - 产品详情页
const app = getApp();

Page({
  data: {
    product: {},
    selectedSpec: null,
    specIndex: 0,
    quantity: 1,
    cartCount: 0,
    reviews: [
      {
        name: '张女士',
        avatar: '/images/avatars/avatar1.png',
        date: '2026-05-20',
        rating: 5,
        text: '颜值超高，味道也很棒！朋友过生日订的，大家都说好吃，奶油一点不腻，水果也很新鲜。'
      },
      {
        name: '李先生',
        avatar: '/images/avatars/avatar2.png',
        date: '2026-05-18',
        rating: 4,
        text: '味道不错，包装很精美，就是配送时间稍微慢了一点，不过整体很满意！'
      },
      {
        name: '王女士',
        avatar: '/images/avatars/avatar3.png',
        date: '2026-05-15',
        rating: 5,
        text: '已经第三次回购了！一品香的品质一直很稳定，推荐给好多朋友了，现在都成常客啦～'
      }
    ]
  },

  onLoad(options) {
    const productId = parseInt(options.id);
    const products = this.getProductsData();
    const product = products.find(p => p.id === productId);
    if (product) {
      this.setData({ 
        product,
        selectedSpec: product.specs ? product.specs[0] : null
      });
      wx.setNavigationBarTitle({ title: product.name });
    }
    this.updateCartCount();
  },

  onShow() {
    this.updateCartCount();
  },

  getProductsData() {
    return [
      {
        id: 1, name: '草莓慕斯蛋糕', desc: '新鲜草莓搭配细腻慕斯，口感丝滑绵密',
        price: 168.00, originalPrice: 218.00, category: 'cake', isHot: true, isNew: false,
        image: '/images/products/strawberry-mousse.png',
        detail: '精选新鲜红颜草莓，搭配法国进口动物奶油制作的慕斯，口感丝滑绵密，入口即化。底层为松软的戚风蛋糕胚，层层叠加，每一口都是甜蜜的享受。',
        specs: [
          { label: '6英寸（1-2人）', price: 168.00 },
          { label: '8英寸（3-4人）', price: 268.00 },
          { label: '10英寸（5-8人）', price: 368.00 }
        ]
      },
      {
        id: 2, name: '芒果千层蛋糕', desc: '多层薄饼夹芒果奶油，清爽香甜',
        price: 148.00, originalPrice: 188.00, category: 'cake', isHot: true, isNew: false,
        image: '/images/products/mango-layer.png',
        detail: '手工摊制的法式薄饼，层层叠加超过20层，每一层都涂抹上厚厚的新鲜芒果奶油。选用泰国金煌芒果，香气浓郁，甜蜜多汁。冷藏后口感更佳，是夏日消暑的不二之选。',
        specs: [
          { label: '6英寸（1-2人）', price: 148.00 },
          { label: '8英寸（3-4人）', price: 248.00 },
          { label: '10英寸（5-8人）', price: 348.00 }
        ]
      },
      {
        id: 3, name: '黑森林蛋糕', desc: '经典巧克力黑森林，浓郁可可风味',
        price: 188.00, originalPrice: 238.00, category: 'cake', isHot: false, isNew: true,
        image: '/images/products/blackforest.png',
        detail: '采用比利时进口黑巧克力，搭配酸甜樱桃酱和柔软奶油。每一层都浸润了樱桃酒香，顶部撒满黑巧克力碎屑，口感层次丰富，经典德国黑森林风味。',
        specs: [
          { label: '6英寸（1-2人）', price: 188.00 },
          { label: '8英寸（3-4人）', price: 298.00 },
          { label: '10英寸（5-8人）', price: 398.00 }
        ]
      },
      {
        id: 4, name: '提拉米苏', desc: '意式经典甜品，咖啡与奶油的完美融合',
        price: 68.00, originalPrice: 88.00, category: 'cake', isHot: false, isNew: false,
        image: '/images/products/tiramisu.png',
        detail: '正宗意式提拉米苏，采用马斯卡彭芝士和现磨意式浓缩咖啡，手指饼干充分浸润咖啡液，层层叠加后在表面撒满可可粉。口感丝滑，甜而不腻，咖啡香气回味悠长。',
        specs: [
          { label: '标准杯（1人）', price: 68.00 },
          { label: '家庭装（2-3人）', price: 138.00 }
        ]
      },
      {
        id: 5, name: '法式羊角面包', desc: '层层起酥口感酥脆，黄油香气浓郁',
        price: 12.00, originalPrice: 18.00, category: 'bread', isHot: true, isNew: false,
        image: '/images/products/croissant.png',
        detail: '纯手工开酥，采用法国AOP认证发酵黄油，经过72小时低温发酵。层层分明，外酥里软，黄油香气浓郁纯粹。新鲜出炉，每日限时限量供应。',
        specs: [
          { label: '单只装', price: 12.00 },
          { label: '3只装', price: 30.00 },
          { label: '6只装', price: 55.00 }
        ]
      },
      {
        id: 6, name: '北海道吐司', desc: '绵软拉丝的日式吐司，奶香四溢',
        price: 28.00, originalPrice: 38.00, category: 'bread', isHot: false, isNew: true,
        image: '/images/products/hokkaido-toast.png',
        detail: '采用日本进口高筋面粉和北海道牛乳，经过长时间的汤种发酵工艺。吐司内部组织细腻柔软，撕开可见绵密拉丝，奶香浓郁，松软不塌陷。不添加任何防腐剂，建议48小时内食用。',
        specs: [
          { label: '小份（350g）', price: 28.00 },
          { label: '大份（600g）', price: 45.00 }
        ]
      },
      {
        id: 7, name: '手工曲奇礼盒', desc: '多种口味曲奇组合，送礼首选',
        price: 98.00, originalPrice: 128.00, category: 'cookie', isHot: true, isNew: false,
        image: '/images/products/cookies.png',
        detail: '精选黄油、抹茶、可可三种经典口味，纯手工挤花烘焙。采用新西兰进口黄油，口感酥脆，入口即化。精美铁盒包装，配有烫金logo，是节日送礼、伴手礼的上乘之选。',
        specs: [
          { label: '小礼盒（12枚）', price: 98.00 },
          { label: '大礼盒（24枚）', price: 168.00 }
        ]
      },
      {
        id: 8, name: '马卡龙套装', desc: '法式杏仁小圆饼，多彩精致',
        price: 128.00, originalPrice: 168.00, category: 'cookie', isHot: false, isNew: true,
        image: '/images/products/macarons.png',
        detail: '法式经典马卡龙，采用意式蛋白霜工艺，外壳轻薄酥脆，内馅柔软细腻。六种口味：玫瑰、柠檬、薄荷、焦糖、覆盆子、海盐巧克力。裙边完美，色泽鲜艳，颜值与美味并存。',
        specs: [
          { label: '6枚装', price: 128.00 },
          { label: '12枚装', price: 228.00 }
        ]
      },
      {
        id: 9, name: '现磨拿铁咖啡', desc: '浓郁咖啡搭配丝滑牛奶',
        price: 22.00, originalPrice: 0, category: 'drink', isHot: false, isNew: false,
        image: '/images/products/latte.png',
        detail: '采用精选阿拉比卡咖啡豆，现场研磨萃取，搭配新鲜牛奶蒸汽打泡。咖啡香浓郁，奶泡细腻绵密，可定制拉花图案。',
        specs: [
          { label: '标准杯（中）', price: 22.00 },
          { label: '大杯', price: 28.00 }
        ]
      },
      {
        id: 10, name: '鲜榨果汁', desc: '新鲜水果现榨，健康零添加',
        price: 18.00, originalPrice: 0, category: 'drink', isHot: false, isNew: false,
        image: '/images/products/juice.png',
        detail: '每日新鲜采购时令水果，现场榨取，不加水不加糖，100%纯果汁。可选口味：橙汁、西瓜汁、芒果汁、葡萄汁。富含维生素，健康美味之选。',
        specs: [
          { label: '标准杯（400ml）', price: 18.00 },
          { label: '大杯（600ml）', price: 25.00 }
        ]
      }
    ];
  },

  selectSpec(e) {
    const index = e.currentTarget.dataset.index;
    const selectedSpec = this.data.product.specs[index];
    this.setData({ specIndex: index, selectedSpec });
  },

  reduceQuantity() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  addQuantity() {
    if (this.data.quantity < 99) {
      this.setData({ quantity: this.data.quantity + 1 });
    }
  },

  addToCart() {
    const { product, selectedSpec, quantity } = this.data;
    const cartItem = {
      id: product.id,
      specId: this.data.specIndex,
      name: product.name,
      spec: selectedSpec.label,
      price: selectedSpec.price,
      image: product.image,
      quantity: quantity
    };
    app.addToCart(cartItem);
    this.updateCartCount();
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  buyNow() {
    const { product, selectedSpec, quantity } = this.data;
    const cartItem = {
      id: product.id,
      specId: this.data.specIndex,
      name: product.name,
      spec: selectedSpec.label,
      price: selectedSpec.price,
      image: product.image,
      quantity: quantity
    };
    app.addToCart(cartItem);
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  goBack() {
    wx.navigateBack();
  },

  updateCartCount() {
    this.setData({ cartCount: app.getCartCount() });
  }
});