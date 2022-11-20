<template>
  <div class="login-box">
    <div class="login">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
<!--        <h3 class="title">哥哥，这世上一切美好的事情，你的脸就占90%</h3>-->
        <div class="loginbg-box">
          <img class="loginbg" src="https://hjxsuper.top/img/loginbg.webp">
        </div>
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="账号"
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
              @keyup.enter="handlelogin"
          >
            <template #prefix>
              <svg-icon icon-class="password" class="el-input__icon input-icon"/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="large" style="width:48%; padding-right: 2%" @click.prevent="handlelogin">
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>

          <el-button size="large" color="#fb7299" style="width: 48%"><span style="color: #fff;">登录</span></el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="otherLoginType">
      <span>其他登录方式</span>

      <div class="logintype-items">
        <div class="logintype-item"><img src="https://hjxsuper.top/img/weixinicon.png"/><span>微信登录</span></div>
        <div class="logintype-item"><img src="https://hjxsuper.top/img/QQicon.png"/><span>QQ登录</span></div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ElMessageBox} from "element-plus";
import {ref, watch} from 'vue';

//let dialogTableVisible = ref(false);

/*const props = defineProps({
  isShow: {type: Boolean, default: "false"}
});*/

const loginForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: ""
});

const equalToPassword = (rule, value, callback) => {
  if (loginForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const loginRules = {
  username: [
    {required: true, trigger: "blur", message: "请输入您的账号"},
    {min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur"}
  ],
  password: [
    {required: true, trigger: "blur", message: "请输入您的密码"},
    {min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur"}
  ],
  confirmPassword: [
    {required: true, trigger: "blur", message: "请再次输入您的密码"},
    {required: true, validator: equalToPassword, trigger: "blur"}
  ],
  code: [{required: true, trigger: "change", message: "请输入验证码"}]
};

/*watch(props.isShow, (newVal, oldVal) => {
  dialogTableVisible = newVal;
});*/

function handlelogin() {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true;
      login(loginForm.value).then(res => {
        const username = loginForm.value.username;
        ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", "系统提示", {
          dangerouslyUseHTMLString: true,
          type: "success",
        }).then(() => {
          router.push("/login");
        }).catch(() => {
        });
      }).catch(() => {
        loading.value = false;
        /*if (captchaEnabled) {
          getCode();
        }*/
      });
    }
  });
}

/*function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}*/

//getCode();
</script>

<style lang='scss' scoped>
.loginbg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.loginbg {
  width: 150px;
  height: 150px;
  border-radius: 200px;
}

.login-box {
  display: flex;
  flex-wrap: wrap;
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

.logintype-items{
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
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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