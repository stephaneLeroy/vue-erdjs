<template>
    <vue-erdjs-tab
        name="Web Wallet"
        @select-mode="login($event)"></vue-erdjs-tab>
</template>

<script>
import VueErdjsTab from './../VueErdjsTab.vue';
export default {
    name: 'WebWalletLogin',
    components: {
        VueErdjsTab
    },
    props: {
        token: {
            require: false,
            type: String
        }
    },
    mounted() {
        // returns true if callback handled a login
        if (this.$erd.webWallet.callbackReceived(window.location.search)) {
            // fix: logout from first attempt, otherwise 2 logouts are required
            // remove URL GET parameters
            window.history.pushState({}, document.title, window.location.pathname);
        }
    },
    methods: {
        login (name) {
            this.$emit('select-mode', name);
            const options = this.token ? { token: this.token } : {};
            this.$erd.webWallet.login(options);
        }
    }
}
</script>
