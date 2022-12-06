<!--
<template>
  <el-dialog v-model="dialogVisible" width="820" style="border-radius: 8px">
    <div class="flagbox">
      <div style="margin-left: 1rem">喜欢，唱，跳rap！</div>
      <div>加入ifans</div>
    </div>
    <div class="login-box">
      <div class="loginbg-box">
        <img class="loginbg" src="https://hjxsuper.top/img/0.gif">
      </div>

      <div class="login">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
          &lt;!&ndash;        <h3 class="title">哥哥，这世上一切美好的事情，你的脸就占90%</h3>&ndash;&gt;
          <el-form-item prop="email">
            <el-input
                v-model="loginForm.email"
                type="text"
                size="large"
                auto-complete="off"
                placeholder="邮箱"
            >
              <template #prefix>
                <svg-icon icon-class="user" class="el-input__icon input-icon"/>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                size="large"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter="handleLogin"
            >
              <template #prefix>
                <svg-icon icon-class="password" class="el-input__icon input-icon"/>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item style="width:100%;">
            &lt;!&ndash;            <el-button :loading="loading" size="large" style="width:48%; margin-right: 1%" @click.prevent="handleregister">
                          <span v-if="!loading">注 册</span>
                          <span v-else>注 册 中...</span>
                        </el-button>&ndash;&gt;

            <el-button @click="handleRegister" size="large" style="width:48%; margin-right: 1%"><span>注 册</span>
            </el-button>
            <el-button @click="handleLogin" size="large" color="#fb7299" style="width: 48%"><span style="color: #fff;">登录</span>
            </el-button>
          </el-form-item>
        </el-form>

        <div class="otherLoginType">
          <span>其他登录方式</span>

          <div class="logintype-items">
            <div class="logintype-item"><img src="https://hjxsuper.top/img/weixinicon.png"/><span>微信登录</span></div>
            <div class="logintype-item"><img src="https://hjxsuper.top/img/QQicon.png"/><span>QQ登录</span></div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>


<script lang="ts" setup>
import {getCurrentInstance, ref, watch} from 'vue';
import useUserStore from '@/stores/user'
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

let dialogVisible = ref(false);

const userStore = useUserStore()
const router = useRouter();
const route = useRoute()
const {proxy}: any = getCurrentInstance();

const redirect = ref(undefined);

const loginForm = ref({
  email: "zz5533114@qq.com",
  password: "zz5533114"
});

const loginRules = {
  email: [{required: true, trigger: "blur", message: "请输入您的邮箱"}],
  password: [{required: true, trigger: "blur", message: "请输入您的密码"}]
};

const open = () => {
  dialogVisible.value = true
}

defineExpose({open});

/*watch(() => islogin.show, (nv) => {
  console.log(nv)
  if (nv) {
    open()
  }
},{immediate: true, deep: true})*/

function handleRegister() {
  router.replace('/register');
  dialogVisible.value = false;
}

function handleLogin() {
  proxy.$refs["loginRef"].validate((valid: boolean) => {
    if (valid) {
      //loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      /*if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, {expires: 30});
        Cookies.set("password", encrypt(loginForm.value.password), {expires: 30});
        Cookies.set("rememberMe", loginForm.value.rememberMe, {expires: 30});
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }*/
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        router.push({path: redirect.value || "/"});
        dialogVisible.value = false;
      })
    }
  });
}
</script>

<style lang='scss' scoped>
.flagbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 325px;
  margin: 0 auto;
  padding: 0 0 1rem 2rem;
}

.flagbox div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;

  background: linear-gradient(to left, #d3959b, #bfe6ba);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  width: 100%;
}

.loginbg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  width: 45%;
}

.loginbg {
  width: 250px;
  height: 250px;
  border-radius: 20px;
}

.login-box {
  display: flex;
  /*flex-wrap: wrap;*/
  justify-content: center;
  align-items: center;
}

.otherLoginType {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.8rem;
}

.logintype-items {
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
}

.logintype-item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logintype-item img {
  width: 28px;
  height: 28px;
  margin-right: 0.5rem
}

.login {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70%;
  /*background-image: url("../assets/images/login-background.jpg");*/
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  /*padding: 25px 25px 5px 25px;*/

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>

<style>
.el-dialog__body {
  padding: 0 0 25px 0 !important;
}

.el-dialog__headerbtn {
  top: 15px !important;
  width: 20px !important;
  height: 20px !important;
}
</style>-->
