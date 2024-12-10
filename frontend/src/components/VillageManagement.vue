<template>
  <div class="village-management">
    <h2>村庄管理</h2>
    
    <div class="container">
      <!-- 左侧：村庄信息管理 -->
      <div class="left-section">
        <div class="section">
          <h3>村况介绍</h3>
          <form @submit.prevent="updateVillage" enctype="multipart/form-data">
            <label for="villageName">村庄名称:</label>
            <input type="text" id="villageName" v-model="village.name" required>
            
            <label for="villageDescription">村庄描述:</label>
            <textarea id="villageDescription" v-model="village.description"></textarea>
            
            <label for="villageLocation">设置地址:</label>
            <button id="villageLocation" @click="openMap">选取地点</button>
            <label for="villageCoordinates">设置经纬度:</label>
            <input type="text" id="villageCoordinates" v-model="villageCoordinates" placeholder="粘贴获取到的经纬度" @input="handleCoordinatesInput">

            <div class="map-container">
              <h3>村庄位置</h3>
              <baidu-map v-if="village.latitude && village.longitude" class="small-map" :center="{lng: village.longitude, lat: village.latitude}" :zoom="15">
                <bm-marker :position="{lng: village.longitude, lat: village.latitude}"></bm-marker>
              </baidu-map>
            </div>

            <br />

            <label for="villageImage">上传图片:</label>
            <input type="file" id="villageImage" name="image" @change="handleImageUpload">
            <img v-if="village.image" :src="villageImagePath" alt="村庄图片" style="width: 100px; height: 100px;">
            
            <label for="villageCommitteeOverview">村委总况介绍:</label>
            <textarea id="villageCommitteeOverview" v-model="village.committeeOverview"></textarea>
            
            <label for="villageCommitteeMembers">村委人员介绍:</label>
            <div v-for="(member, index) in village.committeeMembers" :key="index" >
              <input type="text" v-model="member.name" placeholder="姓名" class="memberlist">
              <input type="text" v-model="member.role" placeholder="角色" class="memberlist">
              <button @click.prevent="removeMember(index)">删除</button>
            </div>
            <button @click.prevent="addMember" style="margin-top: 0px;margin-bottom: 20px;">新增成员</button>
            
            <label for="villageCommitteeAchievements">村委业绩管理:</label>
            <textarea id="villageCommitteeAchievements" v-model="village.committeeAchievements"></textarea>

            <label for="villageCommitteeTracking">村委工作跟踪:</label>
            <textarea id="villageCommitteeTracking" v-model="village.committeeTracking"></textarea>

            <label for="villageStatusOverview">村况总况介绍:</label>
            <textarea id="villageStatusOverview" v-model="village.statusOverview"></textarea>

            <label for="villageStatusStructure">村况结构管理:</label>
            <textarea id="villageStatusStructure" v-model="village.statusStructure"></textarea>

            <button type="submit">保存村庄信息</button>
          </form>
        </div>
      </div>

      <!-- 右侧：产品信息管理 -->
      <div class="right-section">
        <div class="section">
          <h3>一村一品</h3>
          <div v-for="(product, index) in village.products" :key="product.id" class="product-card">
            <div v-if="!product.editing">
              <h4>{{ product.name }}</h4>
              <p>{{ product.description }}</p>
              <p>价格: {{ product.price }}</p>
              <img :src="getProductImagePath(product.image)" alt="产品图片" style="width: 100px; height: 100px;">
              <button @click="editProduct(index)">编辑</button>
              <button @click="deleteProduct(product.id)">删除</button>
            </div>
            <form v-else @submit.prevent="updateProduct(product)">
              <label>产品名称:</label>
              <input type="text" v-model="product.name" required>
              
              <label>产品描述:</label>
              <textarea v-model="product.description"></textarea>
              
              <label>产品价格:</label>
              <input type="number" v-model="product.price" required>
              
              <label>产品图片:</label>
              <input type="file" @change=" handleProductImageUpload(index)">
              <img :src="getProductImagePath(product.image)" alt="产品图片" style="width: 100px; height: 100px;">
              
              <label for="productInfoImg">产品介绍图片:</label>
              <input type="file" @change=" handleProductInfoImgUpload(index)" />
              <img v-if="product.InfoImg" :src="getProductImagePath(product.InfoImg)" alt="产品介绍图片" />

              <button type="submit">保存</button>
              <button @click="cancelEdit(index)">取消</button>
            </form>
          </div>
          <button type="button" @click="addProduct">添加新产品</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      village: {
        id: null,
        name: '',
        description: '',
        image: '', 
        committeeOverview: '',
        committeeMembers: [],
        committeeAchievements: '',
        committeeTracking: '',
        statusOverview: '',
        statusStructure: '',
        latitude: 0,
        longitude: 0,
        products: []
      },
      selectedFile: null,
      selectedProductFiles: {},
      villageCoordinates: '' // 新增属性，用于存储输入框的值
    };
  },
  computed: {
    villageImagePath() {
      return this.village.image
        ? require(`@/assets/${this.village.image}`)
        : '';
    },
  },
  methods: {
// 获取村庄信息
async fetchVillage() {
  try {
    const villageId = this.$route.params.villageId;
    const [
      villageResponse,
      committeeResponse,
      statusResponse,
      locationResponse,
      productsResponse
    ] = await Promise.all([
      axios.get(`http://localhost:5000/api/village/${villageId}`),
      axios.get(`http://localhost:5000/api/village_committee/${villageId}`), // 修改此处
      axios.get(`http://localhost:5000/api/village_status/${villageId}`),
      axios.get(`http://localhost:5000/api/village_location/${villageId}`),
      axios.get(`http://localhost:5000/api/villages/${villageId}/products`)
    ]);

    this.village = {
      id: villageResponse.data.id,
      name: villageResponse.data.name,
      description: villageResponse.data.description,
      image: villageResponse.data.image,
      committeeOverview: committeeResponse.data.committee_overview,
      committeeMembers: committeeResponse.data.committeeMembers || [], // 确保包含 committeeMembers
      committeeAchievements: committeeResponse.data.committee_achievements,
      committeeTracking: committeeResponse.data.committee_tracking,
      statusOverview: statusResponse.data.status_overview,
      statusStructure: statusResponse.data.status_structure,
      latitude: locationResponse.data.latitude,
      longitude: locationResponse.data.longitude,
      products: productsResponse.data.map((product) => ({
        ...product,
        editing: false,
      }))
    };

    // 初始化输入框的值
    this.villageCoordinates = `${this.village.latitude},${this.village.longitude}`;
  } catch (error) {
    console.error('获取村庄信息失败:', error);
  }
},

    // 更新村庄信息
async updateVillage() {
  try {
    const formData = new FormData();
    formData.append('name', this.village.name);
    formData.append('description', this.village.description);
    formData.append('latitude', this.village.latitude);
    formData.append('longitude', this.village.longitude);
    formData.append('committeeOverview', this.village.committeeOverview);
    formData.append('committeeMembers', JSON.stringify(this.village.committeeMembers)); // 确保转换为 JSON 字符串
    formData.append('committeeAchievements', this.village.committeeAchievements);
    formData.append('committeeTracking', this.village.committeeTracking);
    formData.append('statusOverview', this.village.statusOverview);
    formData.append('statusStructure', this.village.statusStructure);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.warn('No file selected for upload');
    }

    console.log('FormData values:', Array.from(formData.values())); // 调试表单数据

    // 先更新 VillageCommittee 记录
    const response = await axios.put(
      `http://localhost:5000/api/village_committee/${this.village.id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    // 获取更新后的 committeeId
    const committeeId = response.data.committeeId;

    // 更新或添加 CommitteeMember 记录
    const committeeMembers = this.village.committeeMembers || [];
    const existingMembers = committeeMembers.filter(member => member.id);
    const newMembersToAdd = committeeMembers.filter(member => !member.id);

    // 更新现有成员
    for (const member of existingMembers) {
      await axios.put(
        `http://localhost:5000/api/committee_members/${member.id}`,
        {
          name: member.name,
          role: member.role,
          committeeId: committeeId // 确保 committeeId 被赋值
        }
      );
    }

    // 添加新成员
    for (const newMember of newMembersToAdd) {
      await axios.post(
        `http://localhost:5000/api/committee_members`,
        {
          village_id: this.village.id,
          name: newMember.name,
          role: newMember.role,
          committeeId: committeeId // 确保 committeeId 被赋值
        }
      );
    }

    alert('村庄信息更新成功');
  } catch (error) {
    console.error('更新村庄信息失败:', error);
    if (error.response) {
      alert(`更新村庄信息失败: ${error.response.data.error}`);
    } else {
      alert('更新村庄信息失败');
    }
  }
},

  //将输入的经纬度更改格式到数据库
    handleCoordinatesInput(event) {
  const coordinates = event.target.value.trim(); // 去除前后空格
  const [longitudeStr, latitudeStr] = coordinates.split(','); // 分割字符串

  if (longitudeStr && latitudeStr) {
    const longitude = parseFloat(longitudeStr); // 转换为浮点数
    const latitude = parseFloat(latitudeStr); // 转换为浮点数

    if (!isNaN(latitude) && !isNaN(longitude)) {
      // 验证纬度范围 -90 到 90
      if (latitude >= -90 && latitude <= 90) {
        this.village.latitude = latitude;
      } else {
        console.error('纬度超出范围 (-90 到 90)');
        alert('纬度超出范围 (-90 到 90)');
        this.village.latitude = 0;
      }

      // 验证经度范围 -180 到 180
      if (longitude >= -180 && longitude <= 180) {
        this.village.longitude = longitude;
      } else {
        console.error('经度超出范围 (-180 到 180)');
        alert('经度超出范围 (-180 到 180)');
        this.village.longitude = 0;
      }
    } else {
      console.error('无效的经纬度格式');
      alert('无效的经纬度格式');
      this.village.latitude = 0;
      this.village.longitude = 0;
    }
  } else {
    console.error('请输入完整的经纬度');
    alert('请输入完整的经纬度');
    this.village.latitude = 0;
    this.village.longitude = 0;
  }
},

    //更新产品信息
    async updateProduct(product) {
      try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        if (this.selectedProductFiles[product.id]?.image) {
          formData.append('image', this.selectedProductFiles[product.id].image);
        }
        if (this.selectedProductFiles[product.id]?.InfoImg) {
          formData.append('InfoImg', this.selectedProductFiles[product.id].InfoImg);
        }

        await axios.put(
          `http://localhost:5000/api/products/${product.id}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        product.editing = false;
        alert('产品信息更新成功');
      } catch (error) {
        console.error('更新产品信息失败:', error);
        if (error.response) {
          alert(`更新产品信息失败: ${error.response.data.error}`);
        } else {
          alert('更新产品信息失败');
        }
      }
    },

    handleDragEnd(e) {
      this.longitude = e.point.lng;
      this.latitude = e.point.lat;
    },
    
  
    handleImageUpload(event) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        console.log('Selected file:', this.selectedFile); // 调试选中的文件
      } else {
        console.warn('No file selected');
      }
    },

    handleProductImageUpload(index) {
        const file = event.target.files[0];
        if (file) {
          if (!this.selectedProductFiles[this.village.products[index].id]) {
            this.selectedProductFiles[this.village.products[index].id] = {};
          }
          this.selectedProductFiles[this.village.products[index].id].image = file;
        }
      },
    handleProductInfoImgUpload(index) {
      const file = event.target.files[0];
      if (file) {
        if (!this.selectedProductFiles[this.village.products[index].id]) {
          this.selectedProductFiles[this.village.products[index].id] = {};
        }
        this.selectedProductFiles[this.village.products[index].id].InfoImg = file;
      }
    },

    addMember() {
      this.village.committeeMembers.push({ name: '', role: '' });
    },

    removeMember(index) {
      this.village.committeeMembers.splice(index, 1);
    },

    addProduct() {
      this.village.products.push({
        name: '',
        description: '',
        price: 0,
        image: '',
        InfoImg: '',
        editing: true
      });
    },

    editProduct(index) {
      this.village.products[index].editing = true;
    },

    cancelEdit(index) {
      this.village.products[index].editing = false;
    },

    deleteProduct(productId) {
      if (confirm('确定要删除该产品吗？')) {
        axios.delete(`http://localhost:5000/api/products/${productId}`)
          .then(() => {
            this.village.products = this.village.products.filter((product) => product.id !== productId);
            alert('产品删除成功');
          })
          .catch((error) => {
            console.error('删除产品失败:', error);
            alert('删除产品失败');
          });
      }
    },

   openMap() {
        const mapUrl = `https://api.map.baidu.com/lbsapi/getpoint/index.html`;
        const newWindow = window.open(mapUrl, '_blank', 'width=800,height=600');

        const handleMessage = (event) => {
            if (event.origin !== 'https://api.map.baidu.com') return; // 确保消息来自正确的源
            if (!event.data || typeof event.data.lng !== 'number' || typeof event.data.lat !== 'number') {
                console.error('接收到的地图数据无效:', event.data);
                alert('接收到的地图数据无效，请重试');
                return;
            }
            const { lng, lat } = event.data;
            this.village.longitude = lng;
            this.village.latitude = lat;
            window.removeEventListener('message', handleMessage);
            newWindow.close();
        };

        window.addEventListener('message', handleMessage);

        // 监听窗口关闭事件，以防用户手动关闭窗口
        newWindow.onbeforeunload = () => {
            window.removeEventListener('message', handleMessage);
        };
    },
    

    getProductImagePath(image) {
      return image ? require(`@/assets/${image}`) : '';
    }
  },
  mounted() {
    const villageId = this.$route.params.villageId;
    console.log('Village ID:', villageId); // 添加日志输出
    this.fetchVillage();
  }
};
</script>


<style scoped>
.village-management {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f0f0f0;
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

.container {
  display: flex;
  justify-content: space-between;
}

.left-section, .right-section {
  width: 48%;
}

.section {
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

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
}

input, textarea {
  width: calc(100% - 20px); /* 减去右边距 */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
}


button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.product-card {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-view h4 {
  margin-top: 0;
  font-size: 20px;
  color: #333;
}

.product-view p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

.member-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  flex: 1;
}

.form-button {
  padding: 5px 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #0056b3;
}

#map-container {
  width: 300px;
  height: 200px;
  margin-top: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.small-map {
  width: 100%;
  height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 15px;
}

.map-container {
  margin-top: 20px;
}

.product-form {
  margin-bottom: 20px;
}

.edit-village-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.left-column, .right-column {
  width: 48%;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.memberlist{
width: 35% !important;
margin-right: 10px;
}


input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
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

.product-form {
  margin-bottom: 20px;
}

.map-container {
  margin-top: 20px;
}

.small-map {
  width: 100%;
  height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 15px;
}
</style>