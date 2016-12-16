import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const User = {
    template: `
      <div class="user">
        <h2>User {{ $route.params.id }}</h2>
        <router-view></router-view>
      </div>
    `
  },

  UserHome = { template: '<div>Home</div>' },
  UserProfile = { template: '<div>Profile</div>' },
  UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [{
    path: '/user/:id',
    component: User,
    children: [{
      // 当 /user/:id 匹配成功，
      // UserHome 会渲染在 User 的 <router-view> 中
      path: '',
      component: UserHome
    }, {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会渲染在 User 的 <router-view> 中
      path: 'profile',
      component: UserProfile
    }, {
      // 当 /user/:id/posts 匹配成功，
      // UserPosts 会渲染在 User 的 <router-view> 中
      path: 'posts',
      component: UserPosts
    }]
  }]
});

const app = new Vue({router}).$mount('#app');
