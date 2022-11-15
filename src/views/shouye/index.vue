<template>
  <div class="shouye_container">
    <!-- 头部搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!--增加一个名字为title的插槽 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 顶部频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="obj.name" v-for="obj in pindao" :key="obj.id">
        <!-- 文章列表 -->
        <Articlelist :pindao="obj"></Articlelist>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
      close-icon-position="top-left"
    >
      <pindaoedit
        :mypindao="pindao"
        :jihuoxiang="active"
        @changeactive="fuchangeactive"
        @addpindao="addpindao"
        @deletepindao="deletepindao"
      ></pindaoedit>
    </van-popup>
  </div>
</template>

<script>
import { getuserpindao } from "@/api/user";
import Articlelist from "@/components/article_list.vue";
import pindaoedit from "./components/pindao_edit.vue";
import { mapState } from "vuex";
import { setitem, getitem } from "@/utils/storage.js";
import { adduserpindao, deluserpindao } from "@/api/pindao.js";
export default {
  // 组件名称
  name: "shouyeindex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    Articlelist,
    pindaoedit,
  },
  // 组件状态值
  data() {
    return {
      active: 0,
      pindao: [],
      // 弹出层状态
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async huoqupindao() {
      try {
        // 在 这里 处理   持久化
        let pindao1 = [];
        if (this.user) {
          // 1.登录 获取 线上的频道
          const { data } = await getuserpindao();

          pindao1 = data.data.channels;
          console.log(pindao1);
        } else {
          // 如果 未登录 本地存储 有就用 没有就获取默认的
          const bendi = getitem("yuxi_toutiao_pindao");
          if (bendi) {
            pindao1 = bendi;
          } else {
            const { data } = await getuserpindao();
            pindao1 = data.data.channels;
          }
        }
        this.pindao = pindao1;
      } catch (error) {
        console.log(error);
        this.$toast("获取数据失败");
      }
    },
    fuchangeactive(index) {
      this.active = index;
      this.show = false;
    },
    // 添加频道
    async addpindao(obj) {
      // 在添加频道中  进行  频道  数据持久化处理
      if (this.user) {
        // 1.已登陆  将操作的  频道数据 存储在云端
        try {
          const res = await adduserpindao({
            id: obj.id,
            seq: this.pindao.length,
          });
          console.log(res);
          this.$toast("添加成功");
        } catch (error) {
          this.$toast("保存失败了");
        }
      } else {
        // 2.未登录   将操作的  频道数据 存储在本地
        setitem("yuxi_toutiao_pindao", this.pindao);
      }

      this.pindao.push(obj);
    },
    // 删除频道
    async deletepindao(obj, index) {
      this.pindao.splice(index, 1);
      if (index <= this.active) {
        this.active--;
      }
      // 进行 持久化 处理
      if (this.user) {
        // 已登陆
        try {
          await deluserpindao(obj.id);
        } catch (error) {
          this.$toast("操作失败,稍后再试");
        }
      } else {
        // 未登录
        setitem("toutiao_pindao", this.pindao);
      }
    },
  },

  created() {
    this.huoqupindao();
  },
};
</script> 

<style scoped lang="less">
.shouye_container {
  padding-top: 174px;
}
.page-nav-bar {
  background-color: rgb(40, 146, 255);
}
/deep/.van-nav-bar__title {
  // 添加/deep/或者全局控制
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }

  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}
// 汉堡按钮
.placeholder {
  //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0; //此元素不参与flex的平分
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: "";
    position: absolute;
    left: 0;
    width: 2px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>