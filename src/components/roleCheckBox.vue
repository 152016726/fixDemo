<template>
  <!-- 单行权限栏开始 -->
  <div class="authorityColumn">
    <div class="authorityTableCell showAuthority">{{authObj.groupName}}</div>
    <div class="authorityTableCell selectAll">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
    </div>
    <div class="authorityTableCell handleAuthority">
      <el-checkbox-group v-model="valueList" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(val, index) in authObj.permissionDatas" :key="authObj.groupId+index" :label="val.permissionId">
          {{val.permissionName}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
  <!-- 单行权限栏结束 -->
</template>

<script>
  export default {
    name: "roleCheckBox",
    data() {
      return {
        valueList: [],              // 选择的valueList
        checkAll: false,                    // 是否全选
        STATICLIST: []                     // 静态的全选List
      }
    },
    props: {
      authObj: {                    // 权限Obj
        type: [Object, Array],
        default: () => {
          return {}
        }
        },
      value: {                // 选中的List
        type: [Object, Array],
        default: () => {
          return []
        }
      }
    },
    watch: {
      /**
       * 本组件勾选的valueList
       * @param val
       */
      valueList(val){
        let arr = this.value;
        // 每一次的value变更都会重新搜取一次外部的selectList确保为最新
        this.STATICLIST.forEach(item=>{
          let index = arr.indexOf(item);
          if( index> -1){
            arr.splice(index, 1)
          }
        });
        arr.push(...val);
        let newVal = Array.from(new Set(arr));
        // 双向绑定外部的selectList
        this.$emit('input', newVal)
      }
    },
    created(){
      let chooseList = [];
      this.STATICLIST = this.authObj.permissionDatas.map(item=>{
        if(item.isEnabled){
          chooseList.push(item.permissionId);
        }
        return item.permissionId
      });
      this.valueList = chooseList;
      // 如果是全选，则默认展示为全选
      if(chooseList.length === this.STATICLIST.length){
        this.checkAll = true;
      }
    },
    methods: {
      /**
       * 权限全选
       * @param val
       */
      handleCheckAllChange(val) {
        this.valueList = val ? this.STATICLIST : [];
      },
      /**
       * 权限具体选择
       * @param value
       */
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.STATICLIST.length;
      }
    }
  }
</script>

<style lang="scss">
  .authorityColumn {
    display: table-row;
    .authorityTableCell {
      display: table-cell;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      font-size: 16px;
      border-bottom: 1Px solid #DDDDDD;
      border-right: 1Px solid #DDDDDD;
      box-sizing: border-box;
    }
    .handleAuthority{
      color: #747783;
      text-align: left;
      box-sizing: border-box;
      .el-checkbox-group{
        padding-left: 35px;
      }
    }
    .showPages{
      color: #747783;
      text-align: left;
      box-sizing: border-box;
      line-height: 50px;
      .el-checkbox{
        padding-left: 27px;
        margin: 0 0;
        display: block;
      }
    }
    .selectAll{
      color: #747783;
      text-align: left;
      line-height: 50px;
      .el-checkbox{
        padding-left: 35px;
        margin: 0 0;
        display: block;
      }
    }
    .selectAll {
      width: 90px;
    }

    .handleAuthority {
      width: 540px;
    }

    .showPages {
      width: 164px;
    }

    .showAuthority {
      width: 350px;
    }
  }
</style>
