<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestionslist"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getsearchsuggest } from "@/api/search";
// 按需加载 插件   lodash
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchtext: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestionslist: [], //建议列表
    };
  },
  computed: {},
  watch: {
    searchtext: {
      handler: debounce(function (value) {
        this.loadsearchsuggest(value);
      }, 200),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadsearchsuggest(q) {
      try {
        const { data } = await getsearchsuggest(q);
        this.suggestionslist = data.data.options;
        console.log(this.suggestionslist);
        if (this.suggestionslist[0] == null) {
          this.suggestionslist = [];
          this.suggestionslist.push("没有相关数据");
        }
      } catch (error) {
        this.$toast("获取联想词失败！");
      }
    },
    highlight(text) {
      const str = `<span class='active'>${this.searchtext}</span>`;
      const reg = new RegExp(this.searchtext, "ig");
      return text.replace(reg, str);
    },
  },
};
</script>

<style scoped lang="less">
/deep/.active {
  color: red;
}
</style>