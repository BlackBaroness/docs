---
title: "API"
slug: auth/guides/api
---

API позволяет другим плагинам работать с BaronessAuth: читать и изменять профили, проверять пароли и отправлять сообщения через подключённых ботов.

Плагин, использующий API, должен работать на BungeeCord. На Paper и Spigot этот API недоступен.

## Добавление в проект

Добавьте [репозиторий BaronessAuth](https://maven.blackbaroness.inpoint.pro/#/rei-releases), затем подключите артефакт [`baronessauth-bungeecord-api`](https://maven.blackbaroness.inpoint.pro/#/rei-releases/io/github/blackbaroness/baronessauth-bungeecord-api).

Для Gradle используйте `compileOnly`, для Maven — `<scope>provided</scope>`. Не включайте API в JAR своего плагина: во время работы его предоставляет BaronessAuth.

Также добавьте BaronessAuth в зависимости `bungee.yml`:

```yaml
depends: [BaronessAuth]
```

Примеры проверены по [API 3.38.0](https://maven.blackbaroness.inpoint.pro/rei-releases/io/github/blackbaroness/baronessauth-bungeecord-api/3.38.0/baronessauth-bungeecord-api-3.38.0.jar).

## Базовые операции

Общая точка входа — класс `BaronessAuthBungeeAPI`:

```java
BaronessAuthBungeeAPI api = BaronessAuthBungeeAPI.getInstance();
```

Получайте экземпляр после загрузки BaronessAuth, например в `onEnable()` своего плагина.

## Работа с базой данных

Операции с базой выполняются асинхронно и внутри транзакции.

Например, так можно получить VK ID игрока:

```java
CompletableFuture<Long> future = api.fromDatabase(transaction -> {
    PlayerProfile profile = transaction.findProfileByName("ник игрока");
    if (profile == null) {
        return null;
    }

    VkLink link = profile.getVkLink();
    return link == null ? null : link.getVkId();
});

future.thenAccept(vkId -> {
    if (vkId != null) {
        // Используйте VK ID здесь.
    }
});
```

Не блокируйте основной поток через `join()` или `get()`. Продолжайте работу в `thenAccept`, а несколько асинхронных операций связывайте через `thenCompose`.

Чтобы изменить сущность, сначала получите доступ к её изменяемой версии через `transaction.mutate`:

```java
api.createPassword("новый пароль")
    .thenCompose(password -> api.inDatabase(transaction -> {
        PlayerProfile profile = transaction.findProfileByName("ник игрока");
        if (profile == null) {
            throw new IllegalArgumentException("Профиль не найден");
        }

        transaction.mutate(profile, mutableProfile ->
            mutableProfile.setPassword(password)
        );
    }));
```

У `Transaction` есть и другие методы: поиск и создание профилей, работа с привязками, история входов и подсчёт записей. Полный список доступен через автодополнение IDE.

## Отправка сообщений через ботов

```java
api.sendVkMessage(vkUserId, "Сообщение");
```

Аналогичные методы `sendTelegramMessage` и `sendDiscordMessage` отправляют сообщения через других ботов. Передавайте ID пользователя из соответствующей социальной сети.