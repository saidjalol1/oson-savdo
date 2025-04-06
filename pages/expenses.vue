<script setup>
const menuStatus = ref(true)

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}
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
        <div class="page_body w-full h-[calc(100vh-65px)]">
            <div class="page_title  px-3 bg-white py-3 flex justify-between items-center">
                <div class="text-2xl font-bold">
                    Xarajatlar
                </div>
                <div class="flex gap-5">
                    <input type="text" placeholder="Qidiruv" class="text-center py-2 px-10 bg-gray-100" style="border-radius: 40px;">
                    <button @click="closeModall" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                    <button class="cursor-pointer py-2 px-2 hover:shadow-lg rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="w-full">
                <Expance />
                <div class="flex gap-3 md:flex-col lg:flex-row px-5">
                    <div class="sales h-[calc(50vh-120px)]  w-full hover:shadow-lg shadow bg-white p-5 rounded-lg" style="overflow-y: auto;overflow-x: auto;">
                        <div class="head text-lg font-bold flex justify-between">
                            <span> Mahsulotga qilingan To'lovlar</span>
                            <div class="flex gap-5">
                                <button class="cursor-pointer py-2 px-2 hover:shadow-lg rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <table class="w-full mt-2">
                                <thead>
                                    <tr>
                                        <th class="text-left">Sana</th>
                                        <th class="text-left">Kassa</th>
                                        <th class="text-left">Jami</th>
                                        <th class="text-left">Qarzmi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                            <div class="flex gap-2 font-bold justify-start">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                </span>
                                                <span>Naqd</span>
                                            </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                                <div class="flex gap-2 font-bold justify-start">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                    </span>
                                                    <span>Naqd</span>
                                                </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                            <div class="flex gap-2 font-bold justify-start">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                </span>
                                                <span>Naqd</span>
                                            </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                        </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="sales h-[calc(50vh-120px)]  w-full hover:shadow-lg shadow bg-white p-5 rounded-lg" style="overflow-y: auto;overflow-x: auto;">
                        <div class="head text-lg font-bold flex justify-between">
                            <span>Mayda Xarajatlar</span>
                            <div class="flex gap-5">
                                <button class="cursor-pointer py-2 px-2 hover:shadow-lg rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <table class="w-full mt-2">
                                <thead>
                                    <tr>
                                        <th class="text-left">Sana</th>
                                        <th class="text-left">Kassa</th>
                                        <th class="text-left">Jami</th>
                                        <th class="text-left">Qarzmi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                            <div class="flex gap-2 font-bold justify-start">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                </span>
                                                <span>Naqd</span>
                                            </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                                <div class="flex gap-2 font-bold justify-start">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                    </span>
                                                    <span>Naqd</span>
                                                </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                                    <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                        <td class="px-2  py-4 text-left">3/12/34</td>
                                        <td class="px-2  py-4 text-left">
                                            <div class="flex gap-2 font-bold justify-start">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                                    </svg>
                                                </span>
                                                <span>Naqd</span>
                                            </div>
                                        </td>
                                        <td class="px-2  py-4 text-left">120000000</td>
                                        <td class="px-2  py-4 text-left">Ha</td>
                                    </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                            <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                                <td class="px-2  py-4 text-left">3/12/34</td>
                                <td class="px-2  py-4 text-left">
                                    <div class="flex gap-2 font-bold justify-start">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
                                        </span>
                                        <span>Naqd</span>
                                    </div>
                                </td>
                                <td class="px-2  py-4 text-left">120000000</td>
                                <td class="px-2  py-4 text-left">Ha</td>
                            </tr>
                        </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page{
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgb(230, 230, 230);
    z-index: -1;
}
.page_body{
    background-color: aliceblue !important;
}

.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}


</style>