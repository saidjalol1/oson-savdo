<script setup>
import { ref, onMounted, defineEmits } from 'vue';
const props = defineProps({
    modal: Boolean
})

const emit = defineEmits(['closeModal']);

const close = () => {
    emit('closeModal');
};

</script>
<template>
    <div v-if="modal" class="overal">
        <div class="modal shadow-xl px-10 py-10">
            <div class="modal-head flex justify-between items-center ">
                <div class="font-bold text-2xl">Mahsulot Qo'shish</div>
                <button @click="close" class="bg-gray-500 shadow-md cursor-pointer py-2 px-4 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="modal_body mt-10">
                <form >
                    <div class="form-group">
                        <label for="product-name">Nomi *</label>
                        <input type="text" id="product-name" >
                    </div>

                    <div class="form-group">
                        <label for="category">Kategoriya *</label>
                        <div class="category-wrapper">
                            <select id="category">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="scan">Scan *</label>
                        <input type="text" id="scan" >
                    </div>

                    <div class="form-group">
                        <label for="image">Rasm </label>
                        <input type="file" id="image">
                    </div>

                    <div class="form-group">
                        <label>O'lchov birligi</label>
                        <div class="measurement-buttons">
                            <button type="button" id="kg-btn" class="active" onclick="setMeasurement('kg')">kg</button>
                            <button type="button" id="dona-btn" onclick="setMeasurement('dona')">dona</button>
                        </div>
                    </div>

                    <div class="buttons">
                        <button type="submit" class="submit-btn">Saqlash</button>
                        <button type="button" @click="close"  class="submit-btn">Bekor qilish</button>
                    </div>
                </form>
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
    height: 90%;
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
input, select {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
    background: #28a745;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}
.submit-btn:hover {
    background: #218838;
}
.buttons{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.buttons button{
    width: 200px;
    margin-top: 100px;
}
.buttons button:nth-child(2){
    background-color: red;
}

.buttons button:nth-child(2):hover{
    background-color: rgb(211, 14, 14);
}
</style>