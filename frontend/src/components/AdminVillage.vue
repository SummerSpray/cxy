<template>
  <div class="village-management">
    <h2>管理村庄</h2>
    <button @click="toggleCreateForm" class="admin-btn">{{ showCreateForm ? '取消' : '创建村庄' }}</button>
    <div v-if="showCreateForm" class="create-form">
      <input v-model="newVillageName" placeholder="请输入村庄名称" />
      <button @click="createVillage" class="admin-btn">确认创建</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>村庄名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="village in villages" :key="village.id">
          <td>{{ village.name }}</td>
          <td>
            <button @click="deleteVillage(village.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      villages: [],
      showCreateForm: false,
      newVillageName: '',
    };
  },
  methods: {
    // 获取所有村庄
    fetchVillages() {
      axios.get('http://localhost:5000/api/village')
        .then((response) => {
          this.villages = response.data;
        })
        .catch((error) => {
          console.error('获取村庄信息出错：', error);
          alert('获取村庄信息失败');
        });
    },

    // 切换创建表单的显示和隐藏
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
      this.newVillageName = ''; // 清空输入框
    },

    // 创建村庄
createVillage() {
  if (this.newVillageName.trim()) {
    axios.post('http://localhost:9000/api/villages/create', { name: this.newVillageName })
      .then(response => {
        const newVillageId = response.data.id; // 假设返回的数据中包含新创建村庄的ID

        // 自动创建关联的记录
        Promise.all([
          axios.post('http://localhost:5000/api/village_committee', { village_id: newVillageId }),
          axios.post('http://localhost:5000/api/village_status', { village_id: newVillageId }),
          axios.post('http://localhost:5000/api/village_location', { village_id: newVillageId }),
          axios.post('http://localhost:5000/api/products', { village_id: newVillageId }) // 创建空的产品信息
        ]).then(() => {
          alert('村庄及其相关记录创建成功');
          this.fetchVillages(); // 刷新村庄列表
          this.toggleCreateForm(); // 隐藏表单
        }).catch(error => {
          console.error('创建关联记录失败：', error);
          alert('创建关联记录失败，请重试');
        });
      })
      .catch(error => {
        alert('村庄创建失败');
      });
  } else {
    alert('请输入有效的村庄名称');
  }
},
    // 删除村庄
deleteVillage(villageId) {
  const village = this.villages.find(v => v.id === villageId);
  if (village && confirm(`确认删除村庄 ${village.name} 吗？`)) {
    // 先删除关联信息
    axios.delete(`http://localhost:5000/api/products/${villageId}`) // 删除产品信息
      .then(() => axios.delete(`http://localhost:5000/api/village_committee/${villageId}`))
      .then(() => axios.delete(`http://localhost:5000/api/village_status/${villageId}`))
      .then(() => axios.delete(`http://localhost:5000/api/village_location/${villageId}`))
      .then(() => {
        // 再删除村庄本身
        return axios.delete(`http://localhost:9000/api/villages/${villageId}`);
      })
      .then(response => {
        alert('村庄及其关联信息已删除');
        this.fetchVillages(); // 刷新村庄列表
      })
      .catch((err) => {
        console.error('删除村庄及其关联信息出错：', err);
        alert('删除村庄及其关联信息失败，请重试');
      });
  }
},
  },
  created() {
    this.fetchVillages();
  },
};
</script>

<style scoped>
.village-management {
  padding: 30px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.admin-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-btn:hover {
  background-color: #0056b3;
}

.create-form {
  margin-top: 20px;
}

.create-form input {
  padding: 10px;
  font-size: 16px;
  width: 80%;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
th {
  background-color: #007BFF;
  color: white;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>