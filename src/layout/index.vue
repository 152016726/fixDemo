<template>
    <div :class="classObj" class="app-wrapper clearfix">
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside">

        </div>
    </div>
</template>

<script>
    export default {
        name: "layout",
      data(){
          return{

          }
      },
      props:{

      }
    }
</script>

<style lang="scss" scoped>
.app-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top:0;
  }
}
</style>
