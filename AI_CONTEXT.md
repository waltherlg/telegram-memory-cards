# AI Context: telegram-memory-cards

## Overview
- Backend service built with NestJS (TypeScript) for "memory cards" with Telegram bot integration.
- Main runtime style: monolith with modular feature boundaries.
- Persistence: MongoDB via Mongoose.
- Orchestration style: CQRS command handlers via `@nestjs/cqrs` + `CommandBus`.

## High-Level Architecture
- Entry point: `src/main.ts` bootstraps `AppModule`, loads validated config, applies global setup (CORS, cookies, validation pipes, Swagger).
- Root composition: `src/app.module.ts` imports feature and core modules.
- Shared core module (`src/core/core.module.ts`) is global and exports:
  - `CqrsModule`
  - `CoreConfig` (validated env config)
  - `AuthModule`

Request/command flow is typically:
1. Controller or Telegram update handler receives input.
2. Input validated by DTO + global `ValidationPipe`.
3. Handler sends command through `CommandBus`.
4. Command handler ("use case") coordinates repositories and domain model methods.
5. Result is either domain/view DTO or `ActionResultEnum`.
6. Result is translated to HTTP exceptions or Telegram messages by dedicated handlers.

## Module Map

### Core (`src/core`)
- `config/core.config.ts`: env config with class-validator checks (`PORT`, `MONGO_URL`, `NODE_ENV`, `ADMIN_CREDENTIALS`).
- `database/database.module.ts`: async Mongo connection, db name `memory-cards`.
- `errors/handlers/action-result.handler.ts`: central enum + HTTP mapping function.
- `telegram/telegram.adapter.ts`: wrapper around Telegraf send operations.
- `schceduler/*`: cron scheduler; currently triggers card sending every 2 hours.

### Auth (`src/auth`)
- Global basic-auth guard for super-admin endpoints.
- Credential source: `ADMIN_CREDENTIALS` env var in `login:password` format.

### Users (`src/features/users`)
- API: public hello + SA create-user endpoint.
- Application: SA create user, update timezone.
- Infrastructure: Mongoose user repository + schema.
- Domain: DTOs/interfaces.

### Cards (`src/features/cards`)
- API: SA create-card endpoint (+ basic hello endpoint).
- Application use cases:
  - create card
  - get card from list
  - renew randomized list
  - telegram delete by title
  - set reminder interval
  - set current category
- Infrastructure:
  - `CardsRepository` for card CRUD/randomization.
  - `CardListRepository` for per-user shuffled queue state.
- Domain model includes `Card` and `CardList` mongoose methods.

### Telegram (`src/features/telegram`)
- Update handler (`@Update`) is the primary command interface for end users.
- Commands handled: `/register`, `/settimezone`, `/new`, `/read`, `/mixcards`, `/setinterval`, `/setcategory`, `/delete`, `/turnon`, `/turnoff`, etc.
- Uses `TelegramAuthGuard` to map Telegram ID to internal user and attach `ctx.state.userId`.
- i18n: RU/EN message catalog + language selector.
- Contains use case for scheduled broadcast to all eligible Telegram users.

## Main Design Patterns
- Modular monolith (Nest modules per feature).
- CQRS command pattern:
  - command classes + `@CommandHandler`
  - command dispatch through `CommandBus` from controllers/handlers and from other use cases.
- Layered/clean-ish feature structure:
  - `api` -> `application/useCases` -> `infrastructure` -> `domain`
- Repository pattern around Mongoose models.
- Rich document methods on Mongoose schemas for aggregate-like operations (`addCardToList`, `setCurrentCategory`, etc.).
- Result-code pattern via `ActionResultEnum` for cross-interface error mapping (HTTP + Telegram).

## Conventions Observed
- Folder convention per feature: `api`, `application`, `domain`, `infrastructure`, `config`.
- Naming:
  - Use cases in `*.use-case.ts`
  - Command classes + handler classes in same file
  - provider arrays (`CardUseCases`, `TelegramUseCases`, etc.)
- DTO validation via `class-validator`; global `ValidationPipe({ whitelist: true, transform: true })`.
- Config validation via class-validator on injectable config classes.
- Path constants stored in `*.paths.ts` for controller routes.
- Lint/format baseline:
  - Prettier single quotes + trailing commas
  - ESLint rules relaxed for explicit return types and `any`
- TypeScript strictness is relaxed (`strictNullChecks: false`, `noImplicitAny: false`).

## Important Behavioral Rules
- Auto-send logic checks:
  - User has Telegram ID + timezone + notifications enabled.
  - Local-hour window allows notifications (`USER_CONSTANTS.SLEEP_TIME`).
  - Optional minimum per-user reminder interval from `CardList`.
- Card delivery comes from per-user shuffled queue (`cardListToSend`), regenerated when empty.
- Category filtering is implemented via `currentCategory` in card-list state.

## Known Risks / Technical Debt (useful for future AI tasks)
- Several typos/inconsistencies in names (`schceduler`, `servise`, `SwithNotificationInputDto`, `BasecAuthorization`, `minRemaindInterval`).
- One incomplete use case: `DeleteCardUseCase.execute` is empty.
- Mixed return styles (`ActionResultEnum`, DTOs, `any`, `void`) reduce type safety.
- Some commands/use cases do not return explicit success enum consistently.
- Console logs and some text appear with encoding artifacts in terminal output.
- Environment sample/local files currently contain real-looking secrets; treat as sensitive and rotate if needed.

## Environment and Runtime Notes
- Node >= 20, pnpm >= 9.
- Uses env file precedence from `src/config.ts`:
  1. `ENV_FILE_PATH`
  2. `.<NODE_ENV>.local.env`
  3. `.<NODE_ENV>.env`
  4. `.production.env`
- Key required env vars include:
  - `PORT`
  - `MONGO_URL`
  - `NODE_ENV`
  - `ADMIN_CREDENTIALS`
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_BOT_NAME`

## Quick Orientation for Future AI Work
- Start from `src/app.module.ts` and feature `*.module.ts` files to see wiring.
- For any behavior change, locate corresponding command handler in `application/useCases`.
- For persistence changes, update schema + repository together.
- For Telegram UX changes, edit:
  - command handling in `telegram.update.handler.ts`
  - localized messages in `config/i18n/telegram.messages.ts`
- For HTTP SA endpoints, check guards + `HandleActionResult` mapping.
