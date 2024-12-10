<template>
  <div>
    <!-- 滚动图片 -->
    <div class="carousel">
      <swiper
        :loop="true"
        :autoplay="autoplay"
        pagination
        navigation
      >
        <!-- 循环渲染图片 -->
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" alt="滚动图片" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- 推荐村庄 -->
    <h2>推荐村庄</h2>
    <div class="village-list">
      <div
        class="village-card"
        v-for="village in visibleVillages"
        :key="village.id"
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
    <router-link v-if="!showAll" to="/village" class="show-all-btn">
      展开全部
    </router-link>

    <!-- 通知 -->
    <NoticeBoard :notices="notices" />
  </div>
</template>

<script>
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import NoticeBoard from "@/components/NoticeBoard.vue";
import { getUserLocation } from "@/utils/locationService";

// 注册 Swiper 模块
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    NoticeBoard,
  },
  data() {
    return {
      autoplay: {
        delay: 3000, // 自动切换间隔（毫秒）
        disableOnInteraction: false, // 用户交互后继续自动切换
      },
      images: [], // 图片数组
      notices: ["村庄活动即将开始", "新品上市通知", "科技团队发布成果"],
      location: null,
      recommendedVillages: [], // 动态获取村庄数据
      defaultImage: require('@/assets/villages/default.jpg'),
      visibleVillages: [], // 可见村庄
      showAll: false,
    };
  },
  methods: {
    async fetchRecommendedVillages() {
  try {
    const response = await fetch("http://localhost:5000/api/village");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // 设置推荐村庄数据
    this.recommendedVillages = data.map(village => ({
      id: village.id,
      name: village.name,
      description: village.description || "暂无描述",
      image: village.image ? require(`@/assets/${village.image}`) : this.defaultImage,
    }));

    // 默认显示前5个村庄
    this.visibleVillages = this.recommendedVillages.slice(0, 5);
  } catch (error) {
    console.error("获取村庄数据失败:", error);
  }
},
    async loadImages() {
      try {
        const images = require.context('@/assets/bgImages', false, /\.(png|jpe?g|gif)$/);
        this.images = images.keys().map(imagePath => images(imagePath));
      } catch (error) {
        console.error("无法加载图片:", error);
      }
    },
    handleImageError(village) {
      // 如果图片加载失败，将图片设置为默认图片
      village.image = this.defaultImage;
    },
  },
  async created() {
    try {
      this.location = await getUserLocation();
      await this.fetchRecommendedVillages(); // 获取村庄数据
      await this.loadImages(); // 获取滚动图片
    } catch (error) {
      console.error("初始化错误:", error);
    }
  },
};
</script>

<style scoped>
/* 滚动图片样式 */
.carousel {
  width: 100%;
  height: 450px;
  margin-bottom: 20px;
  overflow: hidden; /* 防止内容超出容器范围 */
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 推荐村庄样式 */
h2 {
  margin-top: 20px;
  font-size: 24px;
  text-align: center;
}

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

/* 展示全部按钮样式 */
.show-all-btn {
  width: 100px;
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
}

.show-all-btn:hover {
  background-color: #0056b3;
}
</style>