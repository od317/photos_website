<script setup>

import { useRoute } from 'vue-router'
import {ref,onMounted,watch} from 'vue'
import download_img from '../file_save'

const route = useRoute();

let uri = window.location.search.substring(1)
let params = new URLSearchParams(uri)

let id = ref(params.get('id'))
let photo = ref('')
let tags = ref('')
let more = ref('')
let q = ref('')


let saved = ref([])
let set = ref(new Set())

saved.value = localStorage.getItem('saved') ? JSON.parse(localStorage.getItem('saved')) : []
set.value = localStorage.getItem('set') ? new Set(... (new Array(JSON.parse(localStorage.getItem('set'))))) : new Set()



 const fetchapi = async ()=>{
  if(!id.value)
     return
  try{
    let resp = await fetch(`https://api.unsplash.com/photos/${id.value}?client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
    let data = await resp.json()
    photo.value = data
    if(set.value.has(photo.value.slug)){
      photo.value.save=true
    }
    tags.value = photo.value.tags
    let a = []
    q.value = ""
    tags.value.slice(0,4).forEach(t => {
      q.value += t.title+','
    });

  }catch(err){

  }
  }


fetchapi()

window.scrollTo({top:0,behavior:'instant'})



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


watch(more,()=>{
    let s  = setTimeout(()=>{let lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          //background-image:url(${img.urls.regular})
          image.style.backgroundImage = `url(${image.dataset.src})`;
          image.classList.remove("lazy");
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });},500)
})



let isloaded = ref(false)

watch(route, () => {
     uri = window.location.search.substring(1)
     params = new URLSearchParams(uri)
     id.value = params.get('id')
     photo.value = ''
     window.scrollTo({top:0,behavior:'instant'})
     fetchapi()

});


let load = async ()=>{

    let resp2 = await fetch(`https://api.unsplash.com/search/photos?client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs&page=1&per_page=30&query=${q.value}`)
    let data2 = await resp2.json()
    more.value = data2.results.filter(i=>{
        return i.id !== photo.value.id
     })
     more.value.forEach(img=>{
        issaved(img,img.slug)
      })
}



const download = (img,url,name='photo')=>{
  if(img.download){
    return
  }
  img.download = true
  download_img(url,name)
}




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

function issaved(img,name){
       if(set.value.has(name)){
           img.save=true
           return true      
       }
       return false 
}


window.scrollTo({to:0,behavior:'instant'})


</script>

<template>

   <div :class="`flex justify-center items-center  pt-[10%] pb-[10%] w-full ${photo===''?'':'hidden'} `">
    
               <div class="flex flex-col w-[15%] pb-[15%] md:w-[7%] md:pb-[7%] relative md:items-center bg-neutral-700 rounded-full animate-spin">

                  <div class=" absolute p-[30%] w-full h-full flex flex-col items-center">
                      <div class="w-[22%] pb-[22%] bg-white rounded-full">
                      </div>
                      <div class="flex flex-grow items-center w-full justify-between">
                          <div class="w-[22%] pb-[22%] bg-white rounded-full">
                          </div>
                          <div class="w-[22%] pb-[22%] bg-white rounded-full">
                          </div>
                      </div>
                      <div class="w-[22%] pb-[22%] bg-white rounded-full">
                      </div>
                  </div>    

               </div>




   </div>

   <div class="pb-[10%] md:pt-[2%]" v-if="photo!==''">




        <div class="flex flex-row w-full pb-[10%] md:px-[10%]  ">



          <div class="w-full h-full  relative  flex flex-col md:flex-row md:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]  ">  

            

                <div class=" hidden md:inline-block relative md:w-[40%]" :style="`padding-bottom:${((100*photo.height/photo.width)*(40/100))}%; background-color:${photo.color};`">
                  <div class=" absolute min-h-full">
                    <div class="">
                          <img @load="load()" class=" w-full bg-cover bg-center  " :src="photo.urls.regular">
                    </div>
                  </div>  
                </div>


                <div class=" hidden md:flex flex-col w-[60%]   items-center   px-[5%] ">
                  
                     <div class="w-full flex flex-row items-center justify-end">

                              <button :class="`  w-[20%] mr-[2%] p-[2%] max-h-full flex items-center justify-center overflow-hidden ${ photo.download? 'bg-green-400 text-white':'bg-gray-400 text-black'} transition-all duration-500 rounded-full `" @click="download(photo,photo.urls.regular,photo.slug)" >
                                      <label class="cursor-pointer" for="">download</label>
                              </button>

                              <button @click="save(photo,photo.urls.regular,photo.slug)" :class="`  relative w-[20%] p-[2%] heart  ${photo.save? 'bg-gray-400':'bg-red-500'} transition-all duration-200  h-fit rounded-full   `">
                                          <label v-if="photo.save" :class="`text-black cursor-pointer ${photo.save?'opacity-[100%]':'opacity-[0%]'} transition-all duration-200  `" for="">saved</label>
                                          <label v-if="!photo.save" :class="`text-white cursor-pointer ${!photo.save?'opacity-[100%]':'opacity-[0%]'} transition-all duration-200 `" for="">save</label>
                              </button>

                     </div>


                     <div class="flex flex-row items-center justify-start w-full text-[110%] py-[3%] mt-[1%] font-semibold">
                      <label for="">{{photo.alt_description}}</label>
                     </div>

                     
                     <div class=" w-full  text-[100%]  flex flex-row items-center justif  gap-x-[5%] ">
                      

                                <div class=" relative pb-[15%] w-[15%] bg-neutral-600 animate-bg rounded-full">
                                      <img :src="photo.user.profile_image.large" class=" w-full h-full absolute rounded-full outline-none" alt="">
                                </div>

                                <label for="">
                                  {{ photo.user.username }}
                                </label>

                     </div>




                </div>



                <div class="relative md:hidden" :style="`padding-bottom:${((100*photo.height/photo.width))}%; background-color:${photo.color};`">
                  <div class=" absolute min-h-full">
                    <div class="">
                          <img @load="load()" class=" w-full bg-cover bg-center  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]" :src="photo.urls.regular">
                    </div>
                  </div>  
                </div>
                
                <div class="flex flex-row  items-center md:hidden  px-[5%] ">
                  
                  <div class=" w-full md:w-[65%] text-[100%] h-[100%] flex flex-row items-center justif  gap-x-[5%] py-[5%]">
                        
                                <div class=" relative pb-[17%] w-[17%] bg-neutral-600 animate-bg rounded-full">
                                      <img :src="photo.user.profile_image.large" class=" w-full h-full absolute rounded-full outline-none" alt="">
                                </div>

                                <label for="">
                                  {{ photo.user.username }}
                                </label>

                      </div>

                    <button :class="`  w-[8%] mr-[2%] md:w-[12%] p-[5%] max-h-full flex items-center justify-center overflow-hidden ${ photo.download? 'bg-green-400':'bg-gray-400'} transition-all duration-500 rounded-full `" @click="download(photo,photo.urls.regular,photo.slug)" >
                                                                                    



                                                                                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" :class="`bi bi-arrow-down absolute  transition-all duration-[500ms] w-[4%] h-[4%]`" viewBox="0 0 16 16"> 
                                                                                      <path  :class="` path `" fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/> 
                                                                                    </svg>
                    </button>

                     <button @click="save(photo,photo.urls.regular,photo.slug)" :class="`  relative w-[20%] p-[2%] heart  ${photo.save? 'bg-gray-400':'bg-red-500'} transition-all duration-200  h-fit rounded-full   `">
                                   <label v-if="photo.save" :class="`text-black ${photo.save?'opacity-[100%]':'opacity-[0%]'} transition-all duration-200  `" for="">saved</label>
                                   <label v-if="!photo.save" :class="`text-white ${!photo.save?'opacity-[100%]':'opacity-[0%]'} transition-all duration-200 `" for="">save</label>
                     </button>



                </div>



          </div>
        </div>



        <div class="flex flex-col items-center pb-[10%]">

                <label class="text-[100%] mb-[5%] md:text-[130%]" for="">More like this</label>
                <div class="w-[100%] relative flex flex-wrap items-center gap-x-[1%] justify-center">

                  <div v-if="more.length===0" :class="`w-full flex items-center cursor-default justify-center py-[5%] md:py-[0%] view_more pb-[20%]`">
                  <div :class="`flex flex-col justify-center items-center  w-full  `">
                    
                              <div class="flex flex-col w-[15%] pb-[15%] md:w-[5%] md:pb-[5%] relative items-center bg-neutral-700 rounded-full animate-spin">

                                  <div class=" absolute p-[30%] w-full h-full flex flex-col items-center">
                                      <div class="w-[22%] pb-[22%] bg-white rounded-full">
                                      </div>
                                      <div class="flex flex-grow items-center w-full justify-between">
                                          <div class="w-[22%] pb-[22%] bg-white rounded-full">
                                          </div>
                                          <div class="w-[22%] pb-[22%] bg-white rounded-full">
                                          </div>
                                      </div>
                                      <div class="w-[22%] pb-[22%] bg-white rounded-full">
                                      </div>
                                  </div>    

                              </div>




                  </div>
          </div>

                <div  v-for="img in more" class=" main flex flex-col w-[49%] lazy1 md:w-[19%] ">
                      <div class="text-black relative cursor-pointer group rounded-3xl  mb-[2%]  md:mb-[5%] transition-all  duration-100 animate-bg ">
                       
                        <div class="  absolute w-full h-full  rounded-3xl  p-[5%] bg-neutral-800 flex flex-col justify-between  bg-opacity-0 md:opacity-[0%] md:group-hover:bg-opacity-40 md:group-hover:opacity-[100%] transition-all duration-300">
                            
                              <div class=" flex flex-row justify-end z-[10] ">
                                <button @click="save(img,img.urls.regular,img.slug)" :class="`  relative w-[18%] heart ${img.save? 'heart_an':''} pb-[18%] md:w-[15%] md:pb-[15%] text-red-500   rounded-full   `">
                                  <svg xmlns="http://www.w3.org/2000/svg"   fill="currentColor" :class="`bi bi-heart w-full h-full absolute ${img.save? 'anime-heart-2':''}`" viewBox="0 0 16 16"> <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/> </svg> 
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="`bi bi-heart-fill  w-full h-full absolute  ${img.save? 'anime-heart-1 scale-[1%]':'anime-heart-1-1'} `" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/> </svg>
                                </button>
                              </div>

                            
                              <div class="flex flex-row justify-end rounded-3xl  relative overflow-hidden z-[10] ">
                                  <button :class="` overflow-hidden w-[15%] md:w-[12%] p-[8%] flex items-center justify-center  ${ img.download? 'bg-green-400':'bg-gray-400'} transition-all duration-500 rounded-full `" @click="download(img,img.urls.regular,img.slug)" >
                                    
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

                         <div  :data-src="img.urls.regular" :class="`rounded-3xl transition-all lazy duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"   alt=""></div>
                        </div>


                        
                </div>

              </div>
        </div>


   </div>

   

</template>

<style>



</style>