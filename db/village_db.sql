/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : village_db

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2024-12-06 12:56:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for committee_members
-- ----------------------------
DROP TABLE IF EXISTS `committee_members`;
CREATE TABLE `committee_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `committee_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `village_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `committee_id` (`committee_id`),
  KEY `fk_village_id` (`village_id`),
  CONSTRAINT `committee_members_ibfk_1` FOREIGN KEY (`committee_id`) REFERENCES `village_committees` (`id`),
  CONSTRAINT `fk_village_id` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of committee_members
-- ----------------------------
INSERT INTO `committee_members` VALUES ('1', '1', '张三', '村长', '1');
INSERT INTO `committee_members` VALUES ('2', '1', '李四', '副村长', '1');
INSERT INTO `committee_members` VALUES ('3', '2', '王五', '财务主管', '2');
INSERT INTO `committee_members` VALUES ('4', '3', '赵三', '村主任', '3');
INSERT INTO `committee_members` VALUES ('5', '3', '钱四', '副主任', '3');
INSERT INTO `committee_members` VALUES ('6', '4', '孙五', '村主任', '4');
INSERT INTO `committee_members` VALUES ('7', '4', '周六', '秘书', '4');
INSERT INTO `committee_members` VALUES ('8', '5', '吴七', '村主任', '5');
INSERT INTO `committee_members` VALUES ('9', '5', '郑八', '会计', '5');
INSERT INTO `committee_members` VALUES ('10', '1', '小蔡', '团支书', '1');

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `village_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `village_id` (`village_id`),
  CONSTRAINT `contents_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of contents
-- ----------------------------
INSERT INTO `contents` VALUES ('1', '村庄发展计划', '本村庄的发展计划包括……', 'approved', '2024-11-27 20:14:17', '2024-11-27 20:14:17', '1');
INSERT INTO `contents` VALUES ('2', '村委会议纪要', '本次村委会议讨论了……', 'pending', '2024-11-27 20:14:17', '2024-11-27 20:14:17', '1');
INSERT INTO `contents` VALUES ('3', '环保活动通知', '本周六将举办环保活动……', 'published', '2024-11-27 20:14:17', '2024-11-27 20:14:17', '2');
INSERT INTO `contents` VALUES ('4', '和谐村新农村建设计划', '计划建设村级图书馆和文化中心。', 'pending', '2024-11-27 21:50:00', '2024-11-27 21:50:00', '3');
INSERT INTO `contents` VALUES ('5', '繁荣村智慧农业规划', '将打造现代化农业科技示范区。', 'approved', '2024-11-27 21:50:00', '2024-11-27 21:50:00', '4');
INSERT INTO `contents` VALUES ('6', '和平村医疗保障计划', '设立村级医疗保障中心，提供基础医疗服务。', 'published', '2024-11-27 21:50:00', '2024-11-27 21:50:00', '5');

-- ----------------------------
-- Table structure for notices
-- ----------------------------
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPinned` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of notices
-- ----------------------------
INSERT INTO `notices` VALUES ('4', '繁荣村招商会通知', '本周六将举行繁荣村招商会……', '2024-11-27 21:20:09', '2024-12-03 15:24:43', '0');
INSERT INTO `notices` VALUES ('5', '和平村社区活动通知', '本周日将举行和平村社区活动……', '2024-11-27 21:20:09', '2024-11-27 21:20:09', '0');
INSERT INTO `notices` VALUES ('7', '繁荣村工业招商大会', '欢迎各企业参加工业招商大会，共谋发展。', '2024-11-27 21:40:00', '2024-11-27 21:40:00', '0');
INSERT INTO `notices` VALUES ('8', '和平村文化节', '本周六和平村将举办年度文化节，欢迎参加。', '2024-11-27 21:40:00', '2024-11-27 21:40:00', '0');
INSERT INTO `notices` VALUES ('9', '紧急通知', '明天将要下雪', '2024-12-03 09:51:01', '2024-12-03 15:14:27', '0');
INSERT INTO `notices` VALUES ('10', '今日头条', '幸福村将要举办百年村庆，请大家前来参加', '2024-12-03 14:47:31', '2024-12-03 15:31:59', '1');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` float DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `village_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `InfoImg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `village_id` (`village_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', '苹果', '新鲜的本地苹果', '6', '1733455696939_1733236842593_apple.jpg', '1', '2024-11-27 20:14:28', '2024-12-06 03:28:16', '1733236842595_apple_info.jpg');
INSERT INTO `products` VALUES ('2', '大米', '优质稻米', '10', 'rice.jpg', '2', '2024-11-27 20:14:28', '2024-11-27 20:14:28', 'rice_info.jpg');
INSERT INTO `products` VALUES ('3', '鸡蛋', '农家土鸡蛋', '4', 'eggs.jpg', '1', '2024-11-27 20:14:28', '2024-12-03 14:10:02', 'eggs_info.jpg');
INSERT INTO `products` VALUES ('4', '玉米', '优质玉米', '4.5', 'corn.jpg', '3', '2024-11-27 21:35:00', '2024-11-27 21:35:00', 'corn_info.jpg');
INSERT INTO `products` VALUES ('5', '白菜', '本地新鲜白菜', '2', 'cabbage.jpg', '4', '2024-11-27 21:35:00', '2024-11-27 21:35:00', 'cabbage_info.jpg');
INSERT INTO `products` VALUES ('6', '土豆', '农家土豆', '3', 'potato.jpg', '5', '2024-11-27 21:35:00', '2024-11-27 21:35:00', 'potato_info.jpg');

-- ----------------------------
-- Table structure for team_reports
-- ----------------------------
DROP TABLE IF EXISTS `team_reports`;
CREATE TABLE `team_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `report_title` varchar(255) NOT NULL,
  `report_content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `fk_team_id` FOREIGN KEY (`team_id`) REFERENCES `techteams` (`id`),
  CONSTRAINT `team_reports_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `techteams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of team_reports
-- ----------------------------
INSERT INTO `team_reports` VALUES ('1', '1', '农业技术推广报告', '本月我们进行了多次农业技术培训，效果显著。', '2024-11-27 20:12:50', '2024-11-28 15:04:44');
INSERT INTO `team_reports` VALUES ('2', '2', '环保技术进展报告', '本月我们完成了对村庄的环保设施改造，提高了环保标准。', '2024-11-27 20:12:50', '2024-11-28 15:02:51');
INSERT INTO `team_reports` VALUES ('5', '2', '环保技术团队季度报告', '本季度，我们的环保技术团队专注于开发可持续能源解决方案，成功实施了三项创新项目，包括太阳能板优化、废水循环利用系统和绿色建筑材料研究。这些项目不仅提高了能源效率，还减少了环境污染，为实现绿色可持续发展目标迈出了坚实的一步。', '2024-11-28 15:02:51', '2024-11-28 15:02:51');
INSERT INTO `team_reports` VALUES ('6', '2', '废物转化能源', '在过去三个月中，我们的环保技术团队成功完成了废物转化能源项目。通过先进的生物消化技术，我们将城市有机废物转化为生物气体，用于发电和供暖。此项目不仅减少了废物填埋量，还为当地社区提供了清洁能源，实现了环境与经济效益的双赢。', '2024-11-28 15:02:51', '2024-11-28 15:02:51');
INSERT INTO `team_reports` VALUES ('7', '2', '绿色交通系统', '环保技术团队专注于绿色交通系统的开发与部署。我们推出了电动公交车队，并在主要交通路线上安装了太阳能充电站。这些措施显著降低了公共交通的碳排放，同时提高了能源自给率，为城市交通的绿色转型做出了贡献。', '2024-11-28 15:02:51', '2024-11-28 15:02:51');
INSERT INTO `team_reports` VALUES ('8', '1', '精准农业技术应用', '农业技术团队在精准农业领域取得了显著进展。我们引入了智能灌溉系统和无人机监测技术，有效提高了作物产量和土地利用率。通过数据分析优化种植模式，减少了化肥和水资源的浪费，同时提升了作物的抗病虫害能力，为农业可持续发展做出了积极贡献。', '2024-11-28 15:03:55', '2024-11-28 15:04:44');
INSERT INTO `team_reports` VALUES ('9', '1', '生态农业实践', '农业技术团队致力于生态农业的实践与推广。我们成功实施了有机耕作和自然害虫管理项目，减少了化学农药的使用，保护了土壤健康和生物多样性。此外，我们推广的多样化作物种植模式增强了农业系统的抗风险能力，为农民带来了更高的经济收益和环境效益。', '2024-11-28 15:03:55', '2024-11-28 15:04:44');

-- ----------------------------
-- Table structure for techteams
-- ----------------------------
DROP TABLE IF EXISTS `techteams`;
CREATE TABLE `techteams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `members` json DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT '',
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of techteams
-- ----------------------------
INSERT INTO `techteams` VALUES ('1', '农业技术团队', '负责农业技术推广', '[{\"name\": \"赵六\", \"role\": \"技术员\"}, {\"name\": \"钱七\", \"role\": \"研究员\"}, {\"name\": \"阿明\", \"role\": \"队长\"}, {\"name\": \"艾克\", \"role\": \"研究员\"}]', '2024-11-27 20:12:50', '2024-11-28 15:04:44', '驻镇工作队');
INSERT INTO `techteams` VALUES ('2', '环保技术团队', '负责环保技术推广', '[{\"name\": \"孙八\", \"role\": \"工程师\"}, {\"name\": \"周九\", \"role\": \"顾问\"}]', '2024-11-27 20:12:50', '2024-11-28 15:02:51', '特派员团队');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `village_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `username_6` (`username`),
  KEY `users_ibfk_1` (`team_id`),
  KEY `fk_users_villages` (`village_id`),
  CONSTRAINT `fk_users_villages` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `techteams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '123456', 'admin', '2024-11-27 20:12:46', '2024-12-05 10:52:09', 'admin@example.com', null, null);
INSERT INTO `users` VALUES ('2', 'user', '123456', 'user', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'user1@example.com', null, null);
INSERT INTO `users` VALUES ('3', 'tech', '123456', 'tech', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'user2@example.com', '1', null);
INSERT INTO `users` VALUES ('4', 'village', '123456', 'villageAdmin', '2024-11-27 20:19:33', '2024-11-27 20:19:35', '12333@werwr.com', null, '1');
INSERT INTO `users` VALUES ('11', 'cxy', '123456', 'admin', '2024-11-27 14:00:58', '2024-11-27 15:20:55', '1922856923@qq.com', null, null);
INSERT INTO `users` VALUES ('12', 'tech1', '123456', 'tech', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'tech1@example.com', '1', null);
INSERT INTO `users` VALUES ('13', 'tech2', '123456', 'tech', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'tech2@example.com', '2', null);
INSERT INTO `users` VALUES ('14', 'tech3', '123456', 'tech', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'tech3@example.com', '1', null);
INSERT INTO `users` VALUES ('15', 'tech4', '123456', 'tech', '2024-11-27 20:12:46', '2024-11-27 20:12:46', 'tech4@example.com', '2', null);
INSERT INTO `users` VALUES ('16', 'xfc', '123456', 'villageAdmin', '2024-11-28 13:45:20', '2024-11-28 13:45:20', 'xianfucun_admin@example.com', null, '1');
INSERT INTO `users` VALUES ('17', 'xwc', '123456', 'villageAdmin', '2024-11-28 13:45:20', '2024-11-28 13:45:20', 'xwangcun_admin@example.com', null, '2');
INSERT INTO `users` VALUES ('18', 'hxc', '123456', 'villageAdmin', '2024-11-28 13:45:20', '2024-11-28 13:45:20', 'hexiecun_admin@example.com', null, '3');
INSERT INTO `users` VALUES ('19', 'frc', '123456', 'villageAdmin', '2024-11-28 13:45:20', '2024-11-28 13:45:20', 'fanrongcun_admin@example.com', null, '4');
INSERT INTO `users` VALUES ('20', 'hpc', '123456', 'villageAdmin', '2024-11-28 13:45:23', '2024-11-28 13:45:23', 'hepingcun_admin@example.com', null, '5');

-- ----------------------------
-- Table structure for villages
-- ----------------------------
DROP TABLE IF EXISTS `villages`;
CREATE TABLE `villages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of villages
-- ----------------------------
INSERT INTO `villages` VALUES ('1', '幸福村', '一个美丽的村庄，环境优美，民风淳朴。', '2024-11-27 20:12:32', '2024-12-03 14:41:13', '1733236873226_1733235023805_1.jpg');
INSERT INTO `villages` VALUES ('2', '希望村', '一个充满希望的村庄，经济发展迅速。', '2024-11-27 20:12:32', '2024-11-27 20:12:32', '2.jpg');
INSERT INTO `villages` VALUES ('3', '和谐村', '一个和谐的村庄，邻里和睦，生活安宁。', '2024-11-27 20:12:32', '2024-11-27 20:12:32', '3.jpg');
INSERT INTO `villages` VALUES ('4', '繁荣村', '一个繁荣的村庄，经济蓬勃发展。', '2024-11-27 21:30:00', '2024-11-27 21:30:00', '4.jpg');
INSERT INTO `villages` VALUES ('5', '和平村', '一个宁静的村庄，适合居住。', '2024-11-27 21:30:00', '2024-11-27 21:30:00', '');

-- ----------------------------
-- Table structure for village_committees
-- ----------------------------
DROP TABLE IF EXISTS `village_committees`;
CREATE TABLE `village_committees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) DEFAULT NULL,
  `committee_overview` text,
  `committee_achievements` text,
  `committee_tracking` text,
  PRIMARY KEY (`id`),
  KEY `village_id` (`village_id`),
  CONSTRAINT `village_committees_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of village_committees
-- ----------------------------
INSERT INTO `village_committees` VALUES ('1', '1', '幸福村村委由经验丰富的人士组成，致力于村庄的发展。', '成功举办了多次文化活动，改善了村庄的基础设施。', '正在规划新的环保项目。');
INSERT INTO `village_committees` VALUES ('2', '2', '希望村村委由年轻有为的人士组成，积极推动村庄的现代化。', '引进了多个高科技项目，提升了村民的生活水平。', '正在筹备新的教育项目。');
INSERT INTO `village_committees` VALUES ('3', '3', '和谐村村委重视文化建设，积极营造和谐氛围。', '举办了多次文化交流活动，修建了乡村公园。', '正在建设新的养老服务中心。');
INSERT INTO `village_committees` VALUES ('4', '4', '繁荣村村委由经验丰富的专家组成，注重经济发展与环境保护并重。', '吸引了多家企业投资，建设了高标准工业园区。', '规划建设智慧农业示范基地。');
INSERT INTO `village_committees` VALUES ('5', '5', '和平村村委专注于村民生活质量提升，注重教育和医疗发展。', '完善了村内教育设施，设立了村级诊所。', '筹备建设一个社区文化中心。');

-- ----------------------------
-- Table structure for village_locations
-- ----------------------------
DROP TABLE IF EXISTS `village_locations`;
CREATE TABLE `village_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) DEFAULT NULL,
  `latitude` decimal(11,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `village_id` (`village_id`),
  CONSTRAINT `village_locations_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of village_locations
-- ----------------------------
INSERT INTO `village_locations` VALUES ('1', '1', '23.04407900', '114.42419300');
INSERT INTO `village_locations` VALUES ('2', '2', '31.23040000', '121.47370000');
INSERT INTO `village_locations` VALUES ('3', '3', '23.12910000', '113.26440000');
INSERT INTO `village_locations` VALUES ('4', '4', '34.34157400', '108.93977000');
INSERT INTO `village_locations` VALUES ('5', '5', '29.56301000', '106.55155600');

-- ----------------------------
-- Table structure for village_status
-- ----------------------------
DROP TABLE IF EXISTS `village_status`;
CREATE TABLE `village_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) DEFAULT NULL,
  `status_overview` text,
  `status_map` varchar(255) DEFAULT NULL,
  `status_structure` text,
  `status_dynamic_map` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `village_id` (`village_id`),
  CONSTRAINT `village_status_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `villages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of village_status
-- ----------------------------
INSERT INTO `village_status` VALUES ('1', '1', '幸福村目前经济稳定，环境优美。', 'happy_village_map.jpg', '村庄分为东、西两个区域，东区主要为居住区，西区为农业区。', 'happy_village_dynamic_map.jpg');
INSERT INTO `village_status` VALUES ('2', '2', '希望村经济发展迅速，村民生活水平不断提高。', 'hope_village_map.jpg', '村庄分为南、北两个区域，南区主要为工业区，北区为居住区。', 'hope_village_dynamic_map.jpg');
INSERT INTO `village_status` VALUES ('3', '3', '和谐村生活安逸，民风淳朴。', 'harmony_village_map.jpg', '村庄分为北区和南区，北区为居民区，南区为生态保护区。', 'harmony_village_dynamic_map.jpg');
INSERT INTO `village_status` VALUES ('4', '4', '繁荣村工业与生态并存，未来规划良好。', 'prosperous_village_map.jpg', '村庄分为东区和西区，东区为商业中心，西区为农业区。', 'prosperous_village_dynamic_map.jpg');
INSERT INTO `village_status` VALUES ('5', '5', '和平村安居乐业，村民生活幸福。', 'peaceful_village_map.jpg', '村庄分为中心区和外围区，中心区为居民区，外围区为农业区。', 'peaceful_village_dynamic_map.jpg');
