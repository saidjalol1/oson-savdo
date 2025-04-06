<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { watch } from 'vue';


const config = useRuntimeConfig()
const emit = defineEmits(['detailToggle', 'productUpdated']);
const editModal = ref(false)
const deleteModal = ref(false)
const editedProduct = ref({})
const props = defineProps({
    menu2: Boolean,
    product : Object,
    categories: Array
})
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    editedProduct.value = {
      name: newProduct.name || '',
      category_id: newProduct.category?.id || null,
      id: newProduct.id || null
    };
  }
}, { immediate: true });


const detailToggle = () => {
    emit('detailToggle');
};

const updateProduct = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/product-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id:parseInt(props?.product?.id),
        name: editedProduct.value.name,
        category_id: parseInt(editedProduct.value.category_id),
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    emit('productUpdated'); 
    toggleEdit()
    detailToggle()
  } catch (error) {
    console.log(error);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const deleteProduct = async (product_id) => {
  try {
    const response = await fetch(`${config.public.apiBase}/product-delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id:parseInt(product_id),
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    emit('productUpdated'); 
    detailToggle()
    deleteModal.value = false
  } catch (error) {
    console.log(error);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

function calculateRemainingSalePrice(reports) {
  return reports.reduce((total, report) => {
    return total + report.quantity_left * report.sale_price;
  }, 0);
}

function calculateRemainingQuantity(reports) {
  return reports.reduce((total, report) => {
    return total + report.quantity_left;
  }, 0);
}

function convertDate(object){
    return new Date(object?.date_added).toLocaleDateString()
}

function toggleEdit(){
    editModal.value = !editModal.value
}



</script>
<template> 
    <div class="overlay" v-if="menu2">
        <div  class="menu_2 shadow-lg">
        <div class="page_title bg-white flex justify-between items-center px-5">
            <div class="text-2xl font-bold px-3 bg-white py-3">
                Mahsulot haqida
            </div>
            <div class="flex gap-5">
                <button @click="detailToggle" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-col ">
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer">
                <div class="text text-2xl">Mahsulot</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-lg">{{ product.name }} ({{ product?.category?.name }})</div>
                </div>
            </div>
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer">
                <div class="text">Oxirgi xarid narxi</div>
                <div class="product_data flex items-center" v-if="product.store_reports_in.length">
                    <div class="text-md">$ </div>
                    <div class="product_name font-bold text-lg">{{ product.store_reports_in.at(-1)?.price }}</div>
                </div>
            </div>
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer ">
                <div class="text">Oxirgi sotuv narxi</div>
                <div class="product_data flex items-center" v-if="product.store_reports_in.length">
                    <div class="text-md">$ </div>
                    <div class="product_name font-bold text-lg">{{ product.store_reports_in.at(-1)?.sale_price }}</div>
                </div>
            </div>
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer ">
                <div class="text">Qoldiq (sotuv narxida)</div>
                <div class="product_data flex items-center">
                    <div class="text-md">$</div>
                    <div class="product_name font-bold text-lg">{{ calculateRemainingSalePrice(product?.store_reports_in) }}</div>
                </div>
            </div>
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer ">
                <div class="text">O'lchov birligi</div>
                <div class="product_data flex items-center">
                    <div class="text-md"></div>
                    <div class="product_name font-bold text-lg">Kg</div>
                </div>
            </div>
            <div class="flex justify-between hover:bg-gray-200 py-4 px-5 cursor-pointer ">
                <div class="text">Xozirda bor</div>
                <div class="product_data flex items-center">
                    <div class="text-md"></div>
                    <div class="product_name font-bold text-lg">{{ calculateRemainingQuantity(product?.store_reports_in) }}</div>
                </div>
            </div>
        </div>
        <div class="px-5 flex gap-4 flex-wrap mt-4">
            <button @click="toggleEdit" class="py-3 px-4 shadow-md bg-black cursor-pointer text-white rounded-lg cursor-pointer flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                Tahrirlash
            </button>
            <button  @click="deleteModal = true" class="py-2 px-4 shadow-md bg-red-600 cursor-pointer text-white rounded-lg cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
        </div>
        <div class="px-5">
            <table class="w-full border-collapse mt-5">
                <thead class="w-full">
                    <tr class="bg-gray-200 w-full">
                        <th class="py-3 px-4 text-left">Partiya</th>
                        <th class="py-3 px-4 text-center">Soni</th>
                        <th class="py-3 px-4 text-center">Sotuv $</th>
                        <th class="py-3 px-4 text-center">Tan $</th>
                        <th class="py-3 px-4 text-center">Qoldiq (Miqdor)</th>
                    </tr>
                </thead>
                <tbody>
                                <!-- Row -->
                    <tr v-for="product in product.store_reports_in" :key="product.index" class=" hover:bg-gray-100 cursor-pointer">
                        <td class="py-4 px-4 flex items-center gap-3">
                            <span class="text-gray-800 font-bold">{{ convertDate(product) }}</span>
                        </td>
                        <td  class="text-center">
                            <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                {{ product?.quantity_in }}
                            </span>
                        </td>
                        <td  class="text-center">
                            <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                {{ product?.sale_price }}
                            </span>
                        </td>
                        <td  class="text-center">
                            <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                {{ product?.price }}
                            </span>
                        </td>
                        <td class="text-center" ><span class="bg-red-100 text-black-600 px-3 py-1 ">{{ product?.quantity_left }} </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
    <div class="overlay" v-if="editModal">
        <div class="modal menu_2">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                    </svg>
                    Tahrirlash
                </div>
                <div class="flex gap-5">
                    <button @click="toggleEdit" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body p-5">
                <form @submit.prevent="updateProduct">
                    <div class="form_group flex flex-col">
                        <span class="font-bold mb-2 text-xl">Nomi *</span>
                        <input type="text"  v-model="editedProduct.name" class="py-3 px-4 text-xl border border-gray-300 rounded-lg" >
                    </div>
                    <div class="form_group flex flex-col mt-5">
                        <span class="font-bold mb-2 text-xl">Categoriya *</span>
                        <select v-model="editedProduct.category_id" class="border rounded w-full p-2 mb-4">
                            <option v-if="cat?.name != 'Hammasi' " v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                    </div>
                    <div class="form_group flex justify-end gap-x-4 mt-5">
                        <button type="submit" class="py-2 px-4 bg-black bg-yellow-400 text-white rounded-lg cursor-pointer">
                            Saqlash
                        </button>
                        <button @click="toggleEdit" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                            Yopish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="overlay flex justify-center items-center" v-if="deleteModal">
        <div class="modal delete_modal">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    O'chirish
                </div>
                <div class="flex gap-5">
                    <button class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body p-5">
                <div class="text text-center">
                    Mahsulotni o'chirsangiz unga aloqador barcha hisobotlar o'chadi !!!
                </div>
                <div class="flex gap-x-2 justify-center mt-8">
                    <button  @click="deleteProduct(product.id)" class="py-2 px-4 shadow-md bg-red-600 cursor-pointer text-white rounded-lg cursor-pointer">
                        O'chirish
                    </button>
                    <button  @click="deleteModal = false" class="py-2 px-4 shadow-md bg-black cursor-pointer text-white rounded-lg cursor-pointer">
                        Yopish
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.menu_2{
    width: 700px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
}
.delete_modal{
    width: 400px;
    height: 300px;
    background-color: white;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}

.text{
    font-size: 18px;
    color: gray;
}
.overlay{
    width: 100%;
    height: 100vh;
    background-color: rgba(209, 206, 206, 0.589);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
</style>