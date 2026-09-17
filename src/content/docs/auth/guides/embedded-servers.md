---
title: "Встроенные сервера"
---

Во время авторизации игрок должен находиться на отдельном сервере. BaronessAuth может запустить такой сервер автоматически вместе с прокси.

Обычно достаточно одного встроенного сервера. Для новой установки в первую очередь попробуйте `picolimbo`: он быстро запускается и использует меньше всего памяти.

Настройки находятся в `BaronessAuth/config/general.yml`, в секции `embedded-servers`. Стандартный сервер обычно называется `auth`.

## Выбор сервера

| Тип | Клиенты | Схематики | Расход ОЗУ |
|:----|:--------|:----------|:-------|
| `picolimbo` | от 1.7 | sponge.2, sponge.3 | от 5 МБ |
| `nanolimbo` | от 1.7 | нет | от 70 МБ |
| `paper` (1.8.8) | от 1.8 | mcedit | от 500 МБ |
| `paper` (1.12.2) | от 1.9 | mcedit | от 500 МБ |
| `paper` (1.16.5) | от 1.9 | mcedit, sponge.1 | от 700 МБ |
| `paper` (latest) | от 1.9 | все | от 1000 МБ |

Как правило, каждый вариант принимает игроков с последней версии Minecraft.

## PicoLimbo

Лёгкий сервер на основе [PicoLimbo](https://github.com/Quozul/PicoLimbo). Поддерживает схематики и не требует отдельной JVM.

```yml
embedded-servers:
  'название-сервера': !<picolimbo>
    enabled: true
    port: 0 # плагин сам подберёт порт
    dimension: 'overworld'
    schematic: 'default-auth'
    location:
      x: 64.5
      y: 37.0
      z: 72.5
      yaw: 180.0
      pitch: 0.0
    game-mode: 'adventure'
    allow-flight: false
    reduced-debug-info: true
    view-distance: 2
    time: 23000
    forwarding: !<auto> {}
```

## NanoLimbo

Лёгкий сервер на основе [NanoLimbo](https://github.com/BoomEaro/NanoLimbo/tree/feature/1.21.2). Схематики не поддерживаются: игроки находятся в пустом мире.

```yml
embedded-servers:
  'название-сервера': !<nanolimbo>
    enabled: true
    port: 0 # плагин сам подберёт порт
    dimension: 'overworld'
    game-mode: 'creative'
    java:
      xmx: '150 MiB' # при необходимости увеличьте лимит
    forwarding: !<auto> {}
```

## Paper

Это обычный Paper с урезанными настройками. Версия влияет прежде всего на расход памяти и форматы схематик.

```yml
embedded-servers:
  'название-сервера': !<paper>
    enabled: true
    version: 'ВЕРСИЯ' # 1.8.8, 1.12.2, 1.16.5 или latest
    port: 0 # плагин сам подберёт порт
    schematic: 'default-auth'
    time: 12040
    weather: true
    java:
      xmx: '1 GiB' # при необходимости увеличьте лимит
    forwarding: !<auto> {}
```

## Своя схематика

В BaronessAuth уже есть схематики `default-auth` и `default-lobby`. Чтобы использовать одну из них, укажите её название в `schematic`.

Для своей схематики:

1. Зайдите на сервер с WorldEdit и правами администратора.
2. Выделите нужную область.
3. Встаньте в точку появления игрока и выполните `//copy`.
4. Поверните выделение так, чтобы игрок смотрел на север. Для проверки используйте `//rotate` и `//paste`.
5. Сохраните файл командой `//schem save (формат)`.
6. Переместите файл в `plugins/BaronessAuth/`, например `plugins/BaronessAuth/my-schematic.schem`.
7. Укажите имя файла в `schematic`, например `my-schematic.schem`.
8. Перезапустите прокси и проверьте место появления игрока.

:::caution
Разные типы встроенных серверов поддерживают разные форматы и наборы блоков. Перед сохранением сверьтесь с таблицей выше и комментариями в конфиге.

Настоятельно рекомендуется вручную проверить вход с каждой из нужных вам версий, чтобы убедиться, что этот сервер корректно отображает вашу схематику.
:::

## Forwarding

Forwarding определяет, как прокси передаёт данные игрока встроенному серверу. Если стандартный режим работает, менять его не нужно.

### Auto

Чаще всего этот режим оптимален, так как он старается автоматически определить, какой forwarding вы используете.

```yml
forwarding: !<auto> { }
```

### Без forwarding

```yml
forwarding: !<none> { }
```

### BungeeCord

```yml
forwarding: !<legacy> { }
```

### BungeeGuard

```yml
forwarding: !<bungee-guard>
  tokens:
    - 'токен BungeeGuard'
```

### Velocity Modern

```yml
forwarding: !<velocity-modern>
  secret: 'секрет Velocity Modern'
```

## Java

Серверам `nanolimbo` и `paper` нужна Java. BaronessAuth поддерживает разные её источники способа.

### Автоматическая Java

Рекомендуемый вариант. BaronessAuth скачает подходящую Java в свою папку; потребуется около 80 МБ на диске.

```yml
java:
  provider: !<automatic> { }
```

### Java текущего процесса

Используется JVM, на которой работает прокси. Она должна быть совместима с выбранным сервером.

Этот режим также включается автоматически, если `automatic` не поддерживает вашу ОС или архитектуру.

```yml
java:
  provider: !<current> { }
```

### Собственный исполняемый файл

Укажите полный путь к нужной Java:

```yml
java:
  provider: !<custom>
    path: '/home/admin/jdk-21/bin/java'
```

## Флаги JVM

По умолчанию BaronessAuth сам выбирает флаги. Если задать `override-flags`, стандартные флаги использоваться не будут.

:::caution
Меняйте флаги только при необходимости. Для Paper не забудьте принять EULA.

Те, что используются BaronessAuth по умолчанию, почти наверняка лучший вариант.
:::

```yml
java:
  override-flags:
    - '-Xms128M'
    - '-XX:+UseG1GC'
    - '-XX:+UseStringDeduplication'
    - '-Dcom.mojang.eula.agree=true'
    - '-DPaper.IgnoreJavaVersion=true'
```
