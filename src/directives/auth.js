import { checkAuthority } from '@/utils/auth.js';

function install(Vue, options = {}) {
    Vue.directive(options.name || 'auth', {
        inserted(el, binding) {
            if(!checkAuthority(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    })
}

export default { install };