import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';

export const TelegramMessages = {
  ru: {
    help: `📋 *Доступные команды:*

📝 /register — зарегистрирует тебя в системе.

🌍 /settimezone — установить часовой пояс.  
Без этого я не буду слать тебе карточки сам, чтобы не разбудить тебя ночью.  
Например, "/settimezone +3" установит часовой пояс МСК.

🆕 /new — создаст новую карточку.  
Формат: \`/new # категория # заголовок карточки # текст карточки\`

📖 /read — выдаст тебе случайную карточку из твоей колоды.

🔀 /mixcards — перетасует карточки, если хочешь всё начать заново.

❌ /delete — удалит ненужную карточку.  
Для этого после команды нужно написать её название.  
Формат: \`/delete нужная карточка\`
    `,

    setTimezone: {
      notText:
        '⚠️ Это не текстовое сообщение. Пожалуйста, введи команду в виде текста.',
      missingArg: 'ℹ️ Укажи часовой пояс, например: /settimezone 6',
      invalid: (tz: string) =>
        `🤔 То есть ты живёшь в часовом поясе ${tz}? Очень смешно.`,
      success: (tz: number) => `✅ Часовой пояс успешно установлен на ${tz}`,
    },

    actionResult: {
      [ActionResultEnum.TelegramAlreadyRegistered]:
        '🔁 Вы уже зарегистрированы в системе!',
      [ActionResultEnum.NoCardsInList]:
        '📭 У вас нет карточек в списке. Может, стоит обновить? 🔄',
      [ActionResultEnum.CardNotFound]:
        '🔍 Странно... Я не смог найти нужную карточку.',
      [ActionResultEnum.AlreadyRegistered]:
        '🔁 Вы уже зарегистрированы в системе!',
      [ActionResultEnum.UserNotFound]:
        '🙈 Пользователь не найден. Странно, да?',
      [ActionResultEnum.SomeThingWrong]:
        '😕 Что-то пошло не так... Даже не знаю что именно.',
      [ActionResultEnum.NoCardsInCollection]:
        '📪 Похоже, у вас ещё нет ни одной карточки в коллекции.',
      [ActionResultEnum.NotOwner]:
        '⛔ Только владелец карточки может её удалить!',
    },
  },

  en: {
    help: `📋 *Available commands:*

📝 /register — register yourself in the system.

🌍 /settimezone — set your timezone.  
Without this, I won’t send you cards automatically — so I don’t wake you up at night.  
Example: "/settimezone +3" sets your timezone to MSK.

🆕 /new — create a new card.  
Format: \`/new # category # title # text\`

📖 /read — sends you a random card from your deck.

🔀 /mixcards — reshuffles your deck from scratch.

❌ /delete — deletes a card you no longer need.  
Just type its name after the command.  
Format: \`/delete card name\`
    `,

    setTimezone: {
      notText:
        '⚠️ This is not a text message. Please type the command as text.',
      missingArg: 'ℹ️ Please specify your timezone, e.g., /settimezone 6',
      invalid: (tz: string) => `🤔 You live in timezone ${tz}? Very funny.`,
      success: (tz: number) => `✅ Timezone successfully set to ${tz}`,
    },
    actionResult: {
      [ActionResultEnum.TelegramAlreadyRegistered]:
        '🔁 You are already registered in the system!',
      [ActionResultEnum.NoCardsInList]:
        '📭 You have no cards in the list. Maybe try refreshing? 🔄',
      [ActionResultEnum.CardNotFound]:
        '🔍 That’s strange... I couldn’t find the card you were looking for.',
      [ActionResultEnum.AlreadyRegistered]:
        '🔁 You are already registered in the system!',
      [ActionResultEnum.UserNotFound]: '🙈 User not found. Weird, huh?',
      [ActionResultEnum.SomeThingWrong]:
        '😕 Something went wrong... I have no idea what happened.',
      [ActionResultEnum.NoCardsInCollection]:
        '📪 Looks like you don’t have any cards in your collection yet.',
      [ActionResultEnum.NotOwner]: '⛔ Only the card’s owner can delete it!',
    },
  },
};
