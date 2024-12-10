<template>
  <div class="user-profile">
    <h2>编辑个人信息</h2>
    <form @submit.prevent="updateUserInfo">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div class="form-group">
        <label for="email">电子邮件</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="user.password" placeholder="留空则不更改密码" />
      </div>
      <div class="form-group">
        <label for="confirm-password">确认密码</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="确认密码" />
        <p v-if="passwordMismatch" class="error">两次输入的密码不一致</p>
      </div>
      <button type="submit">保存更改</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      confirmPassword: '',
      passwordMismatch: false
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${this.$route.params.id}`);
        this.user = response.data;
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    },
    async updateUserInfo() {
      // 验证两次输入的密码是否一致
      if (this.user.password && this.user.password !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      try {
        const userId = this.$route.params.id;
        const updatedFields = { ...this.user };

        // 如果密码为空，则不发送密码字段
        if (!updatedFields.password) {
          delete updatedFields.password;
        }

        const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedFields);
        alert(response.data.message);
        this.passwordMismatch = false; // 清除错误信息
      } catch (error) {
        console.error('更新用户信息失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-profile {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #ffffff; /* 更改为白色背景 */
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #e0e0e0; /* 添加边框 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

h2 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: calc(100% - 20px); /* 减去右边距 */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px; /* 圆角 */
  font-size: 16px;
  background-color: #f9f9f9; /* 浅灰色背景 */
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px; /* 圆角 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto; /* 添加此行 */
  margin-right: auto; /* 添加此行 */
  display: block; /* 添加此行 */
  
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>

