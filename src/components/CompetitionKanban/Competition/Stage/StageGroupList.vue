<template>
    <!-- 推荐竞赛页面 -->
    <div class="stage-group-list">
        <Group v-for="(group,idx) in groups" :key="idx" :group="group" />
    </div>
</template>
<script>
import Group from './Group/Group'
export default {
    name: 'StageGroupList',
    components: {
        Group
    },
    props: {
        stage: Object
    },
    data() {
        return {
            groups: [],
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
            if (!this.stage) return
            const url = `/api/CompetitionStage/${this.stage.id}/Groups`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    const groups = []
                    res.data.forEach(group => {
                        group.isOpen = false
                        groups.push(group)
                    })
                    this.groups = groups
                }
            })
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
.group {
  margin-top: 1px;
  min-height: 40px;
  background-color: #181818;
  border: solid 1px #333333;
  font-size: 14px;
  color: #8d8c8d;
}
</style>