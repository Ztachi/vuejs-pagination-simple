import pagination from './components/pagination.vue';

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(pagination);
}

export default {
    install(vue, options) {
        vue.component(pagination.name, pagination);
    }
}