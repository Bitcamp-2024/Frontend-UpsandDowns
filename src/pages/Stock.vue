<template>
  <div>
    <header>
      <h1 id="header">Chart Dashboard</h1><span id="Special">$</span><span id="nSpecial">{{ searchTerm.toUpperCase() }}</span>
      <input type="text" v-model="searchTerm" placeholder="Search...">
      <button @click="fetchStockData">Search</button>
    </header>
    <div>
      <VueApexCharts
      width="1200"
      type="candlestick"
      :options="chartOptions"
      :series="series"
      ></VueApexCharts>
    </div>
    <p id="error-message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from "vue3-apexcharts";

const searchTerm = ref('');
const chartOptions = ref({});
const series = ref([]);
const message = ref('');

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
          height: 600
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
          return { x : new Date(Date.parse(elm.date).getTime()), y: [elm.open, elm.high, elm.low, elm.close] }
        })
      }];
      message.value = '';
    });
  } catch (err) {
      console.log('bad stock symbol');
      message.value = data.message;
  } 
};
</script>

<style scoped>
#header {
  display: inline;
}
#Special {
  margin-left: 30px;
  font-size: 30px;
  color: #7c3aed;
}

#nSpecial {
  margin-left: 10px;
  font-size: 30px;
}

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
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
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

#error-message {
  color: red;
  font-weight: bold;
}
</style>
