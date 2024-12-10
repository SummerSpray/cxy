<template>
  <div class="location-service">
    <h2>附近的村庄</h2>
    <ul>
      <li v-for="village in nearbyVillages" :key="village.id">
        <h3>{{ village.name }}</h3>
        <p>{{ village.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nearbyVillages: [],
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getNearbyVillages);
    }
  },
  methods: {
    getNearbyVillages(position) {
      const { latitude, longitude } = position.coords;
      fetch(`http://localhost:5000/api/villages/nearby?lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          this.nearbyVillages = data;
        });
    },
  },
};
</script>

<style scoped>
.location-service {
  padding: 20px;
  background: #e4e4e4;
}
</style>
