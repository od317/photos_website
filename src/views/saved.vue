<script setup>

import {ref,onMounted} from 'vue'
import download_img from '../file_save'

let saved = ref([])
let set = ref(new Set())

saved.value = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : []
set.value = localStorage.getItem('set') ? new Set(... (new Array(JSON.parse(localStorage.getItem('set'))))) : new Set()


const save = (img,url,name)=>{
    if(img.save){
      img.save = false
      saved.value = new Set((saved.value)) 
      saved.value.forEach(s=>{
        if(s.id === img.id){
          saved.value.delete(s)
        }
      });
      saved.value = Array.from(saved.value)
      set.value.delete(name)
      localStorage.setItem('saved',JSON.stringify(saved.value))
      localStorage.setItem('set',JSON.stringify(Array.from(set.value)))
      return
    }
     img.save = true
     if(set.value.has(name)){
      return;
     }
     img.download = false
     saved.value = new Set((saved.value)) 
     saved.value.add(new Object(img));
     saved.value = Array.from(saved.value)
     set.value.add(name)
     localStorage.setItem('saved',JSON.stringify(saved.value))
     localStorage.setItem('set',JSON.stringify(Array.from(set.value)))

}

const download = (img,url,name='photo')=>{
  img.download = true
  download_img(url,name)
}

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


})

window.scrollTo({to:0,behavior:'instant'})


</script>


<template>


<div class="flex flex-wrap gap-x-[1%] md:gap-y-[2%] ">
                  
                  <div v-if="saved.length>0 " v-for="img in saved" class="  flex flex-col w-[49%] md:w-[19%]">
                      <div class="text-black relative cursor-pointer rounded-3xl  group mb-[2%] md:mb-[5%] transition-all  duration-100 animate-bg ">
                       
                        <div class="  absolute w-full h-full rounded-3xl  p-[5%] bg-neutral-800 flex flex-col justify-between  bg-opacity-0 md:opacity-[0%] md:group-hover:bg-opacity-40 md:group-hover:opacity-[100%] transition-all duration-300">
                            

                          <div class=" flex flex-row justify-end z-[10] ">
                                <button @click="save(img,img.urls.regular,img.slug)" :class="` bg-red-500 p-[2%]  relative   ${img.save? 'heart_an':''}  text-white-500   rounded-full   `">
                                        remove
                                </button>
                              </div>
                            
                              <div class="flex flex-row rounded-3xl  justify-end relative overflow-hidden z-[10]">
                                  <button :class="` overflow-hidden w-[15%] md:w-[13%] p-[8%] flex items-center justify-center  ${ img.download? 'bg-green-400':'bg-gray-400'} transition-all duration-500 rounded-full `" @click="download(img,img.urls.regular,img.slug)" >
                                    
                                            <svg :class="`animated-check absolute w-[60%] h-[60%] ${ img.download? 'translate-y-[0%] animated-check2':' translate-y-[-110%]'} transition-all duration-[500ms]`" viewBox="0 0 24 24">
                                            <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> 
                                            </svg>
                                        
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-circle-fill absolute translate-y-[100%]" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg>


                                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" :class="`bi bi-arrow-down absolute ${ img.download? 'animate_arrow_2 md:animate_arrow_1':''} transition-all duration-[500ms] w-[60%] h-[60%]`" viewBox="0 0 16 16"> 
                                              <path  :class="` path `" fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/> 
                                            </svg>
                                  </button>
                                </div>



                                
                                <RouterLink :to="`/photo?id=${img.id}`"  class=" absolute rounded-3xl  top-0 left-0 z-[5] w-full h-full">
                                  
                                </RouterLink>

                            </div> 

                         <div   :class="`lazy rounded-3xl  transition-all  duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"  :style="`background-image:url(${img.urls.regular})`" alt=""></div>
                        </div>


                        
                  </div>



                  <div class="flex w-full h-screen items-center justify-center" v-if="saved.length==0">
                  
                      <label class=" text-[150%] text-center " for="">no photos saved <br>-_-</label>

                  </div>
                


</div>


</template>


<style>

</style>