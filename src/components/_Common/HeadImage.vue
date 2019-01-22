<template>
    <div class="head-image">
        <div class="head-portrait">
            <img :src="src" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'HeadImage',
    props: {
        src: String
    },
    data() {
        return {
        };
    },
    computed: {},
    watch: {
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style scoped>
.head-image { /* HeadImage */
  display: inline-block;
  vertical-align: middle;
}
.head-portrait {
  width: 24px; 
  height: 24px; 
  /* padding: 10%;  */
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  margin-top: 0px;
}
.head-portrait img {
  width: 18px;
  height: 13px;
  margin-left: 3px;
}
</style>