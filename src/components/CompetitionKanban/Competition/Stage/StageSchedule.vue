<template>
    <!-- 推荐竞赛页面 -->
    <div class="stage-schedule">
        <StageGroupList :stage="stage" />
    </div>
</template>
<script>
import StageGroupList from './StageGroupList'
export default {
    name: 'StageSchedule',
    components: {
        StageGroupList
    },
    props: {
        stage: Object
    },
    data() {
        return {
            ismainnavclass: 0,
            isCloor: 0,
            islassStyle: false,
            ishowUp: false,
            ishow: 0,
            ishowtime: 0,
            stageStatedata: [1]
        }
    },
    computed: {

    },
    watch: {
        stage(newval, oldval) {
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
<style lang="less" scoped>
.stage-group-list {
  background: transparent;
}
</style>