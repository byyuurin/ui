import { defineLocale } from '../utils/locale'

export default defineLocale({
  name: '繁體中文',
  code: 'zh-TW',
  messages: {
    alert: {
      close: '關閉',
    },
    calendar: {
      prevYear: '去年',
      nextYear: '明年',
      prevMonth: '上個月',
      nextMonth: '下個月',
    },
    carousel: {
      dots: '選擇要顯示的投影片',
      prev: '上一頁',
      next: '下一頁',
      goto: '跳轉到第 {page} 頁',
    },
    fileUpload: {
      removeFile: '移除 {filename}',
    },
    inputNumber: {
      increment: '增加',
      decrement: '減少',
    },
    modal: {
      close: '關閉',
    },
    select: {
      create: '建立「{label}」',
      noData: '沒有資料',
      noMatch: '沒有相符的資料',
      search: '搜尋…',
    },
    table: {
      noData: '沒有資料',
    },
    toast: {
      close: '關閉',
    },
  },
})
