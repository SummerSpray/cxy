<template>
  <div class="notice-board">
    <h2>最新通知</h2>
    <ul>
      <li
        v-for="notice in notices"
        :key="notice.id"
        :class="{ 'is-pinned': notice.isPinned }"
      >
        <strong>{{ notice.title }}</strong>
        <p>{{ notice.content }}</p>
        <small>发布时间: {{ new Date(notice.createdAt).toLocaleString() }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    fetchNotices() {
      fetch('http://localhost:5000/api/notices')
        .then((response) => response.json())
        .then((data) => {
          // 假设 API 返回的数据中包含 isPinned 字段
          this.notices = data.map((notice) => ({
            ...notice,
            isPinned: notice.isPinned || false, // 确保 isPinned 字段存在
          }));

          // 对通知进行排序，确保 isPinned 为 true 的通知排在前面
          this.notices.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
          });
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.fetchNotices();
  },
};
</script>

<style scoped>
.notice-board {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.notice-board h2 {
  margin-bottom: 10px;
}
.notice-board ul {
  list-style-type: none;
  padding: 0;
}
.notice-board li {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  transition: background 0.3s;
}
.notice-board li.is-pinned {
  background: #f1f1f1; /* 高亮背景色 */
  font-weight: bold; /* 加粗字体 */
}

</style>