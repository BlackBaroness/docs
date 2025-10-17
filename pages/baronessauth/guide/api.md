# API

С помощью API ваши плагины могут контактировать с BaronessAuth - смотреть и обновлять данные, сверять пароли, отправлять сообщения через ботов и многое другое.

Ваш плагин должен быть запущен на BungeeCord, чтобы делать это.

## Добавление в проект

Добавьте мой репозиторий: [ссылка на инструкцию](https://blackbaroness.inpoint.pro/maven/#/)

Добавьте мой артефакт: [ссылка на инструкцию](https://blackbaroness.inpoint.pro/maven/#/rei-releases/io/github/blackbaroness/baronessauth-bungeecord-api)

Помните - артефакт должен подключаться как `compileOnly` / `<scope>provided</scope>`!

Не забудьте добавить `BaronessAuth` в `depend` вашего плагина.

## Базовые операции

Общая точка входа - класс `BaronessAuthBungeeAPI`.

```java
BaronessAuthBungeeAPI.getInstance()
```

## Отправка сообщений через ботов

```java
try {
    BaronessAuthBungeeAPI.getInstance().sendVkMessage(/* vk user id */, "сообщение")
} catch (Exception e) {
    // наверное, сделайте что-то с этим?
}
```

Аналогичные методы есть и для других соцсетей.

Сразу появляется вопрос, откуда узнать VK ID - сейчас и разберёмся.

## Работа с базой данных

Обращения к базе данных у нас очень простые и понятные, но всегда происходят строго асинхронно, а также в рамках реальной транзакции в БД.

Например, можно вот так узнать VK ID игрока:

```java
CompletableFuture<Long> future = api.fromDatabase(transaction -> {
    PlayerProfile profile = transaction.findProfileByName("ник игрока");
    if (profile != null) {
        VkLink vkLink = profile.getVkLink();
        if (vkLink != null) {
            return vkLink.getVkId();
        }
    }
    return null;
});

// делайте с этим future что-то, например future.join()
```

Если вам нужно изменить какую-то сущность, сначала нужно получить соответствующий доступ:

```java
// Создание пароля тоже асинхронное - операция небыстрая
// -- Обратите внимание на .join() --
ProfilePassword password = api.createPassword("пароль").join();

api.inDatabase(transaction -> {
    PlayerProfile profile = transaction.findProfileByName("ник игрока");
    transaction.mutate(profile, mutableProfile -> { // получили доступ к модификации сущности-профиля
        mutableProfile.setPassword(password);
    });
}).join();
```

Если посреди транзакции выбросится исключение, все её изменения будут отменены. 

Там ещё масса разных методов, которые вам стоит посмотреть самим.