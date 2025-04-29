<script setup>
import { formatNumber } from 'chart.js/helpers'

const menuStatus = ref(true)
const saleModal = ref(false)
const cartModal = ref(false)
const menu2 = ref(false)
const selectedCategory = ref(null)
const activeIndex = ref(0)
const activButton = ref("naqd")
const debt = ref("yoq")
const route = useRouter()
const config = useRuntimeConfig()

const sales = ref([])
const store = ref({})
const scanInput = ref("")
const foundProduct = ref({})
const saledetailObject = ref({})
const data = ref({})
const selectedDate = ref(null)
const searchQuery = ref("")
const currentPage = ref(1)
const itemsPerPage = ref(10)
const categories = ref([
    {"name": "Hammasi", "type": "all"},
    {"name": "Naqd", "type": "cash"},
    {"name": "Karta", "type": "card"},
    {"name": "Qarz", "type": "debt"}
])

const newItem = ref({
    product_id: null,
    quantity: 0,
    report_id: null,
});

const saleObject = ref({
  store_id: 0,
  card_payment: 0,
  cash_payment: 0,
  debt_payment: 0,
  client_name: "",
  client_number: "",
  client_number2: "",
  total: 0,
  debt: 0,
  items: []
});


const selectedReport = ref(null); 
const availableReports = computed(() => {
  return foundProduct.value?.store_reports_in || [];
});

const filteredSales = computed(() => {
    // First make a copy of the sales array
    let filtered = [...sales.value];
    
    // Sort by date_added (newest first)
    filtered.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    
    // Then apply your existing filters
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(sale => 
            sale.client_name?.toLowerCase().includes(query)
        );
    }
    
    if (selectedDate.value) {
        const filterDate = new Date(selectedDate.value).toDateString();
        filtered = filtered.filter(sale => {
            const saleDate = new Date(sale.date_added).toDateString();
            return saleDate === filterDate;
        });
    }
    
    if (selectedCategory.value) {
        const category = categories.value.find(c => c.type === selectedCategory.value);
        
        if (category) {
            switch(category.type) {
                case 'cash':
                    filtered = filtered.filter(sale => sale.cash_payment > sale.card_payment);
                    break;
                case 'card':
                    filtered = filtered.filter(sale => sale.card_payment > sale.cash_payment);
                    break;
                case 'debt':
                    filtered = filtered.filter(sale => sale.debt !== sale.total);
                    break;
            }
        }
    }
    
    return filtered;
});

const paginatedSales = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredSales.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredSales.value.length / itemsPerPage.value)
})

const validateQuantity = (quantity, report) => {
  if (!report) return false;
  return quantity > 0 && quantity <= report.quantity_left;
};
const addToSale = () => {
  // Validate selected report
  if (!selectedReport.value) {
    alert("Iltimos, mahsulot partiyasini tanlang!");
    return;
  }

  // Validate quantity
  if (!newItem.value.quantity || newItem.value.quantity <= 0) {
    alert("Iltimos, miqdorni to'g'ri kiriting!");
    return;
  }

  // Check if quantity exceeds available amount
  if (!validateQuantity(newItem.value.quantity, selectedReport.value)) {
    alert(`Mahsulot miqdori yetarli emas! Mavjud miqdor: ${selectedReport.value.quantity_left}`);
    return;
  }

  const existingItem = saleObject.value.items.find(
    item => item.product_id === newItem.value.product_id && item.report_id === selectedReport.value.id
  );

  const itemTotal = selectedReport.value.sale_price * parseInt(newItem.value.quantity);


  if (existingItem) {
    existingItem.quantity += parseInt(newItem.value.quantity);
    saleObject.value.total += itemTotal;
  } else {
    saleObject.value.items.push({
      product_id: foundProduct.value.id,
      report_id: selectedReport.value.id,
      quantity: parseInt(newItem.value.quantity),
      price: selectedReport.value.sale_price // Store the actual price from selected report
    });
    saleObject.value.total += itemTotal;
  }


  // Update the selected report's available quantity in the UI
  selectedReport.value.quantity_left -= parseInt(newItem.value.quantity);

  // Clear temporary values
  newItem.value = {
    product_id: null,
    quantity: 0,
    report_id: null
  };
  foundProduct.value = {};
  selectedReport.value = {};
  scanInput.value = "";
  
  cartModal.value = false;
};

const removeFromSale = (itemIndex) => {
  if (itemIndex >= 0 && itemIndex < saleObject.value.items.length) {
    const item = saleObject.value.items[itemIndex];
    saleObject.value.total -= item.price * item.quantity;
    saleObject.value.items.splice(itemIndex, 1);
  }
};

const clearSale = () => {
  saleObject.value = {
    store_id: store.value.id,
    card_payment: 0,
    cash_payment: 0,
    debt_payment: 0,
    total: 0,
    debt: 0,
    items: []
  };
};

const productsGet = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/product`, {
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

    const products = await response.json();
    store.value = products;
    console.log(store.value);
    saleObject.value.store_id = products.id
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

// Update the watch for scanInput to reset selectedReport
watch(scanInput, (value) => {
  if (value) {
    const found = store?.value?.products.find(p => {
      const barcode = p.barcode?.split('/')[1]?.split('_')[0];
      return barcode === value;
    });

    if (found) {
      foundProduct.value = found;
      newItem.value.product_id = found.id;
      selectedReport.value = null; // Reset selected report when scanning new product
    } else {
      alert("Mahsulot topilmadi!");
    }
  }
});

watch(() => saleObject.value.items, (newItems) => {
  let newTotal = 0;
  newItems.forEach(item => {
    newTotal += item.price * item.quantity;
  });
  saleObject.value.total = newTotal;
}, { deep: true });



const submitSale = async () => {
  calculatePayments();
  
  try {
    const response = await fetch(`${config.public.apiBase}/sale`, {  // Changed from '/sale' to '/sales'
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem("tokenOson")}`
      },
      body: JSON.stringify({
        store_id: saleObject.value.store_id,
        card_payment: saleObject.value.card_payment,
        cash_payment: saleObject.value.cash_payment,
        debt_payment: saleObject.value.debt_payment,
        client_name: saleObject.value.client_name,
        client_number: saleObject.value.client_number,
        client_number2: saleObject.value.client_number2,
        total: saleObject.value.total,
        debt: saleObject.value.total - saleObject.value.debt_payment,
        items: saleObject.value.items.map(item => ({
            product_id: item.report_id,
            quantity: item.quantity,
        }))
      })
    });

    const sale_obj = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        route.push("/login");
        return;
      }
      
      // Handle specific error messages from backend
      let errorMessage = "Tarmoqda Xatolik, Sahifani yangilang";
      if (sale_obj.detail) {
        if (typeof sale_obj.detail === 'string') {
          errorMessage = sale_obj.detail;
        } else if (Array.isArray(sale_obj.detail)) {
          errorMessage = sale_obj.detail.map(err => err.msg).join(', ');
        }
      }
      
      throw new Error(errorMessage);
    }

    if (sale_obj.warning) {
        alert(sale_obj.warning)
    }else{
      data.value = sale_obj
      printCheck()
      alert("Sotuv muvaffaqiyatli amalga oshirildi!");
        // window.location.reload()
      toggleSaleModal();
      console.log(data.value);
    }
   
  } catch (error) {
    console.error("Sotuvda xatolik:", error);
    console.log(JSON.stringify({
        store_id: saleObject.value.store_id,
        card_payment: saleObject.value.card_payment,
        cash_payment: saleObject.value.cash_payment,
        debt_payment: saleObject.value.debt_payment,
        total: saleObject.value.total,
        debt: saleObject.value.total - saleObject.value.debt_payment,
        items: saleObject.value.items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          report_id : item.report_id
        }))
      }));
    
    // User-friendly error messages
    let userMessage = "Sotuvni amalga oshirishda xatolik";
    if (error.message.includes("Not enough quantity")) {
      userMessage = "Mahsulot miqdori yetarli emas!";
    } else if (error.message.includes("Store not found")) {
      userMessage = "Do'kon topilmadi!";
    } else if (error.message.includes("Product report")) {
      userMessage = "Mahsulot ma'lumotlari topilmadi!";
    }
    
    alert(`${userMessage}: ${error.message}`);
  }
};

const salesget = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/sales`, {
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

    const salesObjects = await response.json();
    sales.value = salesObjects;
    console.log(sales.value);
  } catch (error) {
    alert("Malumotlarni olishda Xatolik:", error);
  }
};

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const toggleMenu = () =>{
    menuStatus.value = !menuStatus.value
}

const toggleSaleModal = ()=>{
    saleModal.value = !saleModal.value
}

const changeFirstLetter = (word) =>{
    return `${word[0].toUpperCase()}${word.slice(1)}`
}
const setActive = (index) => {
    activeIndex.value = index;
    selectedCategory.value = categories.value[index]?.type || null;
};
const detailToggle = (object) =>{
    menu2.value = !menu2.value
    saledetailObject.value = object
}

const productUpdated = async ()=>{
   await salesget()
}

const calculatePayments = () => {
  if (debt.value === 'ha') {
    saleObject.value.debt = saleObject.value.total - saleObject.value.debt_payment;
    saleObject.value.debt_payment = saleObject.value.debt_payment;
    
    if (activButton.value === 'naqd') {
      saleObject.value.cash_payment = saleObject.value.debt_payment;
      saleObject.value.card_payment = 0;
    } else {
      saleObject.value.card_payment = saleObject.value.debt_payment;
      saleObject.value.cash_payment = 0;
    }
  } else {
    saleObject.value.debt = 0;
    saleObject.value.debt_payment = 0;
    
    if (activButton.value === 'naqd') {
      saleObject.value.cash_payment = saleObject.value.total;
      saleObject.value.card_payment = 0;
      saleObject.value.total = saleObject.value.total;
    } else {
      saleObject.value.card_payment = saleObject.value.total;
      saleObject.value.cash_payment = 0;
    }
  }
};

const printCheck = () => {
  let checkContent = `\nCHEK RAQAMI: ${data.value?.id}\n`;
  console.log(data.value);
  
  checkContent += `SANA: ${new Date().toLocaleDateString()}\n`;
  checkContent += `---------------------------------\n`;
  data.value?.items.forEach((item, index) => {
    checkContent += `${index + 1}. ${item?.product?.product?.name}\n`;
    checkContent += `  Miqdor: ${item?.quantity} | Narx: ${formatNumber(item?.product?.sale_price)} \n`;
  });
  checkContent += `---------------------------------\n`;
  checkContent += `Kassir: ${ data.value?.owner?.name} ${data.value?.owner?.surname}\n`;
  checkContent += `Jami: ${formatNumber(data.value?.total)} \n`;
  
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`<pre>${checkContent}</pre>`);
  newWindow.document.close();
  newWindow.print();
};
watch([searchQuery, selectedDate, selectedCategory], () => {
    currentPage.value = 1
})
const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const range = 2 // Number of pages to show before/after current
    const pages = []

    // Always show first page
    pages.push(1)

    // Add ellipsis if needed after first page
    if (current - range > 2) {
        pages.push('...')
    }

    // Add pages around current page
    for (let i = Math.max(2, current - range); i <= Math.min(total - 1, current + range); i++) {
        pages.push(i)
    }

    // Add ellipsis if needed before last page
    if (current + range < total - 1) {
        pages.push('...')
    }

    // Always show last page if different from first
    if (total > 1) {
        pages.push(total)
    }

    return pages
})
onMounted( async () =>{
    await productsGet()
    await salesget()
})

</script>
<template>
     <div class="flex">
        <div class="menu">
            <Sidebar :menuStatus = "menuStatus"/>
        </div>
        <div class="w-full">
            <Header @menuToggle="toggleMenu"/>
            <div class="page_body w-full h-[calc(100vh-65px)]">
              <div class="page_title bg-white flex justify-between items-center px-5">
                <div class="text-2xl font-bold px-3 bg-white py-3">
                  Sotuv
                </div>
                <div class="flex gap-5">
                  <input   
                    v-model="searchQuery" 
                    type="text" 
                    class="text-center py-2 px-10 bg-gray-100" 
                    style="border-radius: 6px;border: 0px solid white !important;"
                    placeholder="Klient bo'yicha qidiruv"
                  >
                  <input   
                    v-model="selectedDate" 
                    type="date" 
                    class="text-center py-2 px-10 bg-gray-100" 
                    style="border-radius: 6px;border: 0px solid white !important;"
                  >
                  <button @click="toggleSaleModal" class="py-2 px-4 bg-black text-white rounded-lg cursor-pointer">
                    + Qo'shish
                  </button>
                </div>
              </div>
            <div class="store_body h-[calc(100vh-120px)] flex">
                <div class="categories py-4 px-2">
                    <div
                        v-for="(category, index) in categories"
                        :key="index"
                        class="item flex justify-between items-center gap-4 px-4 cursor-pointer"
                        :class="{ active: activeIndex === index }"
                        @click="setActive(index)"
                        >
                            <div class="title flex gap-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
                                </svg>
                                {{ changeFirstLetter(category.name) }}
                            </div>
                    </div>
                </div>

                <div class=" w-full gap-4 p-5">
                  <div class="sale_body">
                    <div v-for="sale in paginatedSales.reverse()" @click="detailToggle(sale)" class="salee shadow-lg p-2 cursor-pointer">
                      <div  class="sum flex justify-between items-center">
                        <span class="text-xl font-bold ">{{ formatNumber(sale.total) }}</span>
                        <span 
                        v-if="sale.debt > 0"  
                        class="bg-red-500 text-white rounded-full px-2"
                        >
                          Qarz: {{ formatNumber(sale.debt) }}
                        </span>
                        <span 
                          v-else-if="sale.cash_payment > sale.card_payment"  
                          class="bg-green-400 text-white rounded-full px-2"
                          >
                          Naqd
                        </span>
                        <span 
                          v-else-if="sale.card_payment > sale.cash_payment"  
                          class="bg-blue-400 text-white rounded-full px-2"
                          >
                          Karta
                        </span>
                      </div>
                      <div class="sum text-gray-600">{{ formatDateTime(sale.date_added) }}</div>
                      <div v-if="sale.debt > 0" class="sum text-white mt-2 bg-red-500 px-2 rounded-full">{{ sale.client_name }}</div>
                    </div>
                  </div>
                  <div class="pagination flex justify-center items-center gap-2 py-4 ">
                      <button @click="currentPage = currentPage - 1"  :disabled="currentPage === 1"
                          class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition">&lt;
                      </button>
    
                      <div v-for="(page, index) in visiblePages" :key="index">
                        <span v-if="page === '...'" class="px-3 py-1">{{ page }}</span>
                        <button v-else @click="currentPage = page"
                            class="px-3 py-1 rounded cursor-pointer hover:bg-gray-300 transition"
                            :class="{'bg-yellow-500 text-white hover:bg-yellow-600': currentPage === page}">{{ page }}
                        </button>
                      </div>
    
                      <button 
                          @click="currentPage = currentPage + 1" 
                          :disabled="currentPage === totalPages"
                          class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition">&gt;
                      </button>
                  </div>
                </div>
              
              </div>
              
            </div>
            
        </div>
        
    </div>
    
    <SaleDetail :menu2="menu2"  @detailToggle="detailToggle" @productUpdated="productUpdated" :sale="saledetailObject"/>
    <div v-show="saleModal" class="sale_modal" id="saleModalOverlay">
        <div :class="{ 'modal-active': saleModal }" class="modal shadow-lg bg-white p-5 overflow-auto">
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
                    <button onclick="window.location.reload()" class="px-2 py-2 text-white bg-red-500 rounded-lg shadow cursor-pointer shadow-md">Bekor qilish</button>
                    <button @click="submitSale" class="py-2 px-2 text-white bg-black shadow rounded-lg  cursor-pointer shadow-md">Saqlash</button>
                </div>
            </div>
            <div class="body mt-10">
                <div class="cheque py-5">
                    <div>Kassa *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                        <button @click="activButton = 'naqd' "  :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer', activButton === 'naqd' ? 'bg-yellow-400 border-none text-white' : '']" style="width: 250px;">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            </span>
                            <span>
                                Naqd
                            </span>
                        </button>
                        <button @click="activButton = 'card'" style="width: 250px;" :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border border-gray-400 rounded-lg cursor-pointer', activButton === 'card' ? 'bg-yellow-400 border-none text-white' : '']">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                            </svg>
                            <span>Karta</span>
                        </button>
                    </div>
                </div>
                <div class="sale">
                    <div>Savat *</div>
                    <div class="mt-4">
                        <div class="w-full" style="max-height: 400px; overflow: auto;">
                            <table class="border-collapse table w-full" style="overflow: scroll;">
                                <thead class="w-full">
                                    <tr class="bg-gray-200 w-full">
                                        <th class="py-3 px-4 text-left">Mahsulot</th>
                                        <th class="py-3 px-4 text-center">Miqdori</th>
                                        <th class="py-3 px-4 text-center">Narx $</th>
                                        <th class="py-3 px-4 text-center">Summa $</th>
                                        <th class="py-3 px-4 text-center">Action $</th>
                                    </tr>
                                </thead>
                                <tbody>           <!-- Row -->
                                    <tr v-for="(item, index) in saleObject.items" :key="index" class="bg-white hover:bg-gray-100 cursor-pointer">
                                        <td class="py-4 px-4 flex items-center gap-3">
                                            <span class="text-gray-800 font-bold">
                                                {{ store.products.find(p => p.id === item.product_id)?.name || 'Noma\'lum' }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                                {{ item.quantity }}
                                            </span>     
                                        </td>
                                        <td class="text-center">
                                            <span class="text-black-600 flex gap-3 font-bold items-center justify-center px-3 py-1">
                                                {{ formatNumber(item.price) }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <span class="bg-red-100 text-black-600 px-3 py-1">
                                                {{ formatNumber(item.price * item.quantity) }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                          <button class="py-2 px-2 bg-red-500 font-bold rounded" @click="removeFromSale(index)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-archive" viewBox="0 0 16 16">
                                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                </svg>
                                          </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button @click="cartModal = true" class="w-full bg-gray-100 mt-4 rounded-lg py-3 text-black text-lg font-bold cursor-pointer shadow-md">Yangi</button>
                    </div>
                    <div class="mt-4">Qarzmi *</div>
                    <div class="flex gap-2 py-4 justify-center items-center">
                        <button @click="debt = 'ha'" :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border rounded-lg cursor-pointer', debt === 'ha' ? 'bg-yellow-400 text-white' : '' ]" style="width: 250px;">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                </svg>
                            </span>
                            <span>
                                Ha
                            </span>
                        </button>
                        <button @click="debt = 'yoq'" style="width: 250px;" :class="['px-2 flex-1 py-2 flex justify-center items-center gap-2 font-bold text-lg border rounded-lg cursor-pointer', debt === 'yoq' ? 'bg-yellow-400 text-white' : '']">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
                            </svg>
                            <span>Yo'q</span>
                        </button>
                    </div>
                    <div v-if="debt === 'ha' " class="cheque py-2">
                        <div>Qabul qilingan summa *</div>
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <input v-model="saleObject.debt_payment" type="number" class="w-full py-3 px-3">
                        </div>
                    </div>
                    <div v-if="debt === 'ha' " class="cheque py-2">
                        <div>Ism Familiya *</div>
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <input v-model="saleObject.client_name" type="text" class="w-full py-3 px-3">
                        </div> 
                    </div>
                    <div v-if="debt === 'ha' " class="cheque py-2">
                        <div>Telefon *</div>
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <input v-model="saleObject.client_number" type="text" class="w-full py-3 px-3">
                        </div>
                    </div>
                    <div v-if="debt === 'ha' " class="cheque py-2">
                        <div>Telefon 2*</div>
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <input v-model="saleObject.client_number2" type="text" class="w-full py-3 px-3">
                        </div>
                    </div>
                    <div class="cheque py-5">
                        <div class="flex gap-2 py-4 justify-center items-center">
                            <button class='bg-green-500 text-white border-none px-2 flex-1 py-2 flex justify-center items-center gap-2 text-lg font-bold border rounded-lg cursor-pointer' style="width: 250px;">
                                <span>Jami</span>
                                <span>{{ formatNumber(saleObject.total) }}</span>
                            </button>
                            <button v-if="debt === 'ha' " style="width: 250px;" class="bg-red-500 text-white border-none px-2 flex-1 py-2 flex justify-center items-center gap-2 font-bold text-lg border rounded-lg cursor-pointer">
                                <span>Qarz</span>
                                <span>{{ formatNumber(saleObject.total - saleObject.debt_payment) }}</span>
                            </button>
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
                    <button @click="addToSale" class="py-2 px-2 text-white bg-green-400 shadow rounded-lg  cursor-pointer shadow-md">Saqlash</button>
                </div>
            </div>
            <form class="body mt-10 px-4">
      <div class="cheque py-5">
        <div>Scan *</div>
        <div class="flex gap-2 py-4 justify-center items-center">
          <input type="text" @input="scannedProduct" v-model="scanInput" class="w-full py-3 px-3" autofocus>
        </div>
      </div>
      
      <div class="cheque">
        <div>Mahsulot *</div>
        <div class="flex gap-2 py-4 justify-center items-center">
          <div v-if="foundProduct" class="w-full py-3 px-3 text-black bg-yellow-500 rounded text-center font-bold">
            {{ foundProduct?.name }}({{ foundProduct?.category?.name }})
          </div>
          <div v-else class="w-full py-3 px-3 text-black bg-yellow-500 rounded text-center font-bold">
            Mahsulot tanlanmagan
          </div>
        </div>
      </div>

      <div class="cheque" v-if="foundProduct && availableReports.length > 0">
        <div>Partiya tanlang *</div>
        <div class="flex flex-col gap-2 py-4">
          <div v-for="report in availableReports" :key="report.id" 
               @click="selectedReport = report"
               :class="['p-3 border rounded cursor-pointer', selectedReport?.id === report.id ? 'bg-blue-100 border-blue-500' : '']">
            <div class="flex justify-between">
              <span>Narx: {{ formatNumber(report.sale_price) }}</span>
              <span>Mavjud: {{ report.quantity_left }}</span>
            </div>
            <div>Sana: {{ new Date(report.date_added).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="foundProduct" class="cheque py-4">
        <div class="text-red-500">Bu mahsulot uchun mavjud partiyalar yo'q!</div>
      </div>

      <div class="cheque">
        <div class="flex items-center justify-between">
            <span>Miqdori *</span>
            <span v-if="selectedReport" class="text-sm text-gray-500">
                Mavjud: {{ selectedReport.quantity_left }}
            </span>
        </div>
        <div class="flex gap-2 py-4 justify-center items-center">
          <input v-model.number="newItem.quantity" type="number" class="w-full py-3 px-3" 
                 :max="selectedReport?.quantity_left || 0">
          
        </div>
      </div>
      
      <div class="cheque" v-if="selectedReport && newItem.quantity > 0">
        <div>Jami *</div>
        <div class="flex gap-2 py-4 justify-center items-center">
          <div class="w-full py-3 px-3 text-black bg-yellow-500 rounded text-center font-bold">
            {{ formatNumber(selectedReport.sale_price * newItem.quantity) }}
          </div>
        </div>
      </div>
    </form>
        </div>
    </div>
</template>
<style scoped>
.page_body{
    background-color: #f1f1f3;
}
.page_title{
    border-bottom: 2px solid rgb(243, 239, 239);
}
.sale_modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
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
    width: 280px;
    border-right: 2px solid rgb(230, 230, 230);
    height: 100%;
    background-color: white;
    overflow-y: scroll;
    overflow-x: scroll;
}
.title{
    font-weight: 500;
}
.item{
    width: 200px;
    height: 40px;
    border-radius: 40px;
    cursor: pointer;
}

.active{
    background-color: #fff5cc;
}

.item:hover{
    background-color: rgb(241, 233, 233);
}


.sale_body{
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    align-items: start;
    overflow-y: auto;
    gap: 10px;
}

.salee{
    max-width: 300px;
    min-width: 300px;
    background-color: white;
    height: 100px;
    border-radius: 10px;
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
.pagination {
    margin-top: 20px;
    user-select: none;
}

.pagination button, .pagination span {
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 6px;
}

.pagination button:not(:disabled) {
    cursor: pointer;
}

</style>