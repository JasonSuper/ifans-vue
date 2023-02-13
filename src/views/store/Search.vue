<template>
  <StoreTopBar ref="stbRef" @search-result-emit="searchResultEmit"></StoreTopBar>

  <ul v-infinite-scroll="doSearch" :infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">
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
</template>

<script lang="ts" setup>
import '@/assets/style/stores/GoodsList.scss'

import {useRouter} from "vue-router";
import {getCurrentInstance, nextTick, ref} from "vue";
import type {Store} from '@/interface/Store';
import StoreTopBar from '@/components/Topbar/StoreTopBar.vue';

const router = useRouter();
const {proxy}: any = getCurrentInstance();
const storelist = ref([] as Store[]);
const page = ref({size: 10, current: 0});
const stbRef = ref<any>();
const doSearch = () => {
  stbRef.value.tosearch();
}

function load() {
  page.value.current++;
}

function goinfo(id: string) {
  router.push({path: '/store/info/' + id});
}

function searchResultEmit(res: any) {
  if (res?.data != null) {
    storelist.value.length = 0;
    storelist.value = storelist.value.concat(res.data.product);
  }
}

nextTick(() => {
  doSearch();
})
</script>