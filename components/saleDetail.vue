<script setup>
import { formatNumber } from 'chart.js/helpers';
import { ref, onMounted, defineEmits } from 'vue';

const error = ref("")
const error_modal = ref(false)
const props = defineProps({
    menu2: Boolean,
    sale: Object
})

const emit = defineEmits(['detailToggle']);
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
                    <div class="icon_text flex items-center flex-col ">
                        <span class="bg-black py-2 px-4 rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
                            </svg>
                        </span>
                        <span class="text-sm text-gray-500 mt-2">Chek</span>
                    </div>
                    <div class="icon_text flex items-center flex-col">
                        <span class="bg-red-600 py-2 px-4 rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </span>
                        <span class="text-sm text-gray-500 mt-2">O'chirish</span>
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
                                        {{ item?.product?.sale_price }}
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
                    <div class="data-title text-lg text-gray-600">Kassa</div>
                    <div class="flex items-center gap-2 font-bold text-orange-600">                          
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </span>
                        <span v-if="sale.debt < sale.total || sale.debt === sale.total">Qarz</span>
                        <span v-else-if="sale.cash_payment > 0">Naqd</span>
                        <span v-else-if="sale.card_payment > 0">Karta</span>
                    </div>
                </div>
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


</style>

