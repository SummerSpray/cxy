<template>
  <div>
    <h1>村庄地图</h1>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      // 使用百度地图 API
      this.map = new BMapGL.Map("map");
      const point = new BMapGL.Point(116.404, 39.915); // 默认北京天安门
      this.map.centerAndZoom(point, 10); // 设置中心点和缩放级别
      this.map.enableScrollWheelZoom(true); // 开启滚轮缩放
      this.loadVillageMarkers();
    },
    loadVillageMarkers() {
      // 从后端获取村庄数据并在地图上添加标记
      fetch("http://localhost:5000/api/villages")
        .then((response) => response.json())
        .then((villages) => {
          villages.forEach((village) => {
            const point = new BMapGL.Point(village.longitude, village.latitude);
            const marker = new BMapGL.Marker(point);
            this.map.addOverlay(marker);

            // 点击标记显示信息
            marker.addEventListener("click", () => {
              const infoWindow = new BMapGL.InfoWindow(
                `<div>
                  <h3>${village.name}</h3>
                  <p>${village.description}</p>
                </div>`
              );
              this.map.openInfoWindow(infoWindow, point);
            });
          });
        });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#map {
  border: 1px solid #ddd;
}
</style>
