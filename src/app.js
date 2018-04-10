import Vue from 'vue'
import MainApp from "./app.vue"
require("./assets/styles/global.styl")

const vm = new Vue({
    el: '#app',
    render: h => h(MainApp)
})
