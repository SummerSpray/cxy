**包含以下功能**
![image](https://github.com/user-attachments/assets/6be35b54-a5c1-4cb7-8b8c-e4469d830ef2)

**系统功能**
系统主要包含以下几个模块：
1.	首页：作为用户进入平台的第一界面，顶部导航栏提供快速访问村庄信息、科技团队信息、村庄产品信息和个人中心的入口。中间的村庄表格为用户提供了村庄的概览，下方的通知栏用于发布和管理最新的通知信息。
2.	村庄信息页面：用户点击村庄名称后，可以进入详细的村庄信息页面，查看村庄的图片、简介、村委介绍、总况介绍、人员介绍、业绩管理、工作跟踪等详细信息，全面了解村庄的各个方面。
3.	产品界面：该界面展示村庄的特色产品，包括产品图片、名称、简介、价格和详细介绍图，用户可以直观地了解产品信息，并进行购买或了解更多。
4.	团队信息页面：展示科技团队的详细信息，包括团队名称、介绍、成员、团队类型、联系方式和团队报告，为村庄和科技团队之间的合作提供信息支持。
5.	村庄管理界面：村庄管理员可以通过此界面编辑村庄信息，包括地点选取、图片上传和产品信息编辑，确保信息的准确性和时效性。
6.	团队管理界面：团队管理员可以在此界面编辑团队信息，包括团队类型的选择和成员信息的更新，以保持团队信息的最新状态。
7.	系统管理员界面：系统管理员拥有最高权限，可以编辑用户权限，挂靠用户到科技团队和村庄，创建和删除村庄和科技团队，设置通知，以及管理整个平台的运行。
8.	注册与登录页面：用户注册时需要提供邮箱地址，通过邮箱验证码验证身份，确保用户注册的安全性和真实性。
9.	个人信息编辑页面：用户可以在此页面修改自己的密码等个人信息，保护个人隐私和账户安全。

**技术架构**
项目的技术架构是构建在现代WEB开发技术之上的，采用Node.js作为主要的后端支持架构，Spring Boot实现次要的后端功能。MySQL作为数据库支持，存储和管理平台的所有数据。Vue.js和Axios用于构建用户界面和实现前后端的交互。百度地图API用于显示村庄地理位置，提供地理信息服务。Cors实现跨域调用，解决前后端不同端口的信息交互问题。Spring Boot Starter Mail用于发送邮箱验证码，确保用户注册和信息验证的安全性。Multer用于处理用户上传的图片资源，保存到特定文件夹并且上传到数据库。定时器用于验证码发送的倒计时，提高用户体验。

**【启动项目介绍】**
命令行打开后端文件夹，npm i后输入node server.js启动
db里有数据库文件，用户root密码123456可以在.env文件配置
命令行打开前端文件夹，npm i后输入npm run serve启动
SDK版本21，java版本21

**系统设计**
![image](https://github.com/user-attachments/assets/4fb7fc72-c039-4ce1-8b07-dd9e7e3db238)
![image](https://github.com/user-attachments/assets/1163776c-c76d-4c20-b4c0-da34981f82ae)
页面1.首页：
顶部导航栏
【村列总汇】点击即可查看所有村庄信息。页面2
【科技团队】点击查看所有科技团队信息 。页面3
【一村一品】点击查看所有村庄产品信息 。页面4
【个人中心】根据用户的权限显示不同的信息。页面5

中间村庄表
下方通知栏可以显示通知。
![image](https://github.com/user-attachments/assets/72ca6ff9-b7d8-4f01-8ade-fe38441f9f98)
![image](https://github.com/user-attachments/assets/4232bc77-ff2b-4dd2-8377-7576c6a86c21)
![image](https://github.com/user-attachments/assets/43cf9429-fff2-4a4e-9966-fc2edca33adb)
![image](https://github.com/user-attachments/assets/7c40312d-fbba-4f88-9cd8-947f0927cf03)
![image](https://github.com/user-attachments/assets/870ee287-acf1-4e4b-a90b-85158e60adb2)![image](https://github.com/user-attachments/assets/a986735e-7534-4156-951a-83bfa8e97f3f)![image](https://github.com/user-attachments/assets/da481ac6-e8e8-49de-884f-805a37139519)
如上是各种展示页面，还有个人中心根据用户的权限显示不同的功能和界面。
下面是详细的展示页面：
![image](https://github.com/user-attachments/assets/4cc3bd57-351e-4472-a9e5-6415ff022d3b)![image](https://github.com/user-attachments/assets/3ac4ea98-e746-4b5e-a8b8-97612a478dd0)
页面6.点击村庄即可进入村庄信息查看信息页面，包含：
【村庄图片】【村庄简介】
【村委介绍】
总况介绍
人员介绍
业绩管理
工作跟踪
【村况介绍】
总况介绍
地理位置（采用百度地图api）
结构管理
【该村产品】
点击即可显示该村的所有产品
![image](https://github.com/user-attachments/assets/05b2d06a-25e9-4a07-a33a-6033b1fd7baa)

页面7.产品界面，包含：
【产品图片】
【产品名称】
【产品简介】
【产品价格】
【产品介绍图】
![image](https://github.com/user-attachments/assets/5be95df5-74d5-424e-b9e4-5f2386c1edbd)
点击团队即可进入团队信息页面，查看该团队的详细信息，有：
【团队名称】【团队介绍】【团队成员】
【团队类型】
特派员团队
驻镇工作队
【联系方式】
【团队报告】
![image](https://github.com/user-attachments/assets/2315f8f3-68bd-4c16-83f4-b9e944a078ce)
![image](https://github.com/user-attachments/assets/d1d4f08f-31be-431b-b7d3-e090e3afe5f2)
![image](https://github.com/user-attachments/assets/c63e532a-bb0b-4613-aac6-aaa81119b6d1)
当村庄管理员进入村庄管理界面，可以编辑村庄信息。
村庄地点通过百度地图api来选取经纬度
可以通过上传图片修改村庄信息
可以编辑产品信息。
![image](https://github.com/user-attachments/assets/61f06078-e23a-4b0f-822d-57157b2c0206)
团队管理员可以编辑团队信息。
团队类型进行下拉菜单选择。
![image](https://github.com/user-attachments/assets/fadb78a5-caf3-4924-b362-1cadf3e9a75c)
页面11.系统管理员可以对用户的权限进行编辑，可以将用户挂靠在科技团队和村庄。
![image](https://github.com/user-attachments/assets/53e01fa0-4cf1-424e-abf5-f6bc0958e090)
![image](https://github.com/user-attachments/assets/e2ba68d2-5256-4c8e-9c23-ae5c1800e6b1)
管理员可以创建和删除村庄。新建村庄后将村庄管理员挂靠在该村，便可编辑新村信息。同理，管理员可以创建和删除科技团队。
![image](https://github.com/user-attachments/assets/becc01aa-54b4-4121-a02e-85c304ed1039)
![image](https://github.com/user-attachments/assets/3de1d825-d1a5-497d-b396-16c3022c3b88)
注册页面
包含发送邮箱验证码的功能，输入正确验证码才可注册

![image](https://github.com/user-attachments/assets/ca811eda-1b0b-4d1e-8ff1-e9c8d83e5995)
![image](https://github.com/user-attachments/assets/c9ba408d-167b-437c-be00-2d6f9d685542)

**[WEB开发技术应用情况]**

**Nodejs**
•	技术点概述： 作为主要的后端支持架构，包含了90%的后端功能
•	实现方法或步骤：后端目录文件包含controller，models（数据库对应每个表的模型）还有routes
和server.js的api列表（部分）
•	程序关键源码和实现结果截图： 
![image](https://github.com/user-attachments/assets/40d5248f-7562-470d-88ec-f0cf33a54f03)![image](https://github.com/user-attachments/assets/cf305723-558c-4176-b177-8a662e46aa47)

**Springboot**
•	技术点概述： springboot服务器实现次要的后端功能
•	实现方法或步骤：在idea里新建一个springboot服务器，进行补充的后端操作（比如发送邮箱验证码，增加、删除村庄，增加、删除科技团队）
•	程序关键源码：
![image](https://github.com/user-attachments/assets/7d3be45f-d4a1-4d1a-a7f0-019be8086025)![image](https://github.com/user-attachments/assets/f307a6cf-d72b-4af8-bec5-1fa1d1d58cb6)

**MySQL**
•	技术点概述： 作为数据库为前端提供数据支持
•	实现方法或步骤： 	包含12个表，概括了本项目所有的数据支持。
![image](https://github.com/user-attachments/assets/1cd4f99b-dd01-4037-9984-e75c2dcfed56)

**Vue.js**
o	描述：渐进式JavaScript框架，用于构建用户界面。
o	下面是页面列表
![image](https://github.com/user-attachments/assets/8a95d04a-8e1b-4a00-bfb5-de88b405e74b)

**Axios**
•	技术点概述： 前后端链接的主要方法
•	实现方法或步骤： 安装axios后在script区域import axios from 'axios';
•	程序关键源码： 截取小部分，所有的api获取都是axios
![image](https://github.com/user-attachments/assets/e900ffea-e4fc-4ae4-9985-21729da13e53)

**百度地图api**
o	技术点概述： 实现通过经纬度显示村庄地理位置
o	实现方法或步骤： 安装百度地图插件后import { BaiduMap, BmMarker } from 'vue-baidu-map-3x'，从数据库自动获取经纬度并且显示村庄地图
o	
o	程序关键源码：html元素格式如下：
![image](https://github.com/user-attachments/assets/ccc72c41-94d0-4706-ba2c-9edd786edcdb)
![image](https://github.com/user-attachments/assets/aa015ee7-3f59-426b-a388-95195328093d)

**Cors**
o	技术点概述： 实现跨域调用，本项目是前端8080端口调用5000端口和9000端口的后端
o	实现方法或步骤： 设置跨域请求后可以允许前后端不同端口的信息交互
o	程序关键源码
![image](https://github.com/user-attachments/assets/46082720-98bd-4089-87ca-dd7033625327)


**发送Email**
•	技术点概述： 用户注册时通过前端提供的邮箱地址，后端发送邮箱验证码，来实现用户注册的功能。
•	实现方法或步骤：使用Spring Boot Starter Mail，qq邮箱smtp
![image](https://github.com/user-attachments/assets/0294ef08-19d5-4039-b55a-d00aa6676c15)

**监听器**
•	技术点概述： 监听窗口关闭事件，以防用户手动关闭窗口
•	实现方法或步骤： 在打开地图方法中监听窗口
![image](https://github.com/user-attachments/assets/5e60e8dc-880b-44e5-ad3d-8896591bf64f)
















