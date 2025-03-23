<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const props = defineProps({
    menu2: Boolean
})

const emit = defineEmits(['detailToggle']);

const detailToggle = () => {
    emit('detailToggle');
};
</script>
<template>
    <div v-if="menu2" class="menu_2">
        <div class="page_title bg-white flex justify-between items-center px-5">
            <div class="text-2xl font-bold px-3 bg-white py-3">
                Sotuv
            </div>
            <div class="flex gap-5">
                <button @click="detailToggle" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-col gap-6 px-5 py-5 ">
            <div class="flex  gap-8 w-full py-4 items-center justify-start">
                <div class="icon_text flex items-center flex-col">
                    <span class="bg-green-500 py-2 px-4 rounded-lg shadow cursor-pointer flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                    </span>
                    <span class="text-sm text-gray-500 mt-2">Qaytarish</span>
                </div>
                <div class="icon_text flex items-center flex-col">
                    <span class="bg-green-500 py-2 px-4 rounded-lg shadow cursor-pointer flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                            <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
                        </svg>
                    </span>
                    <span class="text-sm text-gray-500 mt-2">Chek</span>
                </div>
                <div class="icon_text flex items-center flex-col">
                    <span class="bg-red-600 py-2 px-4 rounded-lg shadow cursor-pointer flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </span>
                    <span class="text-sm text-gray-500 mt-2">O'chirish</span>
                </div>
                
                <hr class="border border-gray-500">
            </div>
            <div class="mt-4">
                <table>
                    <thead>
                        <tr>
                            <td>Mahsulot</td>
                            <td>Narx</td>
                            <td>Miqdori</td>
                            <td>Jami Summa</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="">
                                <span class="">Non</span>
                            </td>
                            <td>2000</td>
                            <td>3</td>
                            <td>6000</td>
                        </tr>
                    </tbody>
                </table>
                <div class="w-full text-right mt-2 text-green-500 text-lg font-bold">
                    <span class="cursor-pointer" @click="cartModal = true">Qo'shish</span>
                </div>
            </div>
        </div>
        <div class="px-5 flex gap-4 flex-wrap">
            <div class="data-detail flex gap-10">
                <div class="data-title text-lg text-gray-600">
                    Kassa
                </div>
                <div class="flex items-center gap-2 font-bold text-orange-600">                          
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </span>
                    <span>
                        Naqd
                    </span>
                </div>
            </div>
            <div class="data-detail flex gap-x-10 gap-y-6">
                <div class="data-title text-lg text-gray-600">
                    Qo'shilgan vaqt
                </div>
                <div class="flex items-center gap-2 font-bold text-orange-600">                          
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </span>
                    <span>
                        3/12/4500
                    </span>
                </div>
            </div>
            <div class="data-detail flex gap-x-10 gap-y-6">
                <div class="data-title text-lg text-gray-600">
                    Qo'shgan shaxs
                </div>
                <div class="flex items-center gap-2 font-bold text-orange-600">                          
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </span>
                    <span>
                        abduvaliyev abdulla
                    </span>
                </div>
            </div>
            <div class="data-detail flex gap-x-10 gap-y-6">
                <div class="data-title text-lg text-gray-600">
                    Qo'shgan shaxs
                </div>
                <div class="flex items-center gap-2 font-bold text-orange-600">                          
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </span>
                    <span>
                        Jami Summa
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.menu_2{
    width: 700px;
    height: auto;
    border-left: 2px solid rgb(243, 239, 239);
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}

.text{
    font-size: 16px;
    color: gray;
}
table{
    width: 100%;
    border: 1px solid rgb(230, 230, 230);
    border-style: collapse;
    overflow-x: auto;
}
thead tr td{
    font-weight: bold;
}
tr, td{
    border: 3px solid rgb(230, 230, 230);
    padding: 4px;
}

</style>