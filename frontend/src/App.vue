<template>
  <div>
    <!-- 导航栏 -->
    <header>
      <div class="title">农村信息管理系统</div>
      <nav>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/village">村列总汇</router-link></li>
          <li><router-link to="/team">科技团队</router-link></li>
          <li><router-link to="/product">一村一品</router-link></li>
          <li><router-link to="/admin">个人中心</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- 路由内容区域 -->
    <router-view class="router-view-margin"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* 导航栏样式 */
header {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  background-color: #333; /* 使背景颜色更深，更紧贴页面顶部 */
  padding: 0 30px; /* 添加水平内边距 */
}

.title {
  color: white;
  font-size: 24px;
  margin-right: auto; /* 让标题占据剩余空间 */
}

header nav {
  height: 60px; /* 增加导航栏的高度 */
  flex: 1; /* 让导航部分占据剩余空间 */
}

header nav ul {
  display: flex;
  justify-content: space-between; /* 保持间距 */
  list-style: none;
  padding: 0; /* 移除padding */
  margin: 0; /* 移除margin */
  height: 100%; /* 使ul占满整个导航栏的高度 */
}

header nav ul li {
  font-size: 18px;
  flex: 1; /* 每个li占据相等的空间 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

header nav ul li a {
  color: white; /* 设置链接颜色为白色 */
  text-decoration: none; /* 移除下划线 */
  height: 100%; /* 使a标签占满整个li的高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

body {
  margin: 0;
}

/*插入页面 */
.router-view-margin {
  margin: 8px;
}

/* Swiper 分页器样式 */
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  text-align: center;
  width: 100%;
}

/* Swiper 导航按钮 */
.swiper-button-next,
.swiper-button-prev {
  color: white;
}
</style>