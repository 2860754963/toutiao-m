<template>
  <div class="pindaoedit_content">
    <!-- 我的频道 -->
    <!-- Cell 单元格 -->
    <van-cell-group>
      <!-- 这里将 单元格下方的横线 消除  -->
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <!-- 这里默认插到右侧  plain是朴素按钮-->
        <van-button
          size="mini"
          round
          type="danger"
          plain
          class="edit-btn"
          @click="isshow = !isshow"
          >{{ isshow ? "完成" : "编辑" }}</van-button
        >
      </van-cell>
      <van-grid :gutter="10" class="my-grid">
        <van-grid-item
          class="grid-item"
          v-for="(obj, index) in mypindao"
          :key="obj.id"
          @click="mypindaodianji(obj, index)"
        >
          <van-icon
            slot="icon"
            name="clear"
            v-show="isshow && !fixedpindao.includes(obj.id)"
          ></van-icon>
          <span
            slot="text"
            :class="{ active: index === jihuoxiang, wenzi: true }"
            >{{ obj.name }}</span
          >
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- Cell 单元格 -->
    <!-- 我的频道 -->

    <!-- 推荐频道 -->
    <!-- Cell 单元格 -->
    <van-cell-group>
      <!-- 这里将 单元格下方的横线 消除  -->
      <van-cell :border="false">
        <div slot="title" class="title-text">推荐频道</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
          class="grid-item"
          v-for="obj in recommendpindao"
          :key="obj.id"
          icon="plus"
          :text="obj.name"
          @click="addpindao(obj)"
        />
      </van-grid>
    </van-cell-group>
    <!-- Cell 单元格 -->
    <!-- 推荐频道 -->
  </div>
</template>

<script>
import { getallpindao } from "@/api/pindao.js";
export default {
  // 组件名称
  name: "pindaoedit",
  // 组件参数 接收来自父组件的数据
  props: {
    mypindao: {
      type: Array,
      required: true,
    },
    jihuoxiang: {
      type: Number,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      allpindao: [],
      isshow: false,
      fixedpindao: [0],
    };
  },
  // 计算属性
  computed: {
    recommendpindao() {
      //筛选方法, 回调函数的参数 是数组的每一项
      return this.allpindao.filter((channel) => {
        return !this.mypindao.find((mychannel) => {
          return mychannel.id === channel.id;
        });
      });
    },
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async loadgetallpindao() {
      try {
        const { data } = await getallpindao();
        this.allpindao = data.data.channels;
        // console.log(this.allpindao);
      } catch (err) {
        // console.log(err);
        this.$toast("获取数据失败了");
      }
    },
    addpindao(obj) {
      ///这里报错是 eslint 的 子组件修改了 父亲传过来的值 所以报错 可以使用 这个组件内的变量进行接收一下,
      //   但是 接受一下后,更新数据 会不及时,本身这个 频道项 就是父亲传过来的
      //   this.mypindao.push(obj);
      ///正确的写法 就是将这个 obj 传到 父组件内 子传父
      this.$emit("addpindao", obj);
    },
    mypindaodianji(obj, index) {
      // 咋hi这里通过 是否显示  进行切换
      if (this.isshow) {
        // 进行删除数据
        // 1.固定 频道不会删除
        if (this.fixedpindao.includes(obj.id)) {
          return this.$toast("固定频道项不允许删除");
        }
        // 2. 删除 我的频道项 是父亲传过来的 所以要传回去
        this.$emit("deletepindao", obj, index);
        //3.改变 active 状态  在父组件 修改 下标
      } else {
        this.$emit("changeactive", index);
      }
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadgetallpindao();
  },
};
</script> 

<style scoped lang="less">
.active {
  color: red !important;
}
.pindaoedit_content {
  padding-top: 90px;
  //  "我的频道和推荐频道文字"
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  //  右侧编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  //   每个单元格
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap; ///文字不换行
      background-color: #f4f5f6; ///背景色
      .van-grid-item__text,
      .wenzi {
        font-size: 28px; ///字体大小
        color: #222;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  ///推荐频道里 ＋号调整
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
  //   我的频道图标
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>