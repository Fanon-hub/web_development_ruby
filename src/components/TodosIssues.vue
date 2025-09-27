<template>
  <div>
    <h1>Todos & GitHub Issues</h1>

    <!-- Todo Input -->
    <input v-model="todo" placeholder="Add todo" />
    <button @click="addTodo">Add Todo</button>

    <!-- Todo List -->
    <ul>
      <li v-for="(t, i) in todos" :key="i">
        <TodoItem :todo="t" @remove="removeTodo(i)" />
      </li>
    </ul>

    <!-- GitHub Issues -->
    <h2>GitHub Issues</h2>
    <button @click="getIssues">Fetch Issues</button>
    <div v-if="loading">Loading issues...</div>
    <div v-if="error" style="color:red">{{ error }}</div>

    <ul v-if="issues.length">
      <li v-for="(issue, i) in issues" :key="issue.id">
        {{ issue.title }}
        <button @click="closeIssue(i)">Close</button>
      </li>
    </ul>

    <div v-else-if="!loading">No issues loaded.</div>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

const client = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

export default {
  name: 'TodosIssues',
  components: { TodoItem },
  data() {
    return {
      todo: '',
      todos: [],
      issues: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.getIssues();
  },
  methods: {
    addTodo() {
      if (this.todo.trim() !== '') {
        this.todos.push(this.todo);
        this.todo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    closeIssue(index) {
      const target = this.issues[index];
      this.issues.splice(index, 1); // optimistic update
      client
        .patch(`/issues/${target.number}`, { state: 'closed' })
        .then(() => {
          console.log(`Closed issue #${target.number}`);
        })
        .catch(err => {
          console.error('Error closing issue:', err.response || err);
          this.error = 'Failed to close issue.';
          this.issues.splice(index, 0, target); // revert
        });
    },
    getIssues() {
      this.loading = true;
      this.error = null;

      console.log('Fetching issues from:', client.defaults.baseURL + '/issues');
      console.log('Token present?', !!process.env.VUE_APP_GITHUB_TOKEN);

      client
        .get('/issues?state=all&per_page=100')
        .then(res => {
          console.log('GitHub response:', res.data);
          this.issues = res.data || [];
          if (this.issues.length === 0) {
            console.warn('No issues returned from GitHub.');
          }
        })
        .catch(err => {
          console.error('Error fetching issues:', err.response || err);
          this.error = 'Failed to fetch issues. Check token & repo permissions.';
          this.issues = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

