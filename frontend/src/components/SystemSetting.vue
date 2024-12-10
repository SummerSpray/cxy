<!-- SystemSetting.vue -->
<template>
  <div class="settings-container">
    <h2>系统设置</h2>

    <!-- 通知管理 -->
    <div class="notice-management">
      <h3>通知管理</h3>
      <input v-model="newNoticeTitle" placeholder="输入通知标题" />
      <textarea v-model="newNoticeContent" placeholder="输入新的通知"></textarea>
      <button @click="addNotice">添加通知</button>
      <ul>
        <li v-for="(notice) in sortedNotices" :key="notice.id" :class="{ 'pinned-notice': notice.isPinned === 1 }">
          {{ notice.title }} - {{ notice.content }}
          <div class="button-group">
            <button @click="togglePin(notice.id)">
              {{ notice.isPinned === 1 ? '取消置顶' : '置顶' }}
            </button>
            <button @click="deleteNotice(notice.id)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newNoticeTitle: '',
      newNoticeContent: '',
      notices: [],
      headerImage: null,
      currentHeaderImage: null,
    };
  },
  async created() {
    await this.fetchNotices();
    await this.fetchCurrentHeaderImage();
  },
  computed: {
    sortedNotices() {
      return this.notices.slice().sort((a, b) => {
        return b.isPinned - a.isPinned;
      });
    },
  },
  methods: {
    handleFileUpload(event) {
      this.headerImage = event.target.files[0];
    },
    async uploadHeaderImage() {
      const formData = new FormData();
      formData.append('image', this.headerImage);
      try {
        const response = await axios.post('http://localhost:5000/api/upload-header-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.currentHeaderImage = response.data.path;
        alert('头图上传成功');
      } catch (error) {
        console.error('头图上传失败:', error);
      }
    },
    async deleteHeaderImage() {
      try {
        await axios.delete('http://localhost:5000/api/delete-header-image');
        this.currentHeaderImage = null;
        alert('头图删除成功');
      } catch (error) {
        console.error('头图删除失败:', error);
      }
    },
    async fetchNotices() {
      try {
        const response = await axios.get('http://localhost:5000/api/notices');
        this.notices = response.data;
      } catch (error) {
        console.error('获取通知失败:', error);
      }
    },
    async addNotice() {
      if (!this.newNoticeTitle.trim() || !this.newNoticeContent.trim()) {
        alert('通知标题和内容不能为空');
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/notices', {
          title: this.newNoticeTitle,
          content: this.newNoticeContent,
        });
        this.notices.push(response.data);
        this.newNoticeTitle = '';
        this.newNoticeContent = '';
        alert('通知添加成功');
      } catch (error) {
        console.error('添加通知失败:', error);
      }
    },
    async deleteNotice(noticeId) {
      console.log('Deleting notice with ID:', noticeId); // 添加日志输出
      try {
        await axios.delete(`http://localhost:5000/api/notices/${noticeId}`);
        // 使用 filter 方法移除指定ID的通知
        this.notices = this.notices.filter((notice) => notice.id !== noticeId);
        alert('通知已删除');
      } catch (error) {
        if (error.response.status === 404) {
          alert('通知未找到，请检查通知ID是否正确');
        } else {
          console.error('删除通知失败:', error);
        }
      }
    },
    async togglePin(noticeId) {
      try {
        const action = this.notices.find(notice => notice.id === noticeId).isPinned === 1 ? 'unpin' : 'pin';
        const response = await axios.put(`http://localhost:5000/api/notices/${noticeId}/${action}`);
        if (response.data && response.data.notice) {
          // 更新本地数据
          this.notices = this.notices.map((notice) =>
            notice.id === noticeId ? response.data.notice : notice
          );
          alert(`${action === 'pin' ? '通知已置顶' : '通知已取消置顶'}`);
        } else {
          console.error(`${action === 'pin' ? '置顶' : '取消置顶'}通知响应格式不正确:`, response.data);
        }
      } catch (error) {
        console.error(`${action === 'pin' ? '置顶' : '取消置顶'}通知失败:`, error);
      }
    },
    async fetchCurrentHeaderImage() {
      try {
        const response = await axios.get('http://localhost:5000/api/get-header-image');
        this.currentHeaderImage = response.data.path;
      } catch (error) {
        console.error('获取当前头图失败:', error);
      }
    },
  },
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
.pinned-notice {
  background-color: #ffebcc; /* 例如，使用黄色背景 */
  font-weight: bold;
}

.notice-management {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.notice-management h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

input, textarea {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.button-group {
  display: flex;
  gap: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}

.current-header-image img {
  max-width: 100%;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
</style>