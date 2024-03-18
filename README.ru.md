# middle-frontend-chat

[English](README.md) | Русский

[![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/23da39d8-8e18-44dc-a28a-154e72be931f/deploy-status)](https://app.netlify.com/sites/creamlaflare-messenger/deploys)
[![Версия Node](https://img.shields.io/badge/node-%3E%3D12-brightgreen.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Версия Vite](https://img.shields.io/badge/Vite-2.5.0-brightgreen)](https://vitejs.dev/)
[![Версия Handlebars](https://img.shields.io/badge/Handlebars-4.7.7-brightgreen)](https://handlebarsjs.com/)
[![Версия SCSS](https://img.shields.io/badge/SCSS-1.35.1-brightgreen)](https://sass-lang.com/)

Для смены страниц необходимо в файле `src/index.js` на строке 24 в функции `navigate` поменять значение на определенную страницу из объекта `pages`.

Ccылка чтобы увидеть макеты страниц: [Figma](https://www.figma.com/file/NtGbsAjBjIqx331WIW2m5L/Chat_external_link-(Copy)-(Copy)?type=design&mode=design&t=cmgWGWCVjHQyTQxr-1)

Web Chat — это динамичное веб-приложение для обмена сообщениями, которое позволяет пользователям взаимодействовать друг с другом в реальном времени. Созданное с использованием Vite, Handlebars и SCSS, это приложение предлагает бесперебойный опыт обмена сообщениями с такими функциями, как авторизация, регистрация, функции мессенджера и обновления профилей.

Приложение задеплоено на Netlify. Функция непрерывного развертывания Netlify автоматизирует процесс развертывания, позволяя мгновенно обновлять приложение с каждым новым коммитом в репозиторий.

В текущей реализации, сервер Express используется исключительно для обслуживания статических веб-страниц.

Ознакомьтесь с живой версией здесь: [Web Chat](https://creamlaflare-messenger.netlify.app)

## Установка

Клонируйте репозиторий:

```bash
git clone https://yourrepositoryurl.com/middle-frontend-chat.git
cd middle-frontend-chat
```
Установите зависимости:
```bash
npm install
```
Для запуска сервера разработки:
```bash
npm run start
```
это запустит сервер разработки Vite на localhost:3000.

## Вклад
Ваш вклад приветствуется! Не стесняйтесь открывать pull request.

## Лицензия
Этот проект лицензирован по лицензии MIT - см. файл [LICENSE](LICENSE) для получения дополнительной информации.
