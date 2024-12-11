// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
// Import for Tailwind CSS
import './style.css'
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import YouTubeEmbedContainer from '../../../components/YouTubeEmbedContainer.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('YouTubeEmbedContainer', YouTubeEmbedContainer)
  },
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
  }
}