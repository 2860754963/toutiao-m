<template>
  <div class="login-container">
    <!-- 顶部登录 -->
    <van-nav-bar title="登录" class="toplogin">
      <template #left>
        <i
          slot="left-icon"
          class="toutiao toutiao-guanbi"
          @click="$router.back()"
        ></i>
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        center
        placeholder="请输入手机号"
        v-model="user.mobile"
        name="mobile"
        :rules="formrules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        placeholder="请输入验证码"
        center
        v-model="user.code"
        name="code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <template #button>
          <van-count-down
            millisecond
            time="9000"
            format="ss s"
            v-if="isshow"
            @finish="daojishijieshu"
          />
          <!-- 这里的普通按钮也会 触发表单提交 -->
          <van-button
            v-else
            class="sendmessage"
            size="small"
            native-type="button"
            type="default"
            round
            @click="sendyanzhengma"
            ref="yanzhengma"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="denglu">
        <van-button block type="info" native-type="submit" class="denglu2"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      isshow: false,
      user: {
        mobile: "",
        code: "",
      },
      // :rules="[{ pattern, message: '请输入正确内容' }]" 这里的规则是数组里嵌套对象
      formrules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空😥",
          },
          {
            // 可以定义多个对象多个规则，这个用于验证手机号是否合规
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: "请填写正确的手机号😥",
          },
        ],
        // 验证码校验规则

        code: [
          {
            required: true,
            message: "验证码不能为空😥",
          },
          {
            pattern: /^\d{6}$/,
            message: "请填写正确的验证码😥",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 表单提交  登录
    async onSubmit(value) {
      console.log(value); ///这里因为每个输入框绑定了name 所以 下面也可以传递value
      ////如果使用value就不用重新  声明变量  但下方还要进行内容验证
      // 在使用vant时, 如果是全部导入 ，那么vant自动给vue实例添加了$toast属性 (其实添加了很多属性)
      this.$toast.loading({
        ///使用 vant2中toast组件 进行提示用户 网络不好 转圈圈提示
        duration: 0, // 持续展示 toast
        message: "正在加载中，等一下嘛！😘",
        forbidClick: true, // 是否禁止背景点击
      });
      try {
        const res = await login(this.user);
        // 登录成功后用请提示提示用户啊
        this.$toast.success("登录成功了！🥰");
        // 将token 存储到容器中（本地存储）
        this.$router.back();

        this.$store.commit("setuser", res.data.data);
      } catch (error) {
        // 这里根据服务器返回的信息进行错误判断
        if (error.response.status === 400) {
          this.$toast.fail("手机号或验证码错误！😥");
        } else if (error.response.status === 401) {
          this.$toast.fail("token过期了，请重新登录吧！😥");
        } else {
          this.$toast.fail("登录失败，请稍候重试！😥");
        }
      }
    },
    // 点击发送验证码
    async sendyanzhengma() {
      // 通过 ref 可以获取到 Form 实例并调用validate实例方法
      // 验证手机号，支持传入 name 来验证单个或部分表单项 返回值是一个 Promise对象
      // 进行验证 会抛出异常
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        this.isshow = false;
        // 验证失败 程序就会停止
        return console.log(error);
      }
      // 验证成功就会 执行
      this.isshow = true;
      // 调用函数 发送数据
      try {
        const rex = await sendSms(this.user.mobile);
        this.$toast("发送成功啦，注意查收！🥰");
        console.log(rex);
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast("发送太频繁了，请稍后再试!😥");
        } else {
          this.$toast("发送失败了!请稍后再试。😥");
        }
      }
    },
    // 倒计时结束
    daojishijieshu() {
      this.isshow = false;
      this.$nextTick(() => {
        this.$refs.yanzhengma.innerHTML = "重新获取";
      });
    },
  },
};
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.toutiao-guanbi {
  font-size: 25px;
}

.sendmessage {
  width: 158px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.denglu {
  padding: 53px 33px;
  .denglu2 {
    background-color: #6db4fb;
    border: none;
  }
}
</style>