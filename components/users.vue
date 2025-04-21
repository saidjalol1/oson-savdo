<script setup>
const route = useRouter()
const config = useRuntimeConfig()

const error_modal = ref(false)


const error = ref("")
const user_selected = ref({})
const update_user = ref(false)

const users = ref(null)


const props = defineProps({
    userCreateModal : Boolean
})

const emits = defineEmits(["closeCreateModal"])

const newUser = ref({
    name : "",
    surname: "",
    username: "",
    hashed_password: "",
    phone_number:""
})

const usersGet = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/staffs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    const fetchedCategories = await response.json();

    users.value = fetchedCategories
  } catch (error) {
    console.log(error);
    alert("Malumotlarni olishda Xatolik:", error);
  }
};


const userAdd = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/staff-user-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body:JSON.stringify({
        name: newUser.value?.name,
        surname: newUser.value?.surname,
        username: newUser.value?.phone_number,
        phone_number: newUser.value?.phone_number,
        hashed_password: newUser.value?.hashed_password,
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      if(response.detail){
        error.value = response.detail
        error_modal.value = true
      }
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    newUser.value = {
        name : "",
        surname: "",
        username: "",
        hashed_password: "",
        phone_number:""
    }
    await usersGet()
    emits("closeCreateModal")
  } catch (error) {
    console.log(error);
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const closeCreateModal = ()=>{
    emits("closeCreateModal")
}

const changeUser = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/user/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body:JSON.stringify({
        id: user_selected.value?.id,
        name: user_selected.value?.name,
        surname: user_selected.value?.surname,
        username: user_selected.value?.phone_number,
        phone_number: user_selected.value?.phone_number,
        password: user_selected.value?.hashed_password,
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
      }
      if(response.detail){
        error.value = response.detail
        error_modal.value = true
      }
      throw new Error("Tarmoqda Xatolik, Sahifani yangilang");
    }

    user_selected.value = {}
    await usersGet()
    update_user.value  = false
  } catch (error) {
    console.log(JSON.stringify({
        id: user_selected.value?.id,
        name: user_selected.value?.name,
        surname: user_selected.value?.surname,
        username: user_selected.value?.phone_number,
        phone_number: user_selected.value?.phone_number,
        hashed_password: user_selected.value?.hashed_password,
      }));
    
    console.log(error);
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const changeUserData = (userdata) =>{
    user_selected.value = userdata
    update_user.value = true
}

onMounted( async () =>{
    await  usersGet()
})
</script>
<template>
     <div v-if="update_user" class="" style="z-index: 1000;">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Xatolik</div>
                <button @click="error_modal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <div class="text">
                      O'zgarishni tasdiqlang !
                </div>
            </div>
            <form @submit.prevent="changeUser" class="flex gap-2">
                <button class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded" type="submit">Tasdiqlash</button>
                <button class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded" type="submit">Bekor qilish</button>
            </form>
        </div>
     </div>

     <div v-if="error_modal" class="" style="z-index: 1000;">
        <div class="modal shadow-xl px-10 py-4">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Xatolik</div>
                <button @click="error_modal = false" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <div class="text">
                      {{ error }}
                </div>
            </div>
        </div>
     </div>
    <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
                <tr>
                    <th class="text-left py-3 px-2">Ism</th>
                    <th class="text-left py-3 px-2">Familiya</th>
                    <th class="text-left py-3 px-2">login</th>
                    <th class="text-left py-3 px-2">Parol</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                    <td class="p-3 px-2">
                        <input type="text" v-model="user.name" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" v-model="user.surname" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" v-model="user.username" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <div class="flex items-center justify-between bg-transparent border-b-2 border-gray-300 py-2 px-2">
                            <input type="password" v-model="user.hashed_password" class="outline-none">
                        </div>
                    </td>
                    <td class="p-3 px-2 flex justify-end items-center">
                        <button type="button" @click="changeUserData(user)"
                            class="mr-3 text-sm bg-orange-500 hover:bg-orange-400 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                            Saqlash
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="userCreateModal" class="">
            <div class="modal shadow-xl px-10 py-4">
                <div class="modal-head flex justify-between items-center ">
                    <div class="font-bold text-2xl">Foydalanuvchi yaratish</div>
                    <button @click="closeCreateModal" class="bg-black shadow-md cursor-pointer py-2 px-4 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
                <div class="modal_body mt-10">
                    <form @submit.prevent="userAdd">
                        <div class="form-group">
                            <label for="product-name">Ismi *</label>
                            <input v-model="newUser.name" type="text" id="product-name" >
                        </div>
                        <div class="form-group">
                            <label for="product-name">Familiya *</label>
                            <input v-model="newUser.surname" type="text" id="product-name" >
                        </div>
                        <div class="form-group">
                            <label for="product-name">Telefon *</label>
                            <input v-model="newUser.phone_number" type="text" id="product-name" >
                        </div>
                        <div class="form-group">
                            <label for="product-name">Parol *</label>
                            <input v-model="newUser.hashed_password" type="text" id="product-name" >
                        </div>

                        <div class="buttons">
                            <button type="submit" class="submit-btn">Saqlash</button>
                            <button type="button" @click="closeCreateModal"  class="submit-btn">Bekor qilish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    


</template>
<style scoped>
.overal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(128, 128, 128, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
.modal{
    width: 700px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
    border-radius: 10px;
    overflow: auto;
}
body{
    overflow: hidden;
}
.form-group {
    margin-bottom: 15px;

}
label {
    display: block;
    margin-bottom: 5px;
}
.modal input, select {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
}
.new{
    padding: 15px;
    border: 1px solid #ccc;
    border-left: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
} 
       
.measurement-buttons {
    display: flex;
    gap: 10px;
}
.measurement-buttons button {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    transition: 0.3s;
}
.measurement-buttons button.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}
.submit-btn {
    background: black;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}
.submit-btn:hover {
    background: rgb(43, 42, 42);
}
.buttons{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.buttons button{
    width: 200px;
    margin-top: 10px;
}
.buttons button:nth-child(2){
    background-color: #ffd00c;
}

.buttons button:nth-child(2):hover{
    background-color: #ebbe0e;
}
</style>