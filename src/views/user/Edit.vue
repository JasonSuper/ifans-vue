<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>帐号信息设置</span>
      </div>
    </template>

<!--  :method="handleUploadAvatar"  -->
    <div class="avatar-box">
      <el-upload
          class="avatar-uploader"
          action="/dev-api/fileupload/oss/simpleUpload"
          :data="{path: 'avatar'}"
          :headers="headerObj"
          :with-credentials="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </div>

    <div class="edit-box">
      <el-form
          ref="editRef"
          label-position="top"
          label-width="50px"
          :model="editForm"
          :rules="editRules"
      >
        <el-form-item prop="userName" label="昵称">
          <el-input v-model="editForm.userName"/>
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon"/>
          </template>
        </el-form-item>

        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="subbtnbox">
          <el-button color="#fb7299" @click="handleEditInfo">确认</el-button>
        </div>
      </el-form>
    </div>

  </el-card>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import type {UploadProps} from 'element-plus'
import {ElMessage, ElMessageBox} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import useUserStore from '@/stores/user'
import {editInfo, uploadAvatar} from '@/api/sysuser'
import {useRouter} from "vue-router";
import {getToken} from "@/utils/auth";

const {proxy}: any = getCurrentInstance();
const router = useRouter();

let imageUrl = useUserStore().avatar;

const editForm = reactive({
  userName: useUserStore().name,
  sex: useUserStore().sex,
});

const editRules = {
  userName: [
    {required: true, trigger: "blur", message: "请输入您的昵称"},
    {min: 2, max: 20, message: "昵称长度必须介于 6 和 20 之间", trigger: "blur"}
  ],
  sex: [
    {required: true, trigger: "blur", message: "请选择性别"},
  ],
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  console.log(response);
  imageUrl = response.data;
  //imageUrl = URL.createObjectURL(uploadFile.raw!)
  /*ElMessageBox.alert("<font color='red'>头像修改成功！</font>", "头像", {
    dangerouslyUseHTMLString: true,
    type: "success",
  })*/
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png') {
    ElMessage.error('头像图片必须png格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片不能大于2MB！')
    return false
  }
  return true
}

const headerObj = {
  Authorization: 'Bearer ' + getToken()
}

/**
 * 修改基础信息
 */
function handleEditInfo() {
  proxy.$refs['editRef'].validate((valid: boolean) => {
    if (valid) {
      editInfo(imageUrl, editForm.userName, editForm.sex).then((res) => {
        if (res.code == 200) {
          useUserStore().getInfo();
          ElMessage.success("修改成功！");
          router.push("/");
        } else {
          ElMessage.error("出现异常，修改失败！");
        }
      })
    }
  })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
span {
  font-weight: 700;
}

.card-header {
  font-size: 14px;
  line-height: 28px;
  padding-right: 10px;
  margin-bottom: 0;
}

.box-card {
  width: 600px;
  margin: 0 auto;
  margin-top: 1.5rem;
}

.edit-box {
  /*display: flex;
  flex-wrap: wrap;*/
  margin-top: 3rem;
}

.avatar-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 200px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.subbtnbox {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
}

.subbtnbox button, .subbtnbox button:hover, .subbtnbox button:active {
  color: #fff;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #fb7299;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #fb7299;
  background: #fb7299;
}
</style>