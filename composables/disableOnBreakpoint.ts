import { useBreakpointTailwindCSS } from "vue-composable";

export const useDisableOnBreakpoint = () => {
const { current } = useBreakpointTailwindCSS()

const isDisabled = computed(() => {
  return ["md", "sm", undefined].includes(current.value)
})

return { isDisabled }
}