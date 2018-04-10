<template>
    <section id="todo-list">
        <div class="inner-wrapper">
            <header>
                <h1>Vue.js To-do App Test</h1>
            </header>
            <main>
                <TodoInput
                    @submit="addItem"
                    v-bind:label="label"/>
            </main>
            <!-- loop through existing to-do items -->
            <ul>
                <li v-for="(item, index) in todoList">
                    <TodoItem
                        @delete="deleteItem"
                        @edit="editItem"
                        @modify="modifyItem"
                        v-bind="item"
                        v-bind:index="index"/>
                </li>
            </ul>
        </div>
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
        data: ()=>{
            return {
                content: "hi there",
                label: 'write a new todo item',
                todoList: [],
            }
        },
        methods: {
            addItem( content ){
                this.todoList.push({
                    content,
                    date: new Date()
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
    #todo-list
        display flex
        flex-direction column
        align-items center

        .inner-wrapper
            max-width 800px
            width 100%
            padding 2rem 0

        h1
            font-weight 600
            font-size 16pt
            padding-bottom .5rem
            margin-bottom 2rem
            border-bottom .5px solid black

        ul
            padding 2rem 0
            list-style none
</style>
