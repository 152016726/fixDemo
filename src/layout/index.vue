<template>
  <div :class="classObj" class="app-wrapper clearfix">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside">

    </div>
  </div>
</template>

<script>
    import ResizeHandler from "./mixin/ResizeHandler";
    export default {
        name: "layout",
        mixins: [ResizeHandler],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            fixedHeader() {
                return this.$store.state.setting.fixedHeader
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods:{
          handleClickOutside(){
              this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
</style>
