import router from "../../router";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapGetters(["count"])
  },
  data() {
    return {
      active: 1
    };
  },
  methods: {
    ...mapActions(["increment"]),
    login() {
      console.log(1);
      router.push("/login");
    }
  }
};
