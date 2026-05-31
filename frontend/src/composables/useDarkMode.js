import { ref, watchEffect } from 'vue'

const isDark = ref(localStorage.getItem('darkMode') === 'true')

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
})

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }
  return { isDark, toggle }
}
