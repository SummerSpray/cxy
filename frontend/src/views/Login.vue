<template>
  <div class="login-container">
    <h2>用户登录</h2>

    <!-- 登录表单 -->
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
          required
        />
      </div>
      
      <div v-if="loginError" class="error-message">
        <p>{{ loginError }}</p>
      </div>

      <button type="submit" class="login-btn">登录</button>
    </form>

    <!-- 注册和忘记密码的链接 -->
    <div class="links">
      <router-link to="/register">没有账号? 注册</router-link>
      <router-link to="/forgot-password">忘记密码?</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      loginError: "",  // 用于显示登录错误信息
    };
  },
  methods: {
    // 处理登录请求
    async handleLogin() {
      console.log("请求参数:", this.username, this.password);

      try {
        // 发送 POST 请求到后端登录接口
        const response = await axios.post("http://localhost:5000/api/users/login", {
          username: this.username,
          password: this.password,
        });

        console.log("服务器返回:", response.data);

        // 如果登录成功
        if (response.data.success) {
          // 存储用户数据到 localStorage
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          // 跳转到管理页面
          this.$router.push("/admin");
        } else {
          this.loginError = "用户名或密码错误";
        }
      } catch (error) {
        console.error("登录失败", error);
        this.loginError = "网络错误，请稍后重试";
      }
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif; /* 设置字体 */
  text-align: center; /* 文本居中 */
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.75rem; /* 增加标题大小 */
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left; /* 表单内容左对齐 */
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555; /* 标签颜色 */
}

.form-group input {
  width: 100%; /* 调整输入框宽度 */
  max-width: 374px; /* 设置最大宽度 */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px; /* 增加圆角 */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05); /* 输入框阴影 */
}

.error-message {
  color: #d8000c;
  background-color: #ffbaba;
  padding: 10px;
  margin-bottom: 1.5rem;
  text-align: center;
  border-radius: 5px; /* 错误消息圆角 */
}

.login-btn {
  width: 100%; /* 调整按钮宽度 */
  padding: 12px;
  font-size: 16px;
  background-color: #007BFF; /* 更改按钮颜色为蓝色 */
  color: white;
  border: none;
  border-radius: 8px; /* 增加圆角 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.login-btn:hover {
  background-color: #0056b3;
}

.links {
  margin-top: 1.5rem;
  text-align: center;
}

.links a {
  display: block;
  margin: 5px 0;
  color: #007BFF;
  text-decoration: none;
  font-size: 0.9rem; /* 链接字体大小 */
}

.links a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .login-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .form-group input {
    padding: 10px;
  }

  .login-btn {
    padding: 10px;
  }
}
</style>