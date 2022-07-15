import {inject, reactive, readonly, watchEffect} from "vue";
import type {App, Plugin} from "vue";
import type {Transaction, Address} from "@elrondnetwork/erdjs";
import {ApiNetworkProvider, ProxyNetworkProvider} from "@elrondnetwork/erdjs-network-providers";
import Providers from "./providers/Providers";
import Components, {VueErdjsConnect} from "./components";
import providerConfig, {ElrondEnvEnum, ProviderOption} from "./providers/config";
import VueErdJs from "./VueErdJs";
import VueErdJsLogin from "@/VueErdJsLogin";

const ErdJsSymbol = Symbol();
export {ProviderOption, ElrondEnvEnum, VueErdjsConnect}
export const VueErdJsPlugin: Plugin = {
    async install(app: App, options: ProviderOption) {
        console.log("Install VueErdJs plugin", app, options);
        if (!options) {
            options = providerConfig(ElrondEnvEnum.DEVNET);
        }
        const erdApi = new ApiNetworkProvider(options.api.url, {timeout: options.api.timeout});
        const erdProxy = new ProxyNetworkProvider(options.proxy.url, {timeout: options.proxy.timeout});

        const providers = new Providers(erdProxy, erdApi, options,
            (address: Address, token?: string) => {
                console.log("Login! => Update address", address)
                VueErdJsLogin.address =  address;
                VueErdJsLogin.token = token;
            },
            () => {
                console.log("Logout!")
                VueErdJsLogin.address =  undefined;
                VueErdJsLogin.token = undefined;
            },
            (transaction: Transaction) => {
                //TODO : mitt vueErdJsStore.$emit('transaction', transaction);
            });

        const vueErdJs = new VueErdJs(providers, options.explorer.url);
        app.config.globalProperties.$erd = vueErdJs;
        app.provide('$erd', vueErdJs)

        app.config.globalProperties.$erdLogin = readonly(VueErdJsLogin);

        for (const component of Components.entries()) {
            app.component(component[0], component[1])
        }
        app.mixin({
            beforeCreate() {
                vueErdJs.providers.init();
            },
            beforeMount() {
                vueErdJs.providers.onUrl(window.location);
            }
        })
    }
}

export function useErdJs() {
    const erdJs = inject(ErdJsSymbol)
    if (!erdJs) {
        // throw error, no store provided
    }
    return erdJs
}