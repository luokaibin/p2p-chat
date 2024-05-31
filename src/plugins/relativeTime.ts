import dayjs from 'dayjs';
export const relativeTime = (timestamp?: number) => {
  const now = dayjs(timestamp)
  if (dayjs().isAfter(dayjs().startOf('day'))) return now.format('HH:mm');
  if (dayjs().isAfter(dayjs().startOf('week'))) return now.format('ddd');
  if (dayjs().isAfter(dayjs().startOf('year'))) return now.format('MM/DD');
  return now.format('YY/MM/DD')
}