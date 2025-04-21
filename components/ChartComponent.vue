<template>
  <div class="sales-chart-container">
    <div class="chart-header">
      <h2>Sotuv</h2>
      <div class="chart-controls">
        <div class="date-filters">
          <label for="startDate">Dan:</label>
          <input
            id="startDate"
            v-model="filters.startDate"
            type="date"
            @change="fetchSalesData"
          />
          
          <label for="endDate">gacha:</label>
          <input
            id="endDate"
            v-model="filters.endDate"
            type="date"
            @change="fetchSalesData"
          />
        </div>
        
        <div class="payment-filters">
          <label>
            <input
              v-model="filters.paymentTypes"
              type="checkbox"
              value="card"
              @change="updateChart"
            />
            Karta
          </label>
          <label>
            <input
              v-model="filters.paymentTypes"
              type="checkbox"
              value="cash"
              @change="updateChart"
            />
            Naqd
          </label>
          <label>
            <input
              v-model="filters.paymentTypes"
              type="checkbox"
              value="debt"
              @change="updateChart"
            />
            Nasiya
          </label>
        </div>
      </div>
    </div>
    
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
    
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'

// Chart reference
const config  = useRuntimeConfig()
const chartCanvas = ref(null)
let chartInstance = null

// Data and state
const salesData = ref([])
const loading = ref(false)
const error = ref(null)


const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}
const getDateDaysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0]
}

const formatForInput = (date) => {
  return date.toISOString().split('T')[0]
}

// To this:
const filters = ref({
  startDate: getDateDaysAgo(30),
  endDate: formatForInput(new Date()),
  paymentTypes: ['card', 'cash', 'debt']
})
// Fetch sales data from API
const fetchSalesData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const queryParams = new URLSearchParams()
    if (filters.value.startDate) queryParams.append('start_date', filters.value.startDate)
    if (filters.value.endDate) queryParams.append('end_date', filters.value.endDate)
    
    const response = await fetch(`${config.public.apiBase}/stores/sales-summary?${queryParams.toString()}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sales data: ${response.statusText}`)
    }
    
    salesData.value = await response.json()
    updateChart()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching sales data:', err)
  } finally {
    loading.value = false
  }
}

// Update chart with current data and filters
const updateChart = () => {
  if (!salesData.value.length) return
  
  const dates = salesData.value.map(item => formatDate(item.date))
  
  const datasets = []
  
  if (filters.value.paymentTypes.includes('card')) {
    datasets.push({
      label: 'Karta',
      data: salesData.value.map(item => item.card_payments),
      backgroundColor: '#4e73df',
      borderColor: '#2e59d9',
      borderWidth: 1
    })
  }
  
  if (filters.value.paymentTypes.includes('cash')) {
    datasets.push({
      label: 'Naqd',
      data: salesData.value.map(item => item.cash_payments),
      backgroundColor: '#1cc88a',
      borderColor: '#17a673',
      borderWidth: 1
    })
  }
  
  if (filters.value.paymentTypes.includes('debt')) {
    datasets.push({
      label: 'Nasiya',
      data: salesData.value.map(item => item.debt_payments),
      backgroundColor: '#e74a3b',
      borderColor: '#be2617',
      borderWidth: 1
    })
  }
  
  // If no payment types selected, show all
  if (datasets.length === 0) {
    datasets.push(
      {
        label: 'Karta',
        data: salesData.value.map(item => item.card_payments),
        backgroundColor: '#4e73df',
        borderColor: '#2e59d9',
        borderWidth: 1
      },
      {
        label: 'Naqd',
        data: salesData.value.map(item => item.cash_payments),
        backgroundColor: '#1cc88a',
        borderColor: '#17a673',
        borderWidth: 1
      },
      {
        label: 'Nasiya',
        data: salesData.value.map(item => item.debt_payments),
        backgroundColor: '#e74a3b',
        borderColor: '#be2617',
        borderWidth: 1
      }
    )
    filters.value.paymentTypes = ['Karta', 'Naqd', 'Nasiya']
  }
  
  // Destroy previous chart instance if exists
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  // Create new chart
  const ctx = chartCanvas.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.raw)
              return label
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(value)
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}

// Initialize component
onMounted(() => {
  fetchSalesData()
})

// Watch for date changes
watch(
  () => [filters.value.startDate, filters.value.endDate],
  () => {
    fetchSalesData()
  }
)
</script>

<style scoped>
/* Your existing styles remain the same */
.sales-chart-container {
  position: relative;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.chart-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.chart-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4e73df;
  margin-bottom: 1rem;
}

.chart-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.date-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.date-filters label {
  font-size: 0.875rem;
  color: #5a5c69;
}

.date-filters input {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

.date-filters input:focus {
  outline: none;
  border-color: #bac8f3;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

.payment-filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.payment-filters label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #5a5c69;
  cursor: pointer;
}

.payment-filters input {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  width: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 0.35rem solid #f3f3f3;
  border-top: 0.35rem solid #4e73df;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 0.35rem;
  margin-top: 1rem;
  border: 1px solid #f5c6cb;
}
</style>