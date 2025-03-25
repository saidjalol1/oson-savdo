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
            <div class="page_title  px-3 bg-white py-3 flex justify-between items-center">
                <div class="text-2xl font-bold">
                    Foydalanuvchilar
                </div>
                <div class="flex gap-2">
                    <input type="text" placeholder="Qidiruv" class="text-center py-2 px-10 bg-gray-100" style="border-radius: 40px;">
                    <button @click="closeModall" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                </div>
            </div>
            <Users />
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