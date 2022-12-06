<template>
  <div v-if="data.length > 0" class="detail-content-wrapper">
    <div class="confirmorder-container"><h1>订单信息</h1>
      <div class="project-info">
        <!--        <table>
                  <tbody>
                  <tr>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>合计</th>
                  </tr>
                  <tr>
                    <td>
                      <div class="project-content">
                        <div class="content-left"><img src="https://hjxsuper.top/img/rock.png">
                        </div>
                        <div class="content-right"><h1>东莞·彩虹次元动漫嘉年华</h1>
                          <p>东莞万江佳纷广场</p>
                          <p class="ticket-name"><span title="12月31日">12月31日</span> <span></span> <span title="预售票">预售票</span>
                          </p>
                          <div class="ticket-type clearfix"><span></span>电子票</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>￥50</div>
                    </td>
                    <td>
                      <div>1张</div>
                    </td>
                    <td class="total"><p>￥50</p>
                      <p>(不含运费)</p></td>
                  </tr>
                  </tbody>
                </table>-->
        <Table :data="data"
               :column="column"
               :buttons="buttons"
               :button-fun="buttonFun"/>
      </div>
      <div class="loading-mask" style="display: none;">
        <div class="loading-animation"></div>
      </div>
      <!--      <div class="discounts">
              <div class="discounts-list"><p class="">暂无可用优惠券</p></div>
            </div>-->
      <!--      <section class="contact-block">
              <div class="info-title"><span class="title-text">联系人</span> <span class="title-tip">用于接收项目重要通知</span></div>
              <div class="info-content">
                <div class="content-prop"><span class="input-prop props-name">姓名</span>
                  <div class="input-value-wrapper"><input type="text" placeholder="请输入联系人姓名" class="input-value"></div>
                </div>
                <div class="content-prop"><span class="input-prop prop-tel">手机号码</span>
                  <div class="input-value-wrapper"><input type="text" placeholder="请输入联系人手机号" class="input-value"></div>
                </div>
              </div>
            </section>-->
      <div class="total-container clearfix">
        <div>商品总额<span>￥{{ pay_price }}</span></div>
        <div>应付金额<span class="total">￥{{ pay_price }}</span></div>
      </div>
      <div class="confirm-bottom">
        <div class="check-lists">
          <!--          <div class="service-term"><span class="check-icon checked"></span>我已阅读并同意
                      <span class="term-content">《bilibili购票服务协议》</span> <span class="term-content">《会员购服务协议》</span></div>-->
        </div>
        <div class="confirm-paybtn active" @click="doCreateOrder()">下一步支付,￥{{ pay_price }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Table from '@/components/Table'
import {useRoute, useRouter} from "vue-router";
import {confrimInfo, createOrder, pay} from '@/api/order'
import {reactive, ref} from "vue";

import '@/assets/style/order/OrderInfo.scss'
import {Action, ElMessage, ElMessageBox} from "element-plus";


const router = useRouter();
const route = useRoute();

const goodsId = ref();
const count = ref();
const pay_price = ref(0);

const buttons = {
  add: {
    label: '新增', type: "G", permission: ['a:a:a'],
    func: function (data: any) {
      if (data.name = 'Tom') {
        return true;
      } else
        return false
    }
  },
  edit: {label: '修改', type: "G"}
}

function buttonFun(i: any, r: any) {
  alert(i)
}

const data = ref([])

const column = reactive({
  content: {
    prop: 'content',
    label: '商品',
    width: '310',
    align: 'center'
  },
  price: {
    prop: 'price',
    label: '单价',
    align: 'center',
    formatter: (val: any) => {
      return '￥' + val;
    }
  },
  num: {
    prop: 'num',
    label: '数量',
    align: 'center'
  },
  /*address: {
    prop: 'address',
    label: 'Address',
    align: 'center'
  },
  button: {
    prop: 'button',
    label: '操作',
    align: 'center'
  }*/
})

function doConfrimInfo() {
  confrimInfo(route.params.ticket as string).then((res) => {
    data.value = [{
      icon: res.data.icon,
      title: res.data.goodsName,
      type: '虚拟道具',
      price: res.data.price,
      num: res.data.count,
    }] as any;

    goodsId.value = res.data.id;
    count.value = res.data.count;
    pay_price.value = res.data.pay_price;
  })

  /*infoById(goodsid as string).then((res) => {
    data.value = [{
      icon: res.data.icon,
      title: res.data.goodsName,
      type: '虚拟道具',
      price: res.data.price,
      num: count,
    }] as any;

    if (count) {
      pay_price.value = res.data.price * count;
    }
  })*/
}

function doCreateOrder() {
  let params = {
    goodsId: goodsId.value,
    count: count.value,
    pay_money: pay_price.value,
    ticket: route.params.ticket,
  }

  createOrder(params).then((res) => {
    if (res.data.code != 200) {
      ElMessageBox.alert("<font color='red'>" + res.data.msg + "</font>", '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认',
        callback: (action: Action) => {
          //router.push('/store/info/' + goodsId.value)
        }
      })
    } else {
      //打开支付页面
      pay(res.data.orderId).then((payHtml) => {
        const div = document.createElement('div')
        div.innerHTML = payHtml
        document.body.appendChild(div)
        document.forms[0].submit()
      });
    }
  })
}

doConfrimInfo();
</script>