<template>
  <div class="rank-all">
    <div class="rank-box">
      <div class="rank-topthird">
        <div class="rank-wapper">
          <div class="rank-notfirst" style="background-image: url(https://hjxsuper.top/img/rank/2.png);">
            <img src="https://www.hjxsuper.top/img/wje.png">
          </div>
          <div class="index-userNameBox-CoqLt-second"><div class="index-limitLength-aQns6-second">王嘉尔</div></div>
        </div>

        <div class="rank-wapper">
          <div class="rank-first" style="background-image: url(https://hjxsuper.top/img/rank/1.png);">
            <img src="https://www.hjxsuper.top/img/cxk.webp">
          </div>
          <div class="index-userNameBox-CoqLt-first"><div class="index-limitLength-aQns6-first">iKun</div></div>
        </div>

        <div class="rank-wapper">
          <div class="rank-notfirst" style="background-image: url(https://hjxsuper.top/img/rank/3.png);">
            <img src="https://www.hjxsuper.top/img/xiaozhan.png">
          </div>
          <div class="index-userNameBox-CoqLt-third"><div class="index-limitLength-aQns6-third">肖战</div></div>
        </div>
      </div>

      <div class="rank-list">
        <a v-for="i in 100">
          <div class="rank-num">{{ i }}</div>
          <div class="rank-avatar"><img src="https://hjxsuper-ifans.oss-cn-hangzhou.aliyuncs.com/avatar/2022-11-27/daa38d19fa88426da8da576f43516302微信图片_20221126223726.png"/></div>
          <div class="rank-content">
            <div>蔡徐坤</div>
            <div>
              <span style="color: rgb(255, 119, 0); margin-right: 5px;">12312</span>
              <span style="color: rgb(160, 160, 160); opacity: 0.6;">热度</span>
            </div>
          </div>
          <div class="rank-btn-join">
            <el-button type="warning" plain>打Call</el-button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
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
  height: 280px;
}

.rank-first {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 157px;
}

.rank-first img{
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

.rank-notfirst img{
  height: 90px;
  width: 87px;
  margin-top: 23px;
  z-index: -1;
}

.rank-wapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.rank-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap:wrap;
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
</style>