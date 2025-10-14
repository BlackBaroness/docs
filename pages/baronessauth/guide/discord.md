# Бот Discord

::: warning
Этот бот самый сложный в настройке, потому что Discord... вот такой.

Вам следует очень аккуратно и внимательно следовать инструкции.

Так как понятно описать каждый пункт нереально, почти всё показано скриншотами.
:::

## Создание бота

### 1. Создайте приложение на https://discord.com/developers/applications
![](./../assets/discord_create_1.webp)
![](./../assets/discord_create_2.webp)

### 2. Настройте Installation
![](./../assets/discord_disable_install_link.webp)

### 3. Настройте Auth Flow и Gateway Intents
![](./../assets/discord_configure_auth_flow.webp)

### 4. Создайте и сохраните токен
![](./../assets/discord_create_token.webp)
![](./../assets/discord_copy_token.webp)

### 5. Создайте ссылку для добавления и перейдите по ней (если хотите иметь сервер)
![](./../assets/discord_add_to_guild_1.webp)
![](./../assets/discord_add_to_guild_2.webp)
![](./../assets/discord_add_to_guild_3.webp)

### 6. Настройте `methods/discord.yml`:
```yml
enabled: true
bot:
  token: 'токен, который вы скопировали'
```

### 7. Введите `/auth reload` - бот должен сразу начать работать

Для лучшей интеграции с вашим Discord сервером есть такие функции как `require-server-membership`, `link-using-channel`, `set-name-after-link`, `set-role-after-link`, `remove-role-after-link`...

Эти функции не требуют инструкции, в конфиге уже итак всё сказано. Просто включите режим разработчика в клиенте Discord, скопируйте нужные ID и вставьте, куда вам надо.