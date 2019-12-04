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

/**
 *
 * @param {Vue 实例} Vue
 * @param {*} options
 */
const install = function (Vue, options = {}) {
    // 1.添加全局方法或属性 手动调用
    Vue.myGlobalMethod = function (methodOptions) {
        alert(methodOptions);
    };

    // 2.添加实例方法 手动调用
    Vue.prototype.$msg = function (methodOptions) {
        alert(methodOptions.message);
    };

    // 3. 添加全局资源 手动调用
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
    });

    // 4. 注入组件选项 主动混入，在指定生命周期内自动调用
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    });
};
