<script setup>
import { ref } from 'vue';


const config = useRuntimeConfig()
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
            <div class="page_body w-full h-[calc(100vh-65px)]">
                <div class="page_title text-2xl font-bold px-3 bg-white py-3">Bosh sahifa</div>
                <Expance />
                <div class="px-5">
                    <ChartComponent />
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
    background-color: #f1f1f3;
}
.card{
    width: 500px;
    background-color: white;
    border: 2px solid rgb(230, 230, 230);
    border-radius: 10px;
    margin: 100px auto;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
.menut{
    padding: 8px 10px;
    background-color: orange;
    color: white;
    border-radius: 10px;
    cursor: pointer;
}
.menut:nth-child(2){
    background-color: green;
}
.menut:nth-child(3){
    background-color: orange;
}
.menut:active{
    transform: scale(1.1);
}
</style>