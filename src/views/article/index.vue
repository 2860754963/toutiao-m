<template>
  <div class="article_container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="!article">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <followuser :article="article"></followuser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容   这里的文章内容 用到 markdown.css-->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article_content"
        ></div>
        <van-divider>正文结束</van-divider>
        <commentlist
          :source="article.art_id"
          @onloadsuccess="totalCommentCount = $event"
          :list="commentList"
          @reply-click="onReplyClick"
        ></commentlist>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="failstatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        :comment="currentComment"
        @close="isReplyShow = false"
        v-if="isReplyShow"
      >
      </CommentReply>
    </van-popup>
    <!-- /评论回复 -->
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
      <articlecollect :articledetalis="article"></articlecollect>
      <articlelike :articledetalis="article"></articlelike>
      <articleshare></articleshare>
    </div>
    <!-- /底部区域 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :target="article.art_id"
        @post-success="onPostSuccess"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import { getarticleid } from "@/api/article";
import { ImagePreview } from "vant";
import followuser from "../../components/follow_user";
import articlecollect from "../../components/article_collect";
import articlelike from "../../components/article_like";
import articleshare from "../../components/article_share";
import commentlist from "./compoents/comment_list.vue";
import CommentPost from "./compoents/comment-post.vue";
import CommentReply from "./compoents/comment-reply.vue";
export default {
  name: "articlecontent",
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleid: {
      // type: [String, Number, Object],
      required: true,
    },
  },
  components: {
    followuser,
    articlecollect,
    articlelike,
    articleshare,
    commentlist,
    CommentPost,
    CommentReply,
  },
  data() {
    return {
      article: {},
      failstatus: null,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    async loadgetarticleid() {
      try {
        const res = await getarticleid(this.articleid);
        this.article = res.data.data;
        // 这里需要做 延迟处理，页面更新后，不会立即拿到，页面元素
        setTimeout(() => {
          this.loadimgpreview();
        }, 0);

        this.$toast("获取文章数据成功");
      } catch (error) {
        console.log(error);
        if (error && error.response.status === 404) {
          this.failstatus = 404;
        }
        this.$toast("获取文章数据失败");
      }
    },
    loadimgpreview() {
      const contentEl = this.$refs["article_content"];

      const imgallEl = contentEl.querySelectorAll("img");

      const img = [];
      imgallEl.forEach((el, index) => {
        img.push(el.src);
        el.onclick = () => {
          ImagePreview({
            images: img,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false;
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj);
    },
    onReplyClick(comment) {
      // 将子组件中传给我评论对象存储到当前组件
      this.currentComment = comment;
      // console.log(comment);
      // 显示评论回复弹出层
      this.isReplyShow = true;
    },
  },

  created() {
    this.loadgetarticleid();
  },
  mounted() {},
};
</script> 

<style scoped lang="less">
@import "./github-markdown.css";
.article_container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>