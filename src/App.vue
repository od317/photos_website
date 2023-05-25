<script setup>

import {ref,onMounted, watch, ssrContextKey} from 'vue'
import {useRouter} from 'vue-router'
import { useRoute } from "vue-router"
import download_img from './file_save'
import modal from './components/modal.vue'
import { useScrollLock } from '@vueuse/core'

const route = useRoute()
const router = useRouter()

 let applicationId =  "HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs"
 let  secret = "GOfzllPKDQpcJEKmHe98eaRbrKDf7zOqSdWxsmP8iv0"


let dark = ref(true)
let query = ref('random')
let modal_open = ref(false)
let saved_open = ref(false)
let page = ref('')

if( !localStorage.getItem('theme')){
localStorage.setItem('theme','dark')
}
else{
  if(localStorage.getItem('theme') == 'dark'){
    dark.value=true
  }
  else{
    dark.value=false
  }
}

let switch_theme = ()=>{
  if(dark.value == true){
    dark.value = false
    localStorage.setItem('theme','light')
  }
  else{
    dark.value=true
    localStorage.setItem('theme','dark')
  }
}

let searchq = ref('')

const sub_form = (q = null)=>{
   if(q){
    searchq.value = q
   }
   modal_open.value = false
   router.push(`/search?query=${searchq.value}`)
}


watch(route,()=>{
   if(route.name=='photo')
      page.value = 'photo'
    else
      page.value = 'nope'  
})

let scroll_on = ref(true)

watch(modal_open,()=>{
  if(modal_open.value)
    document.documentElement.style.overflow = 'hidden'
  else
    document.documentElement.style.overflow = 'visible'
})


const back = ()=>{
  router.go(-1)
}

const el = ref(null)
const isLocked = useScrollLock(el)
isLocked.value = false


</script>

<template>
    <div  :class="` ${dark? 'dark':''} w-full  `" >
      



    <div ref="el" class=" w-full dark:bg-dark1 min-h-screen h-auto bg-light1 dark:text-white transition-all duration-300">  
        
      

       <Teleport to="body">
        <div class="" v-if="modal_open"> 
          <modal
          :saved="saved"
          @close="modal_open=false"
          @sub="(i)=>{
              sub_form(i)
            }"/>
        </div>
       </Teleport>


      <div class=" absolute opacity-0 place_holder pb-[2%] w-full "></div>

            
     
      <header :class="`  transition-all duration-200 header md:hidden`">
          <div class="container">
              <nav :class="`  transition-all duration-200 bottom-nav z-[130]   shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] text-red-500`"> 
                <div :class="`  transition-all duration-200 w-full pt-[5%] ${ss?'shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]':''}  nav1 z-[100] flex flex-row justify-evenly  py-[2%] md:py-[1%] px-[5%]   top-[0%] dark:bg-dark1 bg-light1 w-full transition-all duration-300`">

                  


                          <RouterLink to="/" class="w-[10%] pb-[10%] relative  dark:hover:text-white hover:text-light2 rounded-full dark:text-white text-light2   ">
                                    <div class=" absolute w-full h-full flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill transition-all duration-200 w-[70%] h-[70%]   `" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>        
                                    </div>
                          </RouterLink>
                          

                          <RouterLink to="/sp" class="w-[10%] pb-[10%] relative dark:hover:text-white hover:text-light2  rounded-full dark:text-white text-light2  ">
                                    <div class=" absolute w-full h-full flex items-center justify-center ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill transition-all duration-200 w-[70%] h-[70%]   `" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/> </svg>        
                                    </div>
                          </RouterLink>

                          <button class=" w-[10%] pb-[10%] dark:text-white text-light2 rounded-full relative" @click="modal_open=!modal_open">
                     
                            <div class=" absolute w-full h-full flex dark:text-white text-light2 items-center justify-center ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill transition-all duration-200 w-[70%] h-[70%]   `" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </div>

                          </button>


                          <div class="w-[10%] md:w-[5%] flex justify-center items-center">
                            <button class=" relative pb-[100%] w-[100%] text-[150%] flex  justify-center rounded-full  " @click="switch_theme()" for="">
                            
                            <div :class="`${ !dark==false? 'opacity-[0%]':''} absolute  w-full h-full rounded-full bg-dark1 text-white flex items-center  justify-center text-center transition-all duration-300`">
                              <svg  xmlns="http://www.w3.org/2000/svg" class="bi bi-moon w-[70%] h-[70%]" fill="currentColor" viewBox="0 0 16 16"> <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/> </svg>
                            </div>
                            
                            <div :class="`${ !dark==false? 'opacity[100%]':'opacity-[0%]'} absolute w-full h-full bg-light2 rounded-full text-light1 flex items-center   justify-center text-center transition-all duration-300  `">
                              <svg  xmlns="http://www.w3.org/2000/svg" class="bi bi-sun w-[70%] h-[70%]"  fill="currentColor"  viewBox="0 0 16 16"> <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/> </svg>          
                            </div>
                            </button>
                          </div>

                       <!--    

                         <form @submit.prevent="onSubmit" @submit="sub_form()" class="w-full h-full py-[1%] text-black flex  flex-row justify-end md:justify-start">
                              <button type="submit" class="w-[5%] ml-[5%] rounded-l-md bg-gray-400 pl-[1%] py[.5%] flex items-center justify-center">
                                <ion-icon name="search"></ion-icon>
                              </button>
                              <input v-model="searchq" class="w-[80%]  py-[.5%] px-[1%]    outline-none text-black bg-gray-400" type="text">
                              <div class="bg-gray-400 flex items-center justify-center">
                                            <div :class="` ${ cur ?'opacity-[100%]':'opacity-[0%]'} transition-all duration-300`" role="status">
                                            <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                      </div>
                              </div>
                              <div @click="searchq=''" :class="` flex items-center justify-center text-center transition-all duration-300 rounded-r-md outline-none text-black bg-gray-400 pr-[2%] cursor-pointer`">       
                                  <label :class="` ${searchq.length==0?'opacity-[0%]':'opacity-[100%]'} transition-all duration-300 cursor-pointer`" for="">x</label>
                              </div>

                            </form>
-->




                    </div>

              </nav>



          </div>
      </header>


      <div :class="`  transition-all duration-200 w-full   ${ss?'shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]':''} sticky top-[0%]   z-[100] hidden  md:flex flex-row mb-[%] py-[2%] md:pt-[1%] px-[5%]    dark:bg-dark1 bg-light1 w-full transition-all duration-300`">

          <div class="w-[15%] md:w-[5%] flex justify-center  items-center">
            <button class=" relative pb-[70%] w-[70%] text-[150%] flex  justify-center rounded-full  " @click="switch_theme()" for="">
            
            <div :class="`${ !dark==false? 'opacity-[0%]':''} absolute  w-full h-full rounded-full text-white flex items-center dark:bg-light2 bg-dark1 justify-center text-center transition-all duration-300`">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"> <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/> </svg>
            </div>
            
            <div :class="`${ !dark==false? 'opacity[100%]':'opacity-[0%]'} absolute w-full h-full rounded-full text-light1 flex items-center dark:bg-light2 bg-dark1  justify-center text-center transition-all duration-300  `">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"> <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/> </svg>          
            </div>
            </button>
          </div>

            <form @submit.prevent="onSubmit" @submit="sub_form()" class="w-full h-full py-[1%] text-black flex  flex-row justify-end md:justify-start">
              <button type="submit" class="w-[5%] ml-[5%] rounded-l-md bg-gray-400 pl-[1%] py[.5%] flex items-center justify-center">
                <ion-icon name="search"></ion-icon>
              </button>
              <input v-model="searchq" class="w-[80%]  py-[.5%] px-[1%]    outline-none text-black bg-gray-400" type="text">
              <div class="bg-gray-400 flex items-center justify-center">
                            <div :class="` ${ cur ?'opacity-[100%]':'opacity-[0%]'} transition-all duration-300`" role="status">
                            <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                      </div>
              </div>
              <div @click="searchq=''" :class="` flex items-center justify-center text-center transition-all duration-300 rounded-r-md outline-none text-black bg-gray-400 pr-[2%] cursor-pointer`">       
                   <label :class="` ${searchq.length==0?'opacity-[0%]':'opacity-[100%]'} transition-all duration-300 cursor-pointer`" for="">x</label>
              </div>
        
            </form>

            <div :class="`w-[5%]  flex items-center justify-center`">
                <RouterLink to="/sp" class=" saved_button hidden w-[60%] pb-[60%] relative bg-red-600 rounded-full text-white md:flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill mt-[15%] ml-[15%] w-[70%] h-[70%] absolute  `" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/> </svg>        
                </RouterLink>
            </div>

            <div :class="`w-[5%]  flex items-center justify-center`">
                <RouterLink to="/" class="w-[60%] pb-[60%] relative  dark:hover:text-white hover:text-light2 rounded-full dark:text-white text-light2   ">
                                        <div class=" absolute w-full h-full flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill transition-all duration-200 w-[100%] h-[100%]   `" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>        
                                        </div>
                </RouterLink>
          </div>

      </div>
 
      <button @click="back()" :disabled="page!=='photo'" :class="` ${page=='photo'?'opacity-[100%]':'opacity-[0%]'}  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] pb-[3%] w-[3%] hidden fixed md:flex  justify-center bg-gray-500 rounded-full mt-[1%] cursor-pointer ml-[2%] z-[10]  text-white`">
                <label class=" absolute w-full h-full flex items-center text-[150%] justify-center cursor-pointer " for="">
                  <ion-icon name="arrow-round-back"></ion-icon>
                </label>
      </button>

      <button @click="back()" :disabled="page!=='photo'" :class="` ${page=='photo'?'opacity-[100%]':'opacity-[0%]'}  pb-[10%] w-[10%] md:hidden fixed flex  justify-center bg-gray-500 rounded-full mt-[2%] ml-[2%] z-[10]  text-white`">
                <label class=" absolute w-full h-full flex items-center text-[200%] justify-center" for="">
                  <ion-icon name="arrow-round-back"></ion-icon>
                </label>
      </button>

      <div class=" pb-[5%] dark:bg-dark1 bg-light1 ">
        




        <router-view></router-view>







      </div>

        </div>
      </div>


</template>


<style>



.header .bottom-nav {
display: flex;
position: fixed;
bottom: 0;
left: 0;
right: 0;
}



button{
  outline: none;
}

.lazy{
    opacity: 0%;
}


.path {
    stroke-width: 1;
    stroke: #000;
    fill: transparent;
  }


  .animated-check path {
    fill: none;
    stroke: #dfdfdf;
    stroke-width: 4;
    stroke-dasharray: 23;
    stroke-dashoffset: 23;
    stroke-linecap: round;
    stroke-linejoin: round
}

.animated-check2 path {
    animation: draw .2s linear forwards;
    animation-delay: 500ms;
}

.animate_arrow_1{
    animation: arrow_down .4s linear forwards;
}

.animate_arrow_2{
    animation: arrow_down .5s linear forwards;
}

.anime-heart-1{
  transition: all;
  animation: heart_1 .4s forwards;
  animation-timing-function: cubic-bezier(1,1,1,1)
}

.anime-heart-2{
  transition: all;
  animation: heart_2 .4s forwards;
  animation-timing-function: cubic-bezier(1,1,1,1)
}

.anime-heart-1-1{
  transition: all;
  animation: heart_1_1 .4s forwards;
  animation-timing-function: cubic-bezier(1,1,1,1)
}

.bottom_nav{
  will-change: transform;
}

.saved_button::after{
   content: "saved";
   width: 200%;
   bottom: -100%;
   left:-50%;
   font-size: 100%;
   scale:0%;
   transform-origin: center;
   transition: all .2s;
   height: 80%;
   position:absolute;
   background-color:#1564be;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
}

.saved_button:hover::after{
  scale: 100%;   
}


@keyframes draw {
    to {
        stroke-dashoffset: 0
    }
}
/* Animation Sequence */

@keyframes animate {
  0% {
    stroke-dashoffset: 0;
    stroke-dasharray: 0; 
  }100% {
    stroke-dashoffset: 50;
    stroke-dasharray: 50; 
  }
}


@keyframes arrow_down {
  60%{
    transform: translateY(-25%);
  }
   100%{
    transform: translateY(140%);
   }
}

@keyframes arrow_up {
   100%{
    transform: translateY(0%);
   }
}


@keyframes heart_1 {
    50%{
    transform:scale(130%);
   }
   100%{
    transform: scale(100%);
   }
}

@keyframes heart_2 {
   100%{
    transform: scale(0%);
   }
}

@keyframes heart_1_1 {
   100%{
    opacity:0%;
   }
}

</style>