<template>
  <!-- 主页文章列表 -->

  <div class="article_list">
    <!-- 下拉刷新组件 下拉状态，触发事件，成功提示文本，成功提示时间 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <!-- 内容 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败了，点击重新加载一下吧！😶"
      >
        <!-- vant列表组件 上有错误加载提示    
            组件 :error.sync="error"  
             error-text="请求失败，点击重新加载" -->
        <!-- <van-cell
          v-for="(obj, index) in list"
          :key="index"
          :title="obj.title"
        /> -->
        <!-- 以上表格项 就不使用了，这里使用 文章项 组件的方式 进行自定义 -->
        <articleitem v-for="(obj, index) in list" :key="index" :article="obj" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticle } from "@/api/article";
import articleitem from "./article-item";
export default {
  // 组件名称
  name: "articlelist",
  // 组件参数 接收来自父组件的数据
  props: {
    pindao: {
      type: Object,
      required: true, //这个数据是必须的
    },
  },
  // 局部注册的组件
  components: {
    articleitem,
  },
  // 组件状态值
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, ////请求获取下一页的时间戳
      error: false,
      // 下拉刷新
      count: 0,
      isLoading: false,
      refreshSuccessText: "",
    };
  },

  // 组件方法
  methods: {
    async onRefresh() {
      // 在下拉刷新中，重新请求数据,并且将数据放到原先数组的  头部进行展示
      try {
        const { data } = await getarticle({
          channel_id: this.pindao.id,
          timestamp: Date.now(), ///每次刷新的时候 应获取 当前最新的数据
          with_top: 0,
        });

        const { results } = data.data;
        // 将结果追加到数组头部
        this.list.unshift(...results);
        // 关闭下拉状态
        this.isLoading = false;
        this.refreshSuccessText = `刷新成功啦！🥰更新了${results.length}条数据`;
      } catch (error) {
        this.refreshSuccessText = "刷新失败了！😯请稍后再试吧！";
        this.isreFreshLoading = false;
      }
      // 这是 下拉刷新  例子
      // setTimeout(() => {
      //   Toast("刷新成功");
      //   this.isLoading = false;
      //   this.count++;
      // }, 1000);
    },
    async onLoad() {
      // 使用onload方法就是：
      // 1.请求数据

      try {
        // 这里根据文档，需要在发送数据的时候  携带参数(必传)：channel_id,timestamp,with_top
        const { data } = await getarticle({
          channel_id: this.pindao.id, //频道od
          ///当前时间戳（就是第一页数据） ，就是请求哪一页数据
          // 请求第二页数据时，会根据返回的数据 进行设置
          timestamp: this.timestamp || Date.now(),
          //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 0,
        });

        // 请求文章列表
        //  拿到结果，将结果push到数组中
        console.log(data); ////data中存在pre_timestamp  这个时间戳属性.通过这个拿到下一页数据
        const { results } = data.data;
        // 2.将数据放到数组里
        this.list.push(...results); //通过展开符，将结果放入数组

        // 测试 是否 触发错误提示 有50%的纪律发生错误
        if (Math.random() > 0.5) {
          JSON.parse("dasffgsad");
        }
        // 3. 本次数据加载结束后将loading设置为false
        this.loading = false;

        //  4.判断数据是否加载完成
        if (results.length) {
          ////如果不为null或者空 ，表示这次请求的数据还有，那么就获取下一页时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据
          this.finished = true;
        }
      } catch (error) {
        // 请求失败的话 用组件  将error设置为 true
        this.error = true;
        // 将loading 关闭
        this.loading = false;
      }
    },
  },
};
</script> 

<style scoped lang="less">
.article_list {
  padding-bottom: 90px;
  height: 79vh;
  overflow-y: auto;
}
</style>