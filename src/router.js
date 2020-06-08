import VueRouter from 'vue-router';
import login from './components/login/Login.vue'
import dashboard from './components/dashboard/dashboard.vue'
import alertmanege from './components/alertmanege/index.vue'
import alertthing from './components/alertmanege/alertthing.vue'
import alertrank from './components/alertmanege/alertrank.vue'
import usermanage from './components/usermanage/usermanage.vue'
import usergroup from './components/usermanage/usergroup.vue'
import user from './components/usermanage/user.vue'
import operatelog from './components/usermanage/operatelog.vue'
var vue_router = new VueRouter({
    routes:[
        // {path:'/',redirect:'/home'},
        // {
        //     path:'/home',
        //     component:FrontendHome,
        //     children:[
        //         {
        //             path:'/',
        //             // 单个router-view用：component
        //             component: FrontendHomeBody
        //         },
        //         {
        //             path:'article/:id',
        //             component:article
        //         },
        //         {
        //             path:'article/category/:categoryName',
        //             component:categoryArticle
        //         }
        //     ]
        // },
        // {path:'/',component:home},
        // {path:'/home/article/:id',component:article},
        // {
        //     path:'/backend',
        //     component:backendhome,
        //     children:[
        //         // {
        //         //     path:'/',
        //         //     component: commonHomeBody
        //         // },
        //         {
        //             path:'home',
        //             component:backendhomeBody
        //         },
        //         {
        //             path:'article/editarticle/:id',
        //             component:editArticle
        //         },
        //         {
        //             path:'writeArticle',
        //             component:writeArticle
        //         },
        //         {
        //             path:'commentMgs',
        //             component:commentMgs
        //         },
        //         {
        //             path:'editNotice',
        //             component:editNotice
        //         }
        //     ]
        // },
        { path : '/login' , component : login },
        {   path : '/dashboard' , component : dashboard ,
            children:[
                {
                    path:'/dashboard/alertmanage',
                    component: alertmanege,
                    redirect: '/dashboard/alertmanage/alertthing',
                    children:[
                        {
                            path:'/dashboard/alertmanage/alertthing',
                            component: alertthing,
                            
                        },
                        {
                            path:'/dashboard/alertmanage/alertrank',
                            component: alertrank,
                            
                        },
                    ]
                },
                {
                    path:'/dashboard/usermanage',
                    component: usermanage,
                    redirect: '/dashboard/usermanage/usergroup',
                    children:[
                        {
                            path:'/dashboard/usermanage/usergroup',
                            component: usergroup,
                            
                        },
                        {
                            path:'/dashboard/usermanage/user',
                            component: user,
                        },
                        {
                            path:'/dashboard/usermanage/operatelog',
                            component: operatelog,
                        },
                    ]
                },
            ]
        },

        // {path:'/backend/home',component:backendhome}
    ]
})
export default vue_router;