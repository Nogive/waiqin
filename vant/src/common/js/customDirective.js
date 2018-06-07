import Vue from "vue";
Vue.directive("focus", {
  update: function(el, binding) {
    if (binding.value) {
      el.focus();
    }
  }
});
