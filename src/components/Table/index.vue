<template>
  <el-table :data="props.data" style="width: 100%">
    <el-table-column v-for="(col, colField) in props.column"
                     :key="colField"
                     :prop="col.prop"
                     :label="col.label"
                     :width="col.width"
                     :fixed="col.fixed"
                     :align="col.align"
                     :sortable="col.sortable"
                     :header-align="col.header_align">
      <template #default="scope">
        <div class="button-col" v-if="typeof colField == 'string' && colField === 'button'">
          <div v-for="(btn, btnKey) in getButtonsArray(false)" :key="btnKey">
            <el-button
                v-if="getShowButton(btn, scope.row)"
                @click="props.buttonFun(btn, scope.row)">
              {{ props.buttons[btn].label }}
            </el-button>
          </div>

          <el-dropdown v-if="buttonNum > buttonShowNum" placement="bottom" trigger="hover">
            <el-button>更多</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <div v-for="(btn, btnKey) in getButtonsArray(true)" :key="btnKey">
                  <el-dropdown-item
                      v-if="getShowButton(btn, scope.row)"
                      @click.native="props.buttonFun(btn, scope.row)">
                    {{ props.buttons[btn].label }}
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="project-content" v-else-if="typeof colField == 'string' && colField === 'content'">
          <div class="content-left"><img :src="scope.row.icon"></div>
          <div class="content-right"><h1>{{ scope.row.title }}</h1>
            <!--            <p>东莞万江佳纷广场</p>
                        <p class="ticket-name"><span title="12月31日">12月31日</span> <span></span> <span title="预售票">预售票</span></p>-->
            <div class="ticket-type clearfix"><span></span>虚拟道具</div>
          </div>
        </div>

        <div v-else>
          {{ formatter(col, scope.row[colField]) }}
        </div>
      </template>
    </el-table-column>

    <!--    <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />-->
  </el-table>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {checkPermi, checkRole} from "@/utils/permission"; // 权限判断函数

const props: any = defineProps({
  data: {type: Array, default: false},
  column: {type: Array, default: false},
  buttons: {type: Object} as any, // 按钮
  buttonFun: {type: Function, default: null} // 按钮点击回调
})

const buttonShowNum = 2;
const buttonNum = 2;

const getButtonsArray = computed(() => (more: boolean) => {
  let arr = Object.keys(props.buttons);
  if (more) {//是否更多
    return arr.slice(buttonShowNum - 1);
  }
  if (arr.length <= buttonShowNum) {
    return arr;
  } else {
    return arr.slice(0, buttonShowNum - 1);
  }
})

const getShowButton = computed(() => (item: any, row: any) => { //显示按钮
  let button = props.buttons[item];
  if (button.permission) {
    let perm = checkPermi(button.permission);
    if (perm && button.func) {
      return button.func(row);
    }
    return perm;
  }
  return true;
})

function formatter(col: any, val: any) {
  if(col.formatter) {
    return col.formatter(val);
  }
  return val;
}
</script>

<style>
.project-info table .project-content .content-left {
  float: left;
  width: 86px;
  height: 114px;
  margin: 5px 0;
}

.project-info table .project-content .content-left img {
  display: block;
  width: 100%;
  height: 100%;
}

.project-info table .project-content .content-right {
  padding: 35px 5px 5px 96px;
}

.project-info table .project-content .content-right h1 {
  max-height: 40px;
  margin-bottom: 15px;
  font-weight: 400;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
  color: #222;
}

.confirmorder-container h1 {
  font-weight: 400;
  font-size: 22px;
  line-height: 52px;
  color: #222;
}

.project-info table .project-content .content-right .ticket-name {
  white-space: nowrap;
}

.project-info table .project-content .content-right p {
  font-size: 12px;
  color: #6d757a;
}

.project-info table .project-content .content-right .ticket-name span {
  margin-right: 4px;
}

.project-info table .project-content .content-right .ticket-type {
  margin-top: 15px;
  font-size: 14px;
  color: #fb7299;
}

.button-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-content-wrapper button {
  margin-right: 5px;
}

.detail-content-wrapper button span {
  min-width: 32px;
}
</style>