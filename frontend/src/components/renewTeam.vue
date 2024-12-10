<template>
  <div class="renew-team-container">
    <h1>修改团队信息</h1>
    <div class="form-container">
      <div class="left-column">
        <form @submit.prevent="updateTeam" class="renew-team-form">
          <div class="form-group">
            <label for="name">团队名称:</label>
            <input type="text" id="name" v-model="team.name" required class="form-input" />
          </div>
          <div class="form-group">
            <label for="description">团队描述:</label>
            <textarea id="description" v-model="team.description" required class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label for="type">团队类型:</label>
            <select id="type" v-model="team.type" required class="form-input">
              <option value="特派员团队">特派员团队</option>
              <option value="驻镇工作队">驻镇工作队</option>
            </select>
          </div>
          <div class="form-group">
            <label for="phone">联系电话:</label>
            <input type="text" id="phone" v-model="team.phone" required class="form-input" />
          </div>
          <div class="form-group">
            <label for="members">团队成员:</label>
            <div v-for="(member, index) in team.members" :key="index" class="member-item">
              <input type="text" v-model="member.name" placeholder="姓名" class="form-input mbinput" />
              <input type="text" v-model="member.role" placeholder="角色" class="form-input mbinput" />
              <button @click.prevent="removeMember(index)" class="form-button">删除</button>
            </div>
            <button @click.prevent="addMember" class="form-button">新增成员</button>
          </div>
          <button type="submit" class="form-button">保存修改</button>
        </form>
      </div>
      <div class="right-column">
        <h2>团队项目</h2>
        <div v-for="(project, index) in team.projects" :key="index" class="project-card">
  <div v-if="!project.editing">
    <h3>{{ project.title }}</h3>
    <p>{{ project.content }}</p>
    <div class="card-buttons">
      <button @click="editProject(index)" class="form-button">编辑</button>
      <button @click.prevent="deleteProject(index)" class="form-button">删除</button>
    </div>
  </div>
  <div v-else>
    <input type="text" v-model="project.title" placeholder="项目标题" class="form-input" />
    <textarea v-model="project.content" placeholder="项目内容" class="form-textarea"></textarea>
    <button @click="saveProject(index)" class="form-button">保存</button>
    <button @click="cancelEditProject(index)" class="form-button">取消</button>
  </div>
</div>
        <button @click.prevent="addProject" class="form-button">新增项目</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      team: {
        id: null,
        name: '',
        description: '',
        type: '',
        phone: '',
        members: [],
        projects: []
      }
    };
  },
  created() {
    this.fetchTeam();
  },
  methods: {
    async fetchTeam() {
      const teamId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/techteams/${teamId}`);
        this.team = response.data;
        console.log('Team:', this.team);
        // 获取团队项目
        const projectsResponse = await axios.get(`http://localhost:5000/api/techteams/${teamId}/reports`);
        this.team.projects = projectsResponse.data.map(project => ({
          id: project.id,
          title: project.report_title,
          content: project.report_content,
          editing: false
        }));
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    },
    async updateTeam() {
      try {
        // 更新团队基本信息
        await axios.put(`http://localhost:5000/api/techteams/${this.team.id}`, this.team);

        // 更新或创建项目
        for (const project of this.team.projects) {
          if (project.id) {
            await axios.put(`http://localhost:5000/api/team_reports/${project.id}`, project);
          } else {
            await axios.post(`http://localhost:5000/api/team_reports`, { 
              team_id: this.team.id,
              report_title: project.title,
              report_content: project.content
            });
          }
        }

        alert('团队信息更新成功');
        window.location.reload();
      } catch (error) {
        console.error('Error updating team:', error);
      }
    },
    addMember() {
      this.team.members.push({ name: '', role: '' });
    },
    removeMember(index) {
      this.team.members.splice(index, 1);
    },
    addProject() {
      this.team.projects.push({ title: '', content: '', editing: true });
    },
    removeProject(index) {
      this.deleteProject(index);
    },
    editProject(index) {
      this.team.projects[index].editing = true;
    },
    saveProject(index) {
      this.team.projects[index].editing = false;
    },
    cancelEditProject(index) {
      this.team.projects[index].editing = false;
    },
    async deleteProject(index) {
      const projectId = this.team.projects[index].id;
      try {
        console.log('Deleting project with ID:', projectId); // 添加日志 
        await axios.delete(`http://localhost:5000/api/team_reports/${projectId}`);
        this.team.projects.splice(index, 1);
        
        alert('项目删除成功');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('删除项目失败，请稍后再试');
      }
    }
  }
};
</script>

<style scoped>
/* 保留原有样式 */
.renew-team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-container {
  display: flex;
  justify-content: space-between;
}

.left-column, .right-column {
  width: 48%;
}

.renew-team-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #333;
}
.mbinput{
  width:242px !important;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}
.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #007BFF;
  outline: none;
}

.form-button {
  height: 40px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  align-self: center;
}

.form-button:hover {
  background-color: #0056b3;
}

.member-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.member-item input {
  margin-right: 10px;
}

.project-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 10px 60px 10px; /* 增加底部内边距 */
  margin-bottom: 10px;
  position: relative;
}

.project-card h3 {
  margin-top: 0;
}

.project-card p {
  margin: 5px 0;
}

.project-card button {
  margin-right: 5px;
}

.right-column h2 {
  font-size: 24px;
  margin-bottom: 15px;
}
.card-buttons {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px; /* 调整底部距离 */
  right: 10px; /* 调整右侧距离 */
}

.card-buttons button {
  margin-left: 10px; /* 调整按钮之间的间距 */
}
</style>