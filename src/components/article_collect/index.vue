<template>
  <div class="collect_content">
    <van-button
      :icon="articledetalis.is_collected ? 'star' : 'star-o'"
      :class="{
        collected: articledetalis.is_collected, //根据收藏状态，应用.collected样式
      }"
      @click="collect"
      :loading="loading"
    />
  </div>
</template>

<script>
import { collectedarticle, canlecollectedarticle } from "@/api/article";
export default {
  name: "collectindex",
  props: {
    articledetalis: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async collect() {
      this.loading = true;
      //articledetalis.is_collected 服务器默认为false
      if (this.articledetalis.is_collected) {
        // 取消收藏
        try {
          await canlecollectedarticle(this.articledetalis.art_id);
          this.$toast("取消成功");
        } catch (error) {
          console.log(error);
          this.$toast("取消失败");
        }
      } else {
        // 收藏文章
        try {
          await collectedarticle(this.articledetalis.art_id);
          this.$toast("收藏成功");
        } catch (error) {
          console.log(error);
          this.$toast("收藏失败");
        }
      }
      //   这个 报错没毛病，传的  对象可以改
      this.articledetalis.is_collected = !this.articledetalis.is_collected;
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="less">
.van-button {
  border: 0;
}
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>