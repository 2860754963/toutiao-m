<template>
  <div class="share_content">
    <van-button icon="share" @click="showShare = true" />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: "shareindex",
  props: {},
  components: {},
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="less">
.van-button {
  border: 0;
  color: #777777;
}
</style>