import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    const distance = formatDistance(date, new Date(), { addSuffix: true });

    // For dates more than 7 days old, show the full date
    const isOlderThanWeek =
      Date.now() - date.getTime() > 7 * 24 * 60 * 60 * 1000;

    if (isOlderThanWeek) {
      return format(date, 'MMM d, yyyy');
    }

    return distance;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}
