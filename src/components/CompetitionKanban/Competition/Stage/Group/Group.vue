<template>
    <!-- 推荐竞赛页面 -->
    <div class="group">
        <div class="group-head-list" @click="group.isOpen=!group.isOpen">
            <span>{{group.name}}</span>
        </div>
        <div v-show="group.isOpen" class="opened">
            <div class="opened-competitor">
                <GroupCompetitorList :group="group" />
            </div>
            <div class="opened-match">
                <GroupMatchList :group="group" />
            </div>
        </div>
    </div>
</template>
<script>
import GroupCompetitorList from './GroupCompetitorList'
import GroupMatchList from './GroupMatchList'
export default {
    name: 'Group',
    components: {
        GroupCompetitorList,
        GroupMatchList
    },
    props: {
        group: Object
    },
    data() {
        return {
        }
    },
    computed: {

    },
    watch: {
        group() {
            this.refresh()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
        },
        // 查看
        check(idx) {
            this.ishow = idx
            this.ishowtime = idx
        }
    }
}
</script>
<style scoped>
.group-head-list {
  text-align: center;
  line-height: 40px;
}

.opened {
  font-size: 0;
  height: 240px;
  width: 856px;
  border-top: 1px solid #252525;
}
.opened-competitor {
  width: 214px;
  height: 240px;
  float: left;
  overflow: auto;
  border-right: 1px solid #252525;
}
.opened-match {
  width: 640px;
  height: 240px;
  float: left;
  overflow: auto;
}
.opened-match::-webkit-scrollbar {
  display: none;
}
.opened-competitor::-webkit-scrollbar {
  display: none;
}
.opened .group-competitor-list {
  font-size: 14px;
  display: inline-block;
  width: 214px;
  height: 40px;
  background-color: #181818;
}
.opened .group-match-list {
  font-size: 14px;
  display: inline-block;
  width: 639px;
  height: 60px;
  background-color: #181818;
  border-bottom: 1px solid #252525;
  line-height: 50px;
}
/* .opened .group-match-list span{
    padding-right: 10px;
} */
</style>