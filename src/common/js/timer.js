/**
 * 方便全局timer绑定以及删除，共用定时器
 * Created by DDT on 2018/11/15.
 */
let Timer = require('timer.js');
// import Timer from 'Timer';

// 对应key与timer
let _timerMach = {};
let _maxDuration = 240 * 60;    // 120为一场比赛最多分钟数，两倍时间作为最大倒数时间

let _fn = {
    /**
     * 生成定时器，触发定时时触发callback方法
     * @param ops   定时器参数
     */
    setTimer(ops) {
        let defOps = {
            key: '',            // 记录全局key
            startTime: 0,       // 开始时间
            duration: -1,       // 倒计时时间
            callback: ()=>{}    // 回调触发
        };
        ops = Object.assign({}, defOps, ops || {});
        let {key} = ops;
        if(key !== ''){
            if(_timerMach[key]){
                this.clearTimer(key);
            }
            let timer = new Timer({
                ontick: function(duration){
                    if(ops.duration !== -1){
                        ops.callback(Math.floor(duration/1000));
                    }else{
                        ops.callback(+ops.startTime + Math.floor((_maxDuration*1000 - duration)/1000));
                    }
                }
            });

            _timerMach[key] = {
                timer: timer.start(ops.duration === -1 ? _maxDuration : ops.duration),
                options: ops
            };
            return timer;
        }else{
            return null;
        }
    },
    /**
     * 清除定时器
     * @param key   记录全局key
     */
    clearTimer(key) {
        if(_timerMach[key]){
            let timer = _timerMach[key].timer;
            timer.stop();
            _timerMach[key] = null;
        }
    },
    /**
     * 清除当前所有定时器
     */
    clearAllTimer() {
        for(let key in _timerMach){
            this.clearTimer(key);
        }
    },
    /**
     * 重新生成计时器，重新计数
     * @param ops   定时器参数
     */
    resetTimer(ops) {
        let key = (ops || {}).key;
        if(key && _timerMach[key]){
            let { options } = _timerMach[key];
            this.clearTimer(key);
            options = Object.assign(options, ops);
            return this.setTimer(options);
        }else{
            return null;
        }
    }
};

export default _fn
