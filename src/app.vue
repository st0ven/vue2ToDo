<template>
    <section id="todo-list">
        <div class="inner-wrapper">
            <header>
                <h1>To-do List Demo</h1>
            </header>
            <main>
                <todo-input
                    @submit="addItem"
                    v-bind:label="label"/>
            </main>
            <!-- loop through existing to-do items -->
            <transition-group
                name="todo"
                tag="ul">
                <todo-item
                    @delete="deleteItem"
                    @edit="editItem"
                    @modify="modifyItem"
                    class="todo-item"
                    v-for="(item, index) of todoList"
                    v-bind:key="`todo-item-${item.id}`"
                    v-bind="item"
                    v-bind:index="index">
                        <p>{{ item.content }}</p>
                </todo-item>
            </transition-group>
        </div>
        <footer class="page-footer">
            <div class="inner-wrapper">
                <span>powered by</span>
                <img id="vue-logo" src="./assets/images/vue-logo.svg">
            </div>
        </footer>
    </section>
</template>

<script>
    import TodoItem from "./templates/todoItem.vue"
    import TodoInput from "./templates/todoInput.vue"
    export default {
        name: 'MainApp',
        components: {
            TodoItem,
            TodoInput
        },
        data: () => ({
            content: "hi there",
            label: 'write a new todo item',
            todoList: [],
            itemId: 0
        }),
        methods: {
            addItem( content ){
                this.todoList.push({
                    content,
                    date: new Date(),
                    id: this.itemId++
                })
            },
            editItem( index, content ){
                const item = this.todoList[index]
                this.todoList.splice(
                    index,
                    1,
                    Object.assign(
                        item,
                        {editing: true}
                    )
                )
            },
            deleteItem( index ){
                this.todoList.splice(
                    index,
                    1
                )
            },
            modifyItem( index, content ){
                const item = Object.assign(this.todoList[index])
                delete item.editing
                this.todoList.splice(
                    index,
                    1,
                    Object.assign(
                        item,
                        {content}
                    )
                )
            }
        }
    }
</script>

<style lang="stylus">
    @keyframes slide
        0%
            transform translateX(-5%)
            opacity 0
        100%
            transform translateX(0)
            opacity 1
    #todo-list
        display flex
        flex-direction column
        align-items center

    .inner-wrapper
        max-width 800px
        width 100%
        padding 2rem 0

        header
            display flex
            justify-content space-between
            align-items flex-end
            padding-bottom .5rem
            margin-bottom 2rem
            border-bottom .5px solid black

            span
                display inline
                margin-right 1rem
                font-weight 300
                font-size 9pt
                justify-self end

    h1
        font-weight 600
        font-size 16pt

    ul
        padding 2rem 0
        list-style none

    .todo
        display flex

    .todo-leave-active
        animation slide .3s ease-in-out reverse

    #vue-logo
        max-height 20px
        display inline
        margin-left .5rem

    .page-footer
        position fixed
        display flex
        justify-content center
        flex-grow 1
        width 100%
        bottom 0
        background #f7f7f7

        .inner-wrapper
            display flex
            justify-content center
            align-items center
            padding .5rem 0

        span
            font-size 9pt
            font-style italic
            opacity .75

</style>
