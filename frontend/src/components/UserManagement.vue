<template>
  <div>
    <h1>用户管理</h1>
    <table>
      <thead>
        <tr>
          <th>用户名</th>
          <th>角色</th>
          <th>团队</th>
          <th>村庄</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>
            <span v-if="!editingUser || editingUser.id !== user.id">{{ user.role }}</span>
            <select v-else v-model="user.role">
              <option value="admin">系统管理员</option>
              <option value="user">普通用户</option>
              <option value="tech">科技人员用户</option>
              <option value="villageAdmin">村管理员</option>
            </select>
          </td>
          <td>
            <span v-if="!editingUser || editingUser.id !== user.id">{{ user.team_name || '无' }}</span>
            <select v-else v-model="user.team_id">
              <option value="">请选择团队</option>
              <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
            </select>
          </td>
          <td>
            <span v-if="!editingUser || editingUser.id !== user.id">{{ user.village_name || '无' }}</span>
            <select v-else v-model="user.village_id">
              <option value="">请选择村庄</option>
              <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}</option>
            </select>
          </td>
          <td>
            <button @click="editUser(user.id)" v-if="!editingUser || editingUser.id !== user.id">修改权限</button>
            <button @click="saveUser(user.id)" v-else>保存</button>
            <button @click="deleteUser(user.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      teams: [],
      villages: [],
      editingUser: null,
    };
  },
  methods: {
    // 显示所有用户
    fetchUsers() {
      fetch('http://localhost:5000/api/users')
        .then((response) => response.json())
        .then((data) => {
          this.users = data.map(user => ({
            ...user,
            team_name: this.teams.find(team => team.id === user.team_id)?.name,
            village_name: this.villages.find(village => village.id === user.village_id)?.name,
          }));
        });
    },

    // 获取所有团队
    fetchTeams() {
      fetch('http://localhost:5000/api/techteams')
        .then((response) => response.json())
        .then((data) => {
          this.teams = data;
        });
    },

    // 获取所有村庄
    fetchVillages() {
      fetch('http://localhost:5000/api/village')
        .then((response) => response.json())
        .then((data) => {
          this.villages = data;
        });
    },

    // 修改用户权限
    editUser(userId) {
      this.editingUser = this.users.find(user => user.id === userId);
      console.log('Editing user:', this.editingUser); // 添加调试信息
    },

    // 保存用户权限
    saveUser(userId) {
      const user = this.users.find(user => user.id === userId);
      console.log('User before saving:', user); // 添加调试信息
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: user.role,
          team_id: user.team_id,
          village_id: user.village_id,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应不是200');
        }
        return response.json();
      })
      .then(() => {
        alert('用户信息已更新');
        this.editingUser = null; // 关闭编辑模式
        this.fetchUsers(); // 刷新用户列表
      })
      .catch((err) => {
        console.error('Error updating user:', err);
        alert('更新用户信息失败，请重试');
      });
    },

    // 删除用户
    deleteUser(userId) {
      if (confirm(`确认删除用户 ${userId} 吗？`)) {
        fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('网络响应不是200');
            }
            return response.json();
          })
          .then(() => {
            alert('用户信息已更新');
            this.editingUser = null; // 关闭编辑模式
            // 直接更新本地用户列表
            this.users = this.users.filter(u => u.id !== userId);
          })
          .catch((err) => {
            console.error('Error updating user:', err);
            alert('更新用户信息失败，请重试');
          });
      }
    },
  },
  created() {
    this.fetchTeams();
    this.fetchVillages();
    this.fetchUsers();
  },
};
</script>
<style scoped>
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
    background-color: #007BFF;
  }
  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>