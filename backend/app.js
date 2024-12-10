const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// 导入路由
const userRoutes = require('./routes/userRoutes');
const villageRoutes = require('./routes/villageRoutes');
const productRoutes = require('./routes/productRoutes');


// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/villages', villageRoutes);
app.use('/api/products', productRoutes);

// 启动服务
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
