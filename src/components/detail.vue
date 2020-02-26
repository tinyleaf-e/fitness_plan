<template>
    <div style="padding: 20px 30px">
        <div style="text-align: left;margin-bottom:30px;font-size: 22px;color: #999" @click="$router.go(-1)">&lt; 返回</div>
        <h2 style="font-size: 30px;margin-bottom: 30px">{{plan.title}}</h2>
        <div>
            <h2 style="font-size: 26px;margin-bottom: 30px">{{currentItem.isBreak?'休 息':currentItem.title}}</h2>
            <div style="font-size: 20px;margin-bottom: 30px">{{currentItem.isBreak?(nextItem===null?'这是最后一个动作':'下一动作:'+nextItem.title):currentItem.tip}}</div>
            <i-circle
                    :size="150"
                    :trail-width="7"
                    :stroke-width="7"
                    :percent="percent"
                    stroke-linecap="square"
                    stroke-color="#43a3fb">
                <div style="font-size: 40px">
                    {{remainTime+' S'}}
                </div>
            </i-circle>
            <audio :src="dingSrc" ref="ding"></audio>
            <audio :src="dingdongSrc" ref="dingdong"></audio>
        </div>
        <div style="margin-top: 30px;display: flex;justify-content: space-between">
            <Button type="primary" size="large" @click="pause===1?pause=0:pause=1" style="width: 45%">{{pause===0?'暂 停':'继 续'}}</Button>
            <Button type="primary" size="large" @click="toNextItem()" :disabled="nextItem===null"  style="width: 45%">下一个</Button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'detail',
    data(){
      return {
        plan:{},
        currentTimes:1,
        currentPlanItemIdx:0,
        second:0,
        pause:1,
        dingSrc:require('../assets/ding.mp3'),
        dingdongSrc:require('../assets/dingdong.mp3')
      }
    },
    computed:{
      remainTime:function () {
        return this.currentItem.time-this.second
      },
      percent:function(){
        return this.second/this.currentItem.time*100
      },
      currentItem:function () {
        return this.plan.items[this.currentPlanItemIdx]
      },
      nextItem:function () {
        if(this.currentTimes<this.plan.times){
          return this.plan.items[(this.currentPlanItemIdx+1)%this.plan.items.length]
        }else{
          if(this.currentPlanItemIdx<this.plan.items.length-1)
            return this.plan.items[this.currentPlanItemIdx+1]
          else
            return null
        }
      }
    },
    methods:{
      timeGo(){
        if(this.pause===0){
          this.second++
          if(this.second>this.currentItem.time){
            this.toNextItem()
          }
          if(this.second>this.currentItem.time-this.currentItem.countdown){
            this.second===this.currentItem.time?this.$refs.dingdong.play():this.$refs.ding.play()
          }
        }
      },
      toNextItem(){
        if(this.currentPlanItemIdx>=this.plan.items.length-1){
          if(this.currentTimes<this.plan.times){
            this.currentPlanItemIdx=0;
            this.currentTimes++
          }
          else{
            this.pause=2;
            return ;
          }
        }else {
          this.currentPlanItemIdx++;
        }
        this.second=0
      }
    },
    mounted(){
      this.plan=require('../data/tinyleaf.data.json')[this.$route.query.idx?this.$route.query.idx:0]
      this.timer=window.setInterval(this.timeGo,1000)
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  }
</script>

<style scoped>

</style>