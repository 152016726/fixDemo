<template>
  <section class="a4">
    <h1 class="title">家庭医生（团队）签约服务协议书</h1>
    <div class="sign-begin">
      <p>甲方：<span>{{PARTYA}}</span></p>
      <p>乙方（家庭成员代表）：<span>{{PARTYB}}</span></p>
      <p><span class="idCard">身份证号：<i>{{SFZJH}}</i></span> <span>联系电话：<i>{{LXDH}}</i></span></p>
      <p>家庭住址：<span>{{JTZZ}}</span></p>
    </div>
    <div class="sign-content-1">
      <p>甲、乙双方共同确定<span class="decoration">{{TDMC}}</span>为乙方的家庭医生团队。</p>
      <p>团队成员：<span>{{TDCYList}}</span></p>
      <p>团队责任医生：<span>{{TDZRYS}}</span></p>
      <p>手机：{{TDLXDH}}</p>
    </div>
    <div class="sign-content-2">
      <p>本着平等、尊重和自愿的原则，经甲、乙双方协商一致，签订此协议。</p>
      <p>一、甲方作为服务的提供者，向乙方及其家庭成员免费提供以下服务包服务：</p>
      <div v-for="(item, index) in QYFWList" :key="index">
        <p>{{index+1}}、为<span class="decoration">{{item.XM}}</span>提供<span class="decoration">{{item.FWBMCList}}</span> ，具体服务项目如下：</p>
        <div class="service-item">
          <div class="item" v-for="(val, i) in item.FWBList" :key="i">
            <p>{{val.FWBMC}}</p>
            <div class="services">
              <table class="servicePackages">
                <tbody>
                <tr>
                  <th class="order">序号</th>
                  <th class="category">项目分类</th>
                  <th class="service-num">服务次数</th>
                  <th class="service-explain">服务内容解释</th>
                  <th class="note">备注</th>
                </tr>
                <tr v-for="(v,k) in val.FWXMList">
                  <td>{{k+1}}</td>
                  <td>{{v.FWXMMC}}</td>
                  <td>{{v.FWCS}}</td>
                  <td class="description">{{v.FWXMMS}}</td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div class="sign-content-3">
    <p>二、乙方的权利和义务</p>
    <p>1.乙方自愿接受以上所选服务，将自己的身体健康状况及变化情况首先及时告知甲方，并保证沟通畅通，积极配合甲方提供的各项服务。</p>
    <p>2.乙方要确保提供家庭成员真实详细的健康资料和服务需求。</p>
    <p>3.乙方应尊重和理解甲方的服务过程，共同探索和完善这种新的服务模式，并尽可能为甲方的工作提供方便和协助。乙方可随时向甲方所在单位反映甲方的服务态度和效率，以提高服务质量</p>
    <p>4.在服务期内，如乙方对原签约的甲方服务不满意，可要求甲方所在单位调换。</p>
    <p>
      三、甲方给乙方提供服务的过程中，因乙方对甲方隐瞒病史信息或不执行甲方指定的防治方案、不听从指导意见而影响到服务质量，其产生的后果由乙方承担。甲方给乙方提供服务时，因乙方病情超出甲方诊疗水平和能力范围的，甲方应及时转诊或会诊，以保证患者及时、合理诊治。</p>
    <p>四、未尽事宜，甲乙双方协商解决。</p>
  </div>
  <div class="sign-member">
    <p>
      本协议一式两份，甲方、乙方各执一份，自双方签字之日起生效，有效期为一年。期满后如需解约，乙方需告知甲方，双方签字确认。双方不提出解约视为自动续约，可不再新签协议，按本协议执行。如乙方提出改签，经双方协商一致重新签订协议。</p>
    <div class="sign-member-content">
      <p>家庭成员信息表</p>
      <div class="family-member">
        <table class="family-member-table">
          <tbody>
          <tr>
            <th class="index">编号</th>
            <th class="relation">与签约代表关系</th>
            <th class="name">姓名</th>
            <th class="gender">性别</th>
            <th class="idCard">身份证号</th>
            <th class="category">对象类别</th>
          </tr>

          <tr v-for="(item, index) in JTCYList" :key="index">
            <td>
              {{index < 9 ? '0'+ (index+1) : (index+1)}}
            </td>
            <td>{{item.YQYDBGXMC}}</td>
            <td>{{item.XM}}</td>
            <td>{{item.XB}}</td>
            <td>{{item.SFZJH}}</td>
            <td>{{item.RQFLMC}}</td>
          </tr>

          </tbody>
        </table>
      </div>

    </div>
  </div>
  <div class="sign-check">
    <p class="left-common-check">甲方（公章）：</p>
    <div class="signer">
      <span class="response-doctor">责任医生（签名）：</span>
      <span>乙方（代表签名）：</span>
    </div>
    <div class="sign-time">
      <span class="left-time"><i class="year"></i>年<i class="month"></i>月<i class="day"></i>日</span>
      <span class="right-time"><i class="year"></i>年<i class="month"></i>月<i class="day"></i>日</span>
    </div>
    <p class="contract-time">解约时间：</p>
    <p class="contract-reason">解约原因：</p>
    <div class="contract-signer">
      <span class="response-doctor">责任医生（签名）：</span>
      <span>乙方（代表签名）：</span>
    </div>
  </div>
  </section>
</template>

<script>
  export default {
    name: "pdfPrint",
    props: {
      PARTYA: {default: ''},
      PARTYB: {default: ''},
      SFZJH: {default: ''},
      LXDH: {default: ''},
      JTZZ: {default: ''},
      TDMC: {default: ''},
      TDCYList: {default: ''},
      TDZRYS: {default: ''},
      TDLXDH: {default: ''},
      QYFWList: {default: ()=> []},
      JTCYList: {default: ()=>[]}
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  table{
    margin: auto;
    border-bottom: none;
    border-left: none;
    font-family: SimSun;
  }

  .justify {
    text-align: justify;
  }

  .a4 {
    font-size: 17px;
    font-family: SimHei;
    color: #262626;
    background-color: aliceblue;
    margin: 0 auto;
    width: 279mm;
    height: 216mm;
  }

  .title {
    padding: 5mm 0;
    font-size: 45px;
    font-weight: bold;
    text-align: center;
  }

  .sign-begin p, .sign-content-1 p, .sign-content-2 p, .sign-content-3 p, .sign-member p {
    line-height: 10mm;
  }

  .idCard, .response-doctor, .left-time {
    margin-right: 100mm;
  }

  .sign-content-1 {
    margin: 5mm 0;
  }

  .service-item {
    padding-top: 5mm;
  }

  .sign-content-3 {
    margin: 20mm 0;
  }

  .left-common-check {
    padding-top: 20mm;
    padding-bottom: 30mm;
  }

  .signer, .sign-time {
    padding-bottom: 30mm;
  }

  .year {
    width: 10mm;
    display: inline-block;
  }

  .month, .day {
    width: 5mm;
    display: inline-block;
  }

  .contract-time, .contract-reason {
    padding-bottom: 10mm;
  }

  .contract-signer {
    padding-bottom: 30mm;
  }
  .services{
    margin: 0 10mm;
  }

  .servicePackages {
    width: 100%;
    border: 1px solid #262626;
    border-collapse: collapse;
  }

  .servicePackages th, .servicePackages td {
    border: 1px solid #262626;
    padding: 2mm;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .order {
    width: 10%;
  }

  .category {
    width: 30%;
  }

  .service-num {
    width: 10%;
  }

  .service-explain {
    width: 40%;
  }

  .note {
    width: 10%;
  }

  .servicePackages .description {
    text-align: left;
  }

  .family-member{
    margin: 0 10mm;
  }
  .family-member-table {
    width: 100%;
    border: 1px solid #262626;
    border-collapse: collapse;
  }

  .family-member-table th, .family-member-table td {
    border: 1px solid #262626;
    line-height: 10mm;
    text-align: center;
    vertical-align: middle;
  }

  .index {
    width: 10%;
  }

  .relation {
    width: 20%;
  }

  .name {
    width: 10%;
  }

  .gender {
    width: 10%;
  }

  .idCard {
    width: 30%;
  }

  .category {
    width: 20%;
  }
  .decoration{
    text-decoration: underline;
  }
</style>
