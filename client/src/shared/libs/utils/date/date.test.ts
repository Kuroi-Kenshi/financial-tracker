import { getDayNumber, getMonthName } from './date';

describe('date utils tests', () => {
  const testDate = new Date('2023-07-12T19:00:09.731Z');
  test('getMonthName', () => {
    const monthName = getMonthName(testDate);
    expect(monthName).toBe('July');
  });
  test('getDayNumber', () => {
    const dayNumber = getDayNumber(testDate);
    expect(dayNumber).toBe('12');
  });
});
