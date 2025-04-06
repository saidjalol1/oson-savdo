<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const config = useRuntimeConfig()

  const route = useRouter()
  const btnLoader = ref(false)
  const error = ref("")


  const delay_load =  () =>{
    setTimeout(() => {
        btnLoader.value = false
    }, 2000);
}
  const loginData = ref({
    username: '',
    password: '',
  });
  
  const login = async () =>{
    btnLoader.value = true
    const formData = new URLSearchParams();
    formData.append('username', loginData.value.username);
    formData.append('password', loginData.value.password);
  try {
    const response = await fetch(`${config.public.apiBase}/token/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    
    if (response.status === 401) {
      error.value = "Foydalanuvchi nomi yoki parol noto'g'ri";
      delay_load();
      return;
    }

    if (!response.status || !response.ok) {
      throw new Error('Network response was not ok')
    }

    const res = await response.json()
    console.log(res);
    
    delay_load()
    localStorage.setItem("tokenOson", res["access_token"])
    route.push("/")

  } catch (error) {
    error.value = error
    delay_load()
  }
}
  </script>
<template>
    <div class="flex flex-col items-center py-40 min-h-screen bg-gray-100 relative">
      <!-- Login Form -->
      <div class="bg-white shadow-md rounded-md w-96">

        <div class="p-5">
          <p class="text-green-500 text-center text-lg font-bold mb-4">Dasturga kirish</p>
          <p v-if="error" class="text-center text-red-700 mb-4">
            {{ error }}
          </p>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="block text-gray-700 mb-1">Login</label>
              <input type="text" v-model="loginData.username" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring " />
            </div>
  
            <div class="mb-3">
              <label class="block text-gray-700 mb-1">Parol</label>
              <input type="password" v-model="loginData.password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring " />
            </div>
  
            <button type="submit" :disabled="btnLoader" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              <div v-if="btnLoader" class="loader"></div>
              <span v-else>Kirish</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<style scoped>
.loader {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #30ccf3; /* Primary Blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Loader Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button{
    background-color: #30ccf3;
}
input:focus{
    border:1px solid #30ccf3;
}
  </style>
  