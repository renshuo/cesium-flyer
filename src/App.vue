<template>
  <div style="position: relative">
    <div style="position: fixed; z-index: 10; left: 20px; top: 20px">
      <button class="tbt" @click="createLane">新建飞行路线</button>
      <button class="tbt" @click="addCurrentPoint">标记飞行点</button>
      <br />
      <select class="tbt" @click="startFly">
        <option label="fly1" />
      </select>
      <button class="tbt" @click="startFly">开始飞行</button>
      <button class="tbt" @click="stopFly">停止飞行</button>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
window.CESIUM_BASE_URL = "/Cesium";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

import CesiumFlyer from "./cf/cesiumFlyer";
import {FlyData, FlyPoint} from './cf/cesiumFlyer';

const flyData =ref( {
  lane: [
    { lon: 122.53961587278168, lat: 37.268570557477986, hei: 443296.85404971987, heading: 6.28318530717958, pitch: - 1.569915613353213, roll: 0 },
    { lon: 119.68647691182409, lat: 36.118172854992906, hei: 442886.3777825233, heading: 6.28318530717958, pitch: -1.5699544982381348, roll: 0 },
    { lon: 121.22852343928692, lat: 31.5135013722044, hei: 575972.4402006189, heading: 6.283185307179574, pitch: -1.5701701825123062, roll: 0 },
    { lon: 121.85881251035663, lat: 25.140513857566077, hei: 383671.5622330892, heading: 6.283185307179577, pitch: -1.5706819683557987, roll: 0 },
    { lon: 120.81502941402901, lat: 21.753550098622394, hei: 382754.2054188958, heading: 6.283185307179577, pitch: -1.570639437071692, roll: 0 },
    { lon: 116.45708717460909, lat: 20.83051633835972, hei: 868083.0130429118, heading: 6.283185307179577, pitch: -1.5706966815634034, roll: 0 }
  ],
  isFreeView: false
})


const cf  = ref()

function createLane() {
  flyData.value = { lane: [], isFreeView: false }
}

function addCurrentPoint() {
  let pos: FlyPoint = cf.value.getCurrentPos()
  flyData.value.lane.push(pos)
}

function startFly() {
  cf.value.startFly(flyData.value)
}

function stopFly() {
  cf.value.stopFly()
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNWY5YzhhMS05ZmYxLTQ5NzgtOTcwNC0zZmViNGFjZjc4ODEiLCJpZCI6ODU0MjMsImlhdCI6MTY0Njk4ODA1NX0.4-plF_5ZfEMMpHqJyefkDCFC8JWkFw39s3yKVcNg55c";
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    100,
    30,
    110,
    40
  );
  let viewer = new Cesium.Viewer("mapContainer", {
    infoBox: false, //是否显示信息框
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    animation: false, //是否创建动画小器件，左下角仪表
  });

  cf.value = new CesiumFlyer(viewer, {})

});
</script>

<style>
.tbt {
  border: 1px solid blue;
  background: transparent;
  background-color: rgba(80,80,80, 0.7);
  border-radius: 2px;
  margin: 1px 2px;
  padding: 2px 8px;
  min-width: 90px;
  font-size: 14px;
  line-height: 16px;
  color: #00ff00;
}
</style>
