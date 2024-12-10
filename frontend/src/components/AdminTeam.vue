<template>
  <div class="tech-team-management">
    <h2>管理技术团队</h2>
    <button @click="toggleCreateForm" class="admin-btn">{{ showCreateForm ? '取消' : '创建技术团队' }}</button>
    <div v-if="showCreateForm" class="create-form">
      <input v-model="newTeamName" placeholder="请输入技术团队名称" />
      <button @click="createTechTeam" class="admin-btn">确认创建</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>团队名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.id">
          <td>{{ team.name }}</td>
          <td>
            <button @click="deleteTeam(team.id)">删除</button>
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
      teams: [],
      showCreateForm: false,
      newTeamName: '',
    };
  },
  methods: {
    // 获取所有团队
    fetchTeams() {
      axios.get('http://localhost:5000/api/techteams')
        .then((response) => {
          this.teams = response.data;
        })
        .catch((error) => {
          console.error('获取团队信息出错：', error);
          alert('获取团队信息失败');
        });
    },

    // 切换创建表单的显示和隐藏
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
      this.newTeamName = ''; // 清空输入框
    },

    // 创建技术团队
    createTechTeam() {
      if (this.newTeamName.trim()) {
        axios.post('http://localhost:9000/api/techteams/create', { name: this.newTeamName })
          .then(response => {
            alert('技术团队创建成功');
            this.fetchTeams(); // 刷新团队列表
            this.toggleCreateForm(); // 隐藏表单
          })
          .catch(error => {
            alert('技术团队创建失败');
          });
      } else {
        alert('请输入有效的技术团队名称');
      }
    },

    // 删除技术团队
    deleteTeam(teamId) {
      const team = this.teams.find(t => t.id === teamId);
      if (team && confirm(`确认删除团队 ${team.name} 吗？`)) {
        axios.delete(`http://localhost:9000/api/techteams/${teamId}`)
          .then(response => {
            alert('团队已删除');
            this.fetchTeams(); // 刷新团队列表
          })
          .catch((err) => {
            console.error('Error deleting team:', err);
            alert('删除团队失败，请重试');
          });
      }
    },
  },
  created() {
    this.fetchTeams();
  },
};
</script>

<style scoped>
.tech-team-management {
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