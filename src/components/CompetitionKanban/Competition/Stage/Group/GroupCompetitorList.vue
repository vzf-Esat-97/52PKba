<template>
    <!-- 推荐竞赛页面 -->
    <div class="group-competitor-list">
        <Competitor v-for="(competitor,idx) in competitors" :key="idx" :competitor="competitor" />
    </div>
</template>
<script>
import Competitor from './Competitor/Competitor'
export default {
    name: 'GroupCompetitorList',
    components: {
        Competitor
    },
    props: {
        group: Object
    },
    data() {
        return {
            competitors: []
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
            if (!this.group) return
            const url = `/api/CompetitionGroup/${this.group.id}/Competitors`
            this.$fetch(url).then((res) => {
                console.log(res.data)
                if (res.code == 0) {
                    const competitors = []
                    res.data.forEach(competitor => {
                        competitors.push(competitor)
                    });
                    this.competitors = competitors;
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
<style scoped>
.competitor {
  width: 214px;
  height: 40px;
  margin-top: 1px;
  border-bottom: 1px solid #252525;
  cursor: pointer;
  line-height: 40px;
}
.competitor:hover {
  color: white;
}
</style>