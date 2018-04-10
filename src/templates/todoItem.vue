<template>
    <div class="todo-item">
        <header v-bind:class="headerClass">
            <aside class="title">
                <h3>To-do Item {{ count }}</h3>
                <span class='date'> {{ getDateString }} </span>
            </aside>
            <aside v-if="!editing" class="actions">
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
        <TodoInput
            @cancel="modifyPost"
            @submit="modifyPost"
            v-if="editing"
            v-bind:initialContent="content"/>
        <template v-else>
            <section
                v-bind:class="bodyClass">
                <p> {{ content }} </p>
            </section>
        </template>
    </div>
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
                unmount: false
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
                const monthList = ['jan','feb','mar','apr','may','jun','july','aug','sept','oct','nov','dec']
                return `[
                    ${monthList[this.date.getMonth()].toUpperCase()}
                    ${this.date.getDate()},
                    ${this.date.getFullYear()}
                    @ ${this.date.getUTCHours()}:${this.date.getUTCMinutes()}:${this.date.getUTCSeconds()}
                ]`
            },
            bodyClass(){
                return `body ${this.unmount ? 'reverse-animation' : ''}`
            },
            headerClass(){
                return `${this.unmount ? 'reverse-animation' : ''}`
            }
        },
        methods: {
            deletePost(e){
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
                console.log('modify')
                this.$emit(
                    'modify',
                    this.index,
                    content || this.content
                )
            },
            handleDelete(e){
                this.unmount = true
            }
        },
        updated(){
            console.log(`${this.index} updated`)
        },
        unmount(){
            console.log('unmounting')
        }
    }
</script>

<style lang='stylus'>
    @keyframes popIn
        0%
            transform scale(.9)
            opacity 0
        50%
            transform scale(1.04)
        100%
            transform scale(1)
            opacity 1

    @keyframes popOut
        0%
            transform scale(1)
            opacity 1
        100%
            transform scale(.9)
            opacity 0

    @keyframes slideIn
        0%
            transform translateX(-20%)
            opacity 0
        100%
            transform translateX(0)
            opacity 1

    @keyframes slideOut
        0%
            transform translateX(0)
            opacity 1
        100%
            transform translateX(-20%)
            opacity 0

    .todo-item
        display flex
        flex-direction column
        cursor pointer
        margin-bottom 1.5rem

        header
            display flex
            justify-content space-between
            align-items center
            padding-bottom .5rem
            animation-name slideIn
            animation-duration .5s
            animation-timing-function ease
            animation-fill-mode both

            &.reverse-animation
                animation-name slideOut
                animation-delay .3s

        h3
            font-size 12pt
            font-weight 600

        .title
            display flex
            align-items center

        .date
            font-size 8pt
            font-style italic
            margin-left .75rem

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
            animation-name popIn
            animation-duration .5s
            animation-delay .3s
            animation-timing-function ease
            animation-fill-mode both
            background #eee
            padding .75rem 1.5rem
            border-radius 6px
            font-family Junge, serif
            font-style italic
            font-size 10pt
            line-height 1.8
            overflow auto

            &.reverse-animation
                animation-name popOut
                animation-delay 0s

        .action-button
            background transparent
            color black
            padding .1rem .25rem
            margin-left .5rem
            transition-property background color
            transition-timing-function ease
            transition-duration .3s

            &:hover
                background black
                color white

        .action-icon
            font-size 14pt
</style>
