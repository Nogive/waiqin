import router from "@/router";
import { mapGetters, mapActions } from "vuex";
import {
  checkCookie,
  showLoading,
  noData,
  codeError,
  netError
} from "@/common/js/commonFunc";
import { getRequestUrl } from "@/common/js/api";
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
  mounted() {
    if (!checkCookie("token")) {
      //router.push("/login");
    } else {
      //showLoading(this, true);
      console.log(getRequestUrl("login"));
    }
  },
  methods: {
    ...mapActions(["increment"]),
    logOut() {
      router.push("/login");
    }
  }
};
