<script setup>

import {ref,onMounted, watch, ssrContextKey} from 'vue'
import { saveAs } from 'file-saver';


 let applicationId =  "HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs"
 let  secret = "GOfzllPKDQpcJEKmHe98eaRbrKDf7zOqSdWxsmP8iv0"



let photos = ref([])
let photos_all = ref([[]])
let photos_all2 = ref([['s']])
let dark = ref(true)
let query = ref('random')
let cur = ref(false)
let not_found = ref(false)

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

let PageNUM = ref(1)

async function  fetchapi(){
      let resp = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${query.value}&client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
      let data = await resp.json()
      photos.value =  data.results
      photos_all2.value = ['s']
      photos_all.value[0] = photos.value.slice(0,6)
      photos_all.value[1] = photos.value.slice(6,12)
      photos_all.value[2] = photos.value.slice(12,18)
      photos_all.value[3] = photos.value.slice(18,24)
      photos_all.value[4] = photos.value.slice(24)
      photos_all2.value = ['q']
      cur.value = false
    }

fetchapi()


let view_more = async ()=>{
      PageNUM.value +=1
      let resp = await fetch(`https://api.unsplash.com/search/photos?client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs&page=${PageNUM.value}&per_page=30&query=${query.value}`)
      let data = await resp.json()
      photos_all2.value = ['s']
      photos.value = [...photos.value,...data.results]
      photos_all.value[0]=photos_all.value[0].concat(photos.value.slice(0,6))  
      photos_all.value[1]=photos_all.value[1].concat(photos.value.slice(6,12))  
      photos_all.value[2]=photos_all.value[2].concat(photos.value.slice(12,18))  
      photos_all.value[3] =photos_all.value[3].concat(photos.value.slice(18,24))
      photos_all.value[4] =photos_all.value[4].concat(photos.value.slice(24,30))
      photos_all2.value = ['q']
}

let ss = ref(false)

onMounted(()=>{
    let lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });

    let lazyloadImages2 = document.querySelectorAll(".view_more");
    var buttonObserver2 = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          view_more()
        }
      });
    });

    lazyloadImages2.forEach(function(image) {
      buttonObserver2.observe(image);
    });

    let place_holder = document.querySelectorAll('.place_holder');
    var pObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          ss.value=false
        }
        else{
          ss.value=true
        }
      });
    });
    place_holder.forEach(function(p) {
      pObserver.observe(p);
    });
})


watch(photos_all2,()=>{
    let s  = setTimeout(()=>{let lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.style.background = image.dataset.src;
          image.classList.remove("lazy");
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });},500)
})

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

const sub_form = ()=>{

  if(cur.value){
    return
  }
cur.value = true
PageNUM.value = 0
query.value = searchq.value

fetchapi()

}

const donwload = (url)=>{

saveAs("https://images.unsplash.com/photo-1679678691256-fa3ce50c2159?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb", "image.jpg")
    

}

</script>

<template>
    <div :class="` ${dark? 'dark':''} `">
    <div class="dark:bg-dark1 min-h-screen bg-light1 dark:text-white transition-all duration-300">  

      <div class=" absolute opacity-0 place_holder pb-[2%] w-full "></div>

      <div :class="` ${ss?'shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]':''}  nav1 z-[100] flex flex-row mb-[3%] py-[2%] md:py-[1%] px-[5%]  sticky top-[0%] dark:bg-dark1 bg-light1 w-full transition-all duration-300`">

          <div class="w-[12%] md:w-[5%] flex justify-center items-center">
            <button class=" relative pb-[70%] w-[70%] text-[150%] flex  justify-center rounded-full  " @click="switch_theme()" for="">
            
            <div :class="`${ !dark==false? 'opacity-[0%]':''} absolute  w-full h-full rounded-full text-white flex items-center dark:bg-light2 bg-dark1 justify-center text-center transition-all duration-300`">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"> <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/> </svg>
            </div>
            
            <div :class="`${ !dark==false? 'opacity[100%]':'opacity-[0%]'} absolute w-full h-full rounded-full text-light1 flex items-center dark:bg-light2 bg-dark1  justify-center text-center transition-all duration-300  `">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"> <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/> </svg>          
            </div>
            </button>
          </div>

            <form @submit.prevent="onSubmit" @submit="sub_form()" class="w-full h-full py-[1%] text-black flex flex-row justify-end md:justify-start">
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


      </div>
 
      <div class="px-[5%] pt-[1%] ">
        
        <button @click="donwload(1)">ok</button>


          <div class="flex flex-wrap gap-x-[1%] md:gap-y-[2%] ">
                  
                  <div v-if="photos_all[0].length>0" v-for="img in photos" class=" flex flex-col w-[49%] md:w-[19%]">
                      <div class="text-black  mb-[2%] md:mb-[5%] transition-all  duration-300 animate-bg lazy">
                          <div   :class="`lazy  transition-all  duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"  :style="`background-image:url(${img.urls.regular})`" alt=""></div>
                      </div>
                  </div>

                  <div v-if=" !not_found && photos_all[0].length==0" v-for="i in 5" class=" flex flex-col ">
                      <div class="text-black  mb-[2%] md:mb-[5%] transition-all  duration-300 animate-bg lazy" v-for="j in 12">
                          <div   :class="`lazy  transition-all  duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"   alt=""></div>
                      </div>
                  </div>

                  <div v-if="not_found ">nothing</div>
                
            
          </div>

          <div class="w-full flex items-center cursor-default justify-center py-[5%] view_more">
                <div  class=" text-white cursor-default text-[150%] p-[1%] " >
                        <div class="cursor-default" role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 cursor-default text-gray-200 animate-spin dark:text-gray-600 dark:fill-white fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="cursor-default" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path class="cursor-default" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only cursor-default">Loading...</span>
                        </div>
                      </div>
          </div>

          </div>

        </div>
      </div>
</template>


<style>

.lazy{
    opacity: 0%;
}

</style>