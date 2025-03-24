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
        <div class="page_body w-full ">
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                    Diagram
                </div>
            </div>
            <div class="store_body gap-3 p-5 ">
                <div class="sales overflow-hidden   w-full hover:shadow-lg shadow bg-white p-5 rounded-lg">
                    <Diagram />
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
.store_body{
    overflow: hidden;
    width: 100%;
    height: 100vh;
}

</style>