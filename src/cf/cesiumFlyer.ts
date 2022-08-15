import * as Cesium from 'cesium';


interface CFConfig {

}

type FlyPoint = {
  lon: number,
  lat: number,
  hei: number,
  heading: number,
  pitch: number,
  roll: number
}

export default class CesiumFlyer {

  viewer: Cesium.Viewer
  config: CFConfig

  lane: Array<FlyPoint> = [
    { lon: 122.53961587278168, lat: 37.268570557477986, hei: 443296.85404971987, heading: 6.28318530717958, pitch: - 1.569915613353213, roll: 0 },
    { lon: 119.68647691182409, lat: 36.118172854992906, hei: 442886.3777825233, heading: 6.28318530717958, pitch: -1.5699544982381348, roll: 0 },
    { lon: 121.22852343928692, lat: 31.5135013722044, hei: 575972.4402006189, heading: 6.283185307179574, pitch: -1.5701701825123062, roll: 0 },
    { lon: 121.85881251035663, lat: 25.140513857566077, hei: 383671.5622330892, heading: 6.283185307179577, pitch: -1.5706819683557987, roll: 0 },
    { lon: 120.81502941402901, lat: 21.753550098622394, hei: 382754.2054188958, heading: 6.283185307179577, pitch: -1.570639437071692, roll: 0 },
    { lon: 116.45708717460909, lat: 20.83051633835972, hei: 868083.0130429118, heading: 6.283185307179577, pitch: -1.5706966815634034, roll: 0 }
  ]

  constructor(viewer: Cesium.Viewer, config: CFConfig) {
    console.log('create cesium flyer:', config)
    this.viewer = viewer
    this.config = config
  }

  private initFly(start: FlyPoint) {
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(start.lon, start.lat, start.hei),
      orientation: {
        heading: start.heading,
        pitch: start.pitch,
        roll: start.roll
      }
    })
  }

  private flyNext(poss: Array<FlyPoint>, seq: number) {
    if (poss.length <= seq) {
      console.log("fly finished.")
      return
    }
    let p1 = poss[seq]
    console.log("fly to next point: ", p1)
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(p1.lon, p1.lat, p1.hei),
      orientation: {
        heading: p1.heading,
        pitch: p1.pitch,
        roll: p1.roll
      },
      easingFunction: Cesium.EasingFunction.LINEAR_NONE,
      complete: () => {
        setTimeout( () => {
          this.flyNext(poss, seq + 1)
        }, 1)
      }
    });
  }

  public startFly(laneId: string) {
    this.initFly(this.lane[0])
    this.flyNext(this.lane, 1)
  }

  public stopFly() {
    this.viewer.camera.cancelFlight()
  }

  public createLane(id: string) {
    console.log(`create new lane with id ${id}`)
    this.lane = []
  }

  public addCurrentPoint() {
    let lonlathei = this.cartesian2lonlathei(this.viewer.camera.position)
    let heading = this.viewer.camera.heading
    let pitch = this.viewer.camera.pitch
    let roll = this.viewer.camera.roll
    let pos = { lon: lonlathei[0], lat: lonlathei[1], hei: lonlathei[2], heading, pitch, roll }
    console.log("add a flying point: ", pos)
    this.lane.push(pos)
  }

  public finishLane(): Array<FlyPoint> {
    return this.lane
  }

  private cartesian2lonlathei(cartesian: Cesium.Cartesian3): Array<number> {
    let ellipsoid = Cesium.Ellipsoid.WGS84
    var cartographic = ellipsoid.cartesianToCartographic(cartesian)
    let longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
    let latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
    let hei = cartographic.height
    return [longitudeString, latitudeString, hei]
  }

}
