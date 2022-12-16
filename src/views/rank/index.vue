<template>
  <ul v-infinite-scroll="load" :infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">

    <div class="rank-all">
      <div class="rank-box">
        <div v-if="topthird.length > 0" class="rank-topthird">

          <div class="rank-wapper">
            <div class="rank-notfirst" style="background-image: url(https://hjxsuper.top/img/rank/2.png);">
              <img :src="topthird[1].avatar">
            </div>
            <div class="index-userNameBox-CoqLt-second">
              <div class="index-limitLength-aQns6-second">{{ topthird[1].idolName }}</div>
            </div>
            <div class="index-hotNum-ONNEy"><span style="color: #000; margin-right: 5px;">{{
                topthird[1].rankHot
              }}</span><span style="color: #000;">热度值</span></div>
            <el-button class="index-joinIn-vr5CQ" type="danger">打Call</el-button>
          </div>

          <div class="rank-wapper">
            <div class="rank-first" style="background-image: url(https://hjxsuper.top/img/rank/1.png);">
              <img :src="topthird[0].avatar">
            </div>
            <div class="index-userNameBox-CoqLt-first">
              <div class="index-limitLength-aQns6-first">{{ topthird[0].idolName }}</div>
            </div>
            <div class="index-hotNum-ONNEy"><span style="color: #000; margin-right: 5px;">{{
                topthird[0].rankHot
              }}</span><span style="color: #000;">热度值</span></div>
            <el-button class="index-joinIn-vr5CQ" type="danger">打Call</el-button>
          </div>

          <div class="rank-wapper">
            <div class="rank-notfirst" style="background-image: url(https://hjxsuper.top/img/rank/3.png);">
              <img :src="topthird[2].avatar">
            </div>
            <div class="index-userNameBox-CoqLt-third">
              <div class="index-limitLength-aQns6-third">{{ topthird[2].idolName }}</div>
            </div>
            <div class="index-hotNum-ONNEy"><span style="color: #000; margin-right: 5px;">{{
                topthird[2].rankHot
              }}</span><span style="color: #000;">热度值</span></div>
            <el-button class="index-joinIn-vr5CQ" type="danger">打Call</el-button>
          </div>
        </div>


        <div class="rank-list">
          <a v-for="(i, index) in other" :key="i.id">
            <div class="rank-num">{{ index + 4 }}</div>
            <div class="rank-avatar"><img
                :src="i.avatar == null ? 'https://hjxsuper-ifans.oss-cn-hangzhou.aliyuncs.com/avatar/2022-11-27/daa38d19fa88426da8da576f43516302微信图片_20221126223726.png' : i.avatar"/>
            </div>
            <div class="rank-content">
              <div>{{ i.idolName }}</div>
              <div>
                <span style="color: rgb(255, 119, 0); margin-right: 5px;">{{ i.rankHot }}</span>
                <span style="color: rgb(160, 160, 160); opacity: 0.6;">热度</span>
              </div>
            </div>
            <div class="rank-btn-join">

              <el-popover placement="top-end" :width="465" :hide-after="0" trigger="click">
                <template #reference>
                  <el-button type="warning" size="small" round plain>打Call</el-button>
                </template>

                <el-tabs tab-position="left" style="height: 310px" class="hitcall-tabs">
                  <el-tab-pane label="道具">

                    <el-scrollbar max-height="275">
                      <div style="width: 94%; height: 275px;">
                        <el-row :gutter="20">
                          <el-col v-for="item in goodsBag" :span="6">
                            <el-popconfirm title="确定使用此道具?" @confirm="doHitcall(item, i)">
                              <template #reference>
                                <el-badge :value="item.total" class="item">
                                  <el-card class="grid-content ep-bg-purple" shadow="hover"><img :src="item.icon">
                                  </el-card>
                                  <div class="goodsname" :title="item.goodsName">{{ item.goodsName }}</div>
                                </el-badge>
                              </template>
                            </el-popconfirm>
                          </el-col>

                          <el-empty v-if="goodsBag.length == 0" style="margin: 0 auto;" description="没有可用道具"/>
                        </el-row>
                      </div>
                    </el-scrollbar>

                    <div style="margin-top: 8px;">
                      <el-button type="danger" size="small" plain @click="goStore()">购买道具</el-button>
                    </div>

                  </el-tab-pane>
                  <!--                  <el-tab-pane label="权益物品"><el-empty style="margin: 0 auto;" description="没有权益物品" /></el-tab-pane>-->
                </el-tabs>
              </el-popover>
            </div>
          </a>
        </div>
      </div>
    </div>
  </ul>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {list, bag, hitcall} from "@/api/rank";
import type {Rank, GoodsBag} from "@/interface/Rank";
import router from "@/router";
import useUserStore from "@/stores/user";
import {ElMessage} from "element-plus";

const topthird = ref([] as Rank[]);
const other = ref([] as Rank[]);

const goodsBag = ref([] as GoodsBag[]);

const page = ref({
  size: 30,
  current: 0
})

const userStore = useUserStore()

function load() {
  page.value.current++;

  list(page.value).then((res: any) => {
    if (res?.data != null) {
      if (page.value.current == 1) {
        topthird.value = res.data.records.slice(0, 3);
        other.value = other.value.concat(res.data.records.slice(3, res.data.records.length));
      } else {
        other.value = other.value.concat(res.data.records);
      }
    }
  })
}

function goStore() {
  router.push("/store/list")
}

function getBag() {
  bag().then((res) => {
    goodsBag.value = res.data;
  })
}

function doHitcall(item: any, i: any) {
  let param = {
    idolId: i.id,
    goodsId: item.goodsId,
    nums: 1,
  }

  if (item.total <= 0) {
    ElMessage.error("打Call失败，您的道具数量不足！");
  } else {
    hitcall(param).then((res) => {
      if (res.data.code == 200) {
        item.total -= 1;
        i.rankHot += res.data.rankHot;
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
    })
  }
}

getBag();
load();
</script>

<style>
.infinite-list {
  height: 1200px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.rank-all {
  /*background-image: url(https://shark2.douyucdn.cn/front-publish/weibo-web-master/images/fa3e6afdb7a51192d2f0ac201319f7f7.png);
  z-index: 0;
  background-size: 2010px 1110px;
  background-color: #FF843B;
  background-position: top;
  background-repeat: repeat-x;*/
}

.rank-box {
  width: 960px;
  margin: 0 auto;
}

.rank-topthird {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 340px;
}

.rank-first {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 157px;
}

.rank-first img {
  height: 109px;
  width: 110px;
  margin-top: 30px;
  z-index: -1;
}

.rank-notfirst {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 120px;
  margin-top: 39px;
}

.rank-notfirst img {
  height: 90px;
  width: 87px;
  margin-top: 23px;
  z-index: -1;
}

.rank-wapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.rank-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
}

.rank-list a {
  display: flex;
  justify-content: center;
  width: 50%;
  border-bottom: 1px solid #eeeeee;
  padding: 8px;
  margin-right: auto;
}

.rank-num {
  display: flex;
  align-items: center;
  width: 5%;
  margin: 0 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  color: rgb(160, 160, 160) !important;
}

.rank-content {
  width: 80%;
  color: #3C3C3C !important;
}

.rank-avatar {
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
}

.rank-avatar img {
  width: 40px;
  height: 40px;
}

.rank-btn-join {
  display: flex;
  align-items: center;
  width: 15%;
}

a:hover {
  background: #fff !important;
}

.index-userNameBox-CoqLt-first {
  position: absolute;
  bottom: -20px;
  width: 130px;
  height: 34px;
  text-align: center;
  line-height: 30px;
  background: url(https://shark2.douyucdn.cn/front-publish/weibo-web-master/images/5ec48075df637802e252f6e6b62b0821.png) no-repeat;
  background-size: contain;
}

.index-limitLength-aQns6-first {
  width: 85px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #99750f;
  font-size: 16px;
  font-weight: bold;
}


.index-userNameBox-CoqLt-second {
  position: absolute;
  bottom: -18px;
  width: 108px;
  height: 28px;
  text-align: center;
  line-height: 24px;
  background: url(https://shark2.douyucdn.cn/front-publish/weibo-web-master/images/308f028793e3d761a2eb8fc0283779a1.png) no-repeat;
  background-size: contain;
}

.index-limitLength-aQns6-second {
  width: 75px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #23899e;
  font-size: 12px;
  font-weight: bold;
}

.index-userNameBox-CoqLt-third {
  position: absolute;
  bottom: -20px;
  width: 108px;
  height: 28px;
  text-align: center;
  line-height: 24px;
  background: url(https://shark2.douyucdn.cn/front-publish/weibo-web-master/images/9efd3e38df662d8239fe2f2a64d9a287.png) no-repeat;
  background-size: contain;
}

.index-limitLength-aQns6-third {
  width: 75px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #a3481e;
  font-size: 12px;
  font-weight: bold;
}

.index-hotNum-ONNEy {
  position: absolute;
  font-size: 14px;
  bottom: -42px;
  left: 115px;
  width: 118px;
  height: 14px;
}

.index-joinIn-vr5CQ {
  position: absolute;
  bottom: -76px;
  left: 130px;
  width: 60px;
  height: 22px;
  border-radius: 12px;
  border: 1px solid #fff;
  color: #fff;
  line-height: 24px;
}

.hitcall-tabs > .el-tabs__content {
  padding: 0px 16px 0 16px;
  color: #6b778c;
  /*font-size: 16px;
  font-weight: 600;*/
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 10px;
}

.grid-content img {
  width: 50px;
  height: 50px;
  /*border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border: 2px #ccc solid;*/
}

.el-col-6 {
  max-width: 25%;
  flex: 0 0 25%;
}

.el-card__body {
  padding: 0 !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.item {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.el-badge__content.is-fixed {
  position: absolute;
  top: 51px;
  right: 20px !important;
  transform: translateY(-50%) translateX(100%);
}

.el-tabs__item.is-active {
  color: #f89898;
}

.el-tabs__active-bar {
  background-color: #f89898;
}

.goodsname {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>