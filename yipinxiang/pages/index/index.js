// 一品香蛋糕房 - 首页
const app = getApp();

Page({
  data: {
    banners: [
      { id: 1, image: '/images/banner/banner1.png', title: '新鲜烘焙 · 每日现做' },
      { id: 2, image: '/images/banner/banner2.png', title: '甜蜜新品 · 限时特惠' },
      { id: 3, image: '/images/banner/banner3.png', title: '生日蛋糕 · 专属定制' }
    ],
    categories: [
      { id: 'all', name: '全部', icon: '/images/icons/all.png' },
      { id: 'cake', name: '生日蛋糕', icon: '/images/icons/cake.png' },
      { id: 'bread', name: '面包糕点', icon: '/images/icons/bread.png' },
      { id: 'cookie', name: '饼干甜品', icon: '/images/icons/cookie.png' },
      { id: 'drink', name: '饮品', icon: '/images/icons/drink.png' }
    ],
    products: [
      {
        id: 1,
        name: '草莓慕斯蛋糕',
        desc: '新鲜草莓搭配细腻慕斯，口感丝滑绵密',
        price: 168.00,
        originalPrice: 218.00,
        category: 'cake',
        isHot: true,
        isNew: false,
        image: '/images/products/strawberry-mousse.png',
        detail: '精选新鲜红颜草莓，搭配法国进口动物奶油制作的慕斯，口感丝滑绵密，入口即化。底层为松软的戚风蛋糕胚，层层叠加，每一口都是甜蜜的享受。',
        specs: [
          { label: '6英寸（1-2人）', price: 168.00 },
          { label: '8英寸（3-4人）', price: 268.00 },
          { label: '10英寸（5-8人）', price: 368.00 }
        ]
      },
      {
        id: 2,
        name: '芒果千层蛋糕',
        desc: '多层薄饼夹芒果奶油，清爽香甜',
        price: 148.00,
        originalPrice: 188.00,
        category: 'cake',
        isHot: true,
        isNew: false,
        image: '/images/products/mango-layer.png',
        detail: '手工摊制的法式薄饼，层层叠加超过20层，每一层都涂抹上厚厚的新鲜芒果奶油。选用泰国金煌芒果，香气浓郁，甜蜜多汁。冷藏后口感更佳，是夏日消暑的不二之选。',
        specs: [
          { label: '6英寸（1-2人）', price: 148.00 },
          { label: '8英寸（3-4人）', price: 248.00 },
          { label: '10英寸（5-8人）', price: 348.00 }
        ]
      },
      {
        id: 3,
        name: '黑森林蛋糕',
        desc: '经典巧克力黑森林，浓郁可可风味',
        price: 188.00,
        originalPrice: 238.00,
        category: 'cake',
        isHot: false,
        isNew: true,
        image: '/images/products/blackforest.png',
        detail: '采用比利时进口黑巧克力，搭配酸甜樱桃酱和柔软奶油。每一层都浸润了樱桃酒香，顶部撒满黑巧克力碎屑，口感层次丰富，经典德国黑森林风味。',
        specs: [
          { label: '6英寸（1-2人）', price: 188.00 },
          { label: '8英寸（3-4人）', price: 298.00 },
          { label: '10英寸（5-8人）', price: 398.00 }
        ]
      },
      {
        id: 4,
        name: '提拉米苏',
        desc: '意式经典甜品，咖啡与奶油的完美融合',
        price: 68.00,
        originalPrice: 88.00,
        category: 'cake',
        isHot: false,
        isNew: false,
        image: '/images/products/tiramisu.png',
        detail: '正宗意式提拉米苏，采用马斯卡彭芝士和现磨意式浓缩咖啡，手指饼干充分浸润咖啡液，层层叠加后在表面撒满可可粉。口感丝滑，甜而不腻，咖啡香气回味悠长。',
        specs: [
          { label: '标准杯（1人）', price: 68.00 },
          { label: '家庭装（2-3人）', price: 138.00 }
        ]
      },
      {
        id: 5,
        name: '法式羊角面包',
        desc: '层层起酥口感酥脆，黄油香气浓郁',
        price: 12.00,
        originalPrice: 18.00,
        category: 'bread',
        isHot: true,
        isNew: false,
        image: '/images/products/croissant.png',
        detail: '纯手工开酥，采用法国AOP认证发酵黄油，经过72小时低温发酵。层层分明，外酥里软，黄油香气浓郁纯粹。新鲜出炉，每日限时限量供应。',
        specs: [
          { label: '单只装', price: 12.00 },
          { label: '3只装', price: 30.00 },
          { label: '6只装', price: 55.00 }
        ]
      },
      {
        id: 6,
        name: '北海道吐司',
        desc: '绵软拉丝的日式吐司，奶香四溢',
        price: 28.00,
        originalPrice: 38.00,
        category: 'bread',
        isHot: false,
        isNew: true,
        image: '/images/products/hokkaido-toast.png',
        detail: '采用日本进口高筋面粉和北海道牛乳，经过长时间的汤种发酵工艺。吐司内部组织细腻柔软，撕开可见绵密拉丝，奶香浓郁，松软不塌陷。不添加任何防腐剂，建议48小时内食用。',
        specs: [
          { label: '小份（350g）', price: 28.00 },
          { label: '大份（600g）', price: 45.00 }
        ]
      },
      {
        id: 7,
        name: '手工曲奇礼盒',
        desc: '多种口味曲奇组合，送礼首选',
        price: 98.00,
        originalPrice: 128.00,
        category: 'cookie',
        isHot: true,
        isNew: false,
        image: '/images/products/cookies.png',
        detail: '精选黄油、抹茶、可可三种经典口味，纯手工挤花烘焙。采用新西兰进口黄油，口感酥脆，入口即化。精美铁盒包装，配有烫金logo，是节日送礼、伴手礼的上乘之选。',
        specs: [
          { label: '小礼盒（12枚）', price: 98.00 },
          { label: '大礼盒（24枚）', price: 168.00 }
        ]
      },
      {
        id: 8,
        name: '马卡龙套装',
        desc: '法式杏仁小圆饼，多彩精致',
        price: 128.00,
        originalPrice: 168.00,
        category: 'cookie',
        isHot: false,
        isNew: true,
        image: '/images/products/macarons.png',
        detail: '法式经典马卡龙，采用意式蛋白霜工艺，外壳轻薄酥脆，内馅柔软细腻。六种口味：玫瑰、柠檬、薄荷、焦糖、覆盆子、海盐巧克力。裙边完美，色泽鲜艳，颜值与美味并存。',
        specs: [
          { label: '6枚装', price: 128.00 },
          { label: '12枚装', price: 228.00 }
        ]
      },
      {
        id: 9,
        name: '现磨拿铁咖啡',
        desc: '浓郁咖啡搭配丝滑牛奶',
        price: 22.00,
        originalPrice: 0,
        category: 'drink',
        isHot: false,
        isNew: false,
        image: '/images/products/latte.png',
        detail: '采用精选阿拉比卡咖啡豆，现场研磨萃取，搭配新鲜牛奶蒸汽打泡。咖啡香浓郁，奶泡细腻绵密，可定制拉花图案。',
        specs: [
          { label: '标准杯（中）', price: 22.00 },
          { label: '大杯', price: 28.00 }
        ]
      },
      {
        id: 10,
        name: '鲜榨果汁',
        desc: '新鲜水果现榨，健康零添加',
        price: 18.00,
        originalPrice: 0,
        category: 'drink',
        isHot: false,
        isNew: false,
        image: '/images/products/juice.png',
        detail: '每日新鲜采购时令水果，现场榨取，不加水不加糖，100%纯果汁。可选口味：橙汁、西瓜汁、芒果汁、葡萄汁。富含维生素，健康美味之选。',
        specs: [
          { label: '标准杯（400ml）', price: 18.00 },
          { label: '大杯（600ml）', price: 25.00 }
        ]
      }
    ],
    currentCategory: 'all',
    currentCategoryName: '全部产品',
    filteredProducts: []
  },

  onLoad() {
    this.filterProducts();
  },

  onPullDownRefresh() {
    wx.showToast({ title: '刷新成功', icon: 'success' });
    wx.stopPullDownRefresh();
  },

  switchCategory(e) {
    const id = e.currentTarget.dataset.id;
    const category = this.data.categories.find(c => c.id === id);
    this.setData({
      currentCategory: id,
      currentCategoryName: category ? category.name : '全部产品'
    });
    this.filterProducts();
  },

  filterProducts() {
    const { currentCategory, products } = this.data;
    const filtered = currentCategory === 'all' 
      ? products 
      : products.filter(p => p.category === currentCategory);
    this.setData({ filteredProducts: filtered });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/product/detail?id=${id}` });
  },

  quickAddCart(e) {
    const item = e.currentTarget.dataset.item;
    app.addToCart({ ...item, quantity: 1 });
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  }
});