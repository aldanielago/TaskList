export function generateFormatDate(dateString) {
  const dateParts = dateString.split('-');
  const [year, month, day] = dateParts;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(year, month, day, today)) {
    return 'today';
  } else if (isSameDay(year, month, day, yesterday)) {
    return 'yesterday';
  } else {
    const date = new Date(year, month - 1, day);
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      if (daysDiff >= -7) {
        return `${-daysDiff} days ago`;
      } else if (daysDiff >= -30) {
        const weeksDiff = Math.floor(-daysDiff / 7);
        return `${weeksDiff} weeks ago`;
      } else if (date.getMonth() === today.getMonth() - 1) {
        return 'last month';
      } else {
        return date.toLocaleDateString();
      }
    } else {
      if (daysDiff === 0) {
        return 'tomorrow';
      } else if (daysDiff <= 7) {
        return `in ${daysDiff} days`;
      } else if (daysDiff <= 30) {
        const weeksDiff = Math.floor(daysDiff / 7);
        return `in ${weeksDiff} weeks`;
      } else if (date.getMonth() === today.getMonth() + 1) {
        return 'next month';
      } else {
        return date.toLocaleDateString();
      }
    }
  }
}

function isSameDay(year, month, day, today) {
  return (
    parseInt(year, 10) === today.getFullYear() &&
    parseInt(month, 10) === today.getMonth() + 1 &&
    parseInt(day, 10) === today.getDate()
  );
}
