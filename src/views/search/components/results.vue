<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchtext: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 接口所需参数
      page: 1,
      perPage: 20,
      // 错误提示
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchtext, // 搜索关键字
        });
        const { results } = data.data;
        console.log(results);
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.page++; // 如果有，更新获取下一页数据的页码
        } else {
          this.finished = true; // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (error) {
        console.log(error);
        this.$toast("获取结果失败");
      }
    },
  },
};
</script>

<style scoped lang="less"></style>