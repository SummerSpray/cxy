<template>
  <div class="tech-team">
    <h2>团队主页</h2>
    <div v-if="team" class="team-details">
      <div class="team-info">
        <h3>{{ team.name }}</h3>
        <h4>介绍:</h4>
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
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      team: null,
    };
  },
  methods: {
    async fetchTeamDetails(teamId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/techteams/${teamId}`);
        const teamData = response.data;

        // 获取团队报告数据
        const reportsResponse = await axios.get(`http://localhost:5000/api/techteams/${teamId}/reports`);
        teamData.TeamReports = reportsResponse.data;

        this.team = teamData;
      } catch (error) {
        console.error("获取团队详细信息失败", error);
      }
    },
  },
  created() {
    const teamId = this.$route.params.id; // 从路由参数中获取团队ID
    this.fetchTeamDetails(teamId);
  },
};
</script>

<style scoped>
.tech-team {
  padding: 20px;
  background: #f9f9f9;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.team-details {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.team-info, .team-reports {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.team-info h3, .team-reports h4 {
  font-size: 24px;
  margin-bottom: 10px;
}

.team-info p, .team-reports p {
  color: #555;
  font-size: 16px;
  margin-bottom: 10px;
}

.members-list, .reports-list {
  list-style-type: none;
  padding-left: 0;
}

.members-list li, .reports-list li {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
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

.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>