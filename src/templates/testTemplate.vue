<template>
    <div id="testTemplate">
        <span>Loaded from Vue</span>
        <span> {{ content }} </span>
    </div>
</template>

<script>
    export default {
        name: 'testTemplate',
        data: ()=>({
            content: "here is some dynamic content"
        })
    }
</script>

<style lang='stylus'>
    @import './styles'
    #testTemplate
        display flex
        flex-direction column
</style>
