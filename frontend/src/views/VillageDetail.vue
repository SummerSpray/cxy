<template>
  <div class="container">
    <h2>{{ village.name }}--村庄详情 </h2>
    <div class="village-image">
      <img :src="villageImage" alt="村庄图片" />
    </div>
    <p>{{ village.description }}</p>

    <!-- 村委介绍 -->
    <section class="village-committee">
      <h3>村委介绍</h3>
      <div class="committee-overview">
        <h4>总况介绍</h4>
        <p>{{ village.committeeOverview }}</p>
      </div>
      <div class="committee-members">
        <h4>人员介绍</h4>
        <ul v-if="village.committeeMembers.length > 0">
          <li v-for="member in village.committeeMembers" :key="member.id">
            {{ member.name }} - {{ member.role }}
          </li>
        </ul>
        <p v-else>暂无村委人员信息</p>
      </div>
      <div class="committee-achievements">
        <h4>业绩管理</h4>
        <p>{{ village.committeeAchievements }}</p>
      </div>
      <div class="committee-tracking">
        <h4>工作跟踪</h4>
        <p>{{ village.committeeTracking }}</p>
      </div>
    </section>

    <!-- 村况介绍 -->
    <section class="village-status">
      <h3>村况介绍</h3>
      <div class="status-overview">
        <h4>总况介绍</h4>
        <p>{{ village.statusOverview }}</p>
      </div>
      <div class="status-map">
        <h4>总地图</h4>
        <baidu-map v-if="village.latitude && village.longitude" class="small-map" :center="{lng: village.longitude, lat: village.latitude}" :zoom="15">
          <bm-marker :position="{lng: village.longitude, lat: village.latitude}"></bm-marker>
        </baidu-map>
      </div>
      <div class="status-structure">
        <h4>结构管理</h4>
        <p>{{ village.statusStructure }}</p>
      </div>
    </section>

    <!-- 页面底部按钮 -->
    <button @click="goToProductInfo">该村产品</button>
  </div>
</template>

<script>
import { BaiduMap, BmMarker } from 'vue-baidu-map-3x';

export default {
  components: {
    BaiduMap,
    BmMarker
  },
  data() {
    return {
      village: {
        name: '',
        description: '',
        image: '',  // 添加图片字段
        committeeOverview: '',  // 村委总况介绍
        committeeMembers: [],  // 村委人员介绍
        committeeAchievements: '',  // 村委业绩管理
        committeeTracking: '',  // 村委工作跟踪
        statusOverview: '',  // 村况总况介绍
        statusMap: '',  // 村况总地图
        statusStructure: '',  // 村况结构管理
        latitude: 0,  // 经度
        longitude: 0  // 纬度
      },
    };
  },
 computed: {
  villageImage() {
    try {
      if (this.village.image) {
        return require(`@/assets/${this.village.image}`);
      }
    } catch (error) {
      console.error('Error loading village image:', error);
    }
    return require('@/assets/villages/default.jpg');
  }
},
  created() {
    const id = this.$route.params.id;  // 获取路由参数 id
    this.fetchVillage(id);
  },
  methods: {
    async fetchVillage(id) {
      try {
        // 获取村庄基本信息
        const villageResponse = await fetch(`http://localhost:5000/api/village/${id}`);
        const villageData = await villageResponse.json();

        // 获取村委信息
        const committeeResponse = await fetch(`http://localhost:5000/api/village_committee/${id}`);
        const committeeData = await committeeResponse.json();

        // 获取村况信息
        const statusResponse = await fetch(`http://localhost:5000/api/village_status/${id}`);
        const statusData = await statusResponse.json();

        // 获取地理位置信息
        const locationResponse = await fetch(`http://localhost:5000/api/village_location/${id}`);
        const locationData = await locationResponse.json();

        this.village = {
          name: villageData.name,
          description: villageData.description,
          image: villageData.image,  // 添加图片字段
          committeeOverview: committeeData.committee_overview,
          committeeMembers: committeeData.committeeMembers || [],  // 确保 committeeMembers 是一个数组
          committeeAchievements: committeeData.committee_achievements,
          committeeTracking: committeeData.committee_tracking,
          statusOverview: statusData.status_overview,
          statusMap: statusData.status_map,
          statusStructure: statusData.status_structure,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };
      } catch (error) {
        console.error('Error fetching village data:', error);
      }
    },
    goToProductInfo() {
      const villageId = this.$route.params.id;
      this.$router.push({ name: 'ProductInfo', params: { id: villageId } });
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 24px;
  text-align: center;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #555;
  font-size: 18px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 15px;
}

li {
  margin-bottom: 10px;
  font-size: 16px;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

.small-map {
  width: 100%;
  height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 15px;
}

.village-committee,
.village-status {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.committee-overview,
.committee-members,
.committee-achievements,
.committee-tracking,
.status-overview,
.status-map,
.status-structure {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.village-image {
  text-align: center;
  margin-bottom: 20px;
  
}

.village-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 600px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #2c3e50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #34495e;
}
</style>