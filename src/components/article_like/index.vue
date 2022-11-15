<template>
  <van-button
    :icon="articledetalis.like_count ? 'good-job' : 'good-job-o'"
    :class="{
      collected: articledetalis.like_count, //根据收藏状态，应用.collected样式
    }"
    @click="like"
    :loading="loading"
  />
</template>


<script>
import { likearticle, canclearticle } from "@/api/article";
export default {
  name: "likeindex",
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
    async like() {
      this.loading = true;

      if (this.articledetalis.like_count == 1) {
        // 点击减少喜欢
        try {
          await canclearticle(this.articledetalis.art_id);

          this.$toast("取消成功");
          this.articledetalis.like_count = 0;
        } catch (error) {
          console.log(error);
          this.$toast("取消失败");
        }
      } else {
        // 点击喜欢
        try {
          await likearticle(this.articledetalis.art_id);
          this.$toast("点赞成功");

          this.articledetalis.like_count = 1;
        } catch (error) {
          console.log(error);
          this.$toast("点赞失败");
        }
      }
      console.log(this.articledetalis.art_id);
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