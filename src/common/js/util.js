/**
 * 格式化日期形式2018-01-01 01:11:10
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 对数字，身份证，数字加密处理
 */
const secretData = (data, dataType) => {

  if (dataType == 'phone') {
    //手机号码星号转化
    var tel = data;
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    if (tel) {
      tel = tel.replace(reg, "$1****$2");
      return tel;
    };
  } else if (dataType == 'idCard') {
    //身份证号星号转化
    var idCard = data;
    if (idCard.length == 18) {
      idCard = idCard.substring(0, 14) + '****';
      return idCard;
    } else {
      idCard = idCard.substring(0, 11) + '****';
      return idCard;
    }
  }else if(dataType === 'num'){
     var str = data;
     if(str.length > 11){
       str = str.slice(0, 5) + '*****' + str.slice(-5);
     }
     return str;
  }
}

/**
 * 获取第7天的日期
 */
const getDateAfter = mydate => {
  var date = new Date(mydate);
  var showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  //for (var i = 1; i <= 7; i++) {//后AddDayCount天
    date.setDate(date.getDate() + 6);
    showDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  //}
    return showDate;
}

//获取7天日期
const getWeekDays = (num, str) => {
  var today = new Date();
  var weekDays = [];
  var weekZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (var day = 0; day < 7; day++) {
    var weekItem = {};
    var milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    var newday = new Date(milliseconds);
    var tYear = newday.getFullYear();
    var tMonth = newday.getMonth();
    var tDate = newday.getDate();
    var tday = newday.getDay();
    if (day == 0) {
      weekItem.weekStr = '今日';
    } else if (day == 1) {
      weekItem.weekStr = '明日';
    } else {
      weekItem.weekStr = weekZH[tday];
    }
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    switch (num) {
      case 1: weekItem.dayStr = tDate;
        break;
      case 2: weekItem.dayStr = tMonth + str + tDate;
        break;
      case 3: weekItem.dayStr = tYear + str + tMonth + str + tDate;
        break;
      default: weekItem.dayStr = tYear + str + tMonth + str + tDate;
    }
    weekItem.locStr = tYear + '-' + tMonth + '-' + tDate;
    weekDays.push(weekItem)
  }
  return weekDays;
}
function doHandleMonth(date){
  var m = date;
  if (date.toString().length == 1){
    m = "0" + date;
  }
  return m;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const json2Form = json => {
  let str = [];
  for (let p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
}
/**
 * 身份证验证
 */
const identityCodeValid = identityCard => {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;
  var moreInfo = {};
  var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
  if (!identityCard || !reg.test(identityCard)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[identityCard.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (identityCard.length == 18) {
      identityCard = identityCard.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = identityCard[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != identityCard[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  if (pass) {
    var len = identityCard.length;
    var code = identityCard.join('');
    var strBirthday = "";

    //年龄
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
      strBirthday = code.substr(6, 4) + "/" + code.substr(10, 2) + "/" + code.substr(12, 2);
    } else if (len == 15) {
      strBirthday = "19" + code.substr(6, 2) + "/" + code.substr(8, 2) + "/" + code.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    moreInfo.age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    //if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    //    moreInfo.age--;
    //}
    moreInfo.birthDate = birthDate.getFullYear() + '-' + ((birthDate.getMonth() + 1) > 9 ? (birthDate.getMonth() + 1) : ('0' + (birthDate.getMonth() + 1))) + '-' + (birthDate.getDate() > 9 ? birthDate.getDate() : ('0' + birthDate.getDate()));
    //性别
    if (parseInt(code.substr(16, 1)) % 2 == 1) {
      moreInfo.sex = "男";
    } else {
      moreInfo.sex = "女";
    }
  }

  //if(!pass) alert(tip);
  return {
    'pass': pass,
    'tip': tip,
    'more': moreInfo
  };
}

const validUsername =str => /^[0-9a-zA-Z]{6,20}/.test(str);
const validPassword =str => /^[\w_-]{6,20}$/.test(str);

// 限定管理员账号
const isvalidUsername = (str) => {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

// 验证路由
const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 校验身份证号码
const checkIdCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入身份证号码'))
  } else {
    if ((!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)))) {
      callback(new Error('身份证号码格式不正确'))
    } else {
      callback()
    }
  }
}

// 校验金额
const checkMoney = (rule, value, callback) => {
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请输入正整数或者两位小数的价格'))
    } else {
      callback()
    }
  }
}

// 校验数量只能包含数字、字母、下划线或者中划线
const isvalidNumber = (rule, value, callback) => {
  let reg = /^(?!^-+$)(?!^_+$)(?!^\d+$)[\d|a-zA-Z|\-|_]{6,16}$/
  if (value) {
    if (!reg.test(value)) {
      return callback(new Error('请输入数字、字母、下划线或者中划线的编号'))
    } else {
      callback()
    }
  }
}

module.exports = {
  json2Form,
  formatTime,
  identityCodeValid,
  secretData,
  getDateAfter,
  validUsername,
  validPassword,
  getWeekDays
}
