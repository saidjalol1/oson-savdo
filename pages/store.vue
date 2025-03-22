<script setup>
const menuStatus = ref(true)
const modal_status = ref(false)
const menu2 = ref(false)

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}

const closeModall = () =>{
    modal_status.value = !modal_status.value
}
const detailToggle = () =>{
    menu2.value = !menu2.value
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
                    Ombor
                </div>
                <div class="flex gap-5">
                    <button @click="closeModall" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
                    <button class="cursor-pointer py-2 px-2 hover:shadow-lg rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="store_body h-[calc(100vh-120px)] flex">
                <div class="categories py-4 px-2">
                    <div active-class="active" class="item flex justify-start items-center gap-4 px-4" >
                        <div class="title" >Hammasi</div>
                        <div class="icon bg-green-400">3</div>
                    </div>
                    <div active-class="active" class="item flex justify-start items-center gap-4 px-4" >
                        <div class="title" >Qandolat</div>
                        <div class="icon bg-green-400">3</div>
                    </div>
                    <div active-class="active" class="item flex justify-start items-center gap-4 px-4" >
                        <div class="title" >Suv</div>
                        <div class="icon bg-green-400">3</div>
                    </div>
                </div>
                <div class="products py-4 px-5 w-full gap-4">
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                    <div @click="detailToggle" class="product bg-white flex flex-col justify-center items-center gap-2 cursor-pointer shadow">
                        <div class="product_data flex items-center">
                            <div class="text-xl">📦</div>
                            <div class="product_name font-bold text-xl">Parnik (Qandolat)</div>
                        </div>
                        <div class="quantity flex items-center">
                            <div class="text-xl">⏳</div>
                            <div class="number text-red-600 font-bold">23</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <ProductDetail :menu2="menu2"  @detailToggle="detailToggle"/>
    </div>
    <StoreModal :modal="modal_status" @closeModal="closeModall"/>
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
.store_body{
    width: 100%;
    background-color: aliceblue;
    
}
.categories{
    width: 240px;
    border-right: 2px solid rgb(230, 230, 230);
    height: 100%;
    background-color: white;
}
.title{
    font-weight: 500;
}
.item{
    width: 220px;
    height: 40px;
    border-radius: 40px;
    cursor: pointer;
}
.active{
    background-color: #30ccf34b;
}
.item:hover{
    background-color: rgb(241, 233, 233);
}
.icon{
    padding: 0px 7px;
    border-radius: 6px;
    color: gray;
}
.products{
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    align-items: start;
    overflow-y: auto;
}
.product{
    max-width: 300px;
    min-width: 300px;
    background-color: white;
    height: 100px;
    border-radius: 10px;
}
.product:hover{
    transform: scale(1.06);
}
</style>