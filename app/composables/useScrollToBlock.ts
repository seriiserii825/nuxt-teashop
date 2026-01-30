import { onMounted, onUnmounted } from 'vue'

export default function useScrollToBlock() {
  let clickHandlers: Array<{ element: Element; handler: (e: Event) => void }> =
    []

  const initScrollListeners = () => {
    const dataScrollAll = document.querySelectorAll('[data-scroll]')

    dataScrollAll.forEach((dataScroll) => {
      const handler = (e: Event) => {
        e.preventDefault()
        const target = dataScroll.getAttribute('href')

        if (!target) {
          return
        }

        const block = document.querySelector(target)

        if (block) {
          const blockOffset =
            block.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: blockOffset - 160, // Изменил на минус, обычно нужен отступ сверху
            behavior: 'smooth',
          })
        }
      }

      dataScroll.addEventListener('click', handler)
      clickHandlers.push({ element: dataScroll, handler })
    })
  }

  const cleanupListeners = () => {
    clickHandlers.forEach(({ element, handler }) => {
      element.removeEventListener('click', handler)
    })
    clickHandlers = []
  }

  onMounted(() => {
    initScrollListeners()
  })

  onUnmounted(() => {
    cleanupListeners()
  })

  // Возвращаем функцию для ручного реинита (если элементы добавляются динамически)
  return {
    reinit: () => {
      cleanupListeners()
      initScrollListeners()
    },
  }
}
