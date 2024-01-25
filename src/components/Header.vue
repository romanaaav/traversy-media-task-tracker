<template>
    <header>
        <h1>{{title}}</h1>
        <Button @btn-click="this.$emit('toggle-add-task')" class="btn" :text="showAddTask? 'Close':'Add task'" :color="showAddTask? 'red':'green'"></Button>
    </header>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: 'Hello World'
        },
        showAddTask: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Button
    },
    methods: {
        addTask() {
            console.log('Add task WIP');
        }
    },
    emits: ['toggle-add-task']
}
</script>

<style scoped>
    header {
        display: flex;        
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>