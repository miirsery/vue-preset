import { computed, reactive, unref } from 'vue'

function calculateSizes(screen: number) {
  if (screen >= 1920) return 'lg'
  else if (screen >= 1366) return 'md'
  else if (screen >= 800) return 'sm'
  else if (screen >= 320) return 'xs'

  return ''
}

const screen = reactive({
  width: window.innerWidth,
  size: calculateSizes(window.innerWidth),
})

const isMobile = computed(() => screen.size === 'xs')

const isTablet = computed(() => screen.size === 'sm')

const isLaptop = computed(() => screen.size === 'md')

const isDesktop = computed(() => screen.size === 'lg')

const isMobileOrTablet = computed(() => unref(isMobile) || unref(isTablet))

window.addEventListener('resize', () => {
  screen.width = window.innerWidth

  screen.size = calculateSizes(window.innerWidth)
})

export const useScreen = () => {
  return {
    screen,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isMobileOrTablet,
  }
}
