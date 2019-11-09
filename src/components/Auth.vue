<script>
import { checkAuthority } from '@/utils/auth.js';

export default {
    functional: true,
    props: {
        authority: {
            type: Array,
            required: true,
            default: function() {
                return ['user']
            }
        }
    },
    render(h, context) {
        const { props, scopedSlots } = context;
        return checkAuthority(props.authority) ? scopedSlots.default() : null;
    }
}
</script>