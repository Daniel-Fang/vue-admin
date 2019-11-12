import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '../mock';
import { 
  Button, 
  Form, 
  Input, 
  Container, 
  Aside, 
  Main, 
  Header, 
  Menu, 
  MenuItem, 
  Submenu, 
  MenuItemGroup, 
  Breadcrumb, 
  BreadcrumbItem, 
  Checkbox, 
  Row, 
  Col, 
  Avatar, 
  Dropdown, 
  DropdownItem, 
  DropdownMenu
} from 'element-ui';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
