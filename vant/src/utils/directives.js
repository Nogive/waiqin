/**
 * ##自定义指令
 */
//focus
const focus = {
  inserted: function(el, binding) {
    el.focus();
    if (binding.value) {
      //el.focus();
    }
  }
};

export default {
  focus
};
