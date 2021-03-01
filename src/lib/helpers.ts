/**
 * Функция для конвертирование в минимальных единицах
 * С учетом проблем плавающей точки
 * 10.20 - 1020
 */
export const toBynPenny = (value: number) => {
  return parseFloat((value * 100).toFixed(2))
}
