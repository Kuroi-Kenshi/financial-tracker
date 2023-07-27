
# Financial Tracker app

Приложение по трекингу личных финансов.

Умеет сохранять и показывать: 
- расходы по месяцам, дням и категориям
- доходы по месяцам и категориям
- долги 
- финансовые цели 
- бюджет по категориям расходов

![Покрытие тестами на текущий момент :](./client/coverage/coverage.svg)

## Installation

Frontend:

```bash
  cd client
  npm install
  npm run dev
```

Backend:

Dependencies: `Docker & Docker Compose`

```bash
  cd server
  yarn
  npm run start:dev
```
    
## Demo

[fin-tracker.aeronova.space](https://fin-tracker.aeronova.space/)


## Environment Variables


`API_KEY`

`ANOTHER_API_KEY`

`APP_PORT = Порт на котором поднимется приложение`

`POSTGRES_HOST - IP БД`

`POSTGRES_PORT - Порт БД`

`POSTGRES_USERNAME - Имя пользователя для БД`

`POSTGRES_PASSWORD - Пароль пользователя для БД`

`POSTGRES_DATABASE - Имя БД`

`POSTGRES_DATA - Место хранения данных`

`MIGRATION_DATABASE - Название таблицы для хранения записей миграций`

`ACCESS_TOKEN_SECRET - Секрет access токена`

`REFRESH_TOKEN_SECRET - Секрет refresh токена`

`ACCESS_TOKEN_EXPIRE - Какое время access token будет валидным`

`REFRESH_TOKEN_EXPIRE - Какое время refresh token будет валидным`

`DATABASE_URL - Настройка для подключения к БД для PRISMA Пример: postgresql://username:password@postgres_host:postgres_port/db_name?schema=public`
