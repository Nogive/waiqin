import router from "@/router";
const personArr = [
  {
    id: "001",
    name: "张山",
    headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: "003",
    name: "SKY",
    headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: "002",
    name: "业务部",
    children: [
      {
        id: "004",
        name: "Tom",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "005",
        name: "Jerry",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "006",
        name: "设计部",
        children: [
          {
            id: "007",
            name: "小明",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          },
          {
            id: "008",
            name: "小话",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          },
          {
            id: "009",
            name: "小王",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          }
        ]
      }
    ]
  }
];

export default {
  name: "attendence",
  data() {
    return {
      persons: personArr,
      total: 5,
      result: [], //勾选人员结果数组
      headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    goBack() {
      router.push("/writeRule");
    },
    testValue() {
      console.log(this.result);
    },
    enterPart(item, ev) {
      if (ev.srcElement.nodeName != "I" && item.children != undefined) {
        this.persons = item.children;
      }
    },
    deleteThisDepart(item) {
      let idx = this.result.indexOf(item);
      this.result.splice(idx, 1);
    }
  }
};
