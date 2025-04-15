<script setup>
import { formatNumber } from 'chart.js/helpers'


const menuStatus = ref(true)
const menu2 = ref(false)
const config = useRuntimeConfig()
const saledetailObject = ref({})

const providers = ref([])
const selectedDate = ref(null)
const searchQuery = ref("")
const currentPage = ref(1)
const itemsPerPage = ref(10)

const detailToggle = (object) =>{
    menu2.value = !menu2.value
    saledetailObject.value = object
}

const providersGet = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/providers`, {
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

    const provider_list = await response.json();
    providers.value = provider_list;
    console.log(provider_list);
    
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const filteredProviders = computed(() => {
    // First make a copy of the sales array
    let filtered = [...providers.value];
    
    // Then apply your existing filters
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(p => 
            p.full_name?.toLowerCase().includes(query)
        );
    }
    return filtered;
});

const paginatedProviders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredProviders.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredProviders.value.length / itemsPerPage.value)
})

watch([searchQuery], () => {
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

const update = async () =>{
  await providersGet()
}

onMounted(async () =>{
    await providersGet()
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
                    Ta'minotchilar
                </div>
                <div class="flex gap-5">
                  <input   
                      v-model="searchQuery" 
                      type="text" 
                      class="text-center py-2 px-10 bg-gray-100 font-sm text-sm" 
                      style="border-radius: 6px;border: 0px solid white !important;"
                      placeholder="Qidirish">
                </div>
            </div>
            <div class="store_body flex  flex-col gap-3 p-5 ">
                <div class="sales h-[calc(100vh-242px)]  w-full hover:shadow-lg shadow bg-white px-2 py-5 rounded-lg" style="overflow-y: auto;overflow-x: auto;">
                    <table class="w-full border-collapse mt-2">
                        <thead class="w-full">
                            <tr class="bg-gray-200 w-full">
                                <th class="py-3 px-4 text-left">Ismi</th>
                                <th class="py-3 px-4 text-center">Telefon</th>
                                <th class="py-3 px-4 text-center">Qarz</th>
                                <th class="py-3 px-4 text-center">Jami savdo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Row -->
                            <tr @click="detailToggle(p)" v-for="p in paginatedProviders.reverse()" :key="p.index" class=" hover:bg-gray-100 cursor-pointer">
                                <td class="py-4 px-4 flex items-center gap-3">                                       
                                    <span class="text-gray-800 font-bold">{{ p.full_name }}</span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex flex-col gap-3 font-bold items-center justify-center px-3 py-1">
                                        <div class="text-black  px-2">{{ p.phone_number }}</div>
                                        <div class="text-black  px-2">{{ p.phone_number2 }}</div>
                                    </span> 
                                </td>
                                <td  class="text-center">
                                    <span class="text-red-500 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ formatNumber(p.debt_left) }}
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-green-500 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                      {{ formatNumber(p.total) }}
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
      <ProviderDetail :menu2="menu2"  @detailToggle="detailToggle" @update="update" :item="saledetailObject" />
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