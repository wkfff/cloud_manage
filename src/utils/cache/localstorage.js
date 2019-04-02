/**
 *
 * @copyright(c) 2019
 * @created by  Daniel
 * @package cache
 * @version :  2019-01-16 16:06 $
 *
 * localStorage 实现 cache 类的几个方法
 */

import Abstract from './abstract'
import Json from '@/utils/json'
// import Logger from 'utils/logger'

export default class LocalStorage extends Abstract{

    get(key){
        key = `${this.prefix}.${key}`

        // Logger.debug('util.cache.localstorage.get: key ===>', key)

        let item = window.localStorage.getItem(key)
        // Logger.debug('util.cache.localstorage.get: real val ===>', item)

        if (!item) {
            return ''
        }
        item = Json.loads(item)
        // Logger.debug('util.cache.localstorage.get: json load val ===>', item)

        if(typeof item === 'object' && 'expires' in item){
            if(this.constructor.expires(item['expires'])){
                // Logger.debug('util.cache.localstorage.get: already expires ===>', item['expires'])
                this.forget(key);
                return '';
            }
            return Json.loads(item['val']);
        }
        return item;

    }
    put(key, value, minutes){
        key = `${this.prefix}.${key}`

        minutes = minutes || 0;

        // Logger.debug('util.cache.localstorage.get: key/minutes/val type ===>', key, minutes, typeof value)

        if (typeof value === 'object') {
            value = Json.dumps(value);
        }

        window.localStorage.setItem(key, Json.dumps({
            'val': value,
            'expires': minutes ? minutes * 1000 * 60 + (+ new Date()) : ''
        }));
    }

    forget(key){
        key = `${this.prefix}.${key}`
        return window.localStorage.removeItem(key)
    }

    has(key){
        key = `${this.prefix}.${key}`

        return window.localStorage.getItem(key) !== null
    }

    flush(){
        return window.localStorage.clear()
    }
}