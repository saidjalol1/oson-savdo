<script setup>
import { ref, computed } from 'vue';

const menuStatus = ref(true);
const search = ref('');
const open = ref(false);
const selectedProducts = ref([]); // Now an array to store multiple selections

const products = ref([
  'Shokolad',
  'Mineral Suv',
  'Pomada',
  'Ruchka',
  'Shampun',
  'Sovun'
]);

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.toLowerCase().includes(search.value.toLowerCase())
  );
});

const selectProduct = (product) => {
  if (!selectedProducts.value.includes(product)) {
    selectedProducts.value.push(product);
  }
  search.value = '';
  open.value = false;
};

const removeProduct = (product) => {
  selectedProducts.value = selectedProducts.value.filter(p => p !== product);
};

const toggleMenu = () => {
  menuStatus.value = !menuStatus.value;
};
</script>

<template>
     <div class="flex">
        <div class="menu">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="w-full">
            <Header @menuToggle="toggleMenu"/>
        </div>
    </div>
    <div class="flex">
      <div class="page_body w-full h-[calc(100vh-110px)]">
        <div class="page_title bg-white flex justify-between items-center px-5">
          <div class="text-2xl font-bold px-3 bg-white py-3">
            Hisobot Mahsulot bo'yicha
          </div>
        </div>
        <div class="store_body flex flex-col lg:flex-row xl:flex-row gap-3 p-5">
          <div class="sales flex-1 w-full hover:shadow-lg shadow bg-white p-5 rounded-lg">
            <div class="head text-xl font-bold">
              Tanlang
            </div>
            <hr>
            <div class="mt-10">
              <form action="" class="flex flex-col gap-8">
                <!-- Date Inputs -->
                <div class="input-group flex justify-between items-center">
                  <label class="text-lg text-gray-500 flex-1">Boshlanish sana</label>
                  <input type="date" class="px-10 border py-2 text-lg flex-1 rounded w-full">
                </div>
                <div class="input-group flex justify-between items-center">
                  <label class="text-lg text-gray-500 flex-1">Tugash sana</label>
                  <input type="date" class="px-10 border py-2 text-lg flex-1 rounded w-full">
                </div>
  
                <!-- Category Selection -->
                <div class="input-group flex justify-between items-center">
                  <span class="text-lg text-gray-500 flex-1">Kategoriya</span>
                  <div class="flex flex-wrap items-center gap-3">
                    <button class="px-4 text-lg rounded py-3 bg-gray-100 cursor-pointer shadow hover:shadow-lg">Qandolat</button>
                    <button class="px-4 text-lg rounded py-3 bg-gray-100 cursor-pointer shadow hover:shadow-lg">Suv</button>
                    <button class="px-4 text-lg rounded py-3 bg-gray-100 cursor-pointer shadow hover:shadow-lg">Kosmetika</button>
                    <button class="px-4 text-lg rounded py-3 bg-gray-100 cursor-pointer shadow hover:shadow-lg">Konstovar</button>
                  </div>
                </div>
  
                <!-- Product Selection -->
                <div class="mb-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-gray-700 mb-1 flex-1">Mahsulotni tanlang</label>
                    <div class="w-full flex-1 relative">
                      <input 
                        type="text"
                        placeholder="Mahsulot izlang..."
                        class="px-10 border py-2 text-lg flex-1 rounded w-full"
                        v-model="search"
                        @focus="open = true"
                        @click="open = true"
                      >
                      <ul 
                        v-show="open && filteredProducts.length"
                        class="absolute w-full bg-white border rounded-md shadow-lg mt-1 overflow-y-auto max-h-40 z-10"
                      >
                        <li 
                          v-for="product in filteredProducts" 
                          :key="product"
                          @click="selectProduct(product)"
                          class="px-3 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          {{ product }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
  
                <!-- Selected Products -->
                <div v-if="selectedProducts.length" class="mt-2">
                  <span class="text-lg font-semibold">Tanlangan:</span>
                  <div class="flex flex-wrap mt-2 gap-2 mt-2">
                    <span 
                      v-for="product in selectedProducts" 
                      :key="product" 
                      class="bg-red-600 py-2 px-3 text-white rounded-lg flex items-center gap-2"
                    >
                      {{ product }}
                      <span class="cursor-pointer text-white font-bold" @click="removeProduct(product)">✖</span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
  
          <!-- Reports Section -->
          <div class="sales flex-1 w-full hover:shadow-lg shadow bg-white p-5 rounded-lg">
            <div class="head text-lg font-bold">
              Hisobotlar
            </div>
            <hr>
            <div class="mt-2">
                <div class="text-xl">Sotuv</div>
                <div class="flex justify-between mt-2">
                    <span class="text-md text-gray-500">Summa</span>
                    <span class="text-xl text-green-500 font-bold">23 000 000</span>
                </div>
                <div class="flex justify-between mt-2">
                    <span class="text-md text-gray-500">Miqdor</span>
                    <span class="text-xl text-green-500 font-bold">23 000 000</span>
                </div>
                <div class="flex justify-between mt-2">
                    <span class="text-md text-gray-500">Foyda</span>
                    <span class="text-xl text-green-500 font-bold">23 000 000</span>
                </div>
                <hr>
                <div class="text-xl mt-4">Omborda Qoldiq</div>
                <div class="flex justify-between mt-2">
                    <span class="text-md text-gray-500">Summa</span>
                    <span class="text-xl text-green-500 font-bold">23 000 000</span>
                </div>
                <div class="flex justify-between mt-2">
                    <span class="text-md text-gray-500">Miqdor</span>
                    <span class="text-xl text-green-500 font-bold">23 000 000</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<style scoped>
.page_body{
    background-color: aliceblue;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}

ul{
    position: relative;
}

hr{
    color: gray;
    margin-top: 10px;
}

table{
    width: 100%;
    border: 1px solid rgb(230, 230, 230);
    border-style: collapse;
    overflow-x: auto;
    overflow-y: auto;
    margin-top: 10px;
}
thead tr td{
    font-weight: bold;
}
tr, td{
    border: 3px solid rgb(230, 230, 230);
    padding: 4px;
}

</style>