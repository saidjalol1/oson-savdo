<script setup>
import { formatNumber } from 'chart.js/helpers'


const menuStatus = ref(true)
const config = useRuntimeConfig()


const sales = ref([])
const selectedDate = ref(null)
const searchQuery = ref("")
const currentPage = ref(1)
const itemsPerPage = ref(10)


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



onMounted(async () =>{
    await salesget()
})
</script>
<template>

                <div class="sales h-[calc(50vh-120px)]  w-full hover:shadow-lg shadow bg-white px-2 py-5 rounded-lg" style="overflow-y: auto;overflow-x: auto;">
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
                                placeholder="Klient bo'yicha qidiruv">
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
                                <th class="py-3 px-4 text-center">Kassir</th>
                                <th class="py-3 px-4 text-center">Jami</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Row -->
                            <tr @click="detailToggle(sale)" v-for="sale in paginatedSales" :key="sale.index" class=" hover:bg-gray-100 cursor-pointer">
                                <td class="py-4 px-4 flex items-center gap-3">                                       
                                    <span class="text-gray-800 font-bold">{{ sale?.date_added }}</span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        <span class="text-green-500">{{ formatNumber(sale?.cash_payment) }}/{{ formatNumber(sale?.card_payment) }}</span>/<span class="text-red-500">{{ formatNumber(sale?.debt) }}</span>
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ sale.owner.name }} {{ sale.owner.surname }}
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
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
</template>
<style scoped>
.page_body{
    background-color: aliceblue;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
table{
    overflow-y: scroll;
    overflow-x: scroll;
}

</style>