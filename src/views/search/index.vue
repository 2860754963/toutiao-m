<template>
  <div class="search_content">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isshow = false"
        class="search-form"
      />
      <results v-if="isshow" :searchtext="searchText"></results>
      <suggest
        v-else-if="searchText"
        :searchtext="searchText"
        @search="onSearch"
      ></suggest>
      <history
        v-else
        :searchtext="searchText"
        :searchhistory="searchlist"
        @delete="delete1"
        @search="onSearch"
        @clear="searchlist = []"
      ></history>
    </form>
  </div>
</template>

<script>
import history from "./components/history.vue";
import results from "./components/results.vue";
import suggest from "./components/suggest.vue";
// 收缩历史数据持久化
import { setitem, getitem } from "@/utils/storage";
export default {
  // 组件名称
  name: "searchindex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    history,
    results,
    suggest,
  },
  // 组件状态值
  data() {
    return {
      searchText: "",
      isshow: false,
      searchlist: getitem("yuxi_toutiao_histories") || [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    searchlist(value) {
      setitem("yuxi_toutiao_histories", value);
    },
  },
  // 组件方法
  methods: {
    onSearch(val) {
      this.searchText = val;
      const index = this.searchlist.indexOf(val);
      if (index !== -1) {
        this.searchlist.splice(index, 1);
      }
      this.searchlist.unshift(val);

      this.isshow = true;
    },
    onCancel() {
      this.$router.back(); //返回上一页（首页）
    },
    delete1(index) {
      this.searchlist.splice(index, 1);
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
};
</script> 

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
.search_content {
  padding-top: 108px;
}
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>