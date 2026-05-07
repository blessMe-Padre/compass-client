# Как работает капча

В проекте используется Google reCAPTCHA v2 с чекбоксом. Капча нужна на странице регистрации `/register`: пользователь сначала подтверждает, что он не робот, затем приложение отправляет токен капчи на серверную проверку. Регистрация выполняется только после успешной проверки.

## Где подключается

Скрипт Google reCAPTCHA подключается глобально в `app/layout.js` через `next/script`:

```jsx
<Script
  src="https://www.google.com/recaptcha/api.js"
  strategy="lazyOnload"
  async
  defer
/>
```

После загрузки скрипта в браузере появляется глобальный объект `grecaptcha`.

## Где отображается

Виджет капчи находится на странице `app/(pages)/(auth)/register/page.jsx` в форме регистрации:

```jsx
<div
  className="g-recaptcha"
  data-sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
></div>
```

Ключ сайта берется из переменной окружения `NEXT_PUBLIC_CAPTCHA_SITE_KEY`. Этот ключ используется только на клиенте и нужен для отображения виджета.

## Клиентский сценарий

Когда пользователь нажимает кнопку регистрации, обработчик формы:

1. Показывает уведомление `Пройдите капчу`.
2. Получает токен через `window.grecaptcha?.getResponse()`.
3. Если токена нет, останавливает отправку формы.
4. Если токен есть, отправляет его POST-запросом на `/api/captcha`.
5. После успешной проверки вызывает `registerUserService(payload)`.
6. Если регистрация или запрос завершается ошибкой, сбрасывает капчу через `window.grecaptcha?.reset()`.

Упрощенный поток:

```js
const captureResponse = window.grecaptcha?.getResponse();

if (!captureResponse) {
  setIsSending(false);
  return;
}

const res = await fetch('/api/captcha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ captureResponse }),
});

const result = await res.json();

if (!result.ok) {
  setIsSending(false);
  return;
}

await registerUserService(payload);
```

## Серверная проверка

Проверка выполняется в `app/api/captcha/route.js`.

API-роут принимает JSON:

```json
{
  "captureResponse": "token-from-google-recaptcha"
}
```

Если токен не передан, роут возвращает ошибку `400`:

```json
{
  "ok": false,
  "message": "Токен капчи не передан"
}
```

Если токен есть, сервер отправляет запрос в Google:

```txt
POST https://www.google.com/recaptcha/api/siteverify
Content-Type: application/x-www-form-urlencoded
```

В теле запроса передаются:

```txt
secret=<NEXT_PUBLIC_CAPTCHA_SECRET_KEY>
response=<captureResponse>
```

Секретный ключ берется из переменной окружения `NEXT_PUBLIC_CAPTCHA_SECRET_KEY`.

## Ответы API

При успешной проверке `/api/captcha` возвращает:

```json
{
  "ok": true,
  "message": "Капча пройдена"
}
```

При неуспешной проверке возвращает:

```json
{
  "ok": false,
  "message": "Неверная капча",
  "errors": ["error-code-from-google"]
}
```

При внутренней ошибке возвращает:

```json
{
  "ok": false,
  "message": "Произошла ошибка"
}
```

## Полный поток регистрации

1. Пользователь открывает страницу регистрации.
2. `app/layout.js` загружает скрипт reCAPTCHA.
3. На форме регистрации отображается виджет reCAPTCHA.
4. Пользователь вводит email, пароль и проходит капчу.
5. Код получает токен через `window.grecaptcha?.getResponse()`.
6. Клиент отправляет токен на `/api/captcha`.
7. Сервер проверяет токен через Google `siteverify`.
8. Если Google подтверждает токен, клиент отправляет email и пароль в API регистрации.
9. При успешной регистрации приложение переводит пользователя в `/dashboard`.

## Важные переменные окружения

```env
NEXT_PUBLIC_CAPTCHA_SITE_KEY=site-key
NEXT_PUBLIC_CAPTCHA_SECRET_KEY=secret-key
```

`NEXT_PUBLIC_CAPTCHA_SITE_KEY` используется в браузере для отображения виджета. `NEXT_PUBLIC_CAPTCHA_SECRET_KEY` используется серверным API-роутом для проверки токена через Google.
