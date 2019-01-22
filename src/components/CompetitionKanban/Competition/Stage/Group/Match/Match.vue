<template>
    <!-- 推荐竞赛页面 -->
    <div class="match">
        <div>
            <span>第{{idx}}场</span>
            <span>入场时间：{{match.enterTime|date}}</span>
            <span>开始时间：{{match.startTime|date}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Match',
    props: {
        idx: Number,
        match: Object
    },
    data() {
        return {
        }
    },
    computed: {

    },
    watch: {
        match() {
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
</style>