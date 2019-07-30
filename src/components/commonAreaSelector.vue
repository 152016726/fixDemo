<template>
  <div class="commonAreaSelector clearfix">
    <i class="fl">{{text}}</i>
    <div class="province fl">
      <el-select v-model="provinceId" :disabled="isDisabled" class="selection fl">
        <el-option
          v-for="item in provinceList"
          :key="item.unitId"
          :label="item.name"
          :value="item.unitId">
        </el-option>
      </el-select>
      <i class="fl iconText">省</i>
    </div>
    <div class="city fl">
      <el-select v-model="cityId" :disabled="isDisabled" class="selection fl">
        <el-option
          v-for="item in cityList"
          :key="item.unitId"
          :label="item.name"
          :value="item.unitId">
        </el-option>
      </el-select>
      <i class="fl iconText">市</i>
    </div>
    <div class="area fl">
      <el-select v-model="areaId" :disabled="isDisabled" class="selection fl">
        <el-option
          v-for="item in areaList"
          :key="item.unitId"
          :label="item.name"
          :value="item.unitId">
        </el-option>
      </el-select>
      <i class="fl iconText">区</i>
    </div>
    <div class="street fl">
      <!--<commonTextInput v-model="street" :isDisabled="isDisabled" :text="'乡镇街道'"></commonTextInput>-->
      <i class="fl iconText">乡镇街道</i>
      <el-select v-model="streetId" :disabled="isDisabled" class="selection fl">
        <el-option
          v-for="item in streetList"
          :key="item.unitId"
          :label="item.name"
          :value="item.unitId">
        </el-option>
      </el-select>
    </div>
    <div class="village fl">
      <!--<commonTextInput v-model="village" :isDisabled="isDisabled" :text="'村委会'"></commonTextInput>-->
      <i class="fl iconText">村委会</i>
      <el-select v-model="villageId" :disabled="isDisabled" class="selection fl">
        <el-option
          v-for="item in villageList"
          :key="item.unitId"
          :label="item.name"
          :value="item.unitId">
        </el-option>
      </el-select>
    </div>
    <div class="address fl">
      <commonTextInput v-model="subAddress" :isDisabled="isDisabled" :text="'详细地址'"></commonTextInput>
    </div>
  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';

  export default {
    name: "commonAreaSelector",
    components: {
      commonTextInput
    },
    data() {
      return {
        provinceId: this.province,
        provinceList: [                 // 省份列表
        ],
        cityId: this.city,
        cityList: [                     // 城市列表
        ],
        areaId: this.area,
        areaList: [                     // 区域列表
        ],
        streetId: this.street,
        streetList:[],                  // 街道List
        villageId: this.village,
        villageList: [],                // 村落List
        subAddress: this.address        // 详细地址
      }
    },
    props: {
      text: {default: ''},          // 标题
      province: {default: ''},      // 省份
      city: {default: ''},          // 城市
      area: {default: ''},          // 区域
      street: {default: ''},        // 街道
      village: {default: ''},       // 村庄
      address: {default: ''},       // 详细地址
      isDisabled: {default: false}, // 是否可编辑
    },
    watch:{
      /**
       * 赋值子组件省份ID
       */
      province(val){
        this.provinceId = val;
      },
      /**
       * 获取市列表
       */
      provinceId(val){
        this.getRegion(val,(data)=>{
          this.cityList = data;
        });
        // 赋值父组件省份ID
        this.$emit('update:province',val);
      },
      /**
       * 赋值子组件城市ID
       */
      city(val){
        this.cityId = val;
      },
      /**
       * 获取区列表
       */
      cityId(val){
        this.getRegion(val,(data)=>{
          this.areaList = data;
        });
        // 赋值父组件城市ID
        this.$emit('update:city',val);
      },
      /**
       * 赋值子组件区域ID
       */
      area(val){
        this.areaId = val;
      },
      /**
       * 获取街道列表
       */
      areaId(val){
        this.getRegion(val,(data)=>{
          this.streetList = data;
        });
        // 赋值父组件区域ID
        this.$emit('update:area',val);
      },
      /**
       * 赋值子组件街道ID
       */
      street(val){
        this.streetId = val;
      },
      /**
       * 获取村庄列表
       */
      streetId(val){
        this.getRegion(val,(data)=>{
          this.villageList = data;
        });
        // 赋值父组件街道ID
        this.$emit('update:street',val);
      },
      /**
       * 赋值子组件村庄ID
       */
      village(val){
        this.villageId = val;
      },
      /**
       * 赋值父组件村庄ID
       */
      villageId(val){
        this.$emit('update:village',val);
      },
      /**
       * 赋值子组件详细地址
       */
      address(val){
        this.subAddress = val;
      },
      /**
       * 赋值父组件详细地址
       */
      subAddress(val){
        this.$emit('update:address',val);
      }
    },
    methods: {
      /**
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
      // 获取省列表
      this.getRegion('',(data)=>{
        this.provinceList = data;
      });
      const {province, city, area, street, village} = this;
      if(province){
        // 获取市列表
        this.getRegion(province,(data)=>{
          this.cityList = data;
        });
      }
      if(city){
        // 获取区列表
        this.getRegion(city,(data)=>{
          this.areaList = data;
        });
      }
      if(area){
        // 获取街道列表
        this.getRegion(area,(data)=>{
          this.streetList = data;
        });
      }
      if(street){
        // 获取街道列表
        this.getRegion(street,(data)=>{
          this.villageList = data;
        });
      }
    }
  }
</script>

<style lang="scss">
  .commonAreaSelector {
    font-size: 16px;
    line-height: 30px;

    .province, .city, .area {
      margin-left: 6px;
      .el-select, .el-input, .el-input__inner {
        width: 82px;
        height: 30px;
      }
      .iconText {
        margin-left: 8px;
      }
    }

    .selection {
      width: 80px;
      height: 30px;

      input {
        width: 75px;
        height: 30px;
      }

      .el-input__icon {
        line-height: 30px;
      }

      .el-input__inner {
        padding-left: 4px;
      }
    }

    .street, .village, .address {
      margin-left: 6px;
    }

    .street, .village {
      .el-select{
        margin-left: 8px;
      }
      .el-select, .el-input, .el-input__inner {
        width: 140px;
        height: 30px;
      }
    }

    .address {
      .commonTextInput {
        .commonTextInputContent {
          .inputType {
            width: 300px;
            height: 30px;
          }
        }
      }

    }
  }
</style>
