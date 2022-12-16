<template>
  <ul v-infinite-scroll="load" :infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">
    <div v-if="orderlist.length > 0" class="order-list-wrapper">
      <div class="order-list">
        <div class="order-item" v-for="order in orderlist" :key="order.id">
          <div class="order-header-wrapper" now="1669861852464">
            <div class="order-header-time">创建时间：{{ parseTime(order.orderTime, "") }}</div>
            <div class="order-header-id">订单号：{{ order.orderNo }}</div>
            <!--          <div class="order-header-status">已取消</div>-->
            <div class="order-header-status">{{ payTypeFormater(order.payStatus) }}</div>
          </div>

          <div class="order-item-body-wrapper" v-for="item in order.storeOrderItems" :key="item.id">
            <div class="order-item-img"
                 :style="{'background-image': 'url(' + item.goodsIcon + ')'}"></div>
            <div class="order-item-body">
              <div class="order-item-name-wrapper">
                <div class="name order-item-title-name" style="-webkit-box-orient: vertical;">{{ item.goodsName }}</div>
                <!--              <div class="time">场次：2月4日</div>-->
              </div>
              <div class="order-item-count">{{ item.num }}件</div>
              <div class="order-item-total">
                <div class="order-item-total_money">{{ priceLogoFormater(order.payPrice) }}</div>
              </div>
              <div class="order-item-ticket-type">电子道具</div>
              <div class="order-item-deliver">
                无需配送
              </div>
            </div>
            <div class="order-item-btn-group">
              <el-button class="btn checkdetail" type="danger" v-if="order.payStatus == '0'" @click="doPay(order.id)">支付</el-button>
              <el-button class="btn checkdetail" v-if="order.payStatus == '0'" @click="doClosepay(order.orderNo)">取消订单
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!--    <div class="whole-pagination-wrapper">
            <div class="pagination-wrapper">
              <div class="arrow pagination-left-arrow disabled"></div>
              <div class="pagination"><span class="pageNum active">1
          </span></div>
              <div class="arrow pagination-right-arrow disabled"></div>
            </div>
          </div>-->
    </div>
    <el-empty v-else description="目前没有订单"/>
  </ul>
</template>

<script lang="ts" setup>
import '@/assets/style/order/Order.scss'
import {ref} from "vue";
import {closepay, list, pay} from "@/api/order";
import type {Order} from '@/interface/Order'
import {parseTime} from '@/utils/common'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter();
const page = ref({
  size: 10,
  current: 0
})

let orderlist = ref([] as Order[]);

function load() {
  page.value.current++;

  list(page.value).then((res: any) => {
    if (res?.data != null) {
      orderlist.value = orderlist.value.concat(res.data.records);
    }
  })
}

function payTypeFormater(paystatus: any) {
  switch (paystatus) {
    case 0:
      return '未付款';
    case 1:
      return '已付款';
    case 4:
      return '已取消';
  }
}

function priceLogoFormater(price: any) {
  if (price) {
    return '￥' + price;
  }
  return null;
}

function doClosepay(orderNo: string) {
  closepay(orderNo).then((res) => {
    router.go(0)
    //this.$router.go(0);
  })
}

function doPay(orderId: string) {
  //打开支付页面
  pay(orderId).then((res) => {
    if (res.data.code == 200) {
      let payHtml = res.data.payPage;
      const div = document.createElement('div')
      div.innerHTML = payHtml
      document.body.appendChild(div)
      document.forms[0].submit()

      //window.location.href = payHtml
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}

load();
</script>

<style scoped>
.infinite-list {
  height: 1200px;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}
</style>