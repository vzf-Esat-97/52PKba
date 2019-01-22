<template>
  <!-- 注册成功提示 -->
  <div>
    <!-- <p>返回</p> -->
    <div id="applyText">
      <!-- {{apply}} -->
    </div>
  </div>
</template>

<script>
export default {

  name: 'applyText',
  props: {
    registerandbVisiblesuc: Boolean
  },
  data () {
    return {
      apply: ''
    }
  },
  mounted () {
    console.log(132132213)
    let form = this.$route.query.htmls
    // this.apply = form;
    console.log(form)
    const div = document.getElementById('applyText');
    console.log(div)
    // newwindow.document.write(response.data.page);
    div.innerHTML = form;
    // document.body.appendChild(div);
    document.forms.alipaysubmit.submit();

    // this.$nextTick(() => {
    //   document.forms[0].submit()
    // })
  },
  methods: {
  }
}
</script>

<style <style lang="less" scoped>
#applyText {
  display: none;
}
</style>
