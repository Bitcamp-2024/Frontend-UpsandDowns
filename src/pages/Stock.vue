<template>
  <div>
    <header>
      <h1>Chart Dashboard</h1>
      <input type="text" v-model="searchTerm" placeholder="Search...">
      <button @click="fetchStockData">Search</button>
    </header>
    <div>
      <VueApexCharts
      width="1000"
      type="candlestick"
      :options="chartOptions"
      :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from "vue3-apexcharts";

const searchTerm = ref('');
const chartOptions = ref({});
const series = ref([]);

// Function to fetch stock data
const fetchStockData = async () => {
  try {
    searchTerm.value = searchTerm.value.toUpperCase();
    const response = await fetch(`/stock/${searchTerm.value}`)
    console.log(response);
    const json = await response.json();
    Promise.resolve(json.data)
    .then(data => {
      data = data.quotes;
      chartOptions.value = {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: `${searchTerm.value} Stock Prices`
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };
      series.value = [{
        data: data.map(elm => {
          return { x : Date.parse(elm.date), y: [elm.open, elm.high, elm.low, elm.close] }
        })
      }];
    });
  } catch (err) {
      console.log('bad stock symbol');
  } 
};
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
