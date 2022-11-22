import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './index.css';


const vueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
            },
        },
    },
};

const app = createApp(App);

app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(router);

//configure prime UI
app.use(PrimeVue, {ripple: true});
app.use(ToastService);

app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('AutoComplete', AutoComplete);
app.component('Calendar', Calendar);
app.component('Checkbox', Checkbox);
app.component('ColorPicker', ColorPicker);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Button', Button);

app.directive('tooltip', Tooltip);
app.mount("#app");
