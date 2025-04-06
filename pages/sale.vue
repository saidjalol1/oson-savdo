<script setup>
const menuStatus = ref(true)
const saleModal = ref(false)
const cartModal = ref(false)
const menu2 = ref(false)

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}

const toggleSaleModal = ()=>{
    saleModal.value = !saleModal.value
}


const detailToggle = () =>{
    menu2.value = !menu2.value
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
            <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                    Sotuv
                </div>
                <div class="flex gap-5">
                    <input type="text" placeholder="Qidiruv" class="text-center py-2 px-10 bg-gray-100" style="border-radius: 40px;border: 0px solid white !important;">
                    <button @click="toggleSaleModal" class="py-2 px-4 bg-green-400 text-white rounded-lg cursor-pointer">+ Qo'shish</button>
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
                        <div class="title cursor-pointer" >Hammasi</div>
                        <div class="icon bg-green-400">3</div>
                    </div>
                    <div active-class="active" class="item flex justify-start items-center gap-4 px-4 mt-2 cursor-pointer" >
                        <div class="text-gray-600" >2/13/2025</div>
                        <div class="icon bg-green-400">3</div>
                    </div>
                    
                </div>

                <div class="sale_body w-full gap-4 p-5">
                    <div class="salee shadow-lg p-2 cursor-pointer">
                        <div @click="detailToggle" class="sum text-xl font-bold ">120.000.00</div>
                        <div class="sum text-gray-600">3/12/4550</div>
                    </div>
                    <div class="salee shadow-lg p-2 cursor-pointer">
                        <div @click="detailToggle" class="sum text-xl font-bold ">120.000.00</div>
                        <div class="sum text-gray-600">3/12/4550</div>
                    </div>
                    <div class="salee shadow-lg p-2 cursor-pointer">
                        <div @click="detailToggle" class="sum text-xl font-bold ">120.000.00</div>
                        <div class="sum text-gray-600">3/12/4550</div>
                    </div>
                    <div class="salee shadow-lg p-2 cursor-pointer">
                        <div @click="detailToggle" class="sum text-xl font-bold ">120.000.00</div>
                        <div class="sum text-gray-600">3/12/4550</div>
                    </div>
                </div>
            </div>
        </div>
        <SaleDetail :menu2="menu2"  @detailToggle="detailToggle"/>
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
                        <button class="px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer" style="width: 250px;">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            </span>
                            <span>
                                Naqd
                            </span>
                        </button>
                        <button style="width: 250px;" class="px-2 flex-1 py-2 flex justify-center items-center gap-2 font-bold text-lg border bg-gray-500 text-white rounded-lg cursor-pointer">
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
                    <button @click="cartModal = true" class="w-full bg-gray-100 mt-4 rounded-lg py-3 text-green-500 text-lg font-bold cursor-pointer shadow-md">Yangi</button>
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
                        <div class="w-full text-right mt-2 text-green-500 text-lg font-bold cursor-pointer "><span class="cursor-pointer" @click="cartModal = true">Yangi</span></div>
                    </div>
                    <div class="cheque py-5">
                    <div>Qabul qilingan summa *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3"  value="34000" disabled>
                    </div>
                    <div class="cheque py-5">
                    <div>Qarzmi *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                        <button class="px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer" style="width: 250px;">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                </svg>
                            </span>
                            <span>
                                Ha
                            </span>
                        </button>
                        <button style="width: 250px;" class="px-2 flex-1 py-2 flex justify-center items-center gap-2 font-bold text-lg border bg-gray-500 text-white rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
                            </svg>
                            <span>Yo'q</span>
                        </button>
                    </div>
                    <div>Qarz summasi *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3"  value="34000" disabled>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    <div v-show="cartModal" class="sale_modal" id="saleModalOverlay">
        <div :class="{ 'modal-active': saleModal }" class="modall shadow-lg bg-white p-5">
            <div class="header flex justify-between items-center">
                <div class="title flex items-center gap-2">
                    <button @click="cartModal = false" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="black" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <span class="text-xl font-lg">Sotuv savat</span>
                </div>
                <div class="buttons flex items-center gap-2">
                    <button @click="cartModal = false" class="px-2 py-2 text-white bg-red-600 rounded-lg shadow cursor-pointer shadow-md">Bekor qilish</button>
                    <button class="py-2 px-2 text-white bg-green-400 shadow rounded-lg  cursor-pointer shadow-md">Saqlash</button>
                </div>
            </div>
            <form class="body mt-10 px-4">
                <div class="cheque py-5">
                    <div>Scan *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3" autofocus>
                    </div>
                </div>
                <div class="cheque">
                    <div>Mahsulot *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="button" class="w-full py-3 px-3 text-white bg-green-600 rounded font-bold" value="Hydrolife(1L)">
                    </div>
                </div>
                <div class="cheque ">
                    <div>Miqdori *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3" >
                    </div>
                </div>
                <div class="cheque ">
                    <div>Narx *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3" >
                    </div>
                </div>
                <div class="cheque ">
                    <div>Jami Summa *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                       <input type="text" class="w-full py-3 px-3" >
                    </div>
                </div>
            </form>
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
.modall{
    width: 600px;
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
.categories{
    width: 240px;
    border-right: 2px solid rgb(230, 230, 230);
    height: 100%;
    background-color: white;
}
.title{
    font-weight: 500;
}


.sale_body{
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    align-items: start;
    overflow-y: auto;
}

.salee{
    max-width: 300px;
    min-width: 300px;
    background-color: white;
    height: 100px;
    border-radius: 10px;
}

.active{
    background-color: #30ccf34b;
}
.icon{
    padding: 0px 7px;
    border-radius: 6px;
    color: gray;
}
input{
    outline: 1px solid gray;
    border-radius: 6px;
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