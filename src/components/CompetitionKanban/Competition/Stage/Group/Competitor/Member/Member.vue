<template>
    <!-- 推荐竞赛页面 -->
    <div class="member">
        <div>
            <img style="" :src="member.icon" alt="">
            <span>{{member.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Member',
    props: {
        member: Object
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
img {
  margin: 3px;
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  border-radius: 3px;
}
</style>