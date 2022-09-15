import {getMinutes, setTimeFormat} from "./index";

it ('Проверка функции перевода числа в строку формата HH:MM', () => {
  expect(typeof setTimeFormat(5225)).toBe('string')
  expect(setTimeFormat(5225)).toBe('87:05')
})


it ('Проверка функции получения количества минут', () => {
  expect(typeof getMinutes("5-00")).toBe('number')
  expect(getMinutes("5-00")).toBe(300)
})
