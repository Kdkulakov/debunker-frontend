# DebunkerClient
Проект создан с помощью Angular CLI и на Angular 13 

## Install DebunkerClient/Установить DebunkerClient
Запустите `npm install`. (Но прежде, установите `node.js` (рекомендую 16ую версии)

## Development DebunkerClient/Разворачивание DebunkerClient
Запустите приложение командой `ng serve`. Перейдите по `http://localhost:4200/`. 

## About DebunkerClient/О DebunkerClient
В приложении используется компоненты из `Angular material UI` и `Swiper`

Пару слов по структуре проекта
`.app` - Содержит основное приложение (кастомные компоненты(страницы-page).Страницы (analysis-page, article-dashboard, login-page, register-page, source-page и модальные окна и т.д.)
`.assets` - Стили, картинки и т.д.
`.proxy,environments` - Конфигарационные файлы

`.app/components` - Содержит кастомные шаблоны-компоненты,которые потом используются в кастомных компонентах
CardComponent - шаблон блоков(картачка новости и карточка ресурсы)</br>
CommentComponent - шаблон блока с комментариями</br>
LoaderComponent- шаблон прогрессбара</br>
GradeComponent - шаблон блока с Оценками Нейросети и Решением</br>
DecisionComponent - шаблон модального окна,которое вызывается из блока оценок нейросети</br>

`.app/shared/services` -   Содержит кастомные сервисы (auth,token - для авторизауции, debunker- для обращения на вервер, util- вспомогательный )


