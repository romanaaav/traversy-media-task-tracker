<template>
      <AddTask v-if="showAddTask" 
      @add-task="addTask" />
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
</template>
<script>

import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

export default {
    name: "About",
    components: {
    Tasks,
    AddTask,
  },
  props: {
    showAddTask :{
      type: Boolean
    }
  },
  data() {
    return {
      tasks: [],
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
    async updateTask(task) {
      const response = await fetch(`api/tasks/${task.id}`,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(task)
      });
      return await response.json();
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
    async addTask(newTask) {
      const response = await this.postNewTask(newTask)
      this.tasks.push(response)
    },
    async toggleReminder(id) {
      const task = this.tasks.find((task) => task.id == id);
      if (task) {
        task.reminder = !task.reminder;
      }
      await this.updateTask(task);
    },
    async deleteTask(id) {
      const response = await this.sendDeleteTask(id);
      this.tasks = this.tasks.filter((element) => element.id != id);
    },
  },
  async created() {
    this.tasks = await this.getAllTasks();
  },
}
</script>
