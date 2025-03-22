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
                Mahsulot haqida
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
            <div class="flex  gap-8 ">
                <div class="text">Mahsulot</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
            <div class="flex  gap-8 ">
                <div class="text">Oxirgi xarid narxi</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
            <div class="flex  gap-8 ">
                <div class="text">Oxirgi sotuv narxi</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
            <div class="flex  gap-8 ">
                <div class="text">Qoldiq sotuv narxi</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
            <div class="flex  gap-8 ">
                <div class="text">O'lchov birligi</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
            <div class="flex  gap-8 ">
                <div class="text">Xozirda bor</div>
                <div class="product_data flex items-center">
                    <div class="text-md">📦</div>
                    <div class="product_name font-bold text-md">Parnik (Qandolat)</div>
                </div>
            </div>
        </div>
        <div class="px-5 flex gap-4 flex-wrap">
            <button class="py-2 px-4 shadow-md bg-green-500 text-white rounded-lg cursor-pointer flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                Tahrirlash
            </button>
            <button class="py-2 px-4 shadow-md bg-red-600 text-white rounded-lg cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
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
</style>