import router from "../../router";
export default {
  name: "home",
  data() {
    return {
      active: 1
    };
  },
  methods: {
    login() {
      console.log(1);
      router.push("/login");
    }
  }
};
