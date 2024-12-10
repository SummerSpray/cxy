// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueBaiduMap from 'vue-baidu-map-3x';


const app = createApp(App);
app.use(router);
app.use(VueBaiduMap, { ak: 'Qn8QrxMGdd4rPP562dgUWpcWDTIDj4SS' });
app.mount('#app');