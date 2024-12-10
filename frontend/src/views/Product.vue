<template>
  <div>
    <h1>一村一品</h1>
    <div class="product-list">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <img 
           :src="product.image ? require(`@/assets/${product.image}`) : defaultImage" 
          alt="产品图片" 
          class="product-image"
        />
        <h3>{{ product.name }}</h3>
        <p>价格: {{ product.price }}元</p>
        <button @click="viewProduct(product.id)">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      defaultImage: require('@/assets/productImg/default.jpg'), // 默认图片路径
      
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("获取产品信息失败", error);
      }
    },
    viewProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}
/* 整体布局 */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
}

/* 产品卡片样式 */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 图片样式 */
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

/* 产品标题样式 */
.product-card h3 {
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
}

/* 产品价格样式 */
.product-card p {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
