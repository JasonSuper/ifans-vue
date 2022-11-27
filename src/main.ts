import { createApp } from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

//import 'element-plus/dist/index.css'
import '/styles/element/index.scss'
import { createPinia } from 'pinia'

import App from './App.vue'
import store from './stores'
import router from './router'
import './assets/main.css'

import './permission'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus);
app.use(createPinia())

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})

app.mount('#app')
