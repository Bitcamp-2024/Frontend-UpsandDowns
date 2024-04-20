<template>
  <div>
    <header>
      <h1>Chart Dashboard</h1>
      <input type="text" v-model="searchTerm" placeholder="Search...">
      <button @click="fetchStockData">Search</button>
    </header>
    <div id="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const searchTerm = ref('');

// Function to fetch stock data
const fetchStockData = async () => {
  try {
    const response = await axios.get(``);
    const data = response.data;
    updateChart(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

// Function to update the chart with received data
const updateChart = (data) => {
  const stockData = data.quoteResponse.result[0];
  const seriesData = [{
    data: [
      { x: 'Symbol', y: stockData.symbol },
      { x: 'Previous Close', y: stockData.regularMarketPreviousClose }
    ]
  }];

  // Update the chart
  chart.updateSeries(seriesData);
};

// Lifecycle hook to initialize the chart
onMounted(() => {
  const options = {
    chart: {
      type: 'bar'
    },
    series: [],
    xaxis: {
      type: 'category'
    }
  };

  window.chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
});
</script>

<style scoped>
header {
  padding: 20px;
  background-color: #333;
  color: #fff;
  border-bottom: 1px solid #ccc;
}

h1 {
  margin: 0;
}

#chart {
  max-width: 800px;
  margin: 20px auto;
}

input[type="text"] {
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
