import { defineConfig } from "vitepress";
import lightbox from "vitepress-plugin-lightbox"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  titleTemplate: ':title - Baroness Docs',
  description: "Документация от BlackBaroness",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'BaronessAuth', link: '/pages/baronessauth/changelog/index' }
    ],

    sidebar: [
      {
        text: '',
          items: [
            { text: 'История версий', link: '/pages/baronessauth/changelog/index' },
            {
              text: 'Конфиги',
              items: [
                { text: 'general.yml', link: '/pages/baronessauth/config/general' },
                { text: 'advanced.yml', link: '/pages/baronessauth/config/advanced' },
                {
                  text: 'methods/',
                  items: [
                    { text: 'password.yml', link: '/pages/baronessauth/config/methods/password' },
                    { text: 'vk.yml', link: '/pages/baronessauth/config/methods/vk' },
                    { text: 'telegram.yml', link: '/pages/baronessauth/config/methods/telegram' },
                    { text: 'discord.yml', link: '/pages/baronessauth/config/methods/discord' },
                    { text: 'session.yml', link: '/pages/baronessauth/config/methods/session' },
                    { text: 'premium.yml', link: '/pages/baronessauth/config/methods/premium' },
                  ]
                },
                {
                  text: 'security/',
                  items: [
                    { text: 'passwords.yml', link: '/pages/baronessauth/config/security/passwords' },
                    { text: 'multi_accounts.yml', link: '/pages/baronessauth/config/security/multi_accounts' },
                    { text: 'connection_filters.yml', link: '/pages/baronessauth/config/security/connection_filters' },
                  ]
                },
                {
                  text: 'commands/',
                  items: [
                    { text: '_shared.yml', link: '/pages/baronessauth/config/commands/_shared' },
                    { text: 'baronessauth.yml', link: '/pages/baronessauth/config/commands/baronessauth' },
                    { text: 'changepassword.yml', link: '/pages/baronessauth/config/commands/changepassword' },
                    { text: 'link.yml', link: '/pages/baronessauth/config/commands/link' },
                    { text: 'logout.yml', link: '/pages/baronessauth/config/commands/logout' },
                    { text: 'unregister.yml', link: '/pages/baronessauth/config/commands/unregister' },
                  ]
                },
              ]
            },
            {
              text: 'Гайды',
              items: [
                { text: 'Встроенные сервера', link: '/pages/baronessauth/guide/embedded-servers' },
                { text: 'Бот VK', link: '/pages/baronessauth/guide/vk' },
                { text: 'Бот Telegram', link: '/pages/baronessauth/guide/telegram' },
                { text: 'Бот Discord', link: '/pages/baronessauth/guide/discord' },
                {
                  text: 'Миграции',
                  items: [
                    { text: 'nLogin', link: '/pages/baronessauth/guide/migration/nlogin' },
                  ]
                },
              ]
            }
          ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/blackbaroness100' },
      { icon: 'github', link: 'https://github.com/BlackBaroness' }
    ],

    outlineTitle: 'На этой странице',
    lastUpdatedText: 'Последнее обновление',
    docFooter: {
      prev: 'Назад',
      next: 'Вперёд',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск',
          },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить поиск',
            footer: {
              selectText: 'Выбрать',
              navigateText: 'Навигация',
            },
          },
        },
      },
    },
  },
  markdown: {
    config: (md) => {
      // Use lightbox plugin
      md.use(lightbox, {});
    },
  },
});