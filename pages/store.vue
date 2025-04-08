<script setup>
import { useRouter } from 'vue-router';
const menuStatus = ref(true)
const modal_status = ref(false)
const modal_status2 = ref(false)
const menu2 = ref(false)
const activeIndex = ref(0)

const route = useRouter()
const config = useRuntimeConfig()

const categories = ref([])
const store = ref({})
const selectedProduct = ref(null)
const searchQuery = ref('');
const filteredProducts = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;
const selectedCategory = ref(null)


const categoriesGet = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/categories`, {
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

    const fetchedCategories = await response.json();

    categories.value = [{ id: null, name: "Hammasi", products: [] }, ...fetchedCategories];
  } catch (error) {
    console.log(error);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const productsGet = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/product`, {
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

    const products = await response.json();
    store.value = products;
    applyFilters(); 
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const handleProductUpdated = () => {
  // 🔁 Refresh product list, close modal, show notification, etc.
  productsGet(); // for example, re-fetch data
  categoriesGet()
};

const applyFilters = () => {
  let products = store.value.products || [];

  // Filter by category if not "All"
  if (selectedCategory.value !== null) {
    products = products.filter(
      product => product?.category_id === selectedCategory.value
    );
  }

  // Filter by search
  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase();
    products = products.filter(
      product => product.name.toLowerCase().includes(search)
    );
  }

  filteredProducts.value = products;
  currentPage.value = 1; // Reset page after filtering
};

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});


const detailToggle = (product = null) => {
  menu2.value = !menu2.value
  if (product) {
    selectedProduct.value = product
  }
}


const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}
const closeModall = () =>{
    modal_status.value = !modal_status.value
}

const closeModal2 = () => {
  modal_status2.value = !modal_status2.value
}


const setActive = (index) => {
  activeIndex.value = index;
  selectedCategory.value = categories.value[index]?.id || null;
  applyFilters();
};

watch(searchQuery, () => {
  applyFilters();
});

const changeFirstLetter = (word) =>{
    return `${word[0].toUpperCase()}${word.slice(1)}`
}

const formatUrl = (path) =>{
    return `${config.public.apiBase}/${path}`
}

const loadingButtons = ref({})
const printCode = (image, id) => {
  loadingButtons.value[id] = true;

  setTimeout(() => { // Simulate loading delay
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
        <head>
          <title>Print Code</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${image}" alt="Code Image" />
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    loadingButtons.value[id] = false;
  }, 2000); // Simulated delay for loader effect
};


onMounted( async () =>{
    await categoriesGet()
    await productsGet()
    selectedCategory.value = null;
})
</script>
<template>
     <div class="flex">
        <div class="menu">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="w-full">
            <Header @menuToggle="toggleMenu"/>
            <div class="page_body w-full h-[calc(100vh-65px)]">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                    Ombor
                </div>
                <div class="flex gap-5">
                    <input  v-model="searchQuery" type="text" placeholder="Qidiruv" class="text-center py-2 px-10 bg-gray-100" style="border-radius: 6px;">
                    <button @click="closeModall" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">+ Yangi</button>
                    <button @click="modal_status2 = true" class="py-2 px-4 bg-yellow-400 text-white rounded-lg cursor-pointer">🔁 To'ldirish</button>
                </div>
            </div>
            <div class="store_body h-[calc(100vh-120px)] flex">
                <div class="categories py-4 px-2">
                    <div
                        v-for="(category, index) in categories"
                        :key="index"
                        class="item flex justify-between items-center gap-4 px-4 cursor-pointer"
                        :class="{ active: activeIndex === index }"
                        @click="setActive(index)"
                        >
                            <div class="title flex gap-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
                                </svg>
                                {{ changeFirstLetter(category.name) }}
                            </div>
                            <div class="icon bg-orange-400 text-white">{{ category.id === null ? store.products?.length : category.products.length }}</div>
                    </div>
                    
                </div>
                <div class="products py-4 px-2 w-full gap-4">
                    <div class="overflow-x-auto w-full bg-white">
                        <table class="w-full border-collapse">
                            <thead class="w-full">
                                <tr class="bg-gray-200 w-full">
                                    <th class="py-3 px-4 text-left">Mahsulot</th>
                                    <th class="py-3 px-4 text-center">Categoriya</th>
                                    <th class="py-3 px-4 text-center">Oxirgi kiritilgan sana</th>
                                    <th class="py-3 px-4 text-center">Barcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Row -->
                                <tr @click="detailToggle(product)" v-for="product in paginatedProducts" :key="product.index" class=" hover:bg-gray-100 cursor-pointer">
                                    <td class="py-4 px-4 flex items-center gap-3">
                                        <NuxtImg :src="formatUrl(product?.barcode)" width="80px" height="80px" />
                                        <span class="text-gray-800 font-bold">{{ product.name }}</span>
                                    </td>
                                    <td  class="text-center">
                                        <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
                                            </svg>
                                            {{ product?.category?.name }}
                                        </span>
                                    </td>
                                    <td class="text-center" v-if="product.store_reports_in.length"><span class="bg-green-100 text-black-600 px-3 py-1 ">✔  {{ new Date(product.store_reports_in.at(-1)?.date_added).toLocaleDateString() }}</span></td>
                                    <td class="text-center" v-else><span class="bg-red-100 text-black-600 px-3 py-1 ">Mavjus emas</span></td>
                                    <td class="text-center">
                                      <button :disabled="loadingButtons[product.id]" class="btn ml-2 px-2 py-2 bg-yellow-500 rounded-lg shadow-md cursor-pointer" @click.stop="printCode(formatUrl(product?.barcode), product.id)">
                                          <div  v-if="loadingButtons[product.id]" class="loader"></div>
                                              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                                  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                                  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                                              </svg>
                                      </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-end mt-4 gap-2 mb-4 px-4">
                            <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200 rounded">Oldingi</button>
                                <span class="py-1 px-3">{{ currentPage }} / {{ totalPages }}</span>
                            <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 bg-gray-200 rounded">Keyingi</button>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        <ProductDetail :menu2="menu2" :product="selectedProduct" :categories="categories"  @productUpdated="handleProductUpdated"  @detailToggle="detailToggle"/>
        </div>
    </div>
    <StoreModal :modal="modal_status" :modal2="modal_status2" :store_id="store?.id" :categories="categories" :products="store?.products" @closeModal="closeModall" @closeModal2="closeModal2"/>
</template>
<style scoped>
.page{
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgb(230, 230, 230);
    z-index: -1;
}
.page_body{
    background-color: #f1f1f3;
}

.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
.store_body{
    width: 100%;
    background-color: #f1f1f3;
    
}
.categories{
    width: 280px;
    border-right: 2px solid rgb(230, 230, 230);
    height: 100%;
    background-color: white;
    overflow-y: scroll;
    overflow-x: scroll;
}
.title{
    font-weight: 500;
}
.item{
    width: 200px;
    height: 40px;
    border-radius: 40px;
    cursor: pointer;
}

.active{
    background-color: #fff5cc;
}

.item:hover{
    background-color: rgb(241, 233, 233);
}
.icon{
    padding: 0px 7px;
    border-radius: 6px;

}
.products{
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    align-items: start;
    overflow-y: auto;
}
.product{
    max-width: 300px;
    min-width: 300px;
    background-color: white;
    height: 100px;
    border-radius: 10px;
}
.product:hover{
    transform: scale(1.06);
}
.editBlock{
  position: relative;
  top: 30px;
}

.loader {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #525355; /* Primary Blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Loader Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>