import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';

export const TelegramMessages = {
  ru: {
    start: `👋 Привет! Я бот приложения карточек-напоминалок.

📝 Ты можешь создавать карточки, и я буду время от времени показывать их тебе — либо автоматически, либо по твоему запросу.

⚙️ Но сначала тебе нужно зарегистрироваться — просто введи команду /register, чтобы я знал, какие карточки относятся именно к тебе.

ℹ️ Полный список доступных команд ты можешь получить с помощью /help.

⚠️ Важная особенность: приложение работает на бесплатном тарифе и засыпает через 15 минут бездействия (и я вместе с ним 💤).

🤔 Как проверить, сплю ли я? Просто напиши любое сообщение. Если я не отвечаю — значит, я сплю.

🔗 Я просыпаюсь каждый час, но чтобы разбудить меня самостоятельно, перейди по этой ссылке: ${'https://telegram-memory-cards.onrender.com'}
Я проснусь через несколько секунд! 😊.

🕰️ После того как ты укажешь свой часовой пояс,
я буду отправлять тебе напоминалки ПРИМЕРНО каждые 2 часа (можно настроить периодичность) — с 9 утра до 9 вечера. 😊`,

    help: `📋 *Доступные команды:*

📝 /register — зарегистрирует тебя в системе.

🌍 /settimezone — установить часовой пояс.  
Без этого я не буду слать тебе карточки сам, чтобы не разбудить тебя ночью.  
Например, "/settimezone +3" установит часовой пояс МСК.

🕰️ /setinterval - устанавливает интервал между напоминалками от 1 до 23 часов. 
По умолчанию 2 часа

/turnoff – 🔕 выключает автоматическую рассылку карточек.  
По умолчанию она включена.

/turnon – 🔔 включает автоматическую рассылку карточек (если она была отключена).

🆕 /new — создаст новую карточку.  
Формат: \`/new # категория # заголовок карточки # текст карточки\`

📖 /read — выдаст тебе случайную карточку из твоей колоды.

🔀 /mixcards — перетасует карточки, если хочешь всё начать заново.

❌ /delete — удалит ненужную карточку.  
Для этого после команды нужно написать её название.  
Формат: \`/delete нужная карточка\`
    `,

    notText:
      '⚠️ Это не текстовое сообщение. Пожалуйста, введи команду в виде текста.',

    register: {
      noBot: '⛔️ Сорян, ботам вход запрещён!',
      registered: (userName: string, id: string) =>
        `🎉 Поздравляю, ты зарегистрировался как *${userName}* с айдишкой \`${id}\`!`,
    },
    setTimezone: {
      notText:
        '⚠️ Это не текстовое сообщение. Пожалуйста, введи команду в виде текста.',
      missingArg: 'ℹ️ Укажи часовой пояс, например: /settimezone 6',
      invalid: (tz: string) =>
        `🤔 То есть ты живёшь в часовом поясе ${tz}? Очень смешно.`,
      success: (tz: number) => `✅ Часовой пояс успешно установлен на ${tz}`,
    },

    setinterval: {
      wrongFormat: '⚠️ интервал должен быть целым числом больше 0 и меньше 24',
      succsess: (hours) =>
        `✅ Интервал между напоминаниями теперь ${hours} час/часа/часов`,
    },

    new: {
      wrongFormat:
        '⚠️ Неверный формат.\nПравильно так:\n/new # категория # заголовок # текст',
      cardCreated: (cardTitle: string) =>
        `✅ Карточка «${cardTitle}» успешно создана!`,
      notCreated: '❌ Не удалось создать карточку. Попробуйте позже.',
    },

    mixcard: {
      mixed: '🔀 Ваши карточки перемешаны вновь!',
    },

    delete: {
      writeCardTitle: '⚠️ Нужно указать название карточки для удаления.',
      deleted: '🗑️ Карточка удалена!',
    },

    setCategory: {
      writeCategory: '⚠️ Нужно указать название категории',
      categorySet: (category: string) =>
        `вы выбрали категорию ${category}, 🔀 Ваши карточки перемешаны вновь!`,
    },

    turnOn: '🔔 Уведомления включены',

    turnOff: '🔕 Уведомления отключены',

    text: {
      return: (text: string) =>
        `🤖 Ты написал: "${text}", но мне незнакома эта команда.`,
      noText: '🤔 Ты отправил что-то странное...',
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
      [ActionResultEnum.CardAlreadyExist]:
        '⛔ Похоже карточка с таким заголовком уже существует!',
    },
  },

  en: {
    start: `👋 Hi! I'm the bot for the Memory Cards app.

📝 You can create cards, and I’ll show them to you from time to time — either automatically or when you request it.

⚙️ But first, you need to register — just type /register so I know which cards belong to you.

ℹ️ To see the full list of available commands, type /help.

⚠️ Important note: this app runs on a free hosting plan and goes to sleep after 15 minutes of inactivity (and I go to sleep too 💤).

🤔 How to check if I’m sleeping? Just send any message. If I don’t reply — I’m asleep.

🔗 I wake up every hour automatically, but you can wake me up manually by clicking this link: https://telegram-memory-cards.onrender.com
I’ll be awake in just a few seconds! 😊

🕰️ Once you set your time zone,
I’ll send you reminders APPROXIMATELY every 2 hours (you can set the interval) — from 9 AM to 9 PM. 😊`,

    help: `📋 *Available commands:*

📝 /register — register yourself in the system.

🌍 /settimezone — set your timezone.  
Without this, I won’t send you cards automatically — so I don’t wake you up at night.  
Example: "/settimezone +3" sets your timezone to MSK.

🕰️ /setinterval - sets the interval between reminders from 1 to 23 hours. 
Default is 2 hours

/turnoff – 🔕 disables the automatic card reminders.  
They are enabled by default.

/turnon – 🔔 enables automatic card reminders (if you had turned them off).

🆕 /new — create a new card.  
Format: \`/new # category # title # text\`

📖 /read — sends you a random card from your deck.

🔀 /mixcards — reshuffles your deck from scratch.

❌ /delete — deletes a card you no longer need.  
Just type its name after the command.  
Format: \`/delete card name\`
    `,

    notText: '⚠️ This is not a text message. Please type the command as text.',

    register: {
      noBot: '⛔️ Sorry, bots are not allowed!',
      registered: (userName: string, id: string) =>
        `🎉 Congrats! You are registered as *${userName}* with ID \`${id}\`!`,
    },

    setTimezone: {
      notText:
        '⚠️ This is not a text message. Please type the command as text.',
      missingArg: 'ℹ️ Please specify your timezone, e.g., /settimezone 6',
      invalid: (tz: string) => `🤔 You live in timezone ${tz}? Very funny.`,
      success: (tz: number) => `✅ Timezone successfully set to ${tz}`,
    },

    setinterval: {
      wrongFormat:
        '⚠️ interval must be an integer greater than 0 and less than 24',
      succsess: (hours) =>
        `✅ the interval between reminders is now ${hours} hours`,
    },

    new: {
      wrongFormat:
        '⚠️ Invalid format.\nCorrect usage:\n/new # category # title # text',
      cardCreated: (cardTitle: string) =>
        `✅ Card "${cardTitle}" created successfully!`,
      notCreated: '❌ Failed to create the card. Please try again later.',
    },

    mixcard: {
      mixed: '🔀 Your cards have been shuffled again!',
    },

    delete: {
      writeCardTitle: '⚠️ Please specify the card title to delete.',
      deleted: '🗑️ Card deleted!',
    },

    setCategory: {
      writeCategory: '⚠️ You need to specify a category name',
      categorySet: (category: string) =>
        `you selected the category ${category}, 🔀 your cards have been shuffled again!`,
    },

    turnOn: '🔔 Notifications turned on',

    turnOff: '🔕 Notifications turned off',

    text: {
      return: (text: string) =>
        `🤖 You wrote: "${text}", but I don't recognize that command.`,
      noText: '🤔 You sent something strange...',
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
      [ActionResultEnum.CardAlreadyExist]:
        '⛔ Looks like card with this title already exist',
    },
  },
};
