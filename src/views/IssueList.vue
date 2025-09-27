<template>
  <div>
    <h1>GitHub Issue List</h1>

    <el-button @click="getIssues" type="success">Fetch Issues</el-button>
    <el-button @click="clearIssues" type="warning" style="margin-left:8px;">Clear</el-button>

    <div v-if="loading" style="margin-top:12px;">Loading...</div>
    <div v-if="error" style="color:red; margin-top:12px;">{{ error }}</div>

    <el-row v-if="issues.length" :gutter="12" style="margin-top:12px;">
      <el-col :key="issue.id" :span="12" v-for="(issue, index) in issues">
        <el-card class="box-card" shadow="hover" style="margin:5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ issue.title }}</el-col>
            <el-col :span="3">
              <el-button
                @click="closeIssue(index)"
                circle
                icon="el-icon-check"
                type="success"
                :aria-label="`Close issue: ${issue.title}`"
              ></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <div v-else-if="!loading" style="margin-top:12px;">No issues loaded.</div>
  </div>
</template>

<script>
import axios from "axios";

// Axios client with base URL & GitHub token
const client = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_ENDPOINT,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`,
  },
});

// Debug logs to verify .env variables
console.log("Axios base URL:", client.defaults.baseURL);
console.log("Token present?", !!process.env.VUE_APP_GITHUB_TOKEN);

export default {
  name: "IssueList",
  data() {
    return {
      issues: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.getIssues();
  },
  methods: {
    getIssues() {
      this.loading = true;
      this.error = null;

      console.log("Fetching issues from:", client.defaults.baseURL + "/issues?state=all");

      client
        .get("/issues?state=all&per_page=100") // fetch all issues
        .then((res) => {
          console.log("GitHub response status:", res.status);
          console.log("Data:", res.data);

          if (!res.data || res.data.length === 0) {
            console.warn("No issues returned from GitHub.");
          }

          this.issues = res.data || [];
        })
        .catch((err) => {
          console.error("Error fetching issues:", err.response || err);
          if (err.response && err.response.status) {
            this.error = `Request failed: ${err.response.status} ${err.response.statusText}`;
          } else {
            this.error = "Failed to fetch issues. Check token & repo permissions.";
          }
          this.issues = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    clearIssues() {
      this.issues = [];
      this.error = null;
    },

    closeIssue(index) {
      const target = this.issues[index];
      this.issues.splice(index, 1); // Optimistic update

      client
        .patch(`/issues/${target.number}`, { state: "closed" })
        .then(() => {
          console.log(`Closed issue #${target.number}`);
        })
        .catch((err) => {
          console.error("Error closing issue:", err.response || err);
          this.error = "Failed to close issue.";
          this.issues.splice(index, 0, target); // Revert optimistic update
        });
    },
  },
};
</script>

