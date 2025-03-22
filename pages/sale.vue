<script setup>
const menuStatus = ref(true)
const saleModal = ref(false)
const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}

const toggleSaleModal = ()=>{
    saleModal.value = !saleModal.value
}
</script>
<template>
    <Header @menuToggle="toggleMenu"/>
    <div class="flex">
        <div class="menu flex-1">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="page_body w-full h-[calc(100vh-65px)]">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                    Sotuv
                </div>
                <div class="flex gap-5">
                    <button @click="toggleSaleModal" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                    <button class="cursor-pointer py-2 px-2 hover:shadow-lg rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-show="saleModal" class="sale_modal" id="saleModalOverlay">
        <div :class="{ 'modal-active': saleModal }" class="modal shadow-lg bg-white p-5">
            <div class="header flex justify-between items-center">
                <div class="title flex items-center gap-2">
                    <button @click="toggleSaleModal" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="black" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <span class="text-xl font-lg">Sotuv qo'shish</span>
                </div>
                <div class="buttons flex items-center gap-2">
                    <button @click="toggleSaleModal" class="px-2 py-2 text-white bg-red-600 rounded-lg shadow cursor-pointer shadow-md">Bekor qilish</button>
                    <button class="py-2 px-2 text-white bg-green-400 shadow rounded-lg  cursor-pointer shadow-md">Saqlash</button>
                </div>
            </div>
            <div class="body mt-10">
                <div class="cheque py-5">
                    <div>Kassa *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                        <button class="px-2 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer" style="width: 250px;">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            </span>
                            <span>
                                Naqd
                            </span>
                        </button>
                        <button style="width: 250px;" class="px-2 py-2 flex justify-center items-center gap-2 font-bold text-lg border bg-gray-500 text-white rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                            </svg>
                            <span>Karta</span>
                        </button>
                    </div>
                </div>
                <div class="sale">
                    <div>Sotuv savat *</div>
                    <button class="w-full bg-gray-100 mt-4 rounded-lg py-3 text-green-500 text-lg font-bold cursor-pointer shadow-md">Yangi</button>
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
.sale_modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
    background-color: rgba(128, 128, 128, 0.74);
}
.modal{
    width: 700px;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    transition: all 1s ease-in-out;
}
.modal-active{
    transition: all 1s ease-in-out;
    right: 0%;
}
</style>