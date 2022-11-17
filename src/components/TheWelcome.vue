<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
<!--      <DocumentationIcon />-->
      <img class="idolicon" src="https://www.hjxsuper.top/img/ikun.webp">
    </template>
    <template #heading>蔡徐坤</template>

    <div class="shsj">“巅峰迎来虚伪的拥护，黄昏见证忠实的信徒”，一个真正的man，一个真正的男人，他清楚自己要做什么，如果你真的想要看这个人，是一个男孩还是男人？不要去看他的body，看他的心</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
<!--      <ToolingIcon />-->
      <img class="idolicon" src="https://www.hjxsuper.top/img/xiaozhan.png">
    </template>
    <template #heading>肖战</template>

    <div class="shsj">我对自己长时间地处于一个不太自信的状态，因为我不是科班出身的，所以老是对自己有那么一点点的自我怀疑，所以比别人更在乎、想要被看到</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
<!--      <EcosystemIcon />-->
      <img class="idolicon" src="https://www.hjxsuper.top/img/wje.png">
    </template>
    <template #heading>王嘉尔</template>

    <div class="shsj">累的时侯真的有问过自己，做这么多事是否都值得，每次都跟自己说很开心，这么多人爱护我，真的为了他们，不想让他们失望，不想让他们到外面说‘我是王嘉尔的粉丝’而因为这句话看不起她们，我只想让他们为我感到骄傲。所以我才去拼命</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
<!--      <CommunityIcon />-->
      <img class="idolicon" src="https://www.hjxsuper.top/img/hzt.webp">
    </template>
    <template #heading>黄子韬</template>

    <div class="shsj">我曾说过“一帆风不顺的人生才是真正的人生，不管结局如何”，2015年似乎是“一帆风不顺”的一年，它使我的人生经历了很多考验，但我感激它来的这么早，帮助我在今后走的更远更正。谢谢伴着我这艘小船的你们——我的VVHL</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
<!--      <SupportIcon />-->
      <img class="idolicon" src="https://www.hjxsuper.top/img/zyx.webp">
    </template>
    <template #heading>张艺兴</template>

    <div class="shsj">我不需要别人告诉我我该怎么活，我的选择成就了今天的我，我的故事，我的梦想，我的过错，我的成功，都属于我</div>
  </WelcomeItem>
</template>

<style>
 .idolicon {
   width: 47px;
   height: 47px;
   border-radius: 8px;
   -webkit-border-radius: 8px;
   -moz-border-radius: 8px;
 }

 .shsj {
   width: 100%;
   margin-left: 3%;
 }
</style>