<template>
    <div>
      <div class="filters">
        <input type="date" v-model="selectedDate" @change="filterData" />
      </div>
  
      <BarChart v-if="filteredData" :chart-data="chartData" :chart-options="chartOptions" />
      <p v-else>No data available for the selected date.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import BarChart from "./ChartComponent.vue";
  
  const selectedDate = ref("2025-03-18"); // Holds the selected date
  
  // Sample dataset
  const data = ref([
    { date: "2025-03-18", qoldiq: 32000, xaridSumma: 704000, sotuvSumma: 160000 },
    { date: "2025-03-19", qoldiq: 45000, xaridSumma: 800000, sotuvSumma: 200000 },
  ]);
  
  // Compute filtered data based on the selected date
  const filteredData = computed(() => {
    return data.value.find((d) => d.date === selectedDate.value) || null;
  });
  
  const chartData = computed(() => {
    if (!filteredData.value) return { labels: [], datasets: [] };
  
    return {
      labels: [filteredData.value.date],
      datasets: [
        { label: "Foyda", data: [filteredData.value.qoldiq], backgroundColor: "green" },
        { label: "Chiqim", data: [filteredData.value.xaridSumma], backgroundColor: "purple" },
        { label: "Jami Sotuvlar Summasi", data: [filteredData.value.sotuvSumma], backgroundColor: "red" },
      ],
    };
  });
  
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
      legend: { position: "top" },
    },
  };
  </script>
  
  <style scoped>
  .filters {
    margin-bottom: 10px;
  }
  </style>
    