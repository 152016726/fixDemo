<template>
  <div class="notFound">
    <div class="lost">
      <div class="notFoundContent centerShow">
        <div class="logo"></div>
        <h1>天呐，你访问的页面失踪了！</h1>
        <div class="tips">{{duration}}秒后自动跳转到上一页，如没有跳转请点击此链接</div>
        <div class="btn">
          <div class="backIndex" @click="goIndex">返回首页</div>
          <div class="backPre" @click="goBack">返回上一页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import timer from '@/common/js/timer';

  const timerOps = {          // 计时器参数
    key: 'notFound',
    duration: 5
  };
  export default {
    name: "notFound",
    data() {
      return {
        duration: 4       // 计时
      }
    },
    methods: {
      /**
       * 设定计时器
       * @param duration
       */
      setDuration(duration) {
        if (duration > 0) {
          this.duration = duration;
        } else {
          this.duration = 5;
          // 销毁计时器
          timer.clearTimer(timerOps.key);
          this.goBack()
        }
      },
      /**
       * 返回上一页
       */
      goBack(){
        this.$router.go(-1)
      },
      /**
       * 返回首页
       */
      goIndex(){
        this.$router.push({
          path: './'
        })
      }
    },
    created() {
      // 创建计时器
      timer.setTimer(Object.assign(
        {},
        timerOps,
        {
          callback: (duration) => {
            this.setDuration(duration)
          }
        }
      ))
    },
    destroyed() {
      // 销毁计时器
      timer.clearTimer(timerOps.key);
    }
  }
</script>

<style lang="scss">
  .notFound {
    padding: 30px 20px 10px 20px;
    background-color: #F0F2F5;

    .lost {
      height: 820px;
      background-color: #ffffff;
      position: relative;

      .notFoundContent {
        text-align: center;

        .logo {
          width: 430px;
          height: 555px;
          background: url("../assets/404.png") no-repeat center center;
          background-size: 100% 100%;
        }

        h1 {
          font-size: 26px;
          padding: 30px 0;
        }

        .tips {
          color: #818898;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .btn {
          display: flex;
          justify-content: center;

          .backIndex, .backPre {
            cursor: pointer;
            width: 130px;
            height: 40px;
            background-color: #4486FF;
            color: #ffffff;
            line-height: 40px;
            border-radius: 4px;
          }

          .backIndex {
            margin-right: 30px;
          }
        }
      }
    }
  }
</style>
