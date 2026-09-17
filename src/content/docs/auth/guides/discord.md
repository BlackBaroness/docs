---
title: "Бот Discord"
---

Для настройки понадобится доступ к [Discord Developer Portal](https://discord.com/developers/applications) и файлу `plugins/BaronessAuth/config/methods/discord.yml`.

:::danger
Токен даёт полный доступ к боту. Не публикуйте его и не отправляйте посторонним.
:::

## Создание бота

### 1. Создайте приложение

Откройте Discord Developer Portal и создайте приложение.

![Кнопка создания приложения в Discord Developer Portal](/docs/assets/auth/guides/discord/create-application.webp)
![Название нового приложения Discord](/docs/assets/auth/guides/discord/application-name.webp)

### 2. Настройте Installation

Откройте раздел `Installation` и отключите ссылку установки, как показано на скриншоте.

![Отключённая Install Link в настройках приложения Discord](/docs/assets/auth/guides/discord/disable-install-link.webp)

### 3. Настройте Auth Flow и Gateway Intents

Включите параметры, отмеченные на скриншоте.

![Настройки Auth Flow и Gateway Intents для бота Discord](/docs/assets/auth/guides/discord/bot-settings.webp)

### 4. Получите токен

Создайте токен бота и сразу сохраните его в безопасном месте.

![Кнопка создания токена бота Discord](/docs/assets/auth/guides/discord/create-token.webp)
![Поле с токеном бота Discord](/docs/assets/auth/guides/discord/copy-token.webp)

### 5. Добавьте бота на сервер

Этот шаг нужен только для функций, которые работают через ваш Discord-сервер. Создайте ссылку приглашения и откройте её.

![Выбор OAuth2 URL Generator в Discord](/docs/assets/auth/guides/discord/invite-url-generator.webp)
![Права в ссылке приглашения Discord-бота](/docs/assets/auth/guides/discord/invite-permissions.webp)
![Добавление Discord-бота на сервер](/docs/assets/auth/guides/discord/add-to-server.webp)

## Настройка BaronessAuth

Откройте `plugins/BaronessAuth/config/methods/discord.yml` и укажите токен:

```yml
enabled: true
bot:
  token: 'токен, который вы скопировали'
```

Выполните `/auth reload`. Бот должен запуститься без ошибки в консоли.

## Дополнительные функции

В этом же конфиге можно настроить:

- `require-server-membership` — требовать участие на сервере;
- `link-using-channel` — привязывать аккаунты через канал;
- `set-name-after-link` — менять имя после привязки;
- `set-role-after-link` и `remove-role-after-link` — управлять ролями.

Для этих параметров нужны ID сервера, канала или роли. Включите режим разработчика в Discord, скопируйте нужный ID и вставьте его в соответствующее поле конфига.
