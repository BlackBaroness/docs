// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import codeImport from './src/plugins/code-import.mjs';
import legacyRedirectFiles from './src/plugins/legacy-redirect-files.mjs';
import moreDirective from './src/plugins/more-directive.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://blackbaroness.github.io',
	base: '/docs',
	markdown: {
		processor: satteri({
			features: { directive: true },
			mdastPlugins: [codeImport, moreDirective()],
		}),
	},
	integrations: [
		legacyRedirectFiles(),
		starlight({
			title: 'BlackBaroness docs',
			disable404Route: true,
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				useStarlightUiThemeColors: true,
			},
			plugins: [starlightImageZoom()],
			components: {
				ThemeProvider: './src/components/Empty.astro',
				ThemeSelect: './src/components/Empty.astro',
			},
			locales: {
				root: {
					label: 'Русский',
					lang: 'ru',
				},
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/BlackBaroness' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/blackbaroness100' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'BaronessAuth',
					items: [
						{ label: 'Главная', slug: 'auth' },
						{ label: 'История версий', slug: 'auth/changelog' },
						{ label: 'Описание версии 3.0.0', slug: 'auth/changelog/3-0-0' },
						{
							label: 'Конфиги',
							items: [
								{ label: 'general.yml', slug: 'auth/config/general' },
								{ label: 'advanced.yml', slug: 'auth/config/advanced' },
								{
									label: 'methods',
									collapsed: true,
									items: [
										{ label: 'password.yml', slug: 'auth/config/methods/password' },
										{ label: 'vk.yml', slug: 'auth/config/methods/vk' },
										{ label: 'telegram.yml', slug: 'auth/config/methods/telegram' },
										{ label: 'discord.yml', slug: 'auth/config/methods/discord' },
										{ label: 'session.yml', slug: 'auth/config/methods/session' },
										{ label: 'premium.yml', slug: 'auth/config/methods/premium' },
										{ label: 'bypass.yml', slug: 'auth/config/methods/bypass' },
									],
								},
								{
									label: 'security',
									collapsed: true,
									items: [
										{ label: 'passwords.yml', slug: 'auth/config/security/passwords' },
										{ label: 'multi_accounts.yml', slug: 'auth/config/security/multi-accounts' },
										{
											label: 'connection_filters.yml',
											slug: 'auth/config/security/connection-filters',
										},
									],
								},
								{
									label: 'commands',
									collapsed: true,
									items: [
										{ label: '_shared.yml', slug: 'auth/config/commands/shared' },
										{ label: 'auth.yml', slug: 'auth/config/commands/auth' },
										{ label: 'changepassword.yml', slug: 'auth/config/commands/changepassword' },
										{ label: 'link.yml', slug: 'auth/config/commands/link' },
										{ label: 'logout.yml', slug: 'auth/config/commands/logout' },
										{ label: 'unregister.yml', slug: 'auth/config/commands/unregister' },
									],
								},
							],
						},
						{
							label: 'Гайды',
							items: [
								{ label: 'Встроенные сервера', slug: 'auth/guides/embedded-servers' },
								{ label: 'Бот VK', slug: 'auth/guides/vk' },
								{ label: 'Бот Telegram', slug: 'auth/guides/telegram' },
								{ label: 'Бот Discord', slug: 'auth/guides/discord' },
								{ label: 'Прокси', slug: 'auth/guides/proxy' },
								{
									label: 'API',
									collapsed: true,
									items: [
										{ label: 'Начало работы', slug: 'auth/guides/api' },
										{ label: 'Аутентификация bypass', slug: 'auth/guides/api/bypass' },
									],
								},
								{
									label: 'Миграции',
									collapsed: true,
									items: [
										{ label: 'nLogin', slug: 'auth/guides/migration/nlogin' },
										{ label: 'JPremium', slug: 'auth/guides/migration/jpremium' },
										{ label: 'LibreLogin', slug: 'auth/guides/migration/librelogin' },
									],
								},
							],
						},
					],
				},
			],
		}),
	],
});
