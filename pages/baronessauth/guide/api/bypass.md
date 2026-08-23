# Способ аутентификации "bypass"

Этот способ аутентификации позволяет вам легко написать свою логику аутентификации, при которой игрок сможет войти на сервер, минуя все проверки.

Например:
1. Интеграция с клиентским модом
2. Мгновенный вход, когда подключение идёт с вашего приватного WireGuard
3. Мгновенный вход, когда подключение идёт с домена, персонального для этого игрока

В общем, это кастомный мгновенный вход: вы можете написать какую угодно логику.

## Информация для администраторов

Этот способ сам по себе не является угрозой безопасности, несмотря на страшное название. 

Если вам он не нужен, просто выключите его. 

Если нужен, включайте, но вся ответственность за его работу лежит на разработчике аддона, а не на самом BaronessAuth.

## Перед началом работы

В файле `BaronessAuth/config/methods/bypass.yml` нужно переключить параметр `enabled: true` и выполнить `/auth reload`, иначе способ не будет работать вовсе.

Вам также следует определиться, долгие у вас операции проверки или нет.

Если долгие, вам следует в этом же файле включить `delayed`, чтобы игрока не отключало по таймауту.

Если в пределах нескольких секунд, обычно нормально держать `delayed: false`: игрок после одобрения попадёт сразу в лобби.

## Синхронная проверка

В этом примере мы позволяем игроку с ником BlackBaroness сразу аутентифицироваться.

```java
@EventHandler
void onEvent(AuthPlayerBypassAttemptEvent event) {
    if (event.getPlayer().getName().equals("BlackBaroness")) {
        event.setAllowed(true);
    }
}
```

## Асинхронная проверка

Здесь мы можем наблюдать, что `AuthPlayerBypassAttemptEvent` является `AsyncEvent` (одна из функций BungeeCord), что позволяет нам запускать долгие асинхронные операции. 
Не забудьте, что для таких операций иногда вам нужен `delayed`.

```java
@EventHandler
void onEvent(AuthPlayerBypassAttemptEvent event) {
    event.registerIntent(plugin);
    ProxyServer.getInstance().getScheduler().runAsync(plugin, () -> {
        try {
            event.setAllowed(painfullySlowComputation(event.getPlayerProfileSnapshot()));
        } finally {
            event.completeIntent(plugin);
        }
    });
}

private Boolean painfullySlowComputation(PlayerProfileSnapshot playerProfileSnapshot) {
    Thread.sleep(10_000L); // симулируем долгую операцию
        
    // у нас есть доступ к снапшоту профиля из базы данных, кстати!
    if (playerProfileSnapshot != null) {
        return playerProfileSnapshot.getName().equals("BlackBaroness");
    }
        
    return false;
}
```