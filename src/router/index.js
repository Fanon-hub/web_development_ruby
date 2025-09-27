import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import TodoList from '../views/TodoList.vue'
import IssueList from '../views/IssueList.vue'
import TodosIssues from '../components/TodosIssues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    component: TodoList,
  },
  {
    path: '/issues',
    name: 'issues-list',
    component: IssueList,
  },
  {
    path: '/todos-issues',
    name: 'todos-issues',
    component: TodosIssues,
  },
  // // 404 Catch-all
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound.vue'), 
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// // Optional: Basic guard for token-protected routes
// router.beforeEach((to, from, next) => {
//   const requiresToken = to.matched.some(record => record.meta.requiresToken);
//   if (requiresToken && !process.env.VUE_APP_GITHUB_TOKEN) {
//     next('/'); // Or alert('GitHub token required!')
//   } else {
//     next()
//   }
// })

export default router