<script setup>
const menuStatus = ref(true)

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}
</script>
<template>
    <Header @menuToggle="toggleMenu"/>
    <div class="flex">
        <div class="menu flex-1">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="page_body w-full h-[calc(100vh-65px)]">
            <div class="page_title text-2xl font-bold px-3 bg-white py-3">
                Xarid
            </div>
            <div class="body flex flex-col lg:flex-row md:flex-col gap-x-2 p-2  w-full">
                <div class="provider bg-white flex-1 rounded-lg p-4 shadow">
                    <div class="header flex justify-between items-center">
                        <div class="text text-xl">Ta'minotchilar</div>
                        <div>
                            <button @click="closeModall" class="py-2 shadow px-2 font-bold bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                        </div>
                    </div>
                    <hr class="line mt-4">
                    <div class="body py-4">
                        <div class="providers">
                            <div class="block flex justify-between">
                                <div class="name text-xl font-bold">Akmal</div>
                                <div class="debt font-bold text-lg text-red-600">33 000</div>
                            </div>
                            <div class="phone_number text-gray-600 mt-2">
                                +998-91-222-69-79
                            </div>
                            <div class="line border mt-2"></div>
                        </div>
                    </div>
                </div>
                <div class="purchases bg-white flex-1 rounded-lg p-4 shadow">
                    <div class="header flex justify-between items-center">
                        <div class="text text-xl">Xaridlar</div>
                        <div>
                            <button @click="closeModall" class="py-2 shadow px-2 font-bold bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                        </div>
                    </div>
                    <hr class="line mt-4 text-gray">
                </div>
                <div class="payments bg-white flex-1 rounded-lg p-4 shadow">
                    <div class="header flex justify-between items-center">
                        <div class="text text-xl">To'lovlar</div>
                        <div>
                            <button @click="closeModall" class="py-2 shadow px-2 font-bold bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                        </div>
                    </div>
                    <hr class="line mt-4 text-gray">
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
    background-color: aliceblue;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
.body .provider, .purchases, .payments{
    border: 2px solid rgb(230, 230, 230);
}
.line{
    border: 1px solid rgb(230, 230, 230);
}
</style>