<template>
  <div>
    <h1>村列总汇</h1>
    <div class="village-list">
      <div
        class="village-card"
        v-for="(village, index) in villages"
        :key="index"
      >
        <img 
          :src="village.image || defaultImage" 
          alt="村庄图片" 
          class="village-image" 
          @error="handleImageError(village)"
        />
        <div class="village-info">
          <h3>{{ village.name }}</h3>
          <p>{{ village.description }}</p>
          <router-link :to="'/village/' + village.id" class="village-link">
            查看详情
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      villages: [],
      defaultImage: require("@/assets/villages/default.jpg"), // 默认图片路径
    };
  },

   methods: {
  async fetchVillages() {
    try {
      const response = await axios.get("http://localhost:5000/api/village");
      this.villages = response.data.map(village => ({
        ...village,
        image: village.image ? require(`@/assets/${village.image}`) : this.defaultImage, // 确保每个村庄都有图片
      }));
    } catch (error) {
      console.error("获取村庄信息失败", error);
    }
  },
  handleImageError(village) {
    // 如果图片加载失败，将图片设置为默认图片
    village.image = this.defaultImage;
  },
},

  async mounted() {
    await this.fetchVillages();
  },
};
</script>

<style scoped>
/* 页面标题样式 */
h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

/* 村庄列表样式 */
.village-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 10px;
}

.village-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  background-color: #fff;
}

.village-card:hover {
  transform: translateY(-5px);
}

.village-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.village-info {
  padding: 10px;
  text-align: center;
}

.village-info h3 {
  font-size: 20px;
  margin: 10px 0;
}

.village-info p {
  color: #666;
  font-size: 14px;
}

.village-link {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.village-link:hover {
  background-color: #0056b3;
}
</style>
