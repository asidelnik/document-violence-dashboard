import { IEventsFilters } from '../types/IEventsFilters';
import { IVideosFilters } from '../types/IVideosFilters';

export function getURLSearchParams(params: IVideosFilters | IEventsFilters) {
  const urlParams = new URLSearchParams();

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  for (const [key, value] of Object.entries(filteredParams)) {
    urlParams.append(key, String(value));
  }
  return urlParams.toString();
}

export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function dateToString(dateStr: Date): string {
  if (!isValidDateString(dateStr)) return '';
  const date = new Date(dateStr);
  return (
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' - ' +
    date.toLocaleTimeString('en-US')
  );
}

export function dateToStringShortMonthDateYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function isValidDateString(dateStr: Date): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

// export function tryParseIntOrUndefined(str: string): number | undefined {
//   const value = parseInt(str, 10);
//   return isNaN(value) ? undefined : value;
// }

// export function dateToStringDDMMYYYY(date: Date): string {
//   return date.toLocaleDateString('en-GB');
// }
