<template>
  <div class="my_container">
    <!--已登录状态 -->
    <div class="header" v-if="user">
      <div class="top">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{
            userInfo.name ? userInfo.name : "头条号🤩"
          }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round class="butn" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="message">
        <div class="data-item">
          <span class="count">{{
            userInfo.art_count ? userInfo.art_count : "999"
          }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{
            userInfo.follow_count ? userInfo.follow_count : "999"
          }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{
            userInfo.fans_count ? userInfo.fans_count : "999"
          }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{
            userInfo.like_count ? userInfo.like_count : "999"
          }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录状态 -->
    <div class="header not_login" @click="$router.push('/login')" v-else>
      <img src="~@/assets/mobile.png" class="mobile_img" />
      <span class="text">登录/注册</span>
    </div>

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
      <!-- clickable 应用于 点击宫格更好的交互 -->
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 两个 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小马同学" is-link />
    <van-button class="tuichu" v-if="user" @click="tuichulogin"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getinfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  // 组件名称
  name: "myindex",
  computed: {
    ...mapState(["user"]),
  },
  created() {
    if (this.user) {
      this.getuserinfo();
    }
  },
  methods: {
    tuichulogin() {
      this.$dialog
        .confirm({
          title: "确定要退出吗？",
          message: "😫",
        })
        .then(() => {
          //这里确认退出 使用vuex中的setuser方法 将user 设置为空，这样，数据会驱动视图
          this.$store.commit("setuser", null);
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    async getuserinfo() {
      try {
        const { data } = await getinfo();
        this.userInfo = data.data;
      } catch (error) {
        this.$toast("获取数据失败了，请稍后重试！😥");
      }
    },
  },
};
</script> 

<style scoped lang="less">
.header {
  height: 361px;
  // @ vue/cli内部内置好的一个全局标记，代表src目录
  background: url("~@/assets/banner.png"); // css中使用@需要添加~,@代表src
  background-size: cover;
  .top {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
}
.not_login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile_img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  .text {
    font-size: 28px;
    color: #fff;
  }
}
.message {
  height: 130px;
  display: flex;
  align-content: center;
  .data-item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .count {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.tuichu {
  width: 100%;
  color: #eb5253;
}
</style>