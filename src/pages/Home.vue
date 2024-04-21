<script setup>
import { authUserStore } from '../stores.js';
import { useRouter } from "vue-router"
import { ArrowRedo } from "@vicons/ionicons5";
import { onMounted } from "vue";

const stocks = [
  'AAPL',  'MSFT', 'AMZN', 'NVDA',
  'GOOGL', 'TSLA', 'GOOG', 'BRK.B',
  'META',  'UNH',  'XOM',  'LLY',
  'JPM',   'JNJ',  'V',    'PG',
  'MA',    'AVGO', 'HD',   'CVX',
  'MRK',   'ABBV', 'COST', 'PEP',
  'ADBE'
];

let router = useRouter();

const rand = Math.floor(Math.random() * stocks.length);
const curr = stocks[rand];

const fetchStockData = async () => {
  try {
    fetch(`/stock/${searchTerm.value}`)
    .then(response => response.json())
    .then(json => {  
      Promise.resolve(json.data)
      .then(data => {
        data = data.quotes.slice(-300)
        chartOptions.value = {
          chart: {
            type: 'line',
            height: 600
          },
          title: {
            text: `${searchTerm.value} Stock Prices`
          },
          xaxis: {
            type: 'datetime',
            stepSize: 30,
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
      })
    })
  } catch (err) {
    console.log(err);
  }
};

function goToDashboard() {
    router.push("/dashboard")
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
        </div>
        <div v-else id="notloggedin">
            <h1>UPS & DOWNS: Your Personal Finance Advisor</h1>
            <div id="split">
                <p class="para">Welcome to UPS & DOWNS: Your personal finance advisor, your AI companion dedicated to navigating the volatile seas of trading and personal finance. Whether you're a seasoned investor or just dipping your toes into the world of finance, UPS & DOWNS is here to provide insightful guidance and actionable advice tailored to your unique financial goals and risk tolerance. Through cutting-edge AI algorithms and real-time market analysis, UPS & DOWNS keeps a vigilant eye on market trends, economic indicators, and news events that could impact your investments. Our goal is simple: to empower you with the knowledge and tools you need to make informed decisions and stay ahead of the curve in an ever-changing financial landscape</p>
            </div>
            <VueApexCharts
              width="600"
              type="candlestick"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 30px;
}

.textbutton {
    color: #7c3aed;
    margin: 50px;
    text-decoration: underline;
}

#split {
    width: 50%;
    line-height: 200%;
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
</style>