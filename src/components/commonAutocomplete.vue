<template>
  <div class="commonAutocomplete clearfix">
    <i class="fl iconText">{{text}}</i>
    <el-autocomplete
      class="selection fl"
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :placeholder="placeholderText"
      :disabled="isDisabled"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: "commonAutocomplete",
    data() {
      return {
        state: '',
        restaurants: []
      }
    },
    props: {
      value: {default: ''},                      // 双向绑定value
      text: {default: ''},                      // title
      isDisabled: {default: false},             // 是否可编辑
      placeholderText: {default: '请输入内容'},
      filterState: {}                           // 过滤方法
    },
    watch:{
      value(val){
        if(this.isDisabled) {
          this.state = val;
        }else{
          this.restaurants.forEach(item=>{
            if(item.id === val){
              this.state = item.value;
            }
          })
        }
      }
    },
    methods: {
      /**
       *  模糊查询方法
       */
      querySearchAsync(queryString, cb){
        let def = new Promise((res, rej)=>{
          this.filterState(queryString, res, rej)
        });
        def.then(rsp=>{
          this.restaurants = rsp;
          cb(rsp)
        }, rej=>{
          this.restaurants = rej;
          cb(rej)
        })
      },
      /**
       *  点击事件
       * @param item
       */
      handleSelect(item){
        this.$emit('input', item.id)
      }
    },
    destroyed(){
      this.$emit('input', '')
    },
    created() {
      if(this.isDisabled){
        this.state = this.value;
      }
    }
  }
</script>

<style lang="scss">
  .commonAutocomplete {
    line-height: 30px;
    height: 60px;

    i {
      font-size: 16px;
    }

    .selection, input {
      margin-left: 10px;
      width: 200px;
      height: 30px;
      line-height: 30px;
    }

    input {
      border: 1px solid #DDDDDD;
      text-indent: 8px;
      box-sizing: border-box;
    }

    .el-input__inner {
      height: 30px;
      line-height: 30px;
      padding: 0 0;
      margin: 0 0;
    }

    .el-input__icon {
      line-height: 30px;
    }
  }
</style>
