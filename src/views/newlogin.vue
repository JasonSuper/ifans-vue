<template>
  <div class="signinform">
    <h1>喜欢，唱，跳，rap！</h1>
    <!-- container -->
    <div class="container">
      <!-- main content -->
      <div class="w3l-form-info">
        <div class="w3l_form">
          <div class="left_grid_info">
<!--            <img src="@/assets/images/image.svg" alt=""/>-->
            <img class="loginLogo" src="@/assets/images/loginLogo.jpg" alt=""/>
<!--            <img src="https://hjxsuper.top/img/0.gif">-->
          </div>
        </div>
        <div class="w3_info">
          <h2>加入ifans</h2>
          <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
            <div class="input-group">
<!--              <input type="email" placeholder="邮箱" required="">-->
              <el-form-item prop="email">
                <input
                    v-model="loginForm.email"
                    type="email"
                    size="large"
                    auto-complete="off"
                    placeholder="邮箱"
                >
              </el-form-item>
            </div>
            <div class="input-group">
<!--              <input type="Password" placeholder="密码" required="">-->
              <el-form-item prop="password">
                <input
                    v-model="loginForm.password"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter="handleLogin"
                >
              </el-form-item>
            </div>
<!--            <div class="form-row bottom">
              <div class="form-check">
                <input type="checkbox" id="remenber" name="remenber" value="remenber">
                <label for="remenber">记住我</label>
              </div>
              <a href="#url" class="forgot">忘记密码?</a>
            </div>-->
            <button class="btn btn-primary btn-block" type="button" @click="handleLogin">登录</button>
          </el-form>
          <p class="continue"><span>其他登录方式</span></p>
          <div class="social-login">
            <div class="logintype-item"><img src="https://hjxsuper.top/img/weixinicon.png"/><span>微信登录</span></div>
            <div class="logintype-item"><img src="https://hjxsuper.top/img/QQicon.png"/><span>QQ登录</span></div>
          </div>
          <p class="account">没有账号? <a href="javascript:void(0)" @click="handleRegister">注册</a></p>
        </div>
      </div>
      <!-- //main content -->
    </div>
    <!-- //container -->
    <!-- footer -->
    <div class="footer">
      <p>&copy; 2022 千军万马是ikun，ikun永远爱坤坤 | Design by Jason</p>
    </div>
    <!-- footer -->
  </div>
</template>

<script lang="ts" setup>
import '@/assets/style/login/login.scss';

import {getCurrentInstance, ref, watch} from 'vue';
import useUserStore from '@/stores/user'
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter();
const route = useRoute()
const {proxy}: any = getCurrentInstance();

const redirect = route.query.redirect as string;

const loginForm = ref({
  email: "zz5533114@qq.com",
  password: "zz5533114"
  /*email: "",
  password: ""*/
});

const loginRules = {
  email: [{required: true, trigger: "blur", message: "请输入您的邮箱"}],
  password: [{required: true, trigger: "blur", message: "请输入您的密码"}]
};

defineExpose({open});

/*watch(() => islogin.show, (nv) => {
  console.log(nv)
  if (nv) {
    open()
  }
},{immediate: true, deep: true})*/

function handleRegister() {
  router.replace('/register');
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
        //router.push({path: decodeURIComponent(redirect) || "/"});
        router.push({path: "/"});
      })
    }
  });
}
</script>