# Internet Shop - Project README

## Описание

Этот проект представляет собой интернет-магазин, разработанный с использованием React для клиентской части и Node.js/Express для серверной части.  В качестве базы данных используется MySQL.

## Предварительные требования

Перед началом работы убедитесь, что у вас установлено следующее:

*   **OpenServer:**  Необходим для запуска сервера MySQL и PHPMyAdmin.
*   **Node.js:**  Необходим для запуска клиентской и серверной частей приложения.  Проверить установлен ли Node.js можно командой `node -v` в терминале.  Если Node.js не установлен, скачайте и установите его с [официального сайта Node.js](https://nodejs.org/).
*   **IDE (Integrated Development Environment):**  Рекомендуется использовать VS Code или любую другую удобную для вас IDE.

## Установка и настройка

1.  **Установка OpenServer:**

    *   Скачайте OpenServer с [официального сайта OpenServer](https://ospanel.io/index.php?r=site/download). (рекомендую установить версию 5.4.3 ибо в 6.0 надо все компоненты отдельно устанавливать)
    *   Установите OpenServer в желаемую директорию.
    *   Запустите OpenServer.

2.  **Импорт базы данных в OpenServer:**

    *   Запустите OpenServer.
    *   Откройте phpMyAdmin:  Кликните правой кнопкой мыши по значку OpenServer в трее и выберите "phpMyAdmin".

    *   **Создание базы данных:**  Для упрощения настройки рекомендуется создать базу данных с именем `Internet_store`. Это позволит избежать необходимости изменения конфигурации подключения к базе данных в проекте.
        *   В phpMyAdmin нажмите "New" (Новая) в левом меню.
        *   Введите имя `Internet_store` и выберите кодировку `utf8mb4_unicode_ci`.
        *   Нажмите "Create" (Создать).

    *   **Импорт базы данных через phpMyAdmin:**
        *   Выберите созданную базу данных `Internet_store` в левом меню.
        *   Перейдите на вкладку "Import" (Импорт).
        *   Нажмите кнопку "Choose File" (Выбрать файл) и выберите ваш SQL-файл с базой данных.
        *   Нажмите "Go" (Выполнить) внизу страницы.

    *   **Импорт базы данных через MySQL (альтернативный способ):**
        *   Откройте консоль OpenServer.
        *   Выполните команду:
            ```bash
            mysql -u root -p Internet_store < /путь/к/вашему/database.sql
            ```
            Замените `/путь/к/вашему/database.sql` на фактический путь к вашему SQL-файлу.  При запросе пароля, введите пароль пользователя root для вашей базы данных (по умолчанию пароль может быть пустой).

    *   **Изменение настроек подключения к базе данных (если необходимо):**  Если имя пользователя или пароль для доступа к базе данных в phpMyAdmin отличаются от стандартных (user: `root`, password: ``), необходимо изменить параметры подключения в файле `server.js`.
        *   Найдите файл `server.js` в папке `server` вашего проекта.
        *   Откройте `server.js` в вашей IDE.
        *   Найдите секцию с настройками подключения к базе данных (`dbConfig`).
        *   Измените значения `user` и `password` на соответствующие вашим настройкам phpMyAdmin.  Пример:

            ```javascript
            const dbConfig = {
                host: 'localhost',
                user: 'your_username', // Замените на ваше имя пользователя
                password: 'your_password', // Замените на ваш пароль
                database: 'Internet_store'
            };
            ```
        *   Сохраните изменения в файле `server.js`.

3.  **Размещение сайта в OpenServer:**

    *   Скопируйте папку с вашим сайтом (содержащую файлы `package.json`, `src`, `public` и т.д.) в папку `domains` в директории OpenServer (например, `C:\OpenServer\domains\internetshop`).

4.  **Установка зависимостей:**

    *   Откройте вашу IDE (VS Code и т.п.).
    *   Откройте папку с вашим проектом в IDE.
    *   Откройте терминал в IDE (обычно `View -> Terminal`).
    *   Убедитесь, что вы находитесь в корневой директории проекта (там, где находится файл `package.json`).
    *   Выполните команду:
        ```bash
        npm install
        ```
        Эта команда установит все необходимые зависимости, указанные в файле `package.json`.

5.  **Запуск проекта:**

    *   После успешной установки зависимостей выполните команду:
        ```bash
        npm run dev
        ```
        Эта команда запустит одновременно и клиентскую (React) и серверную (Node.js) части вашего приложения.

6.  **Проверка работы сайта:**

    *   Откройте браузер и перейдите по адресу, указанному в консоли после запуска проекта (обычно это `http://localhost:3000` для клиентской части и `http://localhost:5000` для серверной части).

## Дополнительная информация

*   Если у вас возникли проблемы с установкой или запуском, проверьте консоль на наличие ошибок и убедитесь, что все необходимые зависимости установлены.
*   В случае проблем с подключением к базе данных, проверьте правильность указанных учетных данных в файле `server.js`.

