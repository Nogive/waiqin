import Vue from "vue";
import {
  Button,
  Field,
  Cell,
  CellGroup,
  Row,
  Col,
  NavBar,
  Tabbar,
  TabbarItem,
  Icon,
  Panel,
  Toast,
  Tab,
  Tabs,
  Popup,
  Checkbox,
  CheckboxGroup,
  SwitchCell,
  DatetimePicker
} from "vant";

Vue.use(Button);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Icon);
Vue.use(Panel);
Vue.use(Toast);
Vue.use(Tab).use(Tabs);
Vue.use(Popup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(SwitchCell);
Vue.use(DatetimePicker);

import { Loading } from "element-ui";
Vue.use(Loading);
