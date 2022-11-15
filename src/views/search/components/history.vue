<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="ishow">
        <span @click="$emit('clear')">全部删除</span>
        &nbsp; &nbsp;
        <span @click="ishow = false">完成</span>
      </span>
      <van-icon name="delete" v-else @click="ishow = true" />
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchhistory"
      :key="index"
      @click="dianji(item, index)"
    >
      <van-icon name="close" v-if="ishow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchhistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ishow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    dianji(item, index) {
      if (this.ishow) {
        // 删除状态
        // this.searchhistory.splice(index, 1);
        this.$emit("delete", index);
      } else {
        // 点击跳转
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>