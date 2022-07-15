import VueErdjsTab from "./VueErdjsTab.vue"
import VueErdjsConnect from "./VueErdjsConnect.vue";
import MaiarLogin from './maiar/MaiarLogin.vue';
import LedgerLogin from './ledger/LedgerLogin.vue';
import WebWalletLogin from './web/WebWalletLogin.vue';
import DefiWalletLogin from './defi/DefiWalletLogin.vue';
import WebWalletCallback from './web/WebWalletCallback.vue';

export {VueErdjsConnect};
export default new Map<string, Object>([
    ["VueErdjsTab", VueErdjsTab],
    ["VueErdjsConnect", VueErdjsConnect],
    ["MaiarLogin", MaiarLogin],
    ["LedgerLogin", LedgerLogin],
    ["DefiWalletLogin", DefiWalletLogin],
    ["WebWalletLogin", WebWalletLogin],
    ["WebWalletCallback", WebWalletCallback],
]);