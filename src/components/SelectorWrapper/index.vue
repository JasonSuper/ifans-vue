<template>
  <div class="bg">
    <el-row class="row" v-for="item in attrs" :key="item.attrId">
      <div class="title">
        {{ item.attrName + ':' }}
      </div>

      <ul class="attrul">
        <li v-for="(attrValue, index) in item.attrValue">
          <a :class="{'active': chooseList.indexOf(item.attrId + '_' + attrValue) != -1 }" @click="changeActive(item.attrId, attrValue); emit('search');">
            {{ attrValue }}
          </a>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import type {Attr} from "@/interface/Attr";

const attrs = ref([] as Attr[]);
const chooseList = ref([] as string[]);
const props: any = defineProps({
  attrs: {type: Array, default: false},
})
const emit = defineEmits(['search']);


attrs.value.push({
  attrId: "1",
  attrName: "城市",
  attrValue: ["全国", "广东", "上海", "北京", "福建"],
});

attrs.value.push({
  attrId: "2",
  attrName: "类型",
  attrValue: ["全部类型", "演出", "展览", "道具"],
});

// 初始化样式
for (const attr of attrs.value) {
  chooseList.value.push(attr.attrId + "_" + attr.attrValue[0])
}

// a标签点击时，切换样式
function changeActive(attrId: string, attrValue: string) {
  let temp = [];
  for (let i = 0; i < chooseList.value.length; i++) {
    if (chooseList.value[i].split("_")[0] == attrId) {
      temp.push(i);
    }
  }

  for (let i = 0; i < temp.length; i++) {
    chooseList.value.splice(temp[i], 1);
  }
  chooseList.value.push(attrId + "_" + attrValue);
}

const attrParam = () => {
  let res = [];
  for (let i = 0; i < chooseList.value.length; i++) {
    if (!chooseList.value[i].split("_")[1].startsWith("全")) {
      res.push(chooseList.value[i])
    }
  }
  return res;
}

defineExpose({ attrParam })
</script>

<style>
.bg {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 15px 0 hsl(203deg 6% 45% / 9%), 0 1px 0 0 rgb(204 208 215 / 30%);
}

.row {
  box-sizing: border-box;
  background: #fff;
  width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px dashed #ccc;
}

.title {
  width: 50px;
  font-size: 12px;
  color: #99a2aa;
  letter-spacing: 0;
}

.attrul {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 14px;
}

.attrul li {
  width: 90px;
  list-style: none;
  float: left;
}

.attrul li a {
  cursor: pointer;
  color: #99a2aa;
}

.attrul li a:hover {
  color: #fb7299 !important;
  background-color: transparent;
}

.active {
  color: #fb7299 !important;
}

.row:last-child{border:none}
</style>