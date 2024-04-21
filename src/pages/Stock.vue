<template>
  <div>
    <header>
      <input type="text" v-model="searchTerm" placeholder="Search...">
      <button @click="fetchStockData">Search</button>
      <select v-model="selectedInterval">
        <option value="1wk">1 Week</option>
        <option value="1mo">1 Month</option>
        <option selected="selected" value="6mo">6 Months</option>
        <option value="1yr">1 Year</option>
        <option value="3yr">3 Years</option>
        <option value="5yr">5 Years</option>
      </select>
      <h1 id="header">Chart Dashboard</h1><span id="Special">$</span><span id="nSpecial">{{ searchTerm.toUpperCase() }}</span>
      <n-button id="watchlist-btn" @click="addToWatchList">ADD TO WATCHLIST</n-button>
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
    <div>
      <n-button id="predict" @click="displayPredictions">Let's See the Future! 👽</n-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from "vue3-apexcharts";

const searchTerm = ref('');
const selectedInterval = ref('6mo'); // default is 6 months
const chartOptions = ref({});
const series = ref([]);
const message = ref('');

async function addToWatchlist() {
  const response = await fetch('/userupdate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticker: searchTerm.value })
  });
  const data = await response.json();
  if (data.errorCode) {
    console.log(data.error);
    return;
  }
  if (data.success) {
    authUserStore.Login();
    router.push(data.redirect);
  }
}


async function displayPredictions() {
  const response = await fetch('/runmodel', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticker: searchTerm.value })
  });
  const data = await response.json();
  if (data.errorCode) {
    console.log(data.error);
    return;
  }
  if (!data.success) {
    return;
  }
  const body = JSON.parse(data).body;
  console.log(body);
}

const rangeToDays = (range) => {
  return range === '1wk' ? 7 : 
         range === '1mo' ? 31 :
         range === '6mo' ? 183 :
         range === '1yr' ? 365 : 
         range === '3yr' ? 1095 :
         range === '5yr' ? 1825 : null;
}

const getStepSize = (range) => {
  return range <= 10 ? 1 : Math.floor(range / 15);
}

// Function to fetch stock data
const fetchStockData = async () => {
  message.value = '';
  searchTerm.value = searchTerm.value.toUpperCase();
  try {
    const response = await fetch(`/stock/${searchTerm.value}`)
    const json = await response.json()
    let data = json.data;
    if (!data) {
      return;
    }
    data = data.quotes.slice(-1 * rangeToDays(selectedInterval.value));
    chartOptions.value = {
      chart: {
        type: 'candlestick',
        height: 600
      },
      title: {
        text: `${searchTerm.value} Stock Prices`
      },
      theme: {
        mode: 'dark'
      },
      xaxis: {
        type: 'datetime',
        stepSize: getStepSize(rangeToDays(selectedInterval.value))
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
    series.value = [{
      data: data.map(elm => {
        return { x : elm.date.slice(0,10), y: [elm.open, elm.high, elm.low, elm.close] }
      })
    }];
  } catch (err) {
    console.log(err);
    message.value = data.message;
  }
};
</script>

<style scoped>
#header {
  display: inline;
  margin-left: 40px;
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

#error-message {
  color: red;
  font-weight: bold;
}

select {
  margin-left: 10px;
}

#predict {
  background-color: red;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  /* transition: 0.3s ease-in; */
}

#predict:hover {
  /* transform: scale(1.2); */
}

#watchlist-btn {
  margin-left: 15px;
  margin-bottom: 7px;
}
</style>
