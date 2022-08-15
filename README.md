# cesium-flyer 
 在cesium上的飞行管理器

## 引入
```typescript
import CesiumFlyer from "./cf/cesiumFlyer";
import {FlyData, FlyPoint} from './cf/cesiumFlyer';
```

## 创建cf对象
```typescript
  cf = new CesiumFlyer(viewer, {})
```
viewer是Cesium.Viewer的实例


## 创建飞行数据
```typescript
const flyData ={
  lane: [
    { lon: 122.53961587278168, lat: 37.268570557477986, hei: 443296.85404971987, heading: 6.28318530717958, pitch: - 1.569915613353213, roll: 0 },
    { lon: 119.68647691182409, lat: 36.118172854992906, hei: 442886.3777825233, heading: 6.28318530717958, pitch: -1.5699544982381348, roll: 0 },
    { lon: 121.22852343928692, lat: 31.5135013722044, hei: 575972.4402006189, heading: 6.283185307179574, pitch: -1.5701701825123062, roll: 0 },
  ],
  isFreeView: false
}
```

## 开始飞行
```typescript
  cf.startFly(flyData)
```

## 中止飞行
```typescript
  cf.stopFly()
```


# 其他
## 飞行数据格式定义
```typescript
export type FlyPoint = {
  lon: number,
  lat: number,
  hei: number,
  heading: number,
  pitch: number,
  roll: number
}

export type FlyData = {
  id: string,
  desc: string,
  lane: Array<FlyPoint>,
  isFreeView: boolean,
}
```


## 获取当前camera视点数据
```tyepscript
  let pos: FlyPoint = cf.getCurrentPos()
```


# build by


pnpm+vite+vue
