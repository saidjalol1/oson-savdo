<script setup>
const inventory = ref(0)
const total_debt = ref(0)
const left_debt = ref(0)

const config = useRuntimeConfig()


const  formatNumber = async (number, decimals = 2) => {
  return number.toLocaleString(undefined, { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}

const inventoryValue = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/inventory/value`, {
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

    const st = await response.json();
    inventory.value = await formatNumber(st.total_value)
    total_debt .value =await formatNumber(st.total_debt)
    left_debt.value = await formatNumber(st.left_debt)
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};





onMounted(async () =>{
  await inventoryValue()
})
</script>

<template>
    <div class="w-full flex flex-wrap justify-between gap-2  px-5 pt-5 py-4">
            <div class="bg-yellow-400 flex-1 w-full gap-y-4  p-4 rounded shadow hover:shadow-xl cursor-pointer">
              <h1 class="font-bold text-xl mb-4">Ombor qiymati </h1>
              <span class="bg-gray-100 px-4 px-4 rounded-full font-bold">{{ inventory }}</span>
            </div>
            <div class="bg-black text-white flex-1  gap-y-4 w-full p-4 rounded shadow hover:shadow-xl cursor-pointer">
              <h1 class="font-bold text-xl mb-4">Jami Nasiya</h1>
              <span class="bg-gray-100 px-4 text-black px-4 rounded-full font-bold">{{ total_debt }}</span>
            </div>
            <div class="bg-yellow-400 flex-1 w-full gap-y-4  p-4 rounded shadow hover:shadow-xl cursor-pointer">
              <h1 class="font-bold text-xl mb-4">Qolgan Nasiya</h1>
              <span class="bg-gray-100 px-4 px-4 rounded-full font-bold">{{ left_debt }}</span>
            </div>
    </div>
</template>
  