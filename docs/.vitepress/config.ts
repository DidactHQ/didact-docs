import { defineConfig } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

// WARNING: This should be an environment variable, but VitePress does not support it.
const hostname = 'https://docs.didact.dev'
const ogImagePath = '/didact-docs-og.png';
const twitterSite = '@DidactPlatform';
const twitterImageAlt = 'Didact Docs'
const links = [];

export default defineConfig({
  title: 'Didact Docs',
  description: 'The official docsite for the Didact .NET job orchestration platform.',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'script',
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-Y85QWRX1XL' }
    ],
    [
      'script',
      {},
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-Y85QWRX1XL')"
    ]
  ],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DidactHQ' },
      { icon: 'twitter', link: 'https://twitter.com/DidactPlatform' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCPYXvf2OvQku5HrOKYFsxHg' }
    ],
    nav: [
        { text: 'Getting started', link: '/getting-started/what-is-didact' },
        { text: 'Concepts', link: '/concepts/' },
        { text: 'Deployments', link: '/deployments/' },
        { text: 'Guide', link: '/guide/' },
        { text: 'Recipes', link: '/recipes/'},
        { text: 'API', link: '/api/' },
    ],
    sidebar: {
        '/getting-started/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What Is Didact?', link: '/getting-started/what-is-didact' },
              { text: 'Why Build Didact?', link: '/getting-started/why-build-didact' },
              { text: 'Platform vs. Library', link: '/getting-started/platform-vs-library' },
              { text: 'Compare Didact', link: '/geting-started/compare-didact' },
              { text: 'Use Cases', link: '/getting-started/use-cases' },
              { text: 'Licensing and Monetization', link: '/getting-started/licensing-and-monetization' },
              { text: 'Meet the Team', link: '/getting-started/meet-the-team' }
            ]
          },
        ],
        '/concepts/': [
          {
            text: 'Architecture',
            items: [
              { text: 'Survey', link: '/concepts/architecture' },
              { text: 'Didact Engine', link: '/concepts/didact-engine' },
              { text: 'Didact UI', link: '/concepts/didact-ui' },
              { text: 'Didact Sentinel', link: '/concepts/didact-sentinnel' },
              { text: 'Didact Core', link: '/concepts/didact-core' },
            ]
          },
          {
            text: 'Class Library Project',
            items: [
              { text: 'Survey', link: '/setup/' },
            ]
          },
          {
            text: 'Core Concepts',
            items: [
              { text: 'Flows', link: '/setup/what-is-displagent' },
              { text: 'Execution Blocks', link: '/setup/required-credentials' },
              { text: 'Dependency Injection', link: '/setup/power-bi-service-account' },
            ]
          }
        ],
        '/deployments/': [
          {
            text: 'Self-hosted',
            items: [
              { text: 'Deploy Didact Engine', link: '/setup/' },
              { text: 'Deploy Didact UI', link: '/setup/what-is-displagent' },
              { text: 'Deploy Didact Sentinel', link: '/setup/' },
              { text: 'Multiple Engines', link: '/setup/required-credentials' },
            ]
          },
          {
            text: 'Containerization',
            items: [
              { text: 'Deploy Didact Engine', link: '/setup/' },
              { text: 'Deploy Didact UI', link: '/setup/what-is-displagent' },
              { text: 'Deploy Didact Sentinel', link: '/setup/' },
              { text: 'Multiple Engines', link: '/setup/required-credentials' },
            ]
          },
          {
            text: 'Didact Cloud'
          }
        ],
    },
    search: {
      provider: 'local'
    },
    outline: [2,6],
    editLink: {
      pattern: 'https://github.com/DidactHQ/didact-docs/edit/main/docs/:path'
    },
    footer: {
      message: 'Proudly powered by <a style="color: #f97316;" target="_blank" href="https://www.vitepress.dev">VitePress</a>',
      copyright: 'Copyright © 2023-present Daniel Miradakis'
    }
  },
    transformPageData(pageData, context) {
    pageData.frontmatter.head ??= [];

    // Add og:title meta tags.
    const dynamicTitle = !pageData.title
      ? context.siteConfig.site.title
      : pageData.title;

    const dynamicTitleTemplate = !pageData.titleTemplate
      ? context.siteConfig.site.title
      : pageData.titleTemplate;

    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content: `${dynamicTitle} | ${dynamicTitleTemplate}`
      }
    ]);

    // Add og:description meta tags.
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:description',
        content: `${!pageData.description
          ? context.siteConfig.site.description
          : pageData.description }`
      }
    ]);
  },
  // From https://github.com/vuejs/vitepress/issues/520#issuecomment-1566062351
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
  },
  // From https://github.com/vuejs/vitepress/issues/520#issuecomment-1566062351
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: hostname
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
})