<template>
    <button
        v-bind:class="getClassName"
        v-on:click="clickHandler">
            <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: [
            'label',
            'enabled'
        ],
        methods: {
            clickHandler(e){
                this.enabled
                    ? this.$emit(
                        'click',
                        e
                    )
                    : null
            },
        },
        computed: {
            getClassName(){
                return this.enabled
                    ? ''
                    : 'disabled'
            }
        }
    }
</script>

<style lang='stylus'>
    button
        padding .5rem 1.5rem
        font-weight 700
        font-size 9pt
        cursor pointer
        background #35495e
        color white
        border-radius 3px
        transition-property background
        transition-timing-function ease
        transition-duration .3s

        &.disabled
            background #eee !important
            color rgba(0,0,0,.2)
            cursor default
</style>
