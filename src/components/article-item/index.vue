<template>
  <div class="article-item">
    <!-- 因为 每一个的内容不一样 ，所以需要使用 插槽技术  进行判断 -->
    <van-cell
      :to="{
        name: 'article',
        params: {
          articleid: article.art_id,
        },
      }"
    >
      <!-- 标题插槽 -->
      <template #title>
        <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      </template>
      <!-- 详细信息插槽 -->
      <template #label>
        <!-- 图片为3 -->
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            v-for="(img, index) in article.cover.images"
            :key="index"
            class="cover-item"
          >
            <van-image :src="img" class="cover-item-img" fit="cover" />
          </div>
        </div>
        <!-- 下方详细信息 -->
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
      <!-- 图片为1插槽 -->
      <template #default v-if="article.cover.type === 1">
        <van-image
          :src="article.cover.images[0]"
          fit="cover"
          class="right-cover"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "articleitem",
  // 组件参数 接收来自父组件的数据
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
};
</script> 

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;

    // .cover-item:last-child : 选择.cover-wrap中的子元素cover-item的最后一个 (不理解的看下边的回顾,或者完整写法)
    //.cover-item:not(:last-child) : 选择非最后一个子元素
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        //嵌套语法里&代表父元素.cover-item
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
} // 这里的完整写法 ， 选择cover-wrap中的cover-item子元素，排除最后一个cover-item
.cover-wrap .cover-item:not(:last-child) {
  padding-right: 4px;
}
</style>