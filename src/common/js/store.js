/**
 * 存储对象，保存页面使用内容
 * Created by DDT on 2015/11/16.
 */
import store from 'store'

export default {
    /**
     * 获取存储的对象
     * @param key
     * @param isClear 是否获取完就清除
     */
    get: function(key, isClear){
        let val = store.get(key);
        isClear && this.erase(key);
        return val;
    },
    /**
     * 设置存储对象
     * @param key
     * @param val
     */
    set: function(key, val){
        //忽略第三个参数
        store.set(key, val);
    },
    /**
     * 清除存储的对象
     * @param key
     */
    erase: function(key){
        store.remove(key);
    }
};
