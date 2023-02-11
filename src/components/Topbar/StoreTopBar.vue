<template>
  <el-affix style="" :offset="0" :style="{width: '100%', boxShadow: `var(--el-box-shadow)`}">
    <div class="ifans-store-header-bar">

      <div class="ifans-store-header-item">
        <el-link href="/" type="info" :underline="false">主站</el-link>
      </div>

      <div>
        <el-autocomplete v-model="searchtext" placeholder="查找你的宝贝" class="input-with-select"
                         :fetch-suggestions="querySearchAsync"
                         @select="handleSelect"
                         ref="autocomplete"
                         hide-loading="true"
                         debounce="1000"
                         @keyup.enter.native="search">
          <template #append>
            <el-button @click="search" :icon="Search" @keyup.enter.native="search()"/>
          </template>
        </el-autocomplete>
      </div>

      <div class="ifans-store-header-item">
        <AvatarPopover v-if="userStore.token != null && userStore.token != ''"></AvatarPopover>
        <div v-else class="ifans-store-header-item">
          <el-link @click="handleLogin" :underline="false">注册|登录</el-link>
        </div>
      </div>

      <div class="ifans-store-header-item">
        <el-link href="/store/order" :underline="false">订单中心</el-link>
      </div>
    </div>
  </el-affix>

  <SelectorWrapper ref="selectorWrapperRef" @search="search"></SelectorWrapper>
</template>

<script lang="ts" setup>
import AvatarPopover from '@/components/Avatar/AvatarPopover.vue'
import SelectorWrapper from '@/components/SelectorWrapper/index.vue';
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, ref} from 'vue'
import useUserStore from "@/stores/user";
import {useRouter} from "vue-router";
import {search as goodsSearch, suggestGoods} from "@/api/search";

const userStore = useUserStore()
const router = useRouter()
// 调用函数，获取当前组件的实例proxy，这里的proxy类似于vue2中的this
const {proxy}: any = getCurrentInstance()
const searchtext = ref("")
const selectorWrapperRef = ref<any>();
const suggestList = ref([]);
const autocomplete = ref();
const getAttrParam = () => {
  return selectorWrapperRef.value.attrParam();
}
const emit = defineEmits(['searchResultEmit']);

function handleLogin() {
  router.replace({
    name: "login",
    query: {
      redirect: router.currentRoute.value.fullPath // router对象自带的属性
    }
  })
}

const querySearchAsync = (queryString: string, cb: any) => {
  if (queryString.length > 0) {
    suggestGoods(searchtext.value).then(res => {
      suggestList.value.length = 0;
      for (const re of res.data) {
        suggestList.value.push({"value": re});
      }
      console.log(suggestList.value);

      const results = queryString
          ? suggestList.value.filter(createFilter(queryString))
          : suggestList.value
      // call callback function to return suggestions
      cb(results)
    })
  }
  // else {
  //   proxy.$refs["autocomplete"].activated = false;
  // }
}

const createFilter = (queryString: string) => {
  return (suggestList) => {
    return (
        suggestList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: any) => {
  search();
}

// 执行查询
const search = () => {
  goodsSearch({matchWord: searchtext.value, attrs: getAttrParam()}).then((res: any) => {
    if (res?.data != null) {
      emit('searchResultEmit', res.data);
    }
  })
};

defineExpose({ search })
</script>

<style>
.ifans-store-header-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 59px;
  background: #fb7299;
}

.ifans-store-header-item {
  margin: 0 1rem 0 1rem;
}

.ifans-store-header-item a {
  color: #fff;
}

.el-link {
  --el-link-font-size: var(--el-font-size-base);
  --el-link-font-weight: var(--el-font-weight-primary);
  --el-link-text-color: var(--el-text-color-regular);
  --el-link-hover-text-color: #fff;
  --el-link-disabled-text-color: var(--el-text-color-placeholder);
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>