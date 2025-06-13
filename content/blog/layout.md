---
title: Раскладка для биологов · Магомед Вагабов
description: "Альтернативная раскладка клавиатуры с полезными для биологов символами: правильные кавычки и тире, греческие буквы, подстрочные и надстрочные цифры, математические знаки и стрелочки."
date: 2025-05-17
taglist: 
draft: false
starred: false
notPost: true
tags:
  - layout
layout: layouts/biolayout.njk
permalink: /layout/
thumbnail: biolayout-thumbnail.png
---
Альтернативная раскладка клавиатуры с полезными для биологов символами: греческими буквами, подстрочными и надстрочными цифры, правильными кавычками и тире. Пока вы не зажали `Альт`, ведёт себя как обычная раскладка.

::: scrollable
:::: dummy {class="scrollable__in js-scrollable bordered"}
![biolayout-keyboard](biolayout-keyboard.png) {style="min-width: 800px;"}
::::

Чтобы набрать нижний символ, зажмите правый `Альт`, для набора верхнего зажмите `Шифт` `Альт`. Так, `Альт` `D` вернёт δ, `Шифт` `Альт` `D` — Δ.

В Раскладке для биологов есть

половина греческого алфавита: {.birka}

αβνμλσδεγπφψρτ{.garamond}

цифроиндексы: {.birka}

₁₂₃₄₅₆₇₈₉₀¹²³⁴⁵⁶⁷⁸⁹⁰˙{.garamond}

правильные тире и кавычки: {.birka}

— – «„“»‹“”‘’›{.garamond}

стрелочки, градусы, штрихи, математика: {.birka}

↑↓←→°′″ ≠≈÷×−±{.garamond}

всякая прикольная мелочь и дубли полезных символов: {.birka}

©®™₽§ ¹⁄₂ ∞ /[]@#{.garamond}

ударения и поддержка большинства европейских языков: {.birka}

´˚˜¸¨ˇæœøβ¡¿ їўґіє{.garamond}



Если вы не понимаете, чем штрих отличается от одинарной кавычки, где использовать какое тире и зачем я добавил в Раскладку · и ‹› — загляните в [Туториал по символам.](layout-symbols.njk)


<a id="download-link" href="/media/win-biolayout.zip" download>
  <button  class="sidenote">
    Скачать для Виндоус
  </button>
</a>

{%- js %}{% include "public/scripts/biolayout-select.js" %}{% endjs %}

<h2>
  Установка под
 <span class="os-option" data-os="windows">Виндоус,</span>
 <span class="os-option" data-os="mac">МакОС,</span>
 <span class="os-option" data-os="linux">Линукс</span></h2>

::: dummy {.os-content #windows}

1. Распакуйте архив
2. По очереди запустите файлы `setup.exe` внутри папок `rubiolay` и `enbiolay`
3. Зайдите в настройки клавиатуры (самый быстрый путь через More keyboard settings в меню выбора раскладки)
   ![](win-layout-spawn-fix-1.png)
   
4. Нажмите на `···` для русского языка, в «Add a keyboard» выберите Раскладку для биологов, потом удалите стандартную. Повторите для английского.
   ![](win-layout-spawn-fix-2.png)

5. Перезагрузитесь, если что-то не заработало.


:::

::: dummy {.os-content #linux}

1. Скачайте директорию с раскладкой.
```
   git clone -b linux --single-branch https://github.com/magvag/biolayout.git
   cd biolayout/linux
```

2. Запустите 4 скрипта. Вместо `rubiolay` и `enbiolay` можете написать то название, под которым хотите видеть раскладку.
```
   chmod --recursive +x ./
   
   sudo ./rubiolay/install-system.sh -l rubiolay
   bash ./rubiolay/scripts/install-xcompose.sh rubiolay
   
   sudo ./enbiolay/install-system.sh -l enbiolay
   bash ./enbiolay/scripts/install-xcompose.sh enbiolay
```

3. Если система не может найти python, залинкуйте его с python3.
```
   sudo ln -s /usr/bin/python3 /usr/bin/python
```

4. На всякий случай перезагрузитесь — после этого раскладка должна появиться в настройках.
```
   sudo reboot
```
:::

::: dummy {.os-content #mac}

**Важно!**{style="color: #f73e49;"} В русской Раскладке для биологов точка и запятая находятся справа от `Ю`, а не на `6` и `7` — если вы очень привыкли к маковской раскладке, дважды подумайте перед скачиванием. 

любопытной варваре... {.transparent style="display:none;"}
1. Распакуйте архив
2. Зайдите в скрытую папку `~/Library`. Короткий путь: открыть Finder и в верхнем меню Go выбрать пункт Library, если он у вас будет.
3. Положите .bundle в `~/Library/Keyboard Layouts`
4. Откройте настройки клавиатуры. Короткий путь через меню выбора раскладки.
   ![](vJVIB.png)
   
5. В Text Input › Input sources нажмите на `Edit`
6. В появившемся меню нажмите на `+` в левом нижнем углу, чтобы добавить раскладку. `−`, соответственно, раскладки удаляет. 
   ![](13d97ffe-c36c-40c6-8714-5411b94be548.png)
   
7. Добавьте раскладки English – For biologists и Russian – For biologists и удалите стандартные.
   ![](mac911-keyboard-selector-letters-bordered-1353335155.png)
:::