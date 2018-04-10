<template>
    <section id="todo-input">
        <label class="input-label"> {{ label }} </label>
        <textarea></textarea>
    </section>
</template>

<script>
    export default {
        name: "TodoInput",
        props: ['label']
    }
</script>

<style lang="stylus">

</style>
