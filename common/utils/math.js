/** 2018/1/16
 * author: XU ZHI WEI
 * function:根据经纬度获取两点的距离
 */
export const getDistance = (lat1, lng1, lat2, lng2)=>{
    const radLat1 = lat1 * Math.PI / 180.0;
    const radLat2 = lat2 * Math.PI / 180.0;
    const a = radLat1 - radLat2;
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    if(s>1){
        return s.toFixed(1) + 'km'
    } else {
        return parseInt(s*1000) + 'm'
    }
};

