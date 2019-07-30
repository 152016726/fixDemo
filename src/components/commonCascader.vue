<template>
  <div class="commonCascader clearfix">
    <i class="fl iconText">{{text}}</i>
    <el-cascader
      class="selection fl"
      v-model="areaValue"
      :options="options"
      @active-item-change="handleSearchItemChange"
      :placeholder="placeholderText"
      :disabled="isDisabled"
    >
    </el-cascader>
  </div>
</template>

<script>
  export default {
    name: "commonCascader",
    data() {
      return {
        areaValue: this.value,
        options: []               // selection数组
      }
    },
    props: {
      value: {default: []},                      // 双向绑定value
      text: {default: ''},                      // title
      isDisabled: {default: false},             // 是否可编辑
      placeholderText: {default: '请输入内容'}
    },
    watch: {
      value(val) {
        this.areaValue = val;
      },
      areaValue(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      handleItemChange(val) {
        this.options.some(item => {
          // 一联判断赋值
          if (item.value === val[0]) {
            if (!item.children.length) {
              this.getRegion(val[0], (data)=>{
                item.children = data.map(val=>{
                  return{
                    label: val.name,
                    value: val.unitId,
                    children: []
                  }
                });
                // 二联判断赋值
                if (val[1]) {
                  item.children.some(k => {
                    if (k.value === val[1]) {
                      if (!k.children.length) {
                        this.getRegion(val[1], (data)=>{
                          k.children = data.map(key=>{
                            return{
                              label: key.name,
                              value: key.unitId,
                            }
                          })
                        })
                      }
                      return true
                    } else {
                      return false
                    }
                  });
                  return true
                } else {
                  return true
                }
              })
            }

          } else {
            return false
          }
        })
      },
      /**
       * 搜索
       */
      handleSearchItemChange(val) {
        this.options.some(item => {
          // 一联判断赋值
          if (item.value === val[0]) {
            if (!item.children.length) {
              this.getRegion(val[0], (data)=>{
                item.children = data.map(val=>{
                  return{
                    label: val.name,
                    value: val.unitId,
                    children: []
                  }
                })
              })
            }
            // 二联判断赋值
            if (val[1]) {
              item.children.some(k => {
                if (k.value === val[1]) {
                  if (!k.children.length) {
                    this.getRegion(val[1], (data)=>{
                      k.children = data.map(key=>{
                        return{
                          label: key.name,
                          value: key.unitId,
                        }
                      })
                    })
                  }
                  return true
                } else {
                  return false
                }
              });
              return true
            } else {
              return true
            }
          } else {
            return false
          }
        })
      }, /**
       * 获取下级列表
       * @param parentId
       * @param callback
       */
      getRegion(parentId, callback) {
        this.$post('region/getChild', {parentId}).then(rsp => {
          callback(rsp.datas)
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      }
    },
    created() {
      // 数据回显时加的一些操作待定根据接口而来
      this.getRegion('', (data) => {
        this.options = data.map(item => {
          return {
            label: item.name,
            value: item.unitId,
            children: []
          }
        });
        this.handleItemChange(this.value);
      });

    }
  }
</script>

<style lang="scss">
  .commonCascader {
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
