import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Displagent Docs',
  description: 'The official docsite for Displagent.',
  cleanUrls: true,
  head: [
    // [
    //   'link',
    //   // { rel: 'icon', href: '/logo.svg' },
    //   { rel: 'icon', href: '/favicon.ico' }
    // ],
    [
      'script',
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-ZYJNTMM4SR' }
    ],
    [
      'script',
      {},
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-ZYJNTMM4SR')"
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
  }
})