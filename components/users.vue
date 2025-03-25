<script setup>
</script>
<template>
<div>
    <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
                <tr>
                    <th class="text-left py-3 px-2">Ism</th>
                    <th class="text-left py-3 px-2">Email</th>
                    <th class="text-left py-3 px-2">Parol</th>
                    <th class="text-left py-3 px-2">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                    <td class="p-3 px-2">
                        <input type="text" value="user.name" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" value="user.email" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2 ">
                        <div class="flex items-center justify-between bg-transparent border-b-2 border-gray-300 py-2 px-2">
                            <input type="password" value="user.email" class="outline-none">
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="p-3 px-2">
                        <select value="user.role" class="bg-transparent border-b-2 border-gray-300 py-2">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td>
                    <td class="p-3 px-2 flex justify-end items-center">
                        <button type="button"
                            class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            <button
                            type="button"
                            class="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
                <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                    <td class="p-3 px-2">
                        <input type="text" value="user.name" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" value="user.email" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2 ">
                        <div class="flex items-center justify-between bg-transparent border-b-2 border-gray-300 py-2 px-2">
                            <input type="password" value="user.email" class="outline-none">
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="p-3 px-2">
                        <select value="user.role" class="bg-transparent border-b-2 border-gray-300 py-2">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td>
                    <td class="p-3 px-2 flex justify-end items-center">
                        <button type="button"
                            class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            <button
                            type="button"
                            class="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
                <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                    <td class="p-3 px-2">
                        <input type="text" value="user.name" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" value="user.email" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2 ">
                        <div class="flex items-center justify-between bg-transparent border-b-2 border-gray-300 py-2 px-2">
                            <input type="password" value="user.email" class="outline-none">
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="p-3 px-2">
                        <select value="user.role" class="bg-transparent border-b-2 border-gray-300 py-2">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td>
                    <td class="p-3 px-2 flex justify-end items-center">
                        <button type="button"
                            class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            <button
                            type="button"
                            class="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
                <tr class="hover:bg-orange-100 cursor-pointer bg-gray-100 py-2">
                    <td class="p-3 px-2">
                        <input type="text" value="user.name" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2">
                        <input type="text" value="user.email" class="bg-transparent border-b-2 border-gray-300 py-2 px-2">
                    </td>
                    <td class="p-3 px-2 ">
                        <div class="flex items-center justify-between bg-transparent border-b-2 border-gray-300 py-2 px-2">
                            <input type="password" value="user.email" class="outline-none">
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="p-3 px-2">
                        <select value="user.role" class="bg-transparent border-b-2 border-gray-300 py-2">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td>
                    <td class="p-3 px-2 flex justify-end items-center">
                        <button type="button"
                            class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            <button
                            type="button"
                            class="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style scoped>
</style>