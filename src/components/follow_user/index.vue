<template>
  <div class="follow_user">
    <van-button
      class="follow-btn"
      round
      size="small"
      v-if="article.is_followed"
      @click="isfollowed(article)"
      :loading="followloading"
      >已关注</van-button
    >
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-else
      @click="isfollowed(article)"
      :loading="followloading"
      >关注</van-button
    >
  </div>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "followuserindex",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      followloading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async isfollowed(article) {
      try {
        this.followloading = true;
        if (article.is_followed) {
          // 点击取消 关注
          await deleteFollow(article.aut_id);
          //   这里传送的  是 对象，可以修改，报错不用管  其实这里也可i已使用  v-module 只传送 is_followed 进行双向数据绑定
          this.article.is_followed = false;
        } else {
          // 点击关注
          await addFollow(article.aut_id);
          this.article.is_followed = true;
        }
        this.followloading = false;
      } catch (error) {
        console.log(error);
        this.$toast("操作失败，一会再试");
      }
    },
  },
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="less">
</style>