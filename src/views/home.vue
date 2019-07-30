<template>
  <div class="home">
    <!-- 查询开始 -->
    <div class="filterPart clearfix">
      <div class="part fl">
        <i>全国地域</i>
        <el-select v-model="value" placeholder="请选择" class="selection">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="part fl">
        <i>医疗机构</i>
        <input type="text" placeholder="请输入">
      </div>
      <div class="part fl">
        <i>医生团队</i>
        <input type="text" placeholder="请输入">
      </div>
      <div class="part fl">
        <i>医生姓名</i>
        <input type="text" placeholder="请输入">
      </div>
      <el-button type="primary" @click.prevent.stop="">查询</el-button>
    </div>
    <!-- 查询结束 -->

    <!-- 饼图开始 -->
    <div class="yesterday clearfix">
      <div class="survey fl">
        <p class="surTitle">签约数</p>
        <div class="surTypes clearfix">
          <div class="item fl">
            <div class="description">
              <p>3213户</p>
              <p>3213人</p>
              <span>签约总数</span>
            </div>
            <div class="icon"></div>
          </div>
          <div class="item fl">
            <div class="description">
              <p>3213户</p>
              <p>3213人</p>
              <span>昨天签约</span>
            </div>
            <div class="icon"></div>
          </div>
          <div class="item fl">
            <div class="description">
              <p>3213户</p>
              <p>3213人</p>
              <span>7天签约</span>
            </div>
            <div class="icon"></div>
          </div>
          <div class="item fl">
            <div class="description">
              <p>3213户</p>
              <p>3213人</p>
              <span>15天签约</span>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
      <div class="pie fl">
        <div class="pieCharts" id="surPie">

        </div>
        <div class="textColumn">
          <div class="textType">
            <div class="tag"></div>
            <i>基卫</i>
          </div>
          <div class="textType">
            <div class="tag"></div>
            <i>微信</i>
          </div>
          <div class="textType">
            <div class="tag"></div>
            <i>随访包</i>
          </div>
        </div>
      </div>
    </div>
    <!-- 饼图结束 -->

    <!-- 趋势图开始 -->
    <div class="trendcy">
      <div class="trendTitle">签约趋势</div>
      <div class="line">
        <div class="description">
          <div class="types">
            <div class="dayType">
              <span v-for="(item, index) in dayType" :key="index" @click="dayTypeClick(index)"
                    :class="{active: index===dayTypeIndex}">{{item}}</span>
            </div>
            <div class="signType">
              <span v-for="(item, index) in signType" :key="index" @click="signTypeClick(index)"
                    :class="{active: index===signTypeIndex}">{{item}}</span>
            </div>
          </div>
          <div class="dateTiFilter"></div>
        </div>
        <div class="trendCharts" id="trendCharts"></div>
      </div>
    </div>
    <!-- 趋势图结束 -->

    <!-- 签约人群表格开始 -->
    <div class="person">
      <div class="personTitle">签约人群占比</div>
      <div class="personContent">
        <div class="personTable">
          <div class="tableHeader">
            <div class="tableCell index"></div>
            <div class="tableCell category">人群分类</div>
            <div class="tableCell num">签约人数</div>
            <div class="tableCell rate">占比</div>
          </div>
          <div class="filterDate"></div>
          <div class="tableRow">
            <div class="tableCell">1</div>
            <div class="tableCell">高血压</div>
            <div class="tableCell">9</div>
            <div class="tableCell">19/9%</div>
          </div>
        </div>
        <!--<div class="noneData" v-if="dataList.length === 0">-->
        <!--暂无数据-->
        <!--</div>-->
      </div>
    </div>
    <!-- 签约人群表格结束 -->

    <!-- 选择团队开始 -->
    <homeChooseTeam
      :isShow="isShowTeamSearch"
      :toggleContent="toggleMainContent"
    >
    </homeChooseTeam>
    <!-- 选择团队结束 -->

    <!-- 选择医生开始 -->
    <homeChooseDoctor
      :isShow="isShowDoctorSearch"
      :toggleContent="toggleDoctorContent"
    >
    </homeChooseDoctor>
    <!-- 选择医生结束 -->
  </div>

</template>

<script>
  import commonDialog from '@/components/commonDialog';
  import homeChooseTeam from '@/components/homeChooseTeam';
  import homeChooseDoctor from '@/components/homeChooseDoctor';
  import echarts from 'echarts';

  export default {
    name: "home",
    data() {
      return {
        options: [
          {
            value: '1',
            label: '北京'
          }, {
            value: '2',
            label: '上海'
          }, {
            value: '3',
            label: '广州'
          }, {
            value: '4',
            label: '深圳'
          }, {
            value: '5',
            label: '重庆'
          }],
        value: '',
        dayType: ['7天', '15天', '30天'],
        dayTypeIndex: 0,
        signType: ['签约总数', '基卫签约', '微信签约', '随访包签约'],
        signTypeIndex: 0,
        isShowTeamSearch: false,
        isShowDoctorSearch: false
      }
    },
    components: {
      commonDialog,
      homeChooseTeam,
      homeChooseDoctor
    },
    methods: {
      /**
       * 饼图初始化
       **/
      initCharts(el) {
        echarts.init(el).setOption({
          // 顺序 微信-随访-基卫
          color: ['#29CB97', '#F65860', '#FEC400'],
          series: [
            {
              type: 'pie',
              radius: ['50%', '100%'],
              selectedMode: 'single',      // 阻止饼图的默认点击偏移事件
              selectedOffset: 0,           // 阻止饼图的默认点击偏移事件
              hoverAnimation: false,       // 阻止饼图的默认点击偏移事件
              legendHoverLink: false,
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}%',
                fontSize: '10'
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  show: false
                }
              },
              data: [
                {value: 35},
                {value: 35},
                {value: 20}
              ]
            }
          ]
        })
      },
      /**
       * 曲线图初始化
       **/
      initLine(el) {
        echarts.init(el).setOption({
          color: ['#ffc979'],
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{a} : {c}<br/>{b}'
          },
          legend: {
            data: ['累积签约数'],
            orient: 'vertical',
            right: '0',
            top: '10',
            icon: 'emptyCircle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            textStyle: {
              fontSize: 18,
              color: '#666'
            }
          },
          xAxis: {
            type: 'category',
            splitLine: {show: false},//去掉垂直x轴网格线
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#b2b2b2"  //坐标轴x轴颜色
              }
            },
            axisLabel: {//刻度标签
              textStyle: {fontSize: 14, color: '#666'}
            },
            data: ['2018-03-01', '2018-03-02', '2018-03-03', '2018-03-04', '2018-03-05', '2018-03-06', '2018-03-07', '2018-03-08', '2018-03-09', '2018-03-10', '2018-03-11', '2018-03-12', '2018-03-13', '2018-03-14', '2018-03-15', '2018-03-16', '2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21', '2018-03-22', '2018-03-23', '2018-03-24', '2018-03-25', '2018-03-15', '2018-03-16', '2018-03-17', '2018-03-18', '2018-03-19', '2018-03-20', '2018-03-21', '2018-03-22', '2018-03-23', '2018-03-24', '2018-03-25']
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '0',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}',
              textStyle: {fontSize: 14, color: '#666'},
            },
            axisTick: {
              show: false,
            }
          },
          series: [
            {
              name: '签约数',
              type: 'line',
              smooth: true,
              symbolSize: 7,   //设定实心点的大小
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#D8F2FF'},
                      {offset: 0.5, color: '#F2FBFF'},
                      {offset: 1, color: '#FEFFFF'}
                    ]
                  ),
                }
              },
              itemStyle: {
                normal: {
                  color: '#09f',
                  lineStyle: {
                    color: '#09f',
                  }
                }
              },
              data: [5, 20, 30, 40, 50, 10, 20, 30, 40, 50, 10, 20, 30, 40, 50, 10, 20, 30, 40, 50, 10, 20, 30, 40, 50, 15, 12, 13, 12, 47, 12, 25, 58, 25, 26, 25]
            }
          ],
        })
      },
      /**
       * 切换签约的天数
       **/
      dayTypeClick(index) {
        this.dayTypeIndex = index;
      },
      /**
       * 切换签约的签约类型
       **/
      signTypeClick(index) {
        this.signTypeIndex = index;
      },
      /**
       * 团队筛选框的隐藏与显示
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowTeamSearch = false;
        } else {
          this.isShowTeamSearch = !this.isShowTeamSearch;
        }
      },
      /**
       * 医生筛选框的隐藏与显示
       */
      toggleDoctorContent(fag) {
        if (fag === -1) {
          this.isShowDoctorSearch = false;
        } else {
          this.isShowDoctorSearch = !this.isShowDoctorSearch;
        }
      }
    },
    mounted() {
      this.initCharts(document.getElementById('surPie'));
      this.initLine(document.getElementById('trendCharts'));
      window.onresize = () => {
        this.initCharts(document.getElementById('surPie'));
        this.initLine(document.getElementById('trendCharts'));
      };
    }
  }
</script>

<style lang="scss">
  @import '../style/home.scss';

  /*.test {*/
  /*width: 100px;*/
  /*}*/

  /*.content {*/
  /*width: 400px;*/
  /*height: 400px;*/
  /*background-color: #ffffff;*/
  /*}*/

  /*.dialog {*/
  /*width: 50px;*/
  /*height: 50px;*/
  /*border-radius: 50%;*/
  /*background-color: hotpink;*/
  /*}*/
</style>
