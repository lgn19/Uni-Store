import { ref } from "vue";
import debounce from "@/utill/debounce";

export function useScroll(debounceDelay = 200) {
  const scrollTopCurrent = ref(0);

  // 滚动事件处理函数
  const setScrollTopCurrent = debounce((e: { scrollTop: number }) => {
    scrollTopCurrent.value = e.scrollTop;
    // console.log("当前滚动位置:", e.scrollTop);
  }, debounceDelay);

  return {
    scrollTopCurrent,
    setScrollTopCurrent, // 如果需要外部使用，可以返回
  };
}

// 使用方法
// import { useScroll } from "@/utill/handelScroll";
// const { scrollTopCurrent, setScrollTopCurrent } = useScroll(200);
// onPageScroll((e) => {
//   setScrollTopCurrent(e);
// });
