import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {
        path:'/search',
        name:'home',
        props: true,
        component:()=> import('./views/home.vue')
    },
    {
        path:'/',
        name:'main',
        props: true,
        component:()=> import('./views/main.vue')
    },
    {
        path:'/sp',
        name:'saved',
        props: true,
        component:()=> import('./views/saved.vue')
    },
    {
        path:'/photo',
        name:'photo',
        props: true,
        component:()=> import('./views/photo.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});
export default router;
