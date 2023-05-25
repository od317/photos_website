<script setup>

import {defineEmits,ref} from 'vue'
let p  =defineProps({
    saved:Array
})
let arr = ref(p.saved)
let q = ref('')

let butts = ref([
    {
        title:'Photography',
        img:'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    },
    {
        title:'Fashion',
        img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
    },
    {
        title:'Business',
        img:'https://media.istockphoto.com/id/1129342452/photo/portrait-of-cheerful-young-manager-handshake-with-new-employee.jpg?s=612x612&w=0&k=20&c=fhrfMXr8-10DjuLocKLiny-1FgPumyjjzDYsG7epVi4='
    },
    {
        title:'Astrophotography',
        img:'https://www.lightstalking.com/wp-content/uploads/2017/06/pexels-photo-1.jpg'
    },
    {
        title:'Sports',
        img:'https://media.gettyimages.com/id/1492677463/photo/real-sociedad-v-ud-almeria-laliga-santander.jpg?s=612x612&w=0&k=20&c=UTrCA_8k_gQ2OWzxxHrsbIVrI9fs5Mc_RHw8D-pDoVE='
    },
    {
        title:'Architecture',
        img:'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww&w=1000&q=80'
    },

])

const emit = defineEmits(['customChange'])


let emits = (q)=>{
    emit('sub',q)
}

</script>


<template>

          
        <div class="mod fixed z-[120] w-full min-h-screen bg-neutral-800 bg-opacity-50 top-0 p-[2%] md:hidden">
            
            <div class=" w-full flex flex-col items-center text-[120%] py-[2%]">
                
                <form @submit.prevent="onSubmit" @submit="$emit('sub',q)" class="w-full" action="">
                   <input v-model="q" class="w-full py-[2%] px-[4%] text-black placeholder:text-neutral-700 outline-none    rounded-full" type="text" placeholder="search" name="" id="">
                </form>
 
                <label class=" capitalize text-white w-[50%] text-center mt-[5%]" for="">Populare categories on unsplash</label>

                <div class="flex flex-wrap items-center justify-center gap-[5%] pt-[10%] w-full">
                   <div :style="`background-image:url(${b.img})`" v-for="b in butts" class="w-[45%] mb-[5%] bg-cover bg-center rounded-lg ">      
                    <button  class="text-white w-[100%] py-[22%] bg-neutral-800 bg-opacity-40 rounded-lg" @click="emits(b.title)">{{ b.title }}</button>
                   </div>
                </div>


            </div>

           <!-- <button @click="$emit('close')" class="bg-blue-500 p-[3%]" >x</button> -->

        </div>
        


</template>



<style scoped>



</style>