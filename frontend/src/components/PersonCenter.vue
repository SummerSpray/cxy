<template>
  <div class="system-admin">
    <div v-if="userRole">
      <h2>个人中心</h2>
      <h3 style="text-align: center">当前用户：{{ userName }}</h3>
    </div>

    <!-- 用户类别判断 -->
     <div v-if="userRole === 'admin'">
      <h3>管理员功能</h3>
      <div class="admin-section">
        <button @click="navigateToCustomerProfile" class="admin-btn">查看个人资料</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToUserManagement" class="admin-btn">管理用户</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToVillageManagementPage" class="admin-btn">管理村庄</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToTechTeamManagementPage" class="admin-btn">管理技术团队</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToSystemSettings" class="admin-btn">系统设置</button>
      </div>
    </div>

    <div v-if="userRole === 'tech'">
      <h3>技术团队功能</h3>
      <div class="admin-section">
        <button @click="navigateToCustomerProfile" class="admin-btn">查看个人资料</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToTechTasks" class="admin-btn">编辑团队主页</button>
      </div>
      
    </div>

    <div v-if="userRole === 'villageAdmin'">
      <h3>村庄管理员功能</h3>
      <div class="admin-section">
        <button @click="navigateToCustomerProfile" class="admin-btn">查看个人资料</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToVillageManagement" class="admin-btn">管理村庄</button>
      </div>
    </div>

    <div v-if="userRole === 'user'">
      <h3>客户功能</h3>
      <div class="admin-section">
        <button @click="navigateToCustomerProfile" class="admin-btn">查看个人资料</button>
      </div>
      <div class="admin-section">
        <button @click="navigateToProductList" class="admin-btn">查看产品</button>
      </div>
    </div>
    
    <!-- 未登录时提示 -->
    <div v-if="!isLoggedIn" style="display: flex; justify-content: center; align-items: center;">
      <div style="text-align: center;">
        <p>您尚未登录，请先登录。</p>
        <button @click="navigateToLogin" class="admin-btn">去登录</button>
      </div>
    </div>

    <!-- 登录状态下显示退出按钮 -->
    <div v-if="isLoggedIn">
      <div style="display: flex; justify-content: center; align-items: center;">
        <button @click="handleLogout" class="admin-btn" style="align-items: center">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: null,
      userName: null,
      userRole: null, // 用户角色
      isLoggedIn: false, // 登录状态
      loginError: '', // 用于显示错误信息
      teamId: null, // 用户所属团队 ID
      villageId: null, // 村庄ID
    };
  },
  methods: {
    // 跳转到用户管理页面
    navigateToUserManagement() {
      this.$router.push('/admin/users');
    },
    // 跳转到内容审核页面
    navigateToContentReview() {
      this.$router.push('/admin/review');
    },
    // 跳转到村庄管理页面
    navigateToVillageManagementPage() {
      this.$router.push('/admin/villages');
    },
    // 跳转到技术团队管理页面
    navigateToTechTeamManagementPage() {
      this.$router.push('/admin/techteams');
    },
    // 跳转到系统设置页面
    navigateToSystemSettings() {
      this.$router.push('/admin/settings');
    },
    // 跳转到团队页面
    navigateToTechTasks() {
      if (this.teamId) {
        this.$router.push(`/team/${this.teamId}/renew`);
      } else {
        alert('您尚未绑定团队，请联系管理员。');
      }
    },
    // 跳转到村庄管理页面
    navigateToVillageManagement() {
      this.$router.push(`/village/management/${this.villageId}`);
    },
    // 跳转到个人资料页面
    navigateToCustomerProfile() {
      this.$router.push(`/user/profile/${this.id}`);
    },
    // 跳转到产品页面
    navigateToProductList() {
      this.$router.push('/product');
    },
    // 跳转到登录页面
    navigateToLogin() {
      this.$router.push('/login');
    },

    // 获取用户登录状态和角色
    checkLoginStatus() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log('Parsed User Data:', parsedData); // 打印解析后的数据
        this.isLoggedIn = true;
        this.userName = parsedData.username;
        this.id = parsedData.id;
        this.userRole = parsedData.role; // 获取用户角色
        this.teamId = parsedData.team_id; // 获取用户所属团队 ID
        this.villageId = parsedData.village_id; // 获取村庄ID
      } else {
        this.isLoggedIn = false;
      }
    },
    // 退出登录
    handleLogout() {
      localStorage.removeItem('userData'); // 清除 localStorage 中的用户数据
      this.userName = null;
      this.isLoggedIn = false; // 更新登录状态
      this.userRole = null; // 清除角色信息
      this.teamId = null; // 清除团队 ID
      this.villageId = null; // 清除村庄ID
      this.$router.push('/login'); // 跳转到登录页
    },
   
    
  },
  mounted() {
    this.checkLoginStatus();
    console.log('Component Loaded:', this.teamId, this.villageId); // 添加调试信息
  },
};
</script>

<style scoped>
.system-admin {
  padding: 30px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.admin-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.admin-section button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-section button:hover {
  background-color: #0056b3;
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
  text-align: center;
}

.admin-btn:hover {
  background-color: #0056b3;
}
</style>