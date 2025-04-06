<script setup>
import { useRouter } from 'vue-router';
import { getAuthToken } from "@/utils/checkAuthenticated";
import { ref, onMounted, defineEmits } from 'vue';


const auth = ref("")
const route = useRouter()
const config = useRuntimeConfig()
const token = ref("")
const user_data = ref({})

const emit = defineEmits(['menuToggle']);

const toggleMenu = () => {
    emit('menuToggle');
};


const logout = () =>{
    localStorage.removeItem('tokenDokon')
    window.location.reload()
}

const getUserData = async ()=>{
    try{
        const response = await fetch(`${config.public.apiBase}/`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("tokenOson")}`
            }
        })

        if (response.status == 401){
            alert("Sizga kirish taqiqlangan")
            route.push("/login")
        }

        if (!response.status || !response.ok){
            throw new Error("Network was not okey")
        }

        const data = await response.json()
        user_data.value = data
        console.log(data);
        
    }catch(error){
        error = error
        prompt(error)
    }
}

function getLimitedFullName(name, surname, maxLength = 20) {
  const fullName = `${name ?? ''} ${surname ?? ''}`.trim();
  return fullName.length > maxLength
    ? fullName.slice(0, maxLength).trim() + '…'
    : fullName;
}
onMounted(async () =>{
    token.value = await getAuthToken("tokenOson")
    if (!token.value){
        route.push("/login")
    }

    await getUserData()
})

</script>
<template>
    <header class="flex justify-between items-center px-4 py-2">
        <div class="flex justify-between items-center text-3xl gap-x-4 text-white font-bold">
            <button @click="toggleMenu" type="button" class="bg-none cursor-pointer active:shadow-md rounded-lg px-2 py-2 hover:bg-blue-100" >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>
        </div>
        <div class="flex gap-3 items-center">
            <button>
                <span>
                    <NuxtImg src="businessman.png" width="30px" height="30px"/>
                </span>
            </button>
            <span class="font-bold"> {{ getLimitedFullName(user_data?.name, user_data?.surname, 10) }}</span>
        </div>
    </header>
</template>
<style scoped>
header{
    background-color: #ffd00c;
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