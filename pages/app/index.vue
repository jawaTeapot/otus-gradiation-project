<template>
  <div>
    <h1>Hello World</h1>
    <el-divider />
    <client-only>
      <el-dialog
        v-model="creatNewProject"
        fullscreen
        align-center
        append-to-body
        :show-close="false"
        :close-on-press-escape="false"
      >
        <template #header>
          <div class="text-xl font-bold md:text-2xl text-center">
            {{ $t('create-project.heading') }}
          </div>
        </template>
        <template #default>
          <app-create-project />
        </template>
      </el-dialog>
    </client-only>
    <div class="grid grid-cols-1 gap-8">
      <div>
        <PolarArea :data="dataPolarArea" :options="options" />
      </div>
      <div>
        <Bar :data="dataBar" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement, Colors } from 'chart.js'
import { Bar, PolarArea } from 'vue-chartjs'
import { useUserStore } from '~/store/user'
import AppCreateProject from '~/components/app/appCreateProject.vue'

definePageMeta({
  layout: 'default',
  public: false
})

ChartJS.register(RadialLinearScale, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors)
const userStore = useUserStore()

const dataBar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
}

const dataPolarArea = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const creatNewProject = computed(() => !userStore.userProjects.length)
</script>
