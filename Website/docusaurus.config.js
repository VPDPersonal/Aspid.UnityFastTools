// @ts-check
import { readFileSync } from 'node:fs';
import venom from './src/prism/venom.js';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';
import remarkCrossInstanceLinks from './src/remark/crossInstanceLinks.js';
import remarkThemedImages from './src/remark/themedImages.js';

const PACKAGE = '../Aspid.FastTools/Packages/tech.aspid.fasttools';
const LOCALES = ['en', 'ru'];
// Translations live in `Documentation/<locale>/`; they must not be picked up as English pages.
const TRANSLATION_FOLDERS = LOCALES.filter((locale) => locale !== 'en').map((locale) => `${locale}/**`);
const REPO = 'https://github.com/VPDPersonal/Aspid.FastTools';
const ASSET_STORE = 'https://assetstore.unity.com/packages/slug/365584';
/** The docs in the working tree describe the package version in the working tree. */
const PACKAGE_VERSION = JSON.parse(readFileSync(new URL(`${PACKAGE}/package.json`, import.meta.url), 'utf8')).version;

/**
 * Turns a sample folder name into a slug: `SerializeReferences` → `serialize-references`,
 * `01. Counter` → `counter` with position 1. FastTools samples carry no number, so they sort by name.
 */
function samplePrefixParser(filename) {
  const match = filename.match(/^(\d+)\.\s*(.+)$/);
  const name = (match ? match[2] : filename)
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
  return { filename: name, numberPrefix: match ? Number(match[1]) : undefined };
}

/**
 * Shared options: GitHub-style `> [!NOTE]` alerts become Docusaurus admonitions, and file links
 * between the two plugin instances become site routes.
 */
const markdownOptions = {
  beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives, remarkCrossInstanceLinks, remarkThemedImages],
  showLastUpdateTime: false,
  editUrl: ({ versionDocsDirPath, docPath, locale }) =>
    locale === 'en'
      ? `${REPO}/edit/main/${versionDocsDirPath.replace(/^\.\.\//, '')}/${docPath}`
      : undefined,
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aspid.FastTools',
  tagline: 'Unity tools that cut boilerplate',
  favicon: 'img/favicon.png',

  url: 'https://vpdpersonal.github.io',
  baseUrl: '/Aspid.FastTools/',
  customFields: { assetStore: ASSET_STORE },
  organizationName: 'VPDPersonal',
  projectName: 'Aspid.FastTools',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  markdown: {
    hooks: { onBrokenMarkdownLinks: 'throw' },
  },

  i18n: {
    defaultLocale: 'en',
    locales: LOCALES,
    localeConfigs: {
      en: { label: 'English' },
      ru: { label: 'Русский' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // Main documentation lives inside the UPM package so it ships to Unity users as-is.
        // Translations sit next to it in `Documentation/<locale>/` and are wired in by scripts/sync-i18n.mjs.
        docs: {
          path: `${PACKAGE}/Documentation`,
          routeBasePath: 'docs',
          breadcrumbs: false,
          sidebarPath: './sidebars.js',
          exclude: ['**/SUMMARY.md', '**/*.meta', ...TRANSLATION_FOLDERS],
          versions: { current: { label: PACKAGE_VERSION } },
          ...markdownOptions,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  plugins: [
    './src/plugins/search/index.js',
    [
      // Tutorials are generated from each sample's Documentation folder by scripts/sync-i18n.mjs.
      // The generated tree keeps the public routes flat while the package keeps docs and images out of sample roots.
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'tutorials',
        path: 'tutorials',
        routeBasePath: 'tutorials',
        breadcrumbs: false,
        sidebarPath: './sidebarsTutorials.js',
        include: ['index.mdx', '*/README.md', '*/TUTORIAL.md'],
        numberPrefixParser: samplePrefixParser,
        ...markdownOptions,
        editUrl: ({ docPath, locale }) =>
          locale === 'en'
            ? `${REPO}/edit/main/Aspid.FastTools/Packages/tech.aspid.fasttools/Samples~/${docPath.replace(
                /\/(README|TUTORIAL)\.md$/,
                '/Documentation/$1.md',
              )}`
            : undefined,
      }),
    ],
    [
      // The root CHANGELOG.md (and CHANGELOG.<locale>.md), copied in by scripts/sync-i18n.mjs.
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'changelog',
        path: 'changelog',
        routeBasePath: 'changelog',
        breadcrumbs: false,
        sidebarPath: './changelog/sidebars.json',
        showLastUpdateTime: false,
        editUrl: ({ locale }) => (locale === 'en' ? `${REPO}/edit/main/CHANGELOG.md` : undefined),
        beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
      }),
    ],
    [
      // API reference generated by DocFX from the XML doc comments (`npm run api`), see scripts/docfx-*.mjs.
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'api',
        path: 'api',
        routeBasePath: 'api',
        breadcrumbs: false,
        sidebarPath: './sidebarsApi.js',
        showLastUpdateTime: false,
        editUrl: undefined,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { defaultMode: 'dark', respectPrefersColorScheme: false },
      navbar: {
        title: 'Aspid.FastTools',
        logo: { alt: 'Aspid.FastTools', src: 'img/logo.png', width: 28, height: 28 },
        hideOnScroll: false,
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          { type: 'docSidebar', docsPluginId: 'tutorials', sidebarId: 'tutorials', position: 'left', label: 'Samples' },
          { type: 'docSidebar', docsPluginId: 'api', sidebarId: 'api', position: 'left', label: 'API' },
          { to: '/changelog', label: 'Changelog', position: 'left' },
          { type: 'localeDropdown', position: 'right', className: 'navbar-locale' },
          { href: REPO, label: 'GitHub', position: 'right', className: 'navbar-github', 'aria-label': 'GitHub' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/getting-started' },
              { label: 'Serializable Types', to: '/docs/serializable-types' },
              { label: 'SerializeReference Selector', to: '/docs/serialize-reference-selector' },
            ],
          },
          {
            title: 'Contact',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vladislav-panin-965048314/' },
              { label: 'vpd.aspid@gmail.com', href: 'mailto:vpd.aspid@gmail.com' },
              { label: 'Vladislav Panin · GitHub', href: 'https://github.com/VPDPersonal' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'GitHub', href: REPO },
              { label: 'Asset Store', href: ASSET_STORE },
              { label: 'Changelog', to: '/changelog' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Vladislav Panin. MIT License.`,
      },
      prism: {
        theme: venom.light,
        darkTheme: venom.dark,
        additionalLanguages: ['csharp', 'json', 'bash'],
      },
    }),
};

export default config;
