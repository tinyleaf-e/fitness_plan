<template>
    <div>
        <h1>我的运动计划</h1>
        <div style="padding: 15px">
            <div class="list-item" v-for="(item,idx) in list" :key="idx" @click="toDetail(idx)">
                <p style="font-size: 20px;text-align: left">{{item.title}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'list',
    data(){
      return{
        list:require('../data/tinyleaf.data')
      }
    },
    methods:{
      toDetail:function (idx) {
        this.$router.push({path:'/detail',query:{idx:idx}})
      }
    }
  }
</script>

<style scoped>
.list-item{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 20px;
    margin-bottom: 8px;
}
</style>