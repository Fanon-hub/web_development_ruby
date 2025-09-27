<template>
  <div id="app">
    <el-menu
      :default-active="$route.path"
      class="nav-menu"
      mode="horizontal"
      background-color="#2c3e50"
      text-color="#2c3e50"
      active-text-color="#42b983"
    >
      <el-menu-item index="/">
        <router-link to="/">Home</router-link> |
      <!-- </el-menu-item> -->
      <!-- <el-menu-item index="/todo-list"> -->
        <router-link to="/todo-list">Todo List</router-link> |
      <!-- </el-menu-item> -->
      <!-- <el-menu-item index="/issues"> -->
        <router-link to="/issues">Issue List</router-link> |
      <!-- </el-menu-item> -->
      <!-- <el-menu-item index="/todos-issues"> -->
        <router-link to="/todos-issues">Todos Issues</router-link>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-menu {
  justify-content: center;
  padding: 0;
}

.nav-menu .router-link {
  color: inherit;
  text-decoration: none;
}

.nav-menu .router-link-exact-active {
  color: #42b983 !important;
}

/* Fallback for non-Element UI mode */
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Responsive: Stack on mobile */
@media (max-width: 768px) {
  .nav-menu,
  nav {
    flex-direction: column;
  }
}
</style>