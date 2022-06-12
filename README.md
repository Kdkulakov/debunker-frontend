# DebunkerClient
Проект создан с помощью Angular CLI и на Angular 13 

## Install DebunkerClient/Установить DebunkerClient
Запустите `npm install`. (Но прежде, установите `node.js` (рекомендую 16ую версии)

## Development DebunkerClient/Разворачивание DebunkerClient
Запустите приложение командой `ng serve`. Перейдите по `http://localhost:4200/`. 

## About DebunkerClient/О DebunkerClient
В приложении используется компоненты из `Angular material UI` и `Swiper`

По структуре проекта

`.app/components` - Содержит кастомные шаблоны-компоненты,которые потом используются в кастомных компонентах

CardComponent - шаблон блоков(картачка новости и карточка ресурсы)</br>
CommentComponent - шаблон блока с комментариями</br>
LoaderComponent- шаблон прогрессбара</br>
GradeComponent - шаблон блока с Оценками Нейросети и Решением</br>
DecisionComponent - шаблон модального окна,которое вызывается из блока оценок нейросети</br>

`.app/shared/services` -  There are custom services. Содержит кастомные сервисы

`.assets` - styles, pics and e.t. Стили, картинки и т.д.
