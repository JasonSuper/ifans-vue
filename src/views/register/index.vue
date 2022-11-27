<template>
  <div class="register-box">
    <div class="ifans-icon">
      <img style="boxShadow: var(--el-box-shadow);" src="https://hjxsuper.top/img/0.gif">
    </div>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>立即注册，为哥哥应援</span>
        </div>
      </template>

      <el-form
          ref="registerRef"
          label-position="top"
          label-width="100px"
          :model="registerForm"
          :rules="registerRules"
      >
        <el-form-item prop="username" label="昵称">
          <el-input v-model="registerForm.username"/>
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon"/>
          </template>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input type="e" v-model="registerForm.email"/>
          <template #prefix>
            <svg-icon icon-class="email" class="el-input__icon input-icon"/>
          </template>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registerForm.password"/>
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon"/>
          </template>
        </el-form-item>

        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input type="password" v-model="registerForm.confirmPassword"/>
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon"/>
          </template>
        </el-form-item>

        <el-button class="subbtn" color="#fb7299" @click="handleRegister">注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue'
import router from "@/router";
import {ElMessageBox, ElMessage} from "element-plus";
import {register} from "@/api/login";

const {proxy}: any = getCurrentInstance();

const isShow = ref(true);
const labelPosition = ref('right')

const registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const equalToPassword = (rule: any, value: any, callback: any) => {
  if (registerForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空！"));
  } else {
    const reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("邮箱格式不正确！"));
    }
  }
};

const registerRules = {
  username: [
    {required: true, trigger: "blur", message: "请输入您的昵称"},
    {min: 2, max: 20, message: "昵称长度必须介于 6 和 20 之间", trigger: "blur"}
  ],
  email: [
    {required: true, trigger: "blur", message: "请输入您的邮箱"},
    {required: true, validator: validateEmail, trigger: "blur", message: "请输入正确的邮箱"},
  ],
  password: [
    {required: true, trigger: "blur", message: "请输入您的密码"},
    {min: 5, max: 20, message: "密码长度必须介于 5 和 20 之间", trigger: "blur"}
  ],
  confirmPassword: [
    {required: true, trigger: "blur", message: "请再次输入您的密码"},
    {required: true, validator: equalToPassword, trigger: "blur"}
  ]
};

function handleRegister() {
  proxy.$refs['registerRef'].validate((valid: boolean) => {
    if (valid) {
      register(registerForm.value).then(res => {
        const username = registerForm.value.username;
        ElMessageBox.alert("<font color='red'>恭喜你，" + username + " 注册成功！</font>", "欢迎加入", {
          dangerouslyUseHTMLString: true,
          type: "success",
        }).then(() => {
          router.push("/");
        }).catch(() => {
        });
      }).catch(() => {
        //ElMessage.error("发送错误，注册失败")
      });
    }
  });
}
</script>

<style>
span {
  font-weight: 700;
}

.card-header {
  font-size: 14px;
  line-height: 28px;
  color: #fb7299;
  padding-right: 10px;
  margin-bottom: 0;
}

.box-card {
  min-width: 100%;
}

.register-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.ifans-icon {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5rem;
}

.ifans-icon img {
  width: 150px;
  height: 150px;
  border-radius: 200px;
}

.subbtn {
  margin-top: 1rem;
  color: #fff;
  width: 100%;
}
</style>