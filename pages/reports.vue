<script setup>
import { formatNumber } from 'chart.js/helpers'


const menuStatus = ref(true)
const menu2 = ref(false)
const config = useRuntimeConfig()
const saledetailObject = ref({})

const sales = ref([])
const selectedDate = ref(null)
const searchQuery = ref("")
const currentPage = ref(1)
const itemsPerPage = ref(10)

const detailToggle = (object) =>{
    menu2.value = !menu2.value
    saledetailObject.value = object
}

const productUpdated = async ()=>{
   await salesget()
}

const salesget = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/sales`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    const salesObjects = await response.json();
    sales.value = salesObjects;
    console.log(sales.value);
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};


const filteredSales = computed(() => {
    // First make a copy of the sales array
    let filtered = [...sales.value];
    
    // Sort by date_added (newest first)
    filtered.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    
    // Then apply your existing filters
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(sale => 
            sale.client_name?.toLowerCase().includes(query)
        );
    }
    

    if (selectedDate.value) {
        const filterDate = new Date(selectedDate.value).toDateString();
        filtered = filtered.filter(sale => {
            const saleDate = new Date(sale.date_added).toDateString();
            return saleDate === filterDate;
        });
    }
    
    return filtered;
});

const paginatedSales = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredSales.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredSales.value.length / itemsPerPage.value)
})

watch([searchQuery, selectedDate], () => {
    currentPage.value = 1
})
const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const range = 2 // Number of pages to show before/after current
    const pages = []

    // Always show first page
    pages.push(1)

    // Add ellipsis if needed after first page
    if (current - range > 2) {
        pages.push('...')
    }

    // Add pages around current page
    for (let i = Math.max(2, current - range); i <= Math.min(total - 1, current + range); i++) {
        pages.push(i)
    }

    // Add ellipsis if needed before last page
    if (current + range < total - 1) {
        pages.push('...')
    }

    // Always show last page if different from first
    if (total > 1) {
        pages.push(total)
    }

    return pages
})

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}


onMounted(async () =>{
    await salesget()
})
</script>
<template>
     <div class="flex">
        <div class="menu">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="w-full">
            <Header @menuToggle="toggleMenu"/>
            <div class="page_body w-full">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                    Kirim
                </div>
                <div>
                </div>
               
            </div>
            <div class="store_body flex  flex-col gap-3 p-5 ">
                <div class="sales h-[calc(100vh-250px)]  w-full hover:shadow-lg shadow bg-white px-2 py-5 rounded-lg" style="overflow-y: auto;overflow-x: auto;">
                    <div class="head flex justify-between items-center text-xl font-bold">
                        <div>
                            Sotuvlar
                        </div>
                        <div class="flex gap-5">
                            <input   
                                v-model="searchQuery" 
                                type="text" 
                                class="text-center py-2 px-10 bg-gray-100 font-sm text-sm" 
                                style="border-radius: 6px;border: 0px solid white !important;"
                                placeholder="Qarzdor bo'yicha qidiruv">
                            <input   
                                v-model="selectedDate" 
                                type="date" 
                                class="text-center py-2 px-10 bg-gray-100 font-sm text-sm" 
                                style="border-radius: 6px;border: 0px solid white !important;">
                        </div>
                    </div>
                    <table class="w-full border-collapse mt-2">
                        <thead class="w-full">
                            <tr class="bg-gray-200 w-full">
                                <th class="py-3 px-4 text-left">Sana</th>
                                <th class="py-3 px-4 text-center">Karta / Naqd / Qarz</th>
                                <th class="py-3 px-4 text-center">Qarzdor</th>
                                <th class="py-3 px-4 text-center">Kassir</th>
                                <th class="py-3 px-4 text-center">Jami</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Row -->
                            <tr @click="detailToggle(sale)" v-for="sale in paginatedSales.reverse()" :key="sale.index" class=" hover:bg-gray-100 cursor-pointer">
                                <td class="py-4 px-4 flex items-center gap-3">                                       
                                    <span class="text-gray-800 font-bold">{{ formatDateTime(sale?.date_added )}}</span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        <span class="text-orange-500 bg-gray-300 px-2  rounded-full">{{ formatNumber(sale?.card_payment) }}</span>/
                                        <span class="text-green-500 bg-gray-300 px-2  rounded-full">{{ formatNumber(sale?.cash_payment) }}</span>/
                                        <span class="text-red-500 bg-gray-300 px-2  rounded-full">{{ formatNumber(sale?.debt) }}</span>
                                    </span> 
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ sale.client_name }}
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ sale.owner.name }} {{ sale.owner.surname }}
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-purple-600 bg-gray-300 rounded-full flex gap-3 font-bold items-center justify-center  py-1">
                                        {{ sale.total }}
                                    </span>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                        
                </div>
                <div class="pagination flex justify-center items-center gap-2 py-4 ">
                            <button @click="currentPage = currentPage - 1"  :disabled="currentPage === 1"
                                class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition">&lt;
                            </button>

                            <div v-for="(page, index) in visiblePages" :key="index">
                                <span v-if="page === '...'" class="px-3 py-1">{{ page }}</span>
                                <button v-else @click="currentPage = page"
                                    class="px-3 py-1 rounded cursor-pointer hover:bg-gray-300 transition"
                                    :class="{'bg-yellow-500 text-white hover:bg-yellow-600': currentPage === page}">{{ page }}
                                </button>
                            </div>
                            
                            <button 
                                @click="currentPage = currentPage + 1" 
                                :disabled="currentPage === totalPages"
                                class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition">&gt;
                            </button>
                </div>
            </div>
        </div>
        </div>
        <SaleDetail :menu2="menu2"  @detailToggle="detailToggle" @productUpdated="productUpdated" :sale="saledetailObject"/>
    </div>

</template>
<style scoped>
.page_body{
    background-color: #f1f1f3;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
table{
    overflow-y: scroll;
    overflow-x: scroll;
}

</style>