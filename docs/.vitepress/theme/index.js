// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './style.css'
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';

// export default DefaultTheme

export default {
    ...DefaultTheme,
    // setup() {
    //   onMounted(() => {
    //     // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
    //     mediumZoom('img', { background: 'var(--vp-c-bg)' });
    //   });
    // },
    setup() {
        const route = useRoute();
        const initZoom = () => {
          new mediumZoom('img', { background: 'var(--vp-c-bg)' });
        };
        onMounted(() => {
          initZoom();
        });
        watch(
          () => route.path,
          () => nextTick(() => initZoom())
        );
    },
};