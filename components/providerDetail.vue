<script setup>
import { formatNumber } from 'chart.js/helpers';
import { ref, onMounted, defineEmits } from 'vue';


const config = useRuntimeConfig()
const error = ref("")
const editModal = ref(false)
const error_modal = ref(false)
const activButton = ref("naqd")
const paymentSale = ref(0)
const selectedDate = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedItem = ref({})
const paymentObj = ref({})
const payModal = ref(false)
const props = defineProps({
    menu2: Boolean,
    item: Object
})

const emit = defineEmits(['detailToggle', 'update']);

const detailToggle = () => {
    emit('detailToggle');
};

const filteredSales = computed(() => {
    // First make a copy of the sales array
    let filtered = [...props.item.items_provided];
    
    // Sort by date_added (newest first)
    filtered.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    
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

watch([selectedDate], () => {
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

const payOpen = (obj) => {
    selectedItem.value = obj
    payModal.value = true
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

const providerEdit = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/provider-edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id: props.item?.id,
        full_name: props.item.full_name,
        phone_number: props.item.phone_number,
        phone_number2: props.item.phone_number2,
        store_id: parseInt(props.item?.store_id),
      }),
    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }
    editModal.value = false
    emit("update")
  } catch (error) {
    console.log(error);
    prompt("Barcha maydonlarni toldirishingiz shart!!!")
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const paymentForm = async () => {

    const paymentAmount = Number(paymentObj.value?.payment);
  
  // Validate payment amount
  if (paymentAmount <= 0) {
    error.value = "To'lov miqdori 0 dan katta bo'lishi kerak";
    error_modal.value = true;
    return;
  }

  try {
    const response = await fetch(`${config.public.apiBase}/providerpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        report_id:selectedItem.value.id,
        payment: paymentAmount,
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }
    payModal.value = false;
    paymentObj.value = {};
    selectedItem.value = {};
    window.location.reload()
    emit("update")
  } catch (error) {
    console.log(error);
    
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const validatePaymentInput = () => {
  // Ensure the value is a positive number
  if (paymentSale.value < 0) {
    paymentSale.value = 0;
  }
  // Ensure the value doesn't exceed the debt
  if (paymentSale.value > props.sale.debt) {
    paymentSale.value = props.sale.debt;
  }
};

const printCheck = () => {
  let checkContent = `\nCHEK RAQAMI: ${props.sale.id}\n`;
  console.log(props.sale);
  
  checkContent += `SANA: ${new Date().toLocaleDateString()}\n`;
  checkContent += `---------------------------------\n`;
  props.sale.items.forEach((item, index) => {
    checkContent += `${index + 1}. ${item?.product?.product?.name}\n`;
    checkContent += `  Miqdor: ${item?.quantity} | Narx: ${formatNumber(item?.product?.sale_price)} \n`;
  });
  checkContent += `---------------------------------\n`;
  checkContent += `Kassir: ${ props.sale.owner.name} ${props.sale.owner?.surname}\n`;
  checkContent += `Jami: ${formatNumber(props.sale.total)} \n`;
  
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`<pre>${checkContent}</pre>`);
  newWindow.document.close();
  newWindow.print();
};
</script>
<template>
    <div v-if="error_modal" class="overal" style="z-index: 1200;">
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
    <div v-if="menu2" class="overal">
        <div class="modal shadow-xl py-4">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white">{{ item?.full_name }}  | {{ item?.phone_number }} | {{ item?.phone_number2 }} | 
                    <span>
                        <button @click="editModal = true" class="py-2 px-4 bg-yellow-500 text-white rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                            </svg>
                        </button>
                    </span>
            </div>
                <div class="flex gap-5">
                    <input   
                    v-model="selectedDate" 
                    type="date" 
                    class="text-center py-2 px-10 bg-gray-100" 
                    style="border-radius: 6px;border: 0px solid white !important;"
                  >
                    <button @click="detailToggle" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    
                </div>
            </div>
            <div class="flex flex-col gap-6 px-5 py-5 ">
                <!-- <div class="flex  gap-8 w-full py-4 items-center justify-start">
                    <div @click="printCheck" class="icon_text flex items-center flex-col ">
                        <span class="bg-black py-2 px-4 rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
                            </svg>
                        </span>
                        <span class="text-sm text-gray-500 mt-2">Chek</span>
                    </div>
                    <div @click="deleteModal = true" class="icon_text flex items-center flex-col">
                        <span class="bg-red-600 py-2 px-4 rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </span>
                        <span class="text-sm text-gray-500 mt-2">O'chirish</span>
                    </div>
                    <div @click="editModalOpen" class="icon_text flex items-center flex-col ">
                        <span class="bg-yellow-400 py-2 px-4 rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
                                <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                                <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </span>
                        <span class="text-sm text-gray-500 mt-2">To'lov</span>
                    </div>
                    
                </div> -->
                <div class="w-full" style="height: 450px; overflow: auto;">
                    <table class="border-collapse table w-full" style="overflow: scroll;">
                        <thead class="w-full">
                            <tr class="bg-gray-200 w-full">
                                <th class="py-3 px-4 text-left">Sana</th>
                                <th class="py-3 px-4 text-left">Mahsulot</th>
                                <th class="py-3 px-4 text-left">Miqdori</th>
                                <th class="py-3 px-4 text-left">Narx $</th>
                                <th class="py-3 px-4 text-left">Summa $</th>
                                <th class="py-3 px-4 text-left">To'lov $</th>
                            </tr>
                        </thead>
                        <tbody>           <!-- Row -->
                            <tr  v-for="i in paginatedSales.reverse()" class=" bg-white hover:bg-gray-100">
                                <td class="py-4 px-4  gap-3">
                                    <span class="text-gray-800 font-bold">{{ formatDateTime(i?.date_added) }}</span>
                                </td>
                                <td  class="">
                                    <span class="text-black-600 gap-3 font-bold  px-3 py-1">
                                        {{ i?.product.name }}
                                    </span>
                                </td>
                                <td  class="">
                                    <span class="text-black-600  gap-3 font-bold  px-3 py-1">
                                        {{ i?.quantity_in}}
                                    </span>
                                </td>
                                <td  class="">
                                    <span class="text-black-600  gap-3 font-bold  px-3 py-1">
                                        {{ formatNumber(i?.price) }}
                                    </span>
                                </td>
                                <td class="" >
                                    <span class="bg-red-100 text-black font-bold px-3 py-1 "> {{ formatNumber(i?.total) }}</span>
                                </td>
                                <td class="" >
                                    <button type="button" @click="payOpen(i)" class="bg-black cursor-pointer text-black font-bold px-3 py-1 hover:shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-cash" viewBox="0 0 16 16">
                                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                        </svg>
                                    </button>
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
            <div class="px-5 mt-4 flex flex-col gap-4 flex-wrap">
                <hr>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title  text-gray-600 text-2xl">
                        Qarz
                    </div>
                    <div class="flex items-center gap-2 font-bold text-red-500 text-2xl">                          
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                        </svg>
                        <span>{{ formatNumber(item?.debt_left)}}</span>
                    </div>
                </div>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title  text-gray-600 text-2xl">
                        Jami xarid
                    </div>
                    <div class="flex items-center gap-2 font-bold text-green-500 text-2xl">                          
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                        </svg>
                        <span>{{ formatNumber(item?.total)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editModal" class="overlay">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Ta'minotchi tahrirlash</div>
                <button @click="editModal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form @submit.prevent="providerEdit">
                    <div class="form-group">
                        <label for="product-name">Ism Familiya *</label>
                        <input v-model="item.full_name" type="text" id="product-name" >
                    </div>
                    <div class="form-group">
                        <label for="product-name">Telefon 1 *</label>
                        <input v-model="item.phone_number" type="text" id="product-name" >
                    </div>
                    <div class="form-group">
                        <label for="product-name">Telefon 2 *</label>
                        <input v-model="item.phone_number2" type="text" id="product-name" >
                    </div>
                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="editModal = false"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="overlay" v-if="payModal">
        <div class="modall menu_2">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                    </svg>
                    To'lov
                </div>
                <div class="flex gap-5">
                    <button @click="payModal = false" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body p-5">
                <form @submit.prevent="paymentForm">
                    <div class="form_group flex flex-col">
                        <span class="font-bold mb-2 text-xl">To'lov *</span>
                        <input type="number"   v-model="paymentObj.payment"  class="py-3 px-4 text-xl border border-gray-300 rounded-lg" >
                    </div>
                    <div class="cheque flex justify-between">
                        <div  class="text-green-400 font-bold">
                            Jami: ({{ formatNumber(selectedItem.total) }})
                        </div>
                        <div  class="text-red-500 font-bold">
                            Qarz: ({{ formatNumber(selectedItem.debt_left) }})
                        </div>
                    </div>
                    <div class="form_group flex justify-end gap-x-4 mt-5">
                        <button type="submit" class="py-2 px-4 bg-black bg-yellow-400 text-white rounded-lg cursor-pointer">
                            Saqlash
                        </button>
                        <button @click="payModal = false" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                            Yopish
                        </button>
                    </div>
                </form>

                <div class="mt-10 border border-gray-300 px-4 py-4 " style="height: 350px; overflow: auto;">
                    <h1 class="font-bold mb-2 text-xl">Barcha To'lovlar</h1>
                    <div v-for="payment in selectedItem.payments" :key="payment.id" class="py-2 hover:bg-gray-100 px-2 flex justify-between items-center">
                        <div class="font-bold">{{ payment.id }}</div>
                        <div class="px-2 bg-red-500 text-white rounded-full">{{ formatNumber(payment.payment) }}</div>
                        <div class="font-bold">{{ formatDateTime(payment.date_added) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.overal{
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(128, 128, 128, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    z-index: 1000;
}
.modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 5%;
    right: 0;
    background-color: white;
    border-radius: 10px;
    overflow: auto;
}

.modall{
    width: 700px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
    border-radius: 10px;
    overflow: auto;
}
.delete_modal{
    width: 400px;
    height: 300px;
    background-color: white;
    z-index: 1000;
}
.new{
    padding: 15px;
    border: 1px solid #ccc;
    border-left: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
} 
  
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}

.text{
    font-size: 16px;
    color: gray;
}
.overlay{
    width: 100%;
    height: 100%;
    background-color: rgba(209, 206, 206, 0.589);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
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

