<template>
  <div style="position: relative">
    <div style="position: fixed; z-index: 10; left: 20px; top: 20px">
      <button class="tbt" @click="createLane">新建飞行路线</button>
      <button class="tbt" @click="addCurrentPoint">标记飞行点</button>
      <button class="tbt" @click="finishLane">结束飞行路线</button>
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


const cf  = ref()

function createLane() {
  cf.value.createLane("1")
}

function addCurrentPoint() {
  cf.value.addCurrentPoint()
}

function finishLane() {
  cf.value.finishLane()
}

function startFly() {
  cf.value.startFly("1")
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
