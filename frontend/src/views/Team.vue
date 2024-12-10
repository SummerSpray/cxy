<template>
  <div>
    <h1>科技团队</h1>
    <div class="team-list">
      <div
        v-for="(team, index) in teams"
        :key="index"
        class="team-card"
      >
        <div class="team-info">
          <h3>{{ team.name }}</h3>
          <p>{{ team.description }}</p>
          <h4>成员:</h4>
          <ul class="members-list">
            <li v-for="(member, index) in team.members" :key="index">
              {{ member.name }} - {{ member.role }}
            </li>
          </ul>
          <h4>类型:</h4>
          <p>{{ team.type }}</p>
          <h4>联系方式:</h4>
          <p>{{ team.phone }}</p>
          <button @click="viewTeam(team.id)">查看详情</button>
        </div>
        <div class="team-reports">
          <h4>报告:</h4>
          <ul class="reports-list">
            <li v-for="(report, index) in team.TeamReports" :key="index">
              <strong>{{ report.report_title }}</strong>
              <p>{{ report.report_content }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      teams: [],
    };
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get("http://localhost:5000/api/techteams");
        const teamsData = response.data.map(team => ({ ...team, TeamReports: [] }));

        // 获取每个团队的报告数据
        for (const team of teamsData) {
          const reportsResponse = await axios.get(`http://localhost:5000/api/techteams/${team.id}/reports`);
          team.TeamReports = reportsResponse.data;
        }

        this.teams = teamsData;
      } catch (error) {
        console.error("获取团队信息失败", error);
      }
    },
    viewTeam(id) {
      this.$router.push(`/team/${id}`);
    },
  },
  mounted() {
    this.fetchTeams();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}
/* 整体样式 */
.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* 团队卡片样式 */
.team-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: space-between;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 团队信息区域样式 */
.team-info {
  flex: 1;
  margin-right: 20px;
}

/* 团队名称样式 */
.team-card h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* 团队描述样式 */
.team-card p {
  color: #555;
  font-size: 16px;
  margin-bottom: 10px;
}

/* 成员列表样式 */
.members-list {
  list-style-type: none;
  padding-left: 0;
}

.members-list li {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.members-list li::before {
  content: "• ";
  color: #4CAF50;
}

/* 报告区域样式 */
.team-reports {
  flex: 1;
  max-width: 40%;
}

.reports-list {
  list-style-type: none;
  padding-left: 0;
}

.reports-list li {
  margin-bottom: 10px;
}

.reports-list strong {
  font-size: 18px;
  color: #007BFF;
  margin-bottom: 5px;
  display: block;
}

.reports-list p {
  font-size: 16px;
  color: #555;
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>