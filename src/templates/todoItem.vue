<template>
    <li
        class="todo-item"
        v-on:mouseenter="showActions"
        v-on:mouseleave="hideActions">
        <transition name="slideIn" appear>
            <header class="todo-title" v-if="mount">
                <aside class="title">
                    <h3>To-do Item {{ count }}</h3>
                    <span class='date'> {{ getDateString }} </span>
                </aside>
                <aside
                    v-show="actions"
                    class="actions">
                    <Button
                        @click="editPost"
                        v-bind:enabled="true"
                        class="action-button">
                        <i class="material-icons action-icon">edit</i>
                    </Button>
                    <Button
                        @click="deletePost"
                        v-bind:enabled="true"
                        class="action-button"
                        label="delete">
                        <i class="material-icons action-icon">delete</i>
                    </Button>
                </aside>
            </header>
        </transition>
        <todo-input
            @cancel="modifyPost"
            @submit="modifyPost"
            v-if="editing"
            v-bind:initialContent="content"/>
        <template v-else>
            <transition name="popIn" appear>
                <section v-show="mount" class="body">
                    <slot></slot>
                </section>
            </transition>
        </template>
    </li>
</template>

<script>
    import Button from "./button.vue"
    import TodoInput from "./todoInput.vue"
    export default {
        name: 'TodoItem',
        props: [
            'content',
            'date',
            'editing',
            'index'
        ],
        data(){
            return {
                actions: false,
                mount: true,
                outro: 'outro'
            }
        },
        components: {
            Button,
            TodoInput
        },
        computed: {
            count(){
                return this.index + 1
            },
            getDateString(){
                const appendZero = value => (
                    value > 9
                        ? `${value}`
                        : `0${value}`
                )
                const months = ['jan','feb','mar','apr','may','jun','july','aug','sept','oct','nov','dec']
                const {date} = this
                const dateString = `
                    ${months[date.getMonth()].toUpperCase()}
                    ${date.getDate()},
                    ${date.getFullYear()} @
                    ${appendZero(date.getHours())}:${appendZero(date.getMinutes())}:${appendZero(date.getSeconds())}
                `
                return dateString
            },
        },
        methods: {
            deletePost(e){
                this.mount = false
                this.$emit(
                    'delete',
                    this.index
                )
            },
            editPost(e){
                this.$emit(
                    'edit',
                    this.index,
                    this.content
                )
            },
            modifyPost( content ){
                this.$emit(
                    'modify',
                    this.index,
                    content || this.content
                )
            },
            showActions(){
                this.actions = true
            },
            hideActions(){
                this.actions = false
            }
        }
    }
</script>

<style lang='stylus'>
    @keyframes pop
        0%
            transform scale(.9)
            opacity 0
        50%
            transform scale(1.04)
        100%
            transform scale(1)
            opacity 1

    @keyframes slide
        0%
            transform translateX(-10%)
            opacity 0
        100%
            transform translateX(0)
            opacity 1

    .popIn-enter-active
        animation pop .5s .1s both
    .popIn-leave-active
        animation pop .5s reverse
    .slideIn-enter-active
        animation slide .3s both
    .slideIn-leave-active
        animation slide .3s .4s reverse

    .todo-item
        display flex
        flex-direction column
        cursor pointer
        margin-bottom 2rem

        .todo-title
            display flex
            justify-content space-between
            align-items center
            border-bottom none
            padding-bottom .25rem
            margin-bottom 0
            height 32px

        h3,
        .date
            line-height 1

        h3
            font-size 12pt
            font-weight 600

        .title
            display flex
            align-items flex-end

        .date
            font-size 8pt
            font-style italic
            margin-left .75rem
            opacity .66

            &:before
                content ''
                width 0.5px
                height 12px
                background black
                position relative
                display inline-block
                margin 0 .5rem 0 .75rem
                display none

        .body
            background #eee
            padding .75rem 1.5rem
            border-radius 6px
            font-family Junge, serif
            font-style italic
            font-size 10pt
            line-height 1.8
            overflow auto
            text-select none

        .action-button
            background transparent
            color #35495e
            padding .1rem .25rem
            margin-left .5rem
            transition-property background color
            transition-timing-function ease
            transition-duration .3s

            &:hover
                background #35495e
                color white

        .action-icon
            font-size 14pt
</style>
