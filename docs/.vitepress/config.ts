import { defineConfig } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

const hostname = 'https://docs.didact.dev';
const links = [];

export default defineConfig({
  title: 'Didact Docs',
  description: 'The official docsite for the Didact .NET job orchestration platform.',
  cleanUrls: true,
  head: [
    // [
    //   'link',
    //   // { rel: 'icon', href: '/logo.svg' },
    //   { rel: 'icon', href: '/favicon.ico' }
    // ],
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
    nav: [
        { text: 'Overview', link: '/overview/' },
        { text: 'Guide', link: '/report-slideshows/' },
        { text: 'Recipes', link: '/dashboard-slideshows/'},
        { text: 'API', link: '/autolaunch/' },
    ],
    sidebar: {
        '/overview/': [
          {
            text: 'Overview',
            items: [
              { text: 'What Is Didact?', link: '/setup/' },
              { text: 'Why Build Didact?', link: '/setup/what-is-displagent' },
              { text: 'Didact vs. Other Tools', link: '/setup/required-credentials' },
              { text: 'Common Use Cases', link: '/setup/power-bi-service-account' },
              { text: 'Licensing', link: '/setup/azure-app-registration' },
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'What Is Didact?', link: '/setup/' },
              { text: 'Why Build Didact?', link: '/setup/what-is-displagent' },
              { text: 'Didact vs. Other Tools', link: '/setup/required-credentials' },
              { text: 'Common Use Cases', link: '/setup/power-bi-service-account' },
              { text: 'Licensing', link: '/setup/azure-app-registration' },
            ]
          },
          {
            text: 'Core Concepts',
            items: [
              { text: 'What Is Didact?', link: '/setup/' },
              { text: 'Why Build Didact?', link: '/setup/what-is-displagent' },
              { text: 'Didact vs. Other Tools', link: '/setup/required-credentials' },
              { text: 'Common Use Cases', link: '/setup/power-bi-service-account' },
              { text: 'Licensing', link: '/setup/azure-app-registration' },
            ]
          }
        ]
    },
    search: {
      provider: 'local'
    },
    outline: [2,6],
    lastUpdatedText: 'Last Updated'
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