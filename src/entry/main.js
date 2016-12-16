// 0. 导入模块
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 1. 定义组件
const Foo = {template: '<div>foo</div>'},
  Bar = {template: '<div>bar</div>'};

// 动态路径参数 以冒号开头
const User = {
  template: '<div>User {{$route.params.id}}</div>'
}
const UserId = {
  template: '<div>User {{$route.params.name}}: {{$route.params.id}}</div>'
}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar},
  {path: '/user/:id', component: User},
  {path: '/user/:name/:id', component: UserId}
];

// 3. 创建 router 实例，传入 'routes' 配置
const router = new VueRouter({
  routes
});

// 4. 创建和挂载根实例
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app');

// 现在，应用已经启动了
