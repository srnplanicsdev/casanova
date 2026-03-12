import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/page/auth/login/index.vue"),
      children:[
        {
        path: "",
        name: "login",
      component: () => import("@/page/auth/login/Login.vue"),
      
        },
          {
          path: "forgot-password",
          name: "forgotpassword",
          component: () => import("@/components/auth/login/ForgotPassword.vue"),
        },
        
      ]
    },
    {
      path: "/register",
      name: "register",
       component: () => import("@/page/auth/Register.vue"),
    },
    {
      path: "/reset-password",
      name: "resetpassword",
       component: () => import("@/components/auth/login/ResetPassword.vue"),
    },
    {
      path:'/blog',
      children:[
        {path:'',
          name:"blogs",
          component:()=> import("@/page/blog/Blogs.vue"),
          meta: {
        requiresAuth: true
      }
        },
        {
          path:":id",
          name: "blog",
          component:()=> import("@/page/blog/SelectedBlog.vue"),
        
          meta: {
        requiresAuth: true
      }
        },
        {path:"create",
          name:'createblog',
          component:()=> import("@/components/blog/Blog.vue"),
          meta: {
        requiresAuth: true
      }
        }, {path:"edit/:id",
          name:'editblog',
          component:()=> import("@/components/blog/Blog.vue"),
         meta: {
        requiresAuth: true
      }
        }
      ]
    }
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('accessToken');  
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
