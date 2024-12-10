<template>
  <div class="register-container">
    <h2 class="register-title">用户注册</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" id="email" v-model="email" required placeholder="请输入邮箱" />
        <div class="verification-code-wrapper">
          <input type="text" id="verificationCode" v-model="verificationCode" required placeholder="请输入验证码" />
          <button type="button" @click="sendVerificationCode" :disabled="isCountingDown" class="verification-code-btn">
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required placeholder="请输入密码" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="请确认密码" />
      </div>
      <div v-if="registrationError" class="error-message">{{ registrationError }}</div>
      <button type="submit" class="register-btn">注册</button>
    </form>
    <div class="links">
      <router-link to="/login" class="login-link">已有账号? 登录</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      serverVerificationCode: "",
      registrationError: "",
      countdown: 20, // 倒计时时间，单位秒
      isCountingDown: false, // 是否正在倒计时
    };
  },
  computed: {
    buttonText() {
      return this.isCountingDown ? `${this.countdown}秒后重新获取` : "获取验证码";
    },
  },
  methods: {
    async sendVerificationCode() {
      if (this.isCountingDown) return;

      try {
        const response = await axios.post("http://localhost:9000/api/send-verification-code", {
          email: this.email,
        });
        console.log(response.data);
        if (response.data.message === "验证码发送成功") {
          this.serverVerificationCode = response.data.verificationCode;
          this.startCountdown();
        } else {
          this.registrationError = response.data.message;
        }
      } catch (error) {
        console.error("发送验证码失败", error);
        this.registrationError = "发送验证码失败，请稍后重试";
      }
    },
    startCountdown() {
      this.isCountingDown = true;
      let timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
          this.isCountingDown = false;
          this.countdown = 60;
        }
      }, 1000);
    },
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.registrationError = "密码和确认密码不一致";
        return;
      }
      if (this.verificationCode !== this.serverVerificationCode) {
        this.registrationError = "验证码错误或已过期";
        return;
      }
      try {
        const response = await axios.post("http://localhost:5000/api/users", {
          username: this.username,
          email: this.email,
          password: this.password,
          verificationCode: this.verificationCode,
        });
        if (response.data.message === "注册成功") {
          this.$router.push("/login");
        } else {
          this.registrationError = response.data.message;
        }
      } catch (error) {
        console.error("注册失败", error);
        this.registrationError = "错误，请稍后重试";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.register-title {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.75rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  max-width: 374px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.verification-code-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.verification-code-wrapper input {
  width: 60%;
  margin-right: 10px;
}

.verification-code-wrapper button {
  width: 35%;
  padding: 10px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.verification-code-wrapper button:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.verification-code-wrapper button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #d8000c;
  background-color: #ffbaba;
  padding: 10px;
  margin-bottom: 1.5rem;
  text-align: center;
  border-radius: 5px;
}

.register-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-btn:hover {
  background-color: #0056b3;
}

.links {
  margin-top: 1.5rem;
  text-align: center;
}

.login-link {
  display: block;
  margin: 5px 0;
  color: #007BFF;
  text-decoration: none;
  font-size: 0.9rem;
}

.login-link:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .register-container {
    padding: 1.5rem;
  }

  .register-title {
    font-size: 1.5rem;
  }

  .form-group input {
    padding: 10px;
  }

  .register-btn {
    padding: 10px;
  }

  .verification-code-wrapper input {
    width: 50%;
    margin-right: 5px;
  }

  .verification-code-wrapper button {
    width: 45%;
  }
}
</style>