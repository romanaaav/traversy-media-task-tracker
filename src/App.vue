<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      :show-add-task="showAddTask"
      title="Task Tracker"
    />
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
    <div v-if="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  methods: {
    async getAllTasks() {
      const response = await fetch('api/tasks');
      return await response.json();
    },
    async getTaskById(id) {
      const response = await fetch(`api/tasks/${id}`);
      return await response.json();
    },
    async postNewTask(task) {
      const response = await fetch('api/tasks',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(task)
      });
      if (!response.ok) {
        throw new Error('Failed to add');
      }
      const addedTask = await response.json();
      addedTask.id = addedTask.id+"";
      return addedTask;
    },
    async sendDeleteTask(taskId) {
      const response = await fetch(`api/tasks/${taskId+""}`,{
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
        },
      });
      return await response.json();
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async addTask(newTask) {
      const response = await this.postNewTask(newTask)
      this.tasks.push(response)
    },
    toggleReminder(id) {
      const task = this.tasks.find((task) => task.id == id);
      if (task) {
        task.reminder = !task.reminder;
      }
    },
    async deleteTask(id) {
      const response = await this.sendDeleteTask(id);
      this.tasks = this.tasks.filter((element) => element.id != id);
    },
  },
  async created() {
    this.tasks = await this.getAllTasks();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
