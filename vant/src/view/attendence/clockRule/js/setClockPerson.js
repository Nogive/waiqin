const personArr = [
  {
    id: "001",
    name: "maimang",
    children: [
      {
        id: "002",
        name: "Tom",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "003",
        name: "Jerry",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "006",
        name: "业务部",
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
      },
      {
        id: "010",
        name: "test",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      }
    ]
  }
];

export default {
  name: "attendence",
  data() {
    return {
      allPerson: null, //获取的全部员工数据
      persons: [],
      total: 5,
      result: [], //勾选人员结果数组
      headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
    };
  },
  created() {
    this.allPerson = personArr;
    this.persons = personArr;
  },
  watch: {
    $route() {
      if (this.$route.query.id == undefined) {
        this.persons = this.allPerson;
      } else {
        let id = this.$route.query.id;
        this.persons = getCurrentPart(id, this.allPerson);
      }
    }
  },
  methods: {
    submit() {
      console.log(this.result);
    },
    enterPart(item, ev) {
      if (ev.srcElement.nodeName != "I" && item.children != undefined) {
        this.$router.push({
          path: "/setClockPerson",
          query: { id: item.id }
        });
      }
    },
    deleteThisDepart(item) {
      let idx = this.result.indexOf(item);
      this.result.splice(idx, 1);
    }
  }
};
function getCurrentPart(id, items) {
  let result;
  for (var i in items) {
    let item = items[i];
    if (item.id == id) {
      result = item.children;
      break;
    } else if (item.children) {
      result = getCurrentPart(id, item.children);
    }
  }
  return result;
}
