<template>
  <div class="product-info">
    <div class="product-header">
      <div class="product-image">
        <img :src="product.image ? require(`@/assets/${product.image}`) : defaultImage" alt="产品图片" />
      </div>
      <div class="product-details">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p><strong>价格:</strong> {{ product.price }}元</p>
        <button @click="addToCart">加入购物车</button>
      </div>
    </div>
    <div class="product-introduction">
      <img :src="product.InfoImg ? require(`@/assets/${product.InfoImg}`):introductionImage" alt="商品介绍图片" class="product-introduction-image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        image: '',
        InfoImg: ''
      },
      introductionImage: require('@/assets/productImg/productInfo.jpg'), // 默认介绍图片路径
      defaultImage: require('@/assets/productImg/default.jpg') // 默认头图路径
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${this.$route.params.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('获取产品信息失败', error);
      }
    },
    addToCart() {
      // Logic to add the product to the cart
      console.log('加入购物车:', this.product.name);
    }
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px; /* 增加最大宽度 */
  margin: 0 auto;
}

.product-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
}

.product-image {
  width: 40%; /* 调整图片区域的宽度 */
  text-align: center;
  margin-right: 30px;
}

.product-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-details {
  width: 60%; /* 调整详细信息区域的宽度 */
  text-align: left;
}

.product-details h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
}

.product-details p {
  font-size: 18px;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.product-details strong {
  color: #007BFF;
}

.product-introduction {
  width: 100%; /* 调整介绍图片区域的宽度 */
  text-align: center;
  margin-top: 30px;
}

.product-introduction-image {
  width: 700px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  padding: 12px 24px;
  font-size: 18px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>