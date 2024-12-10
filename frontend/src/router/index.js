import { createRouter, createWebHistory } from 'vue-router';
import PersonCenter from '@/components/PersonCenter.vue';
import VillageManagement from '@/components/VillageManagement.vue';
import UserManagement from '@/components/UserManagement.vue';
import LocationService from '@/components/LocationService.vue';
import Home from '@/views/Home.vue'; 
import Village from '@/views/Village.vue';
import Team from '@/views/Team.vue';
import Product from '@/views/Product.vue';
import VillageDetail from '@/views/VillageDetail.vue';
import login from '@/views/Login.vue';
import register from '@/views/Register.vue';
import TeamInfo from '@/components/TeamInfo.vue';
import ProductInfo from '../components/ProductInfo.vue';
import renewTeam from '../components/renewTeam.vue';
import SystemSetting from '../components/SystemSetting.vue';
import UserProfile from '../components/UserProfile.vue';
import AdminTeam from '../components/AdminTeam.vue';
import AdminVillage from '../components/AdminVillage.vue';

// 创建路由实例
const routes = [
  {
    path: '/admin/techteams',
    name: 'AdminTeam',
    component: AdminTeam,
  },
  {
    path: '/admin/villages',
    name: 'AdminVillage',
    component: AdminVillage,
  },
  {
    path: '/user/profile/:id',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/admin/settings',
    name: 'SystemSetting',
    component: SystemSetting,
  },
  {
    path: '/admin',
    name: 'PersonCenter',
    component: PersonCenter,
  },
  {
    path: '/admin/users',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
    path: '/location',
    name: 'LocationService',
    component: LocationService,
  },
 {
    path: '/',           // 设置首页路由
    name: 'Home',       
    component: Home,     
  },
  {
      path: '/village',  // 村庄页面
      name: 'Village',
      component: Village,
    },
    {
      path: '/village/management/:villageId',
      name: 'VillageManagement',
      component: VillageManagement,
    },
    {
      path: '/team',  // 团队页面路径
      name: 'Team',
      component: Team,
    },
    {
      path: '/team/:id',  // 动态路由，id 为团队的唯一标识
      name: 'TeamInfo',
      component: TeamInfo,  // 对应团队详情页组件
    },
    {
      path: '/team/:id/renew',  // 动态路由，id 为团队的唯一标识
      name: 'RenewTeam',
      component: renewTeam,  // 对应团队详情页组件
    },
    {
      path: '/product',  // 产品页面路径
      name: 'Product',
      component: Product,
    },
    {
      path: '/product/:id',  // 动态路由，id 为产品的唯一标识
      name: 'ProductInfo',
      component: ProductInfo,  // 对应产品详情页组件
    },

    {
      path: '/village/:id',  // 动态路由，id 为村庄的唯一标识
      name: 'VillageDetail',
      component: VillageDetail,  // 对应村庄详情页组件
    },
    {
      path: '/login',  // 登录页面路径
      name: 'Login',
      component: login,
    },
    {
      path: '/register',  // 注册页面路径
      name: 'Register',
      component: register,
    },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // 配置路由模式
  routes,  // 使用路由数组
});




export default router;
