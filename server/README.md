# Financial Tracker App

- APP_PORT=Порт на котором поднимется приложение

- POSTGRES_HOST=IP БД
- POSTGRES_PORT=Порт БД
- POSTGRES_USERNAME=Имя пользователя для БД
- POSTGRES_PASSWORD=Пароль пользователя для БД
- POSTGRES_DATABASE=Имя БД
- POSTGRES_DATA=Место хранения данных
- MIGRATION_DATABASE=Название таблицы для хранения записей миграций

- ACCESS_TOKEN_SECRET=Секрет access токена
- REFRESH_TOKEN_SECRET=Секрет refresh токена

- ACCESS_TOKEN_EXPIRE=Какое время access token будет валидным
- REFRESH_TOKEN_EXPIRE=Какое время refresh token будет валидным

#Prisma connection setup

- DATABASE_URL=Настройка для подключения к БД для PRISMA
  Пример: postgresql://username:password@postgres_host:postgres_port/db_name?schema=public
