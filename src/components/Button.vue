<template>
    <button @click="onClick" :style="{background: color}"> {{ text }}</button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            text: {
                type: String,
                default: 'Button text'
            },
            color: {
                type: String,
                default: 'inherit'
            }
        },
         methods: {
            onClick() {
                this.$emit('btn-click')
            }
        },
        emits: ['btn-click']
    }
</script>