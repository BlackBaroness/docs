---
title: "Аутентификация bypass"
---

`bypass` позволяет аддону решить, можно ли впустить игрока без обычной аутентификации. Так можно реализовать вход через клиентский мод, доверенную приватную сеть или отдельный домен.

BaronessAuth вызывает `AuthPlayerBypassAttemptEvent`, а аддон выполняет проверку. Если обработчик не разрешил вход, плагин переходит к следующему способу аутентификации.

## Настройка

В `BaronessAuth/config/methods/bypass.yml` установите `enabled: true`, затем выполните `/auth reload`.

Параметр `delay.mode` определяет, где игрок ждёт результат:

- `true` — на сервере `auth`. Используйте для запросов к внешним сервисам.
- `false` — подключение остаётся подвешенным. Подходит только для быстрых проверок.
- `default` — применяется поведение мгновенных способов из `advanced.yml`.

`delay.minimum` задаёт минимальное время на сервере `auth`. Время самой проверки уже входит в него.

## Обработчик

Сначала [подключите API](/docs/auth/guides/api/), затем зарегистрируйте обычный BungeeCord listener:

```java
package example;

import io.github.blackbaroness.baronessauth.bungee.api.event.AuthPlayerBypassAttemptEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.api.plugin.Plugin;
import net.md_5.bungee.event.EventHandler;

public final class AuthExamplePlugin extends Plugin implements Listener {
    @Override
    public void onEnable() {
        getProxy().getPluginManager().registerListener(this, this);
    }

    @EventHandler
    public void onBypass(AuthPlayerBypassAttemptEvent event) {
        if (isTrusted(event)) {
            event.setAllowed(true);
        }
    }

    private boolean isTrusted(AuthPlayerBypassAttemptEvent event) {
        // Ваша проверка.
        return false;
    }
}
```

Вызывайте `setAllowed(true)` только после надёжной проверки. Ник, адрес подключения или само наличие клиентского мода не подтверждают личность игрока.

## Асинхронная проверка

`AuthPlayerBypassAttemptEvent` является `AsyncEvent`, встроенным подтипом событий BungeeCord.

Зарегистрируйте intent до запуска долгой задачи. Завершайте его в `finally`, иначе подключение останется в ожидании.

```java
@EventHandler
public void onBypass(AuthPlayerBypassAttemptEvent event) {
    event.registerIntent(this);
    try {
        getProxy().getScheduler().runAsync(this, () -> {
            try {
                if (isTrusted(event)) {
                    event.setAllowed(true);
                }
            } catch (Exception error) {
                getLogger().log(java.util.logging.Level.WARNING,
                    "Проверка bypass не удалась", error);
            } finally {
                event.completeIntent(this);
            }
        });
    } catch (RuntimeException error) {
        event.completeIntent(this);
        throw error;
    }
}
```

Для такой проверки рекомендуется `delay.mode: true` и ограничение времени ожидания во внешнем клиенте.

## Данные события

- `event.getPlayer()` — подключившийся игрок.
- `event.getPlayerProfileSnapshot()` — копия профиля или `null`, если записи в базе ещё нет.
- `event.setAllowed(true)` — разрешить вход через `bypass`.
