import * as Cesium from 'cesium';


interface CFConfig {
}

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

export default class CesiumFlyer {

  viewer: Cesium.Viewer
  config: CFConfig

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

  public startFly(flyData: FlyData) {
    this.initFly(flyData.lane[0])
    this.flyNext(flyData.lane, 1)
  }

  public stopFly() {
    this.viewer.camera.cancelFlight()
  }

  public getCurrentPos(): FlyPoint {
    let lonlathei = this.cartesian2lonlathei(this.viewer.camera.position)
    let heading = this.viewer.camera.heading
    let pitch = this.viewer.camera.pitch
    let roll = this.viewer.camera.roll
    let pos = { lon: lonlathei[0], lat: lonlathei[1], hei: lonlathei[2], heading, pitch, roll }
    return pos
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
