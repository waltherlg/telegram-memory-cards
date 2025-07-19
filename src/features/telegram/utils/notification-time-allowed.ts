export function isNotificationAllowed(
  userTimeZone: number,
  sleepStart: number,
  sleepStop: number,
): boolean {
  const currentHour = getCurrentHourByTimeZone(userTimeZone);

  if (sleepStart === sleepStop) {
    // если чел спит круглые сутки
    return false;
  }

  if (sleepStart < sleepStop) {
    // если не пересекает полночь, например с 3 до 8

    // если сейчас 2 ночи, то это меньше 3, можно отправлять.
    // если сейчас 9 утра, это больше 3, проверяем следующее - 9 больше 8 можно отправлять
    // если сейчас 4 утра, это больше 3, проверяем следующее - 4 меньше 8, отправлять нельзя
    return currentHour < sleepStart || currentHour >= sleepStop;
  } else {
    // если время сна пересекает полночь, например с 21 до 8

    // если сейчас 20, это больше 8 -ок , но проверяем дальше 20 меньше 21 - отправляем
    // если сейчас 23 это больше 8 - ок , но проверяем дальше 23 это больше 21 - отправлять нельзя
    // если сейчас 5 это меньше 8 - отправлять нельзя
    return currentHour >= sleepStop && currentHour < sleepStart;
  }
}

function getCurrentHourByTimeZone(timeZone: number): number {
  const utcHour = new Date().getUTCHours();
  return (utcHour + timeZone + 24) % 24;
}
