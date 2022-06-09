import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/',
  //   redirect: '/login',
  // },



  /* 
    默认的路径就是 http://localhost:8080/#/ 如果此时是登录状态就加载
    否则，就跳转到 http://localhost:8080/#/login
  
  */
  {
    path: '/login',
    component: () => import("../views/login/Login.vue")
  },
  {
    path: '/',
    component: () => import("../views/layout/Layout.vue"),
    children:[
      {
        // path如果内容为""，就是默认加载的子组件
        path: '',
        name: 'home',
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: 'content',
        name: 'content',
        component: () => import('../views/content/Content.vue')
      },
      {
        path: 'material',
        name: 'material',
        component: () => import("../views/material/Material.vue")
      },
      {
        path: 'essay',
        name: 'essay',
        component: () => import('../views/essay/Essay.vue')
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('../views/comment/Comment.vue')
      },
      {
        path: 'fans',
        name: 'fans',
        component: () => import('../views/fans/Fans.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../views/setting/Setting.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  const user = JSON.parse(localStorage.getItem('user'));
  if(to.path !== '/login'){
    if(user){
      next()
    }else{
      next("/login")
    }
  }else{
    next();
  }
})


export default router
