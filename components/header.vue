<script setup>
import { useRouter } from 'vue-router';
import { getAuthToken } from "@/utils/checkAuthenticated";
import { ref, onMounted, defineEmits } from 'vue';


const auth = ref("")
const route = useRouter()

const emit = defineEmits(['menuToggle']);

const toggleMenu = () => {
    emit('menuToggle');
};

onMounted(async () =>{
    auth.value = await getAuthToken("tokenDokon")
    if (!auth.value){
        route.push("/auth/login")
    }
})

</script>
<template>
    <header class="flex justify-between items-center px-4 py-2">
        <div class="flex items-center text-3xl gap-x-4 text-white font-bold">
            <button @click="toggleMenu" type="button" class="bg-none cursor-pointer active:shadow-md rounded-lg px-2 py-2" >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>
            <div>Oson</div>
        </div>
        <div class="profile flex items-center gap-2">
            <div class="profile_image">M</div>
        </div>
    </header>
</template>
<style scoped>
header{
    background-color: #30ccf3;
}
.profile_image{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>