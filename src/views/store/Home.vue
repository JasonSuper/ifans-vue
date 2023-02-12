<template>
  <SelectorWrapper ref="selectorWrapperRef" @search="search"></SelectorWrapper>

  <ul v-infinite-scroll="search" :infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">
    <!--    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>-->
    <div class="project-list-wrapper">
      <div class="project-list">

        <div @click="goinfo(item.id)" class="project-list-item" v-for="item in storelist" :key="item.id">
          <div class="project-list-item-img" :style="{'background-image': 'url(' + item.icon + ')'}"></div>

          <div class="project-list-item-detail">
            <div class="project-list-item-title" style="-webkit-box-orient: vertical;" v-html="item.goodsName"></div>
            <div class="project-list-item-time"><span class="icon time-icon"></span>{{ item.goodsDescribe }}</div>
            <div class="project-list-item-address"><span class="icon address-icon"></span> <span
                class="city-name"></span> <span class="venue-name-and-address"></span></div>

            <div class="project-list-item-price">
              <div class="not-free">
                <span class="price-symbol">¥</span>
                <span class="price">{{ item.price }}</span>
                <span class="start">元</span>
                <!--                <span class="promo-item">独家</span>-->
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
import '@/assets/style/stores/GoodsList.scss'

import {useRoute, useRouter} from "vue-router";
import {getCurrentInstance, nextTick, ref} from "vue";
import type {Store} from '@/interface/Store';
import SelectorWrapper from '@/components/SelectorWrapper/index.vue';
import {search as goodsSearch} from "@/api/search";

const router = useRouter();
const route = useRoute();
const {proxy}: any = getCurrentInstance();
const storelist = ref([] as Store[]);
const page = ref({size: 10, current: 0});
const selectorWrapperRef = ref<any>();
const getAttrParam = () => {
  return selectorWrapperRef.value.attrParam();
}
const matchWord = ref(route.query.matchWord);

function load() {
  page.value.current++;

  // list(page.value).then((res: any) => {
  //   if (res?.data != null) {
  //     storelist.value = storelist.value.concat(res.data.records);
  //   }
  // })
}

function goinfo(id: string) {
  // const { href } = router.resolve({ path: '/store/info/' + id })
  // window.open(href, '_blank')
  router.push({path: '/store/info/' + id});
}

function search() {
  goodsSearch({matchWord: matchWord.value, attrs: getAttrParam()}).then((res: any) => {
    if (res?.data != null) {
      storelist.value.length = 0;
      storelist.value = storelist.value.concat(res.data.product);
    }
  })
};

// 待组件渲染完成才调用子组件的方法p
nextTick(() => {
  //doSearch();
  search();
})
</script>