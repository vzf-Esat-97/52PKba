<template>
    <!-- 推荐竞赛页面 -->
    <div class="competitor-member-list">
        <Member v-for="(competitor,idx) in competitors" :key="idx" :competitor="competitor" />
    </div>
</template>
<script>
import Member from './Member/Member'
export default {
    name: 'CompetitorMemberList',
    components: {
        Member
    },
    props: {
        competitor: Object
    },
    data() {
        return {
            members: []
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
            if (!this.competitor) return
            const url = `/api/CompetitionGroupCompetitor/${this.competitor.id}/Members`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    const members = []
                    res.data.forEach(member => {
                        members.push(member)
                    });
                    this.members = members;
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
</style>