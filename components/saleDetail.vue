<script setup>
import { formatNumber } from 'chart.js/helpers';
import { ref, onMounted, defineEmits } from 'vue';


const config = useRuntimeConfig()
const error = ref("")
const editModal = ref(false)
const error_modal = ref(false)
const activButton = ref("naqd")
const paymentSale = ref(0)

const props = defineProps({
    menu2: Boolean,
    sale: Object
})

const deleteModal = ref(false)
const emit = defineEmits(['detailToggle', 'productUpdated']);
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

const detailToggle = () => {
    emit('detailToggle');
};

const editModalOpen = () =>{
    if (props.sale.debt === props.sale.total){
        error.value = "To'lab bo'lingan"
        error_modal.value = true
    }else{
        editModal.value = true
    }
}


const deleteSale = async (sale_id) => {
  try {
    const response = await fetch(`${config.public.apiBase}/sale-delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id:parseInt(sale_id),
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

const salePayForm = async () => {

    const paymentAmount = Number(paymentSale.value);
  
  // Validate payment amount
  if (paymentAmount <= 0) {
    error.value = "To'lov miqdori 0 dan katta bo'lishi kerak";
    error_modal.value = true;
    return;
  }

  if (paymentAmount > props.sale.debt) {
    error.value = `To'lov miqdori qarzdan (${formatNumber(props.sale.debt)}) ko'p bo'lmasligi kerak`;
    error_modal.value = true;
    return;
  }

  try {
    const response = await fetch(`${config.public.apiBase}/salepay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        id:props.sale?.id,
        payment: paymentAmount,
        payment_type: activButton.value
      }),

    });
   
    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }
    
    window.location.reload()
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
                <div class="text-2xl font-bold px-3 bg-white py-3">Savat</div>
                <div class="flex gap-5">
                    <button @click="detailToggle" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-6 px-5 py-5 ">
                <div class="flex  gap-8 w-full py-4 items-center justify-start">
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
                    
                </div>
                <div class="w-full" style="height: 400px; overflow: auto;">
                    <table class="border-collapse table w-full" style="overflow: scroll;">
                        <thead class="w-full">
                            <tr class="bg-gray-200 w-full">
                                <th class="py-3 px-4 text-left">Mahsulot</th>
                                <th class="py-3 px-4 text-center">Miqdori</th>
                                <th class="py-3 px-4 text-center">Narx $</th>
                                <th class="py-3 px-4 text-center">Summa $</th>
                            </tr>
                        </thead>
                        <tbody>           <!-- Row -->
                            <tr v-for="item in sale?.items" class=" bg-white hover:bg-gray-100 cursor-pointer">
                                <td class="py-4 px-4 flex items-center gap-3">
                                    <span class="text-gray-800 font-bold">{{ item?.product?.product?.name }}</span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ item?.quantity }}
                                    </span>
                                </td>
                                <td  class="text-center">
                                    <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                        {{ formatNumber(item?.product?.sale_price) }}
                                    </span>
                                </td>
                                <td class="text-center" ><span class="bg-red-100 text-black-600 px-3 py-1 ">{{ formatNumber(item?.product?.sale_price * item.quantity) }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="px-5 mt-4 flex flex-col gap-4 flex-wrap">
                <hr>
                <div class="data-detail flex justify-between gap-10">
                    <div class="data-title text-lg text-gray-600">Naqd to'lov</div>
                    <div class="flex items-center gap-2 font-bold text-orange-600">                          
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </span>
                        <span>{{  formatNumber(sale.cash_payment ) }}</span>
                    </div>
                </div>
                <div class="data-detail flex justify-between gap-10">
                    <div class="data-title text-lg text-gray-600">Karta to'lov</div>
                    <div class="flex items-center gap-2 font-bold text-orange-600">                          
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </span>
                        <span>{{  formatNumber(sale.card_payment ) }}</span>
                    </div>
                </div>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title text-lg text-gray-600">
                        Qarz
                    </div>
                    <div class="flex items-center gap-2 font-bold text-red-500">                          
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                        </svg>
                        <span>{{ formatNumber(sale.debt)}}</span>
                    </div>
                </div>
                <hr>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title text-lg text-gray-600">
                        Qo'shilgan vaqt
                    </div>
                    <div class="flex items-center gap-2 font-bold text-green-500">                          
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                                <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                        </span>
                        <span>{{  formatDateTime(sale.date_added) }}</span>
                    </div>
                </div>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title text-lg text-gray-600">
                        Qo'shgan shaxs
                    </div>
                    <div class="flex items-center gap-2 font-bold text-red-500">                          
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                        <span>{{ sale?.owner?.name }} {{ sale?.owner?.surname }}</span>
                    </div>
                </div>
                <div class="data-detail flex justify-between gap-x-10 gap-y-6">
                    <div class="data-title text-lg text-blue-600">
                        Qarzdor shaxs
                    </div>
                    <div class="flex items-center gap-2 font-bold text-red-800">                          
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                        <span>{{ sale?.client_name }} | </span>
                        <span>{{ sale?.client_number }} | </span>
                        <span>{{ sale?.client_number2 }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay flex justify-center items-center" v-if="deleteModal">
        <div class="delete_modal">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div  class="text-2xl font-bold px-3 bg-white py-3 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    O'chirish
                </div>
                <div class="flex gap-5">
                    <button @click="deleteModal = false" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body p-5">
                <div class="text text-center">
                    Sotuvni o'chirsangiz unga aloqador barcha hisobotlar o'chadi !!!
                    - ishchilar statistikasi
                </div>
                <div class="flex gap-x-2 justify-center mt-8">
                    <button  @click="deleteSale(sale.id)" class="py-2 px-4 shadow-md bg-red-600 cursor-pointer text-white rounded-lg cursor-pointer">
                        O'chirish
                    </button>
                    <button  @click="deleteModal = false" class="py-2 px-4 shadow-md bg-black cursor-pointer text-white rounded-lg cursor-pointer">
                        Yopish
                    </button>
                </div>
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
                    To'lov
                </div>
                <div class="flex gap-5">
                    <button @click="editModal = false" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="body p-5">
                <form @submit.prevent="salePayForm">
                    <div class="form_group flex flex-col">
                        <span class="font-bold mb-2 text-xl">To'lov *</span>
                        <input type="number"  @input="validatePaymentInput" v-model="paymentSale"  class="py-3 px-4 text-xl border border-gray-300 rounded-lg" >
                    </div>
                    <div class="cheque py-5">
                        <div class="text-xl font-bold">Kassa *</div>
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <button type="button" @click="activButton = 'naqd' "  :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer', activButton === 'naqd' ? 'bg-yellow-400 border-none text-white' : '']" style="width: 250px;">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                    </svg>
                                </span>
                                <span>Naqd</span>
                            </button>
                            <button type="button" @click="activButton = 'card'" style="width: 250px;" :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer', activButton === 'card' ? 'bg-yellow-400 border-none text-white' : '']">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                                </svg>
                                <span>Karta</span>
                            </button>
                        </div>
                    </div>
                    <div class="cheque flex justify-between">
                        <div  class="text-green-400 font-bold">
                            Jami: ({{ formatNumber(sale.total) }})
                        </div>
                        <div  class="text-red-500 font-bold">
                            Qarz: ({{ formatNumber(sale.debt) }})
                        </div>
                    </div>
                    <div class="form_group flex justify-end gap-x-4 mt-5">
                        <button type="submit" class="py-2 px-4 bg-black bg-yellow-400 text-white rounded-lg cursor-pointer">
                            Saqlash
                        </button>
                        <button @click="editModal = false" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                            Yopish
                        </button>
                    </div>

                </form>
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

</style>

