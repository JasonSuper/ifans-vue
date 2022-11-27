<template>
  <div class="buyticket">
    <el-breadcrumb class="bread-wrapper" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">ifans</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/store/list' }">商城</el-breadcrumb-item>
      <el-breadcrumb-item>{{ info.goodsName }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="whole-detail-info-wrapper">
      <div class="detail-img-icon no_pic" :style="{'background-image': 'url(' + info.icon + ')'}"></div>
      <div class="detail-info-wrapper">
        <div class="product-info-name"><!----> <span class="title">{{ info.goodsName }}</span></div> <!---->
        <!--        <div class="product-info-time-wrapper">
                  <div class="product-info-time-title">时间：</div>
                  <div class="product-info-time">2022.12.03 10:00 - 12.04 17:00</div>
                </div>-->
        <div class="vuene-wrapper">
          <!--          <div class="title">道具：</div>-->
          <div class="vuene-info-content">
            <div class="vuene-name">{{ info.goodsDescribe }}</div>
            <!--            <div class="address-name"></div>
                        <div class="address-icon"></div>-->
            <!--            <div class="check-map">查看地图</div>-->
          </div>
        </div> <!---->
        <div class="login-show-wrapper">
          <!--          <ul class="clearfix mr4">
                      <li class="title">描述：</li>
                      <li class="screens">
                        <div class="selectable-option active">12月3日</div>
                      </li>
                    </ul>-->
          <ul class="clearfix">
            <li class="title">价格：</li>
            <li class="tickets">
              <div class="selectable-option active">¥{{ info.price }}</div>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="title">数量：</li>

            <li class="num-content">
              <!--              <div class="ticket-count">
                              <div class="count-reduce active"></div>
                              <div class="count-number">1</div>
                              <div class="count-plus active"></div>
                            </div>-->

              <el-input-number v-model="num" :min="1" :max="10" @change="handleChange"/>
            </li>
          </ul>
          <!--          <div class="supplement">
                      <div class="express-info"><i class="icon-small-circle"></i> <span>电子票/兑换票·无需配送</span> &lt;!&ndash;&ndash;&gt;</div> &lt;!&ndash;&ndash;&gt;
                      <div class="refund-info"><i class="icon-small-circle"></i> <span class="">不支持7天无理由退票</span></div>
                    </div>-->
          <div class="product-buy-wrapper">
            <div class="product-buy enable">
              <div>立即购买</div>
            </div>
            <!--            <div class="promo-btn" style="">
                          <div class="sub-text">参与限时优惠</div>
                          <div class="sub-text">低至2.0折</div>
                          <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper"><p>该功能仅限移动端享用</p>
                              <p>快扫描参与限时特惠活动吧~</p></div>
                            <div id="qrcode-promo-xsth" class="qrcode-promo-xsth"
                                 title="http://show.bilibili.com/m/platform/detail.html?id=69716&amp;from=pc_showdetail&amp;noTitleBar=1">
                              <canvas width="160" height="160" style="display: block;"></canvas>
                              <img alt="Scan me!" crossorigin="anonymous"
                                   src="https://hjxsuper.top/img/rock.png"
                                   style="display: none;"></div>
                          </div>
                        </div>-->
            <!--            <div class="promo-btn" style="display: none;">
                          我要拼团
                          <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper"><p>该功能仅限移动端享用</p>
                              <p>快扫描二维码发起拼团吧~</p></div>
                            <div id="qrcode-promo" class="qrcode-promo"></div>
                          </div>
                        </div>-->
            <!--            <div class="promo-btn" style="display: none;">
                          参加票票团
                          <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper"><p>该功能仅限移动端享用</p>
                              <p>快扫描二维码参加票票团吧~</p></div>
                            <div id="qrcode-promo-refund" class="qrcode-promo-refund"></div>
                          </div>
                        </div> &lt;!&ndash;&ndash;&gt;-->
            <!--            <div class="want-wrapper"><span class="want-icon"></span>
                          <div class="want-content">&lt;!&ndash;&ndash;&gt; <p>643人想去</p></div>
                        </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {ArrowRight} from '@element-plus/icons-vue'
import {infoById} from '@/api/store'
import {useRoute} from "vue-router";
import type {Store} from '@/interface/Store'

import '@/assets/style/stores/GoodsInfo.scss'


const route = useRoute();
const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}

let info = ref();

function loadinfo() {
  infoById(route.params.id).then((res) => {
    info.value = res.data;
  })
}

loadinfo();
</script>