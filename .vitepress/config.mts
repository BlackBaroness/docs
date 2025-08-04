import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  title: "BlackBaroness docs",
  description: "Документация от BlackBaroness",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'BaronessAuth', link: '/pages/baronessauth/changelog' }
    ],

    sidebar: [
      {
        text: '',
          items: [
            { text: 'История версий', link: '/pages/baronessauth/changelog' },
            {
              text: 'Стандартные конфиги',
              items: [
                { text: 'general.yml', link: '/pages/baronessauth/default_configuration/general' },
              ]
            },
            {
              text: 'Гайды',
              items: [
                { text: 'Встроенные сервера', link: '/pages/baronessauth/guide/embedded-servers' },
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
  }
})
