<template>
 <div>
  <h1>
    todo list
  </h1>
  <form @submit.prevent="addTodo()">
    <input v-model="todo"/>
  </form>
    <el-row :gutter="12">
      <el-col :key="index" v-for="(todo, index ) in todos">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="12">
              {{ todo }}
            </el-col>
              <el-col :span="3">
                <el-button @click="removeTodo(index)" circle="" icon="el-icon-check" type="success">
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'TodoList',
    data() {
      return {
        todo: '',
        todos: []
      }
    },
    methods: {
      addTodo() {
          this.todos.push(this.todo);
          this.todo = '';
        },
      removeTodo(index){
          this.todos.splice(index, 1);
      }
    }
  }
</script>
