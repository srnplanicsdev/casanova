import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {

    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/page/Home.vue'),
    },
    {
      path: '/properties',
      children: [
        {
          component: () => import('@/page/Properties/Property.vue'),
          path: "",
          name: "properties"
        }
        , {
          path: "region/:slug",
          name: "region",
          component: () => import("@/page/Properties/region/Region.vue")
        }
        , {
          path: ':id',
          name: 'property',
          component: () => import('@/page/Properties/SelectedProperty.vue'),
          props: true
        }
      ]
    }, {
      path: "/about-us",
      name: "about-us",
      component: () => import("@/page/about/About.vue")
    }, {
      path: "/sell-your-property",
      name: "sell-your-property",
      component: () => import("@/page/sell-with-us/SellWithUs.vue")
    }, {
      path: "/services",
      name: "services",
      component: () => import("@/page/services/Services.vue")
    }, {
      path: "/testimonials",
      children: [
        {
          path: '',
          name: 'testimonials',
          component: () => import('@/page/testimonials/Testimonials.vue'),
        },
        {
          path: ':slug',
          name: 'testimonial',
          component: () => import('@/page/testimonials/Testimonials.vue'),
          props: true
        }
      ]
    }, {
      path: "/contact",
      name: "contact",
      component: () => import("@/page/contact/Contact.vue")
    }, {
      path: "/favorites",
      name: "favorites",
      component: () => import("@/page/favorites/Favorites.vue")
    },
    {
      path: "/advance-search",
      name: "search",
      component: () => import("@/page/advance-search/AdvanceSearch.vue")
    },
    {
      path: "/cookies",
      name: "cookies",
      component: () => import("@/page/cookies/cookies.vue")
    },
    {
      path: "/post-property",
      name: "post-property",
      component: () => import("@/page/post-property/PostProperty.vue")
    }


  ],
})

export default router
