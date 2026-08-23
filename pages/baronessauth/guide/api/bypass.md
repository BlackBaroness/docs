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

## Где игрок ждёт результат

Поведение во время проверки задаётся через `delay.mode`:

- `true` — сначала отправить игрока на `auth`, а уже там ждать завершения события. Используйте этот вариант для
  запросов к внешним сервисам и других долгих операций.
- `false` — держать подключение в подвешенном состоянии. Подходит только для быстрых проверок: слишком долгое
  ожидание может закончиться сетевым таймаутом ещё до входа на сервер.
- `default` — вести себя так же, как остальные мгновенные способы, с учётом `advanced.yml / instant-methods-delay`.

Если игрок был отправлен на `auth`, параметр `delay.minimum` задаёт минимальное суммарное время нахождения там.
Время работы обработчика уже входит в этот промежуток: проверка заняла три секунды при `minimum: '2 сек'` — лишней
задержки не будет.

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
Для такого обработчика обычно стоит установить `bypass.yml / delay.mode: true`.

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

`playerProfileSnapshot` может быть `null`, если игрок ещё отсутствует в базе данных. Пока ни один обработчик не
установил `allowed: true`, BaronessAuth считает, что bypass этому игроку недоступен, и переходит к следующему способу
аутентификации.
