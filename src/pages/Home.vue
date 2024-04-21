<script setup>
import { authUserStore } from '../stores.js';
import { useRouter } from "vue-router"
import VueApexCharts from "vue3-apexcharts";
import { ref } from 'vue';

let router = useRouter();

const chartOptions = ref({});
const series = ref([]);
const months = ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);

const fetchStockData = () => {
  const data = [[1,1],[2,2],[3,5],[4,4],[5,6]];
    series.value = [{
      name: "Desktops",
      data: data.map(x => x[1])
    }];
    chartOptions.value = {
      chart: {
        height: 20,
        width: 20,
        type: 'line',
        zoom: {
          enabled: false
        },
        background: '#000',
      },
      colors: ['#6d3fc8'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'left'
      },
      theme: {
        mode: 'dark'
      },
      xaxis: {
        categories: data.map(x => x[0]),
        stepSize: 50
      }
    }
};

fetchStockData();

function goToDashboard() {
    router.push("/stock")
}

</script>

<template>
    <div>
        <div id="loggedIn" v-if="authUserStore().authenticated === true"> 
            <h1>Welcome, {{ authUserStore().profile.name }}</h1>
            <n-button class="textbutton" text @click="goToDashboard">
                Dashboard
                <template #icon>
                    <n-icon>
                        <ArrowRedo />
                    </n-icon>
                </template>
            </n-button>
            <div id="watchlist">
              <ul v-for="stock in authUserStore().profile.watchlist" :key="stock.ticker">
                <li>{{ stock.ticker }}</li>
              </ul>
            </div>
        </div>
        <div v-else id="notloggedin">
            <h1>UPS & DOWNS: Your Personal Finance Advisor</h1>
            <div id="parent">
              <div id="split">
                <p class="para">Welcome to UPS & DOWNS: Your personal finance advisor, your AI companion dedicated to navigating the volatile seas of trading and personal finance. Whether you're a seasoned investor or just dipping your toes into the world of finance, UPS & DOWNS is here to provide insightful guidance and actionable advice tailored to your unique financial goals and risk tolerance. Through cutting-edge AI algorithms and real-time market analysis, UPS & DOWNS keeps a vigilant eye on market trends, economic indicators, and news events that could impact your investments. Our goal is simple: to empower you with the knowledge and tools you need to make informed decisions and stay ahead of the curve in an ever-changing financial landscape.</p>
              </div>
              <div id="chart">
                <VueApexCharts
                height="500"
                width="500"
                type="line"
                :options="chartOptions"
                :series="series"
                ></VueApexCharts>
              </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 30px;
}

#parent {
  display: flex;
  justify-content: space-between;
}
.textbutton {
    color: #7c3aed;
    margin: 50px;
    text-decoration: underline;
}

#split {
    width: 50%;
    line-height: 200%;
    float: left;
}

.para {
    font-weight: bold;
}

h1 {
  /* Apply gradient to text */
  background: linear-gradient(135deg, #7c3aed, #5d90e8);
  /* Set text color to transparent to show the gradient */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Adjust font properties */
  font-size: 60px; /* Adjust the font size */
  font-weight: bold; /* Make the text bold */
  font-family: Arial, sans-serif; /* Specify font family */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add text shadow for definition */
  margin-left: 25px;
}

#chart {
  display: flex;
  float: right;
  margin-right: 60px;
  margin-bottom: 30px;
}

#parent {
  display: flex;
}
</style>