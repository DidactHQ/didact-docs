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
        { text: 'Setup', link: '/setup/' },
        { text: 'Report Slideshows', link: '/report-slideshows/' },
        { text: 'Dashboard Slideshows', link: '/dashboard-slideshows/'},
        { text: 'Autolaunch', link: '/autolaunch/' },
        { text: 'Utilities', link: '/utilities/' }
    ],
    sidebar: {
        '/setup/': [
          {
            text: 'Setup',
            items: [
              { text: 'Intro', link: '/setup/' },
              { text: 'What Is Displagent?', link: '/setup/what-is-displagent' },
              { text: 'Required Credentials', link: '/setup/required-credentials' },
              { text: 'Power BI Service Account', link: '/setup/power-bi-service-account' },
              { text: 'Azure App Registration', link: '/setup/azure-app-registration' },
            ]
          }
        ],
        '/report-slideshows/': [
          {
            text: 'Report Slideshows',
            items: [
              { text: 'Intro', link: '/report-slideshows/' },
              { text: 'The Report Slideshows Table', link: '/report-slideshows/report-slideshows-table' },
              { text: 'Create a Report Slideshow', link: '/report-slideshows/create-report-slideshow' },
              { text: 'Build a Report Slideshow', link: '/report-slideshows/build-report-slideshow' },
              { text: 'Launch a Report Slideshow', link: '/report-slideshows/launch-report-slideshow' },
              { text: 'Delete a Report Slideshow', link: '/report-slideshows/delete-report-slideshow' }
            ]
          }
        ],
        '/dashboard-slideshows/': [
          {
            text: 'Dashboard Slideshows',
            items: [
              { text: 'Intro', link: '/dashboard-slideshows/' },
              { text: 'The Dashboard Slideshows Table', link: '/dashboard-slideshows/dashboard-slideshows-table' },
              { text: 'Create a Dashboard Slideshow', link: '/dashboard-slideshows/create-dashboard-slideshow' },
              { text: 'Launch a Dashboard Slideshow', link: '/dashboard-slideshows/launch-dashboard-slideshow' },
              { text: 'Delete a Dashboard Slideshow', link: '/dashboard-slideshows/delete-dashboard-slideshow' }
            ]
          }
        ],
        '/autolaunch/': [
          {
            text: 'Autolaunch',
            items: [
              { text: 'Intro', link: '/autolaunch/' },
              { text: 'Autolaunch Settings', link: '/autolaunch/autolaunch-settings' }
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