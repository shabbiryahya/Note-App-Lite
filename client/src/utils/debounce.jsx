let timer;

const debounce = (callback, delay) => {
if(timer)  clearTimeout(timer);
  timer = setTimeout(callback, delay);
};
  export default debounce;
  