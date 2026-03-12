<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,PointElement,LineElement } from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale,PointElement,LineElement)
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <main>
    <div class="w-100 h-100">
      <Line :data="data" :options="options" />
    </div>
  </main>
</template>
