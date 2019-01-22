<template>
    <!-- 推荐竞赛页面 -->
    <div class="competitor">
        <div>
            <div class="competitor-img">
                <img :src="competitor.icon" alt="">
            </div>
            <span>{{competitor.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Competitor',
    props: {
        competitor: Object
    },
    data() {
        return {
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
<style scoped>
.competitor-img {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  float: left;
  margin: 10px 8px 0 16px;
}
.competitor-img img {
  width: 18px;
  height: 13px;
  margin-left: 3px;
  margin-top: -19px;
}
</style>