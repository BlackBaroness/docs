---
title: "Использование прокси"
---

Некоторые внешние сервисы могут быть недоступны с вашего сервера. В таком случае BaronessAuth умеет отправлять запросы через HTTP- или SOCKS-прокси.

Например, прокси может понадобиться для доступа к Telegram.

:::caution
BaronessAuth поддерживает только HTTP и SOCKS. Для VLESS и других протоколов нужен отдельный клиент, например xray, который поднимет локальный SOCKS-прокси.
:::

## HTTP

Пример:

```yml
enabled: true
protocol: !<http>
  url: 'http://example.com:8080'
extra-headers:
  'Proxy-Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
```

В этом примере адрес прокси — `example.com:8080`. Данные для входа передаются через заголовок [`Proxy-Authorization`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Proxy-Authorization).

Если авторизация не нужна, оставьте `extra-headers: {}`.

## SOCKS

Пример:

```yml
enabled: true
protocol: !<socks>
  host: '127.0.0.1'
  port: 9050
  username: ''
  password: ''
extra-headers: {}
```

Здесь BaronessAuth подключается к локальному SOCKS-прокси на порту `9050`. Такой адрес, например, подходит для Tor, установленного на том же Linux-сервере.

Если прокси требует авторизацию, заполните `username` и `password`.

После изменения конфига выполните `/auth reload` и проверьте, что запросы к нужному сервису проходят без ошибок.
