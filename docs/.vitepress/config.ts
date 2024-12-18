import { defineConfig } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

// WARNING: This should be an environment variable, but VitePress does not support it.
const copyrightHolderName = 'Didact';
const hostname = 'https://docs.didact.dev'
const ogImagePath = '/didact-docs-og.png';
const twitterSite = '@DidactPlatform';
const twitterImageAlt = 'Didact Docs'
const links = [];

export default defineConfig({
  title: 'Didact Docs',
  description: 'The open core .NET job orchestrator.',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true
  },
  head: [
    ////////////////////////////////////////////////////////////////////
    // Add Google Analytics
    ////////////////////////////////////////////////////////////////////
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-Y85QWRX1XL'
      }
    ],
    [
      'script',
      {},
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-Y85QWRX1XL')"
    ],

    ////////////////////////////////////////////////////////////////////
    // Add Microsoft Clarity
    ////////////////////////////////////////////////////////////////////
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "pa30tkb92g");`
    ]
  ],
  themeConfig: {
    logo: '/didact-logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DidactHQ' },
      { icon: 'twitter', link: 'https://twitter.com/DidactPlatform' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCPYXvf2OvQku5HrOKYFsxHg' }
    ],
    nav: [
        { text: 'Getting started', link: '/getting-started/what-is-didact' },
        { text: 'Quickstarts', link: '/quickstarts/create-flow-library' },
        // { text: 'Core concepts', link: '/core-concepts/index' },
        // { text: 'Deployments', link: '/deployments/index' },
        // { text: 'FAQ', link: '/faq/index' }
        // { text: 'Deployments', link: '/deployments/' },
        // { text: 'Guide', link: '/guide/' },
        // { text: 'Recipes', link: '/recipes/'},
        // { text: 'API', link: '/api/' },
    ],
    sidebar: {
        '/getting-started/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What Is Didact?', link: '/getting-started/what-is-didact' },
              { text: 'Job Orchestrator', link: '/getting-started/job-orchestrator' },
              { text: 'Why Build Didact?', link: '/getting-started/why-build-didact' },
              { text: 'Compare Didact', link: '/getting-started/compare-didact' },
              { text: 'Use Cases', link: '/getting-started/use-cases' },
              { text: 'Licensing and Monetization', link: '/getting-started/licensing-and-monetization' },
              { text: 'Meet the Team', link: '/getting-started/meet-the-team' }
            ]
          },
          {
            text: 'Open Source',
            items: [
              { text: 'Structure', link: '/getting-started/open-source-structure' },
              { text: 'Contributing', link: '/getting-started/contributing' },
            ]
          }
        ],
        '/quickstarts/': [
          {
            text: 'Flow Library',
            items: [
              { text: 'Create flow library', link: '/quickstarts/create-flow-library' },
              { text: 'Write a Flow', link: '/quickstarts/write-a-flow' }
            ]
          }
        ],
        '/core-concepts/': [
          {
            text: 'Architecture',
            items: [
              { text: 'Survey', link: '/core-concepts/architecture' },
              { text: 'Didact Engine', link: '/core-concepts/didact-engine' },
              { text: 'Didact UI', link: '/core-concepts/didact-ui' },
              { text: 'Didact Sentinel', link: '/core-concepts/didact-sentinnel' },
              { text: 'Didact Core', link: '/core-concepts/didact-core' },
              { text: 'Flow Library', link: '/core-concepts/flow-library'}
            ]
          },
          {
            text: 'Persistent Storage',
            items: [
              { text: 'Storage Providers', link: '/core-concepts/storage-providers' },
              { text: 'Distributed Locks', link: '/core-concepts/distributed-locks'}
            ]
          },
          {
            text: 'Versioning',
            items: [
              { text: 'Flow Library Version', link: '/core-concepts/storage-providers' },
              { text: 'Flow Version', link: '/core-concepts/distributed-locks'}
            ]
          },
          {
            text: 'Threadpool',
            items: [
              { text: 'Summary', link: '/' }
            ]
          },
          {
            text: 'Didact Engine',
            items: [
              { text: 'Plugin System', link: '/' },
              { text: 'Dependency Injection', link: '/setup/power-bi-service-account' },
              { text: 'Appsettings.json', link: '/core-concepts/storage-providers' },
              { text: 'Directives', link: '/core-concepts/directives' }
            ]
          },
          {
            text: 'Multitenancy',
            items: [
              { text: 'Organizations', link: '/core-concepts/multiorganizations' },
              { text: 'Environments', link: '/core-concepts/multienvironments' },
            ]
          },
          {
            text: 'Flow Library',
            items: [
              { text: 'Survey', link: '/setup/' },
              { text: 'Extension Method', link: '/' },
              { text: 'Didactsettings.json', link: '/'},
              { text: 'Flow Storage', link: '/' }
            ]
          },
          {
            text: 'Flow Concepts',
            items: [
              { text: 'Flows', link: '/core-concepts/flows' },
              { text: 'Execution Blocks', link: '/setup/required-credentials' },
              { text: 'Logging', link: '/' },
              { text: 'Retry Policies', link: '/' }
            ]
          }
        ],
        // '/deployments/': [
        //   {
        //     text: 'Self-hosted',
        //     items: [
        //       { text: 'Deploy Didact Engine', link: '/setup/' },
        //       { text: 'Deploy Didact UI', link: '/setup/what-is-displagent' },
        //       { text: 'Deploy Didact Sentinel', link: '/setup/' },
        //       { text: 'Multiple Engines', link: '/setup/required-credentials' },
        //     ]
        //   },
        //   {
        //     text: 'Containerization',
        //     items: [
        //       { text: 'Deploy Didact Engine', link: '/setup/' },
        //       { text: 'Deploy Didact UI', link: '/setup/what-is-displagent' },
        //       { text: 'Deploy Didact Sentinel', link: '/setup/' },
        //       { text: 'Multiple Engines', link: '/setup/required-credentials' },
        //     ]
        //   },
        //   {
        //     text: 'Didact Cloud'
        //   }
        // ],
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
      copyright: `Copyright © 2023-present ${copyrightHolderName}`
    }
  },
  transformPageData(pageData, context) {

    ////////////////////////////////////////////////////////////////////
    // Get dynamic title
    ////////////////////////////////////////////////////////////////////
    const dynamicTitle = !pageData.title
      ? context.siteConfig.site.title
      : pageData.title;

    ////////////////////////////////////////////////////////////////////
    // Get dynamic titleTemplate
    ////////////////////////////////////////////////////////////////////
    const dynamicTitleTemplate = !pageData.titleTemplate
      ? context.siteConfig.site.title
      : pageData.titleTemplate;

    ////////////////////////////////////////////////////////////////////
    // Get dynamic description
    ////////////////////////////////////////////////////////////////////
    const dynamicDescription = !pageData.description
      ? context.siteConfig.site.description
      : pageData.description

    ////////////////////////////////////////////////////////////////////
    // Get dynamic route
    ////////////////////////////////////////////////////////////////////
    let route;

    // This returns the file extension.
    const pageRelativePathRaw = pageData.relativePath;
    // Handle the home page.
    if (pageRelativePathRaw === 'index.md') {
      route = hostname;
    }
    // Handle all other pages.
    else {
      // Remove the file extension.
      const pageRelativePathWithoutFileExtension = pageRelativePathRaw.replace('.md', '');
      // Remove the sub-home-page 'index' indicators.
      const pageRelativePathWithoutIndexInName = pageRelativePathWithoutFileExtension.replace('/index', '');
      const pageRelativePath = pageRelativePathWithoutIndexInName;
      // The hostname does not have a trailing slash, so add it here manually.
      route = hostname + '/' + pageRelativePath;
    }

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ////////////////////////////////////////////////////////////////////
      // Add canonical
      ////////////////////////////////////////////////////////////////////
      [
        'link',
        {
          rel: 'canonical',
          href: `${route}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add og:title
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'og:title',
          content: `${dynamicTitle}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add og:description
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'og:description',
          content: `${dynamicDescription}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add og:type
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'og:type',
          content: 'website'
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add og:image
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'og:image',
          content: `${hostname + ogImagePath}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add og:url
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'og:url',
          content: `${route}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:card
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:title
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:title',
          content: `${dynamicTitle}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:description
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:description',
          content: `${dynamicDescription}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:site
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:site',
          content: `${twitterSite}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:image
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:image',
          content: `${hostname + ogImagePath}`
        }
      ],

      ////////////////////////////////////////////////////////////////////
      // Add twitter:image:alt
      ////////////////////////////////////////////////////////////////////
      [
        'meta',
        {
          name: 'twitter:image:alt',
          content: `${twitterImageAlt}`
        }
      ]
    )
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