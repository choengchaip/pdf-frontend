import Fragment from "vue-fragment";
import {Vue} from "vue-property-decorator";
import AppRepository from "~/repositories/AppRepository";
import ClickOutside from 'vue-click-outside'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.directive('click-outside', ClickOutside)
Vue.use(Fragment.Plugin)

export default (ctx: any, inject: any) => {
    inject('app', new AppRepository(ctx))
}