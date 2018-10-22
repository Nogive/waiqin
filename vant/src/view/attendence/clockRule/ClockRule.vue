<template>
  <div class="rule-box">
    <van-nav-bar
      title="规则"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    >
      <van-icon name="add-o" slot="right" @click="createRule" />
    </van-nav-bar>
    <div class="rule-body">
      <van-row class="one-rule" v-for="(item,index) in rules" :key="index">
        <router-link :to="{name:'writeRule',params:{id:item.id}}">
          <van-col span="24" class="title">{{item.name}}</van-col>
          <van-col span="24" class="show-one-line fontstyle">日期：{{item.workday.weeks | transferWeek2Chinese}}</van-col>
          <van-col span="24" class="show-one-line fontstyle">时间：{{item.shift | calculateShift}}</van-col>
          <van-col span="24" class="show-one-line fontstyle">位置：{{item.position | calculatePosition}}</van-col>
        </router-link>
      </van-row>
    </div>
  </div>
</template>
<script>
const rule=[
  {
    id:1,
    name:'每日2次打卡',
    personnel:{
      departments:[
        {
          id:1,
          name:'开发部',
          subDepartment:[
            {
              id:3,
              name:'XX项目部',
              employees:[
                {
                  id:4,
                  name:'李四'
                },
                {
                  id:4,
                  name:'王五'
                }
              ]
            }
          ],
          employees:[
            {
              id:1-1,
              name:'张三'
            }
          ]
        }
      ],
      employees:[
        {
          id:2,
          name:'Rio'
        }
      ]
    },
    workday:{
      weeks:[1,2,3,4,5],
      festivalOff:true,
    },
    shift:[
      {
        id:1,
        beforeWorkTime:'09:00',
        afterWorkTime:'12:00'
      },
      {
        id:2,
        beforeWorkTime:'13:00',
        afterWorkTime:'18:00'
      }
    ],
    position:[
      {
        id:1,
        shortAddress:"钦汇园",
        address:'上海市徐汇区钦州北路1066号',
        range:100,
        location:[121.406051,31.179695 ]
      },
      {
        id:2,
        address:'上海市徐汇区徐家汇',
        range:100,
        location:[121.406051,31.179695 ]
      }
    ]
  }
];
import { mapGetters, mapActions } from "vuex";
import { transferWeek2Chinese,calculateShift,calculatePosition } from "@/utils/localFilter";
export default {
  name:'attendence',
  data(){
    return {
      rules:rule,
    }
  },
  filters:{
    transferWeek2Chinese:transferWeek2Chinese,
    calculateShift:calculateShift,
    calculatePosition:calculatePosition
  },
  beforeRouteLeave (to, from, next) {
    let id=to.params.id;
    console.log(id);
    next();
  },
  methods:{
    ...mapActions(["changeRuleState"]),
    createRule(){
      this.$store.commit("changeRuleState",'create');
      this.$router.push({name:'writeRule',params:{id:'d'}});
    },
    saveToSession(data){
      this.$setSession('rd',data.default);
      data.data.forEach(e=>{
        let key="r"+e.id;
        this.$setSession(key,e);
      })
    }
  }
}
</script>

<style scoped>
  .rule-body{
    margin: 0.7rem 0;
    background-color: white;
    border-top:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
  }
  .one-rule{
    padding: 0.7rem 1rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .one-rule:last-child{
    border-bottom: none;
  }
  .one-rule .title{
    font-weight: bold;
    margin-top: 0;
    font-size: 16px;
  }
  .one-rule .fontstyle{
    margin-top: 0.5rem;
    font-size: 14px;
  }
  
</style>
