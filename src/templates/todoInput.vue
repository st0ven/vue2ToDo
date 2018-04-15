<template>
    <section class="todo-input">
        <label v-if="Boolean(label)" class="input-label"> {{ label }} </label>
        <textarea
            v-on:blur="handleBlur"
            v-on:focus="handleFocus"
            v-on:change="handleChange"
            v-on:keydown="handleKeyDown"
            v-on:keyup="handleChange"
            v-bind:readonly="lockTextArea"
            v-bind:value="textAreaContent"
            v-bind:class="textAreaClassName"/>
        <footer>
            <Button
                @click="cancel"
                class="cancelButton"
                v-bind:enabled="buttonEnabled">
                <span>cancel</span>
            </Button>
            <Button
                @click="submitItem"
                class="submitButton"
                v-bind:enabled="buttonEnabled"
                v-bind:label="buttonLabel">
                <span>{{buttonLabel}}</span>
            </Button>
        </footer>
    </section>
</template>

<script>
    import Button from "./button.vue"
    export default {
        name: "TodoInput",
        props: [
            'label',
            'initialContent',
        ],
        components: {Button},
        data(){
            return {
                buttonLabel: 'submit',
                buttonEnabled: Boolean(this.initialContent),
                lockTextArea: false,
                textAreaFocused: false,
                textAreaContent: this.initialContent
            }
        },
        computed:{
            textAreaClassName(){
                return this.textAreaFocused
                    ? 'active'
                    : ''
            }
        },
        methods:{
            cancel(){
                this.$emit('cancel')
                this.init()
            },
            init(){
                this.textAreaContent = ''
                this.buttonEnabled = false
            },
            handleBlur(e){
                this.textAreaFocused = false
            },
            handleFocus(e){
                this.textAreaFocused = true
            },
            handleChange(e = {}){
                const {value} = e.target
                const {keyCode, ctrlKey} = e
                // enter key is pressed. only submit if textAreaContent is valid,
                // and the shift key is not currently pressed
                if(
                    keyCode === 13
                    && ctrlKey
                    && this.textAreaContent
                ){
                    this.submitItem()
                }
                // release read-only lock on text area state on release of shift key
                else if( keyCode === 16 ){
                    this.lockTextArea = false
                }
                // default behavior is to update submission of content when new
                // text has been entered.
                else {
                    this.buttonEnabled = Boolean(value)
                    this.textAreaContent = value
                }
            },
            // will lock the text area element when shift key
            handleKeyDown(e){
                const {ctrlKey} = e
                ctrlKey
                    ? this.lockTextArea = true
                    : null
            },
            submitItem(e){
                this.$emit(
                    'submit',
                    this.textAreaContent
                )
                this.init()
            }
        }
    }
</script>

<style lang="stylus">
    .todo-input
        display flex
        flex-direction column
        font-size 10pt
        margin-bottom 0rem

        label
            font-weight 300
            font-style italic
            font-size inherit
            margin-bottom .5rem

        textarea
            border-color rgba(0,0,0,.5)
            border-style solid
            border-width .5px
            border-radius 6px
            padding .75rem 1rem
            font-size inherit
            font-family inherit
            resize none
            transition border-color .3s ease
            font-family Junge, serif
            line-height 1.8

        footer
            display flex
            justify-content flex-end
            margin-top .75rem

        .submitButton
            background #42b883
            margin-left .75rem

</style>
