<template>
  <ul v-infinite-scroll="load" :infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">
<!--    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>-->
    <div class="project-list-wrapper">
      <div class="project-list">

        <div @click="goinfo(item.id)" class="project-list-item" v-for="item in storelist" :key="item.id">
          <div class="project-list-item-img" :style="{'background-image': 'url(' + item.icon + ')'}"></div>

          <div class="project-list-item-detail">
            <div class="project-list-item-title" style="-webkit-box-orient: vertical;">{{ item.goodsName }}</div>
            <div class="project-list-item-time"><span class="icon time-icon"></span>{{ item.goodsDescribe }}</div>
            <div class="project-list-item-address"><span class="icon address-icon"></span> <span class="city-name"></span> <span class="venue-name-and-address"></span></div>

            <div class="project-list-item-price">
              <div class="not-free">
                <span class="price-symbol">¥</span>
                <span class="price">{{ item.price }}</span>
                <span class="start">元</span>
                <span class="promo-item">独家</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </ul>

<!--  <el-scrollbar max-height="2431px">
    <div class="project-list-wrapper">
      <div class="project-list">
        <div @click="goinfo" class="project-list-item">
          <div class="project-list-item-img"
               style="background-image: url(https://hjxsuper.top/img/rock.png);"></div>

          <div class="project-list-item-detail">
            <div class="project-list-item-title" style="-webkit-box-orient: vertical;">超级一飞冲天大火箭</div>
            <div class="project-list-item-time"><span class="icon time-icon"></span>为你的idol提升大大的热度，登上榜首的神器
            </div>
            <div class="project-list-item-address"><span class="icon address-icon"></span> <span
                class="city-name"></span> <span class="venue-name-and-address"></span></div>
            <div class="project-list-item-price">
              <div class="not-free"><span class="price-symbol">¥</span> <span class="price">500</span> <span
                  class="start">起</span> &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span class="promo-item">独家</span> &lt;!&ndash;&ndash;&gt;</div>
            </div>
          </div>
        </div>

        <div class="project-list-item">
          <div class="project-list-item-img"
               style="background-image: url(https://hjxsuper.top/img/feiji.png);"></div>

          <div class="project-list-item-detail">
            <div class="project-list-item-title" style="-webkit-box-orient: vertical;">环球空客级超级飞机</div>
            <div class="project-list-item-time"><span class="icon time-icon"></span>震撼人心的神器，带给哥哥无与伦比的热度
            </div>
            <div class="project-list-item-address"><span class="icon address-icon"></span> <span
                class="city-name"></span> <span class="venue-name-and-address"></span></div>
            <div class="project-list-item-price">
              <div class="not-free"><span class="price-symbol">¥</span> <span class="price">1000</span> <span
                  class="start">起</span> &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span class="promo-item">独家</span> &lt;!&ndash;&ndash;&gt;</div>
            </div>
          </div>
        </div>

        <div class="project-list-item">
          <div class="project-list-item-img"
               style="background-image: url(https://hjxsuper.top/img/banka.png);"></div>

          <div class="project-list-item-detail">
            <div class="project-list-item-title" style="-webkit-box-orient: vertical;">办卡</div>
            <div class="project-list-item-time"><span class="icon time-icon"></span>为哥哥尽一份绵薄之力
            </div>
            <div class="project-list-item-address"><span class="icon address-icon"></span> <span
                class="city-name"></span> <span class="venue-name-and-address"></span></div>
            <div class="project-list-item-price">
              <div class="not-free"><span class="price-symbol">¥</span> <span class="price">30</span> <span
                  class="start">起</span> &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <span class="promo-item">独家</span> &lt;!&ndash;&ndash;&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>-->
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {list} from "@/api/store"
import type {Store} from '@/interface/Store'


const router = useRouter();

const storelist = ref([] as Store[]);

const page = ref({
  size: 10,
  current: 0
})

function load() {
  page.value.current++;

  list(page.value).then((res) => {
    if(res?.data != null) {
      storelist.value = storelist.value.concat(res.data.records);
    }
  })
}

function goinfo(id: string) {
  const { href } = router.resolve({ path: '/store/info/' + id })
  window.open(href, '_blank')
}

load();
</script>

<style scoped>
.infinite-list {
  max-height: 1200px;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}

.project-list, .project-list-wrapper {
  width: 1200px;
  margin: 0 auto;
}

.project-list-item {
  cursor: pointer;
  display: flex;
  position: relative;
  margin-top: 60px;
  margin-right: 40px;
  width: 560px;
  height: 237px;
  background: #fff;
  box-shadow: 0 0 15px 0 hsl(203deg 6% 45% / 9%);
  border-radius: 8px;
  float: left;
  transition: transform .2s;
}

.project-list-item-img {
  transition: transform .1s;
  background: #fff;
  box-shadow: 3px 3px 2px 0 hsl(203deg 6% 45% / 30%);
  border-radius: 8px;
  left: 20px;
  bottom: 24px;
  position: absolute;
  width: 175px;
  height: 233px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.project-list-item-detail {
  margin-left: 223px;
}

.project-list-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin-top: 30px;
  width: 286px;
  height: 48px;
  font-size: 18px;
  color: #222;
  letter-spacing: 0;
  line-height: 24px;
}

.project-list-item-time {
  margin-top: 19px;
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 14px;
  color: #999;
}

.project-list-item-price .not-free {
  display: flex;
  align-items: flex-end;
}

.project-list-item-price {
  margin-top: 40px;
  color: #f25d8e;
}

.price-symbol {
  align-self: flex-end;
  font-size: 18px;
  line-height: 18px;
}

.price {
  margin-left: 4px;
  font-size: 28px;
  letter-spacing: 1px;
  line-height: 24px;
}

.start {
  line-height: 12px;
  margin-left: 5px;
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.promo-item {
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: auto;
  height: 16px;
  line-height: 13.5px;
  margin-left: 8px;
  color: #fb7299;
  font-size: 12px;
  text-align: center;
  border: 1px solid #fb7299;
  border-radius: 1px;
}
</style>