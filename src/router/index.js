import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login.vue"
import Blogs from "../views/Blogs.vue"
import BlogEdit from "../views/BlogEdit.vue"
import BlogDetail from "../views/BlogDetail.vue"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/', // 默认路由
            name: 'Index',
            redirect: {name: "Blogs"}
        },
        {
            path: '/blog', // 默认路由
            name: 'Blogs',
            component: Blogs,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/blog/add',
            name: 'BlogAdd',
            component: BlogEdit,
            meta:{
                requireAuth: true,
            }
        },
        {
            path: '/blog/:blogId',
            name: 'BlogDetail',
            component: BlogDetail,
        },
        {
            path: '/blog/:blogId/edit',
            name: 'BlogEdit',
            component: BlogEdit,
            meta:{
                requireAuth: true,
            }
        },
    ]
})


export default router;