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
      { icon: 'discord', link: 'https://discord.gg/uamswkyRFn' },
      { icon: 'github', link: 'https://github.com/DidactHQ' },
      { icon: 'x', link: 'https://x.com/DidactPlatform' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCPYXvf2OvQku5HrOKYFsxHg' },
      { icon: 'facebook', link: 'https://www.facebook.com/DidactPlatform' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/didactplatform.bsky.social' }
      /* I couldn't get the LinkedIn social to work.
         Unfortunately, there is no LinkedIn icon on https://simpleicons.org/.
         I found a custom SVG icon, but it isn't working with VitePress for some reason.
         */
      // {
      //   icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>',
      //   link: 'https://linkedin.com/company/didactplatform'
      // }
    ],
    nav: [
        { text: 'Getting started', link: '/getting-started/what-is-didact' },
        { text: 'Core concepts', link: '/core-concepts/architecture/how-it-works' },
        { text: 'Guides', link: '/guides/index' },
        { text: 'API', link: '/api/index' },
        { 
          text: 'Resources',
          items: [
            { text: 'Feedback', link: 'https://didact.featurebase.app' },
            { text: 'Roadmap', link: 'https://didact.featurebase.app/roadmap' },
            { text: 'Status', link: 'https://status.didact.dev' },
            { text: 'Main site', link: 'https://www.didact.dev' }
          ]
        }
    ],
    sidebar: {
        '/getting-started/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What Is Didact?', link: '/getting-started/what-is-didact' },
              { text: 'What Is A Job Orchestrator?', link: '/getting-started/what-is-a-job-orchestrator' },
              { text: 'Why Build Didact?', link: '/getting-started/why-build-didact' },
              { text: 'Compare Didact', link: '/getting-started/compare-didact' },
              { text: 'Use Cases', link: '/getting-started/use-cases' },
            ]
          },
          {
            text: 'Quickstart',
            items: [
              { text: 'Create a Flow Library', link: '/quickstart/create-a-flow-library' },
              { text: 'Write a Flow', link: '/quickstart/write-a-flow' },
              { text: 'Installation', link: '/quickstart/installation' },
              { text: 'Deploy Flow Library', link: '/quickstart/deploy-flow-library' },
              { text: 'Execute a FlowRun', link: '/quickstart/execute-a-flowrun' },
            ]
          },
          {
            text: 'About',
            items: [
              { text: 'Licensing and Monetization', link: '/getting-started/licensing-and-monetization' },
              { text: 'Meet the Team', link: '/getting-started/meet-the-team' },
              { text: 'Contributing', link: '/getting-started/contributing' }
            ]
          }
        ],
        '/quickstart/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What Is Didact?', link: '/getting-started/what-is-didact' },
              { text: 'What Is A Job Orchestrator?', link: '/getting-started/what-is-a-job-orchestrator' },
              { text: 'Why Build Didact?', link: '/getting-started/why-build-didact' },
              { text: 'Compare Didact', link: '/getting-started/compare-didact' },
              { text: 'Use Cases', link: '/getting-started/use-cases' },
            ]
          },
          {
            text: 'Quickstart',
            items: [
              { text: 'Create a Flow Library', link: '/quickstart/create-a-flow-library' },
              { text: 'Write a Flow', link: '/quickstart/write-a-flow' },
              { text: 'Installation', link: '/quickstart/installation' },
              { text: 'Deploy Flow Library', link: '/quickstart/deploy-flow-library' },
              { text: 'Execute a FlowRun', link: '/quickstart/execute-a-flowrun' },
            ]
          },
          {
            text: 'About',
            items: [
              { text: 'Licensing and Monetization', link: '/getting-started/licensing-and-monetization' },
              { text: 'Meet the Team', link: '/getting-started/meet-the-team' },
              { text: 'Contributing', link: '/getting-started/contributing' }
            ]
          }
        ],
        '/core-concepts/': [
          {
            text: 'Architecture',
            items: [
              { text: 'How It Works', link: '/core-concepts/architecture/how-it-works' },
              { text: 'Components', collapsed: true, items: [
                { text: 'Metadata Database', link: '/core-concepts/architecture/metadata-database' },
                { text: 'Didact CLI', link: '/core-concepts/architecture/didact-cli' },
                { text: 'Didact Engine', link: '/core-concepts/architecture/didact-engine' },
                { text: 'Didact UI', link: '/core-concepts/architecture/didact-ui' },
                { text: 'Didact Core', link: '/core-concepts/architecture/didact-core' },
                { text: 'Flow Library', link: '/core-concepts/architecture/flow-library'},
              ]}
            ]
          },
          {
            text: 'Setup',
            items: [
              { text: 'Installation', link: '/core-concepts/setup/installation' },
              { text: 'Config', link: '/core-concepts/setup/config' }
            ]
          },
          {
            text: 'Flow Libraries',
            items: [
              { text: 'Create', link: '/core-concepts/flow-libraries/create-flow-libraries' },
              { text: 'Dependency Injection', link: '/core-concepts/flow-libraries/dependency-injection' },
            ]
          },
          {
            text: 'Flows',
            items: [
              { text: 'Overview', link: '/core-concepts/flows/flows-overview' },
              { text: 'Contexts', link: '/core-concepts/flows/contexts' },
              { text: 'Dependency Injection', link: '/core-concepts/flows/dependency-injection' },
              { text: 'Versioning', link: '/core-concepts/flows/flow-versioning' },
              { text: 'Schedules' },
              { text: 'Triggers' },
              { text: 'Logging', link: '/core-concepts/flows/logging' },
              { text: 'Retry Policies' }
            ]
          },
          {
            text: 'Steps',
            items: [
              { text: 'Overview', link: '/core-concepts/steps/steps-overview' }
            ]
          },
          {
            text: 'Deployments',
            items: [
              { text: 'Overview', link: '/core-concepts/deployments/deployments-overview' },
              { text: 'Deployment Names', link: '/core-concepts/deployments/deployment-names' },
              { text: 'Deployments File', link: '/core-concepts/deployments/deployments-file' },
              { text: 'Deployment Types' },
              { text: 'Deployment Sources', link: '/core-concepts/deployments/deployment-sources' }
            ]
          },
          {
            text: 'Platform',
            items: [
              { text: 'Environments', link: '/core-concepts/environments' },
              { text: 'Queues', link: '/core-concepts/queues' },
              { text: 'Variables', link: '/core-concepts/variables' },
              { text: 'Secrets', link: '/core-concepts/secrets' },
              // { text: 'Engine Tunings', link: '/core-concepts/engine-tunings' }
            ]
          },
          {
            text: 'Didact Console',
            items: [
              { text: 'Console Overview', link: '/core-concepts/didact-console/console-overview' },
              { text: 'License Keys', link: '/core-concepts/didact-console/license-keys' }
            ]
          },
          // {
          //   text: 'Didact CLI',
          //   items: [
          //     { text: 'Installation' },
          //     { text: 'Config', link: '/core-concepts/didact-cli/cli-config' },
          //     // { text: 'Environment Variables', link: '/core-concepts/didact-cli/environment-variables'}
          //   ]
          // },
          // {
          //   text: 'Didact Engine',
          //   items: [
          //     { text: 'Installation', link: '/core-concepts/didact-engine/engine-installation' },
          //     { text: 'Config', link: '/core-concepts/didact-engine/engine-config' },
          //     // { text: 'Environment Variables', link: '/core-concepts/didact-engine/environment-variables' },
          //   ]
          // },
          // {
          //   text: "Didact UI",
          //   items: [
          //     { text: 'Installation', link: '/core-concepts/didact-ui/ui-installation' },
          //     { text: 'Config', link: '/core-concepts/didact-ui/ui-config' },
          //     // { text: "Environment Variables", link: '/core-concepts/didact-ui/environment-variables' }
          //   ]
          // },
          // {
          //   text: 'Execution Mechanics',
          //   items: [
          //     { text: 'Didact Threadpool', link: '/' },
          //     { text: 'Didact Task Scheduler', link: '/' },
          //     { text: 'Asynchronicity', link: '/' },
          //     { text: 'Parallelism', link: '/' },
          //     { text: 'Engine Tuning', link: '/' }
          //   ]
          // },
          {
            text: 'Licensing System',
            items: [
              { text: 'Terminology', link: '/core-concepts/licensing-system/terminology' },
              { text: 'License Key', link: '/core-concepts/licensing-system/license-keys' },
              { text: 'Smart Key', link: '/core-concepts/licensing-system/smart-keys' },
              // { text: 'Features Validator', link: '/' },
              { text: 'Failsafe Mechanics', link: '/core-concepts/licensing-system/failsafe-mechanics' },
              { text: 'Uptime and Alerting', link: '/core-concepts/licensing-system/uptime-and-alerting' },
              // { text: 'Airgapped Systems', link: '/' }
            ]
          },
        ],
        'guides': [
          {
            text: 'Maintenance',
            items: [
              { text: 'Setup encryption key', link: '/guides/setup-encryption-key' },
              // { text: 'Rotate encryption keys', link: '/guides/rotate-encryption-keys' },
              { text: 'Updating Didact' }
            ]
          },
          {
            text: 'Deployments',
            items: [
              { text: 'Deploy to filesystem' },
              { text: 'Deploy to GitHub' },
              { text: 'Deploy to Azure DevOps' },
              { text: 'Deploy to Docker' }
            ]
          },
          {
            text: 'Reverse Proxies',
            items: [
              { text: 'Nginx' },
              { text: 'Apache' },
              { text: 'IIS' },
              { text: 'Caddy' },
              { text: 'YARP' }
            ]
          },
          {
            text: 'Infrastructure Deployments',
            items: [
              { text: 'Windows Service' },
              { text: 'Windows Server' },
              { text: 'Azure VM' },
              { text: 'AWS EC2' },
              { text: 'Docker' },
              { text: 'Kubernetes' }
            ]
          },
          {
            text: 'CICD'
          },
          {
            text: 'Scaling', link: '/'
          }
        ],
        '/api/': [
          {
            text: 'Didact CLI',
            collapsed: false,
            items: [
              { text: 'version', link: '/api/didact-cli/version' },
              { text: 'install', link: '/api/didact-cli/install' },
              { text: 'migrate', link: '/api/didact-cli/migrate' },
              { text: 'start', link: '/api/didact-cli/start' },
              // { text: 'update' },
              { text: 'config init', link: '/api/didact-cli/config-init' },
              { text: 'config profile init', link: '/api/didact-cli/config-profile-init' },
              { text: 'config profile activate', link: '/api/didact-cli/config-profile-activate' },
              { text: 'config set', link: '/api/didact-cli/config-set' },
              { text: 'config inspect', link: '/api/didact-cli/config-inspect' },
              { text: 'environment init', link: '/api/didact-cli/environment-init' },
              { text: 'environment list', link: '/api/didact-cli/environment-list' },
              { text: 'license authenticate', link: '/api/didact-cli/license-authenticate' },
              // { text: 'license validate', link: '/api/didact-cli/license-validate' },
              // { text: 'engine install', link:'/api/didact-cli/engine-install' },
              // { text: 'engine config init', link: '/api/didact-cli/engine-config-init' },
              // { text: 'engine config set', link: '/api/didact-cli/engine-config-set' },
              // { text: 'engine config inspect', link: '/api/didact-cli/engine-config-inspect' },
              // { text: 'engine run', link: '/api/didact-cli/engine-run' },
              // { text: 'ui install', link: '/api/didact-cli/ui-install' },
              // { text: 'ui config init', link: '/api/didact-cli/ui-config-init' },
              // { text: 'ui config set', link: '/api/didact-cli/ui-config-set' },
              // { text: 'ui config inspect', link: '/api/didact-cli/ui-config-inspect' },
              // { text: 'ui run', link: '/api/didact-cli/ui-run' },
              { text: 'deployments', items: [
                { text: 'deploy filesystem', link: '/api/didact-cli/deploy-filesystem' },
              ]},

              // { text: 'deployment init', link: '/api/didact-cli/deployment-init' },
              // { text: 'deployment set', link: '/api/didact-cli/deployment-set' },
              // // { text: 'deployment version', link: '/api/didact-cli/deployment-version' },
              // { text: 'deployment-profile init', link: '/api/didact-cli/deployment-profile-init' },
              // { text: 'deployment-profile set', link: '/api/didact-cli/deployment-profile-set' },
              // { text: 'deployment profile sources', items: [
              //   { text: 'deployment-profile-source set filesystem', link: '/api/didact-cli/deployment-profile-source-set-filesystem' }
              // ]},
              // { text: 'deployment generate', link: '/api/didact-cli/deployment-generate' },
              // { text: 'deployment inspect', link: '/api/didact-cli/deployment-inspect' },

              { text: 'encryption-key generate', link: '/api/didact-cli/encryption-key-generate' },
              // { text: 'encryption-key rotate', link: '/api/didact-cli/encryption-key-rotate' }
            ]
          },
          { text: 'REST API', link: '/' },
          { text: 'Didact Core', link: '/' },
          { text: 'Errors and Exceptions', link: '/' }
        ]
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
      copyright: `Copyright © ${copyrightHolderName}`
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