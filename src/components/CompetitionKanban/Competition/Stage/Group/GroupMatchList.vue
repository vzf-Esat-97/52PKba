<template>
    <!-- 推荐竞赛页面 -->
    <div class="group-match-list">
        <Match v-for="(match,idx) in matches" :key="idx" :idx="idx+1" :match="match" />
    </div>
</template>
<script>
import Match from './Match/Match'
export default {
    name: 'GroupMatchList',
    components: {
        Match
    },
    props: {
        group: Object
    },
    data() {
        return {
            matches: []
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
            const url = `/api/CompetitionGroup/${this.group.id}/Matches`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    const matches = []
                    res.data.forEach(match => {
                        matches.push(match)
                    });
                    this.matches = matches;
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
.match {
  padding: 5px;
  margin-top: 1px;
}
</style>