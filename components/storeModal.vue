<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const config = useRuntimeConfig()
const props = defineProps({
    modal: Boolean,
    modal2: Boolean,
    store_id: Number,
    categories: Array,
    products: Array,
})

const error = ref("")
const error_modal = ref(false)
const category_modal = ref(false)
const newCategory = ref({})
const newProduct = ref({})
const editCategoryModal = ref(false)
const selectedCat = ref({})
const scanInput = ref("")
const foundProduct = ref({})
const nameSearch = ref("")
const nameSearchResult = ref([])
const newProductTransaction = ref({})

watch(scanInput, (value) => {
  if (value) {
    const found = props.products.find(p => {
      const barcode = p.barcode?.split('/')[1]?.split('_')[0];
      return barcode === value;
    });

    if (found) {
      console.log("Topilgan mahsulot:", found);
      foundProduct.value = found
    } else {
      alert("Mahsulot topilmadi!");
    }
  }
});

watch(nameSearch, (value) => {
  if (value.trim()) {
    nameSearchResult.value = props.products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    nameSearchResult.value = [];
  }
});


const ctgAdd = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/category-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        name: newCategory.value.name,
        store_id: parseInt(props?.store_id),
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    const data = await response.json()
    if (data.warning){
        error.value = data.warning
        error_modal.value = true
    }else{
        window.location.reload()
    }
  } catch (error) {
    console.log(error);
    prompt("Barcha maydonlarni toldirishingiz shart!!!")
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const ctgUpdate = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/category-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id:selectedCat.value?.id,
        name: selectedCat.value?.name,
        store_id: parseInt(props?.store_id),
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    const data = await response.json()
    if (data.warning){
        error.value = data.warning
        error_modal.value = true
    }else{
        window.location.reload()
    }
  } catch (error) {
    console.log(error);
    prompt("Barcha maydonlarni toldirishingiz shart!!!")
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const productCreate = async () => {
    if (!newProduct.value.name || !newProduct.value.category_id) {
        error.value = "Iltimos, barcha maydonlarni to'ldiring.";
        error_modal.value = true;
        return;
    }
  try {
    const response = await fetch(`${config.public.apiBase}/product-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        name: newProduct.value.name,
        store_id: parseInt(props.store_id),
        category_id: parseInt(newProduct.value.category_id)
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }
   

    const data = await response.json()
    if (data.warning){
        error.value = data.warning
        error_modal.value = true
    }else{
        window.location.reload()
    }

   
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify({
        name: newProduct.value.name,
        category_id: parseInt(newProduct.value.category_id),
        store_id: parseInt(props?.store_id),
      }),);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const productFill = async () => {
    if (!foundProduct.value.name) {
        error.value = "Mahsulot tanlang";
        error_modal.value = true;
        return;
    }
  try {
    const response = await fetch(`${config.public.apiBase}/product-enter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id: parseInt(foundProduct.value.id),
        store_id: parseInt(props.store_id),
        quantity_in: parseInt(newProductTransaction.value.quantity_in),
        price: parseFloat(newProductTransaction.value.price),
        sale_price: parseFloat(newProductTransaction.value.sale_price),
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }
   

    const data = await response.json()
    if (data.warning){
        error.value = data.warning
        error_modal.value = true
    }else{
        window.location.reload()
    }

   
  } catch (error) {
    console.log(error) 
    console.log(JSON.stringify({
        id: parseInt(foundProduct.value.id),
        store_id: parseInt(props.store_id),
        quantity_in: parseInt(newProductTransaction.value.quantity_in),
        price: parseFloat(newProductTransaction.value.price),
        sale_price: parseFloat(newProductTransaction.value.sale_price),
      }),);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};


const editCategory = (object) =>{
    selectedCat.value = object
    editCategoryModal.value = true
}

const scannedProduct = ()=>{
    console.log(props.products);
    
}

const emit = defineEmits(['closeModal', 'closeModal2']);

const close = () => {
    emit('closeModal');
};
const closeSecondModal = () =>{
    emit('closeModal2');
}

</script>
<template>
    <div v-if="error_modal" class="overal" style="z-index: 1000;">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Xatolik</div>
                <button @click="error_modal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <div class="text">
                    {{ error  }}
                </div>
            </div>
        </div>
    </div>
    <div v-if="modal" class="overal">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Mahsulot Yaratish</div>
                <button @click="close" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form @submit.prevent="productCreate">
                    <div class="form-group">
                        <label for="product-name">Nomi *</label>
                        <input type="text" v-model="newProduct.name" id="product-name" >
                    </div>

                    <div class="form-group">
                        <label for="category">Kategoriya *</label>
                        <div class="category-wrapper flex">
                            <select v-model="newProduct.category_id" class="border rounded w-full">
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id" selected>{{ cat.name }}</option>
                            </select>
                            <button type="button" @click="category_modal = true" class="new">+</button>
                        </div>
                    </div>

                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="close"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-if="category_modal" class="overal">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Categoriya yaratish</div>
                <button @click="category_modal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form @submit.prevent="ctgAdd">
                    <div class="form-group">
                        <label for="product-name">Nomi *</label>
                        <input v-model="newCategory.name" type="text" id="product-name" >
                    </div>

                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="category_modal = false"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
            </div>
            <div class="mt-5 flex flex-col overflow-auto">
                <div  v-for="cat in categories" :key="cat.id" @click="editCategory(cat)" class="flex justify-between py-2 hover:bg-gray-100 rounded px-4 items-center cursor-pointer">
                    <div v-if="cat.name != 'Hammasi' ">{{ cat.name }}</div>
                    <div v-if="cat.name != 'Hammasi' " class="flex gap-2 items-center">
                        <div class="py-2 px-4 bg-black text-white rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                            </svg>
                        </div>
                        <div class="py-2 px-4 bg-orange-400 text-white rounded">
                            {{ cat.products.length }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editCategoryModal" class="overal" style="z-index: 1000;">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Categoriyani Tahrirlash</div>
                <button @click="editCategoryModal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form @submit.prevent="ctgUpdate">
                    <div class="form-group">
                        <label for="product-name">Nomi *</label>
                        <input v-model="selectedCat.name" type="text" id="product-name" >
                    </div>

                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="editCategoryModal = false"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-if="modal2" class="overal">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Mahsulot kiritish</div>
                <button @click="closeSecondModal" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form @submit.prevent="productFill">
                    <div class="form-group">
                        <label for="product-name">Scan (Barcode bo'yicha) *</label>
                        <input type="text" @input="scannedProduct" v-model="scanInput" id="product-name" >
                    </div>

                    <div class="form-group">
                        <label for="product-name">Nomi  bo'yicha *</label>
                        <input type="text" v-model="nameSearch" id="product-name" >
                    </div>
                    <div v-if="nameSearchResult.length > 0" class="mt-2">
                        <div class="text-sm text-gray-600 mb-1">Topilgan mahsulotlar:</div>
                        <ul class="border rounded p-2 max-h-40 overflow-auto">
                            <li v-for="product in nameSearchResult" :key="product.id" class="py-1 hover:bg-gray-100 px-2 rounded cursor-pointer"
                                @click="foundProduct = product">
                                <span> {{ product?.name }}</span>    <span class="text-red-600">| {{ product?.category?.name }} |</span>
                            </li>
                        </ul>
                    </div>

                    <div class="form-group text-black text-xl text-center font-bold py-3 rounded mt-4" style="background-color: #ffd00c;">
                        {{ foundProduct?.name }} ({{ foundProduct?.category?.name }})
                    </div>

                    <div class="form-group">
                        <label for="product-name">Miqdori *</label>
                        <input type="number" v-model="newProductTransaction.quantity_in" id="product-name" required>
                    </div>

                    <div class="form-group">
                        <label for="product-name">Tan narxi *</label>
                        <input type="number" v-model="newProductTransaction.price" id="product-name" required>
                    </div>

                    <div class="form-group">
                        <label for="product-name">Sotuv narxi *</label>
                        <input type="number" v-model="newProductTransaction.sale_price" id="product-name" required>
                    </div>


                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="closeSecondModal"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped>
.overal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(128, 128, 128, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
.modal{
    width: 700px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
    border-radius: 10px;
    overflow: auto;
}
body{
    overflow: hidden;
}
.form-group {
    margin-bottom: 15px;

}
label {
    display: block;
    margin-bottom: 5px;
}
input, select {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
}
.new{
    padding: 15px;
    border: 1px solid #ccc;
    border-left: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
} 
       
.measurement-buttons {
    display: flex;
    gap: 10px;
}
.measurement-buttons button {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    transition: 0.3s;
}
.measurement-buttons button.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}
.submit-btn {
    background: black;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}
.submit-btn:hover {
    background: rgb(43, 42, 42);
}
.buttons{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.buttons button{
    width: 200px;
    margin-top: 10px;
}
.buttons button:nth-child(2){
    background-color: #ffd00c;
}

.buttons button:nth-child(2):hover{
    background-color: #ebbe0e;
}
</style>