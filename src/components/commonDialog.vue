<template>
  <div class="commonDialog"
       v-if="isShowText || show"
  >
    <!--v-clickOutside="handleClose"-->
    <div class="tag" v-if="isShowText" @click.stop="toggleContent">
      <div class="icon" :style="{backgroundImage: 'url('+iconImg +')'}"></div>
      <span>{{text}}</span>
    </div>
    <div class="mc" v-if="show">
      <div class="mask" @click.stop="handleClose" :style="{zIndex: zIndex}"></div>
      <div class="outContent" :style="{zIndex: zIndex+1}">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *需要调用这同时传show(是否显示内容)和toggleMainContent(内容的显示隐藏切换)
   */
  export default {
    name: "commonDialog",
    data() {
      return {
        zIndexBackUp: 1,

      }
    },
    props: {
      iconImg: {default: ''},        // 图标
      text: String,                  // 显示的文字
      show: {                        // 是否展示
        default: false
      },
      toggleMainContent: {},        // 内容的显示隐藏切换函数
      isShowText: {default: true}   // 是否外部需要展示用来操作的内容
    },
    computed: {
      zIndex: function () {
        if (this.show) {
          return this.zIndexBackUp + 100;
        } else {
          return this.zIndexBackUp;
        }
      }
    },
    directives: {
      //实现点击容器以外的地方隐藏容器
      clickOutside: {
        // 初始化指令
        bind(el, binding, vnode) {
          function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
              return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
              // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
              binding.value(e);
            }
          }

          // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
          el.__vueClickOutside__ = documentHandler;
          document.addEventListener('click', documentHandler);
        },
        unbind(el, binding) {
          // 解除事件监听
          document.removeEventListener('click', el.__vueClickOutside__);
          delete el.__vueClickOutside__;
        },
      }
    },
    methods: {
      /**
       * 显示或隐藏
       */
      toggleContent() {
        this.toggleMainContent();
      },
      /**
       * 点击容易以外的地方隐藏容器
       * @param e
       */
      handleClose(e) {
        this.toggleMainContent(1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .commonDialog {
    width: 100%;

    .tag {
      cursor: pointer;
      color: #4486FF;
      line-height: 20px;
      font-size: 16px;
      text-align: center;

      .icon {
        height: 20px;
        width: 20px;
        /*background-color: #4486FF;*/
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        background-size: contain;
      }
    }

    .mc {
      .mask {
        cursor: pointer;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .5;
      }

      .outContent {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        >div{
          max-height: 100vh;
          -ms-scroll-chaining: chained;
          -ms-overflow-style: none;
          -ms-content-zooming: zoom;
          -ms-scroll-rails: none;
          -ms-content-zoom-limit-min: 100%;
          -ms-content-zoom-limit-max: 500%;
          -ms-scroll-snap-type: proximity;
          -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
          -ms-overflow-style: none;
          overflow-y: auto;
          background: #fff;
          &::-webkit-scrollbar {
            width:0px;
            height:0px;
          }
          &.-o-scrollbar{
            -moz-appearance: none !important;
            background: rgba(0,255,0,0) !important;
          }
        }
      }
    }
  }
</style>
