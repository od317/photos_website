<script setup>
import { useRoute } from 'vue-router'
import {ref,onMounted,watch} from 'vue'
import download_img from '../file_save'

const route = useRoute();

let uri = window.location.search.substring(1)
let params = new URLSearchParams(uri)

let applicationId =  "HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs"
let  secret = "GOfzllPKDQpcJEKmHe98eaRbrKDf7zOqSdWxsmP8iv0"


let photos = ref([])
let photos_all = ref([[]])
let photos_show = ref([[]])
let photos_all2 = ref([['s']])
let query = ref(params.get('query')||'')
let cur = ref(false)
let query_buttons = ref([])
let query_buttons_p = ref([{
  title:'Architecture',
  img:'https://media.idownloadblog.com/wp-content/uploads/2021/08/achitecture-wallpaper-iPhone-idownloadblog-pierre-chatel-innocenti.jpg'
},{
  title:'neon',
  img:'https://wallpapers.com/images/hd/glowing-neon-triangle-hotmail-30a0tont8mbcd5mj.jpg'
}])

let PageNUM = ref(1)

let set2 = ref(new Set())
set2.value = localStorage.getItem('set2') ? new Array(JSON.parse(localStorage.getItem('set2'))) : new Array()
if(set2.value && set2.value[0])
  set2.value[0].forEach(i=>{
  query_buttons.value.push({
    title:i
  })
})

async function  fetchapi(){
      PageNUM.value = 1

      let data = fetch_helper()
      photos_show.value = data.results
      photos_all2.value = ['s']
      photos_all2.value = ['q']
      cur.value = false
      photos.value.forEach(img=>{
        issaved(img,img.slug)
      })
    }

async function fetch_helper(){
  let resp
  let data
  if(set2.value[0] && set2.value[0].length>0){
      for(let i of set2.value[0]){
       resp = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${i}&client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
       data = await resp.json()

       photos.value = photos.value.concat(data.results)
      }      
      }
      else{
       resp = await fetch(`https://api.unsplash.com/search/photos?&page=${PageNUM.value}&per_page=30&query=${query.value}&client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
       data = await resp.json()
       photos.value =  data.results
    }
    return data
}

//fetchapi()

let view_more = async ()=>{
      PageNUM.value +=1
      query.value = query.value.length ===0? 'random':query.value
      let resp
      let data
      let photos1 = ref([])
      if(set2.value[0] && set2.value[0].length>0){
          for(let j=0; j< set2.value[0].length;j++){
          let i = set2.value[0][j]
          resp = await fetch(`https://api.unsplash.com/search/photos?&page=${PageNUM.value}&per_page=30&query=${i}&client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
          data = await resp.json()
          query_buttons.value[j].img=data.results[0].urls.regular
          photos1.value = [...photos1.value,...data.results]
          }      
          }
          else{
            for(let i of query_buttons_p.value){
          resp = await fetch(`https://api.unsplash.com/search/photos?&page=${PageNUM.value}&per_page=30&query=${i.title}&client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs`)
          data = await resp.json()
          photos1.value = [...photos1.value,...data.results]
          }  
        }
        photos.value = [...photos.value,...photos1.value.sort((a, b) => 0.5 - Math.random())]
        photos_all2.value = ['s']
        photos_all2.value = ['q']
        photos.value.forEach(img=>{
          issaved(img,img.slug)
      })
}

let ss = ref(false)

onMounted(()=>{
    let lazyloadImages = document.querySelectorAll(".lazy");
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


const download = (img,url,name='photo')=>{
  img.download = true
  download_img(url,name)
}

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


<div class=" hidden  md:first:flex flex-row gap-x-[5%] mb-[4%] justify-center items-center ">

  <div :style="`background-image:url(${s.img})`" class=" group relative pb-[8%] w-[20%] bg-neutral-700 rounded-lg  hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-200 bg-cover bg-center" v-for="s in query_buttons">
        <RouterLink  :to="`/search?query=${s.title}`"  class=" translate-x-[5%] translate-y-[10%] group-hover:translate-x-[0%] transition-all duration-200 group-hover:translate-y-[0%] rounded-lg hover:text-white absolute bg-neutral-800 bg-opacity-50 w-full h-full flex items-center justify-center ">
            <label class=" cursor-pointer  " for="">{{s.title}}</label>
        </RouterLink>
  </div>

</div>

<div v-if="!query_buttons.length && photos.length>0" class=" hidden md:flex flex-col gap-x-[5%] mb-[2%] justify-center items-center">

      <label class="mb-[1%] capitalize text-center"  for="">
        recomended <br>
        <label class="text-[70%]" for="">
        (will change based on your search)
      </label>
      </label>


      <div class="flex flex-row gap-x-[5%] mb-[2%] justify-center items-center w-full">
       <div :style="`background-image:url(${s.img})`" class=" relative pb-[8%] w-[20%] bg-neutral-700 rounded-lg bg-cover bg-center" v-for="s in query_buttons_p">
              <RouterLink  :to="`/search?query=${s.title}`"  class=" rounded-lg hover:text-white absolute bg-neutral-800 bg-opacity-50 w-full h-full flex items-center justify-center ">
                  <label class=" cursor-pointer  " for="">{{s.title}}</label>
              </RouterLink>
        </div>
      </div>


</div>



<div  class="flex flex-wrap w-full items-center justify-center md:gap-x-[01%] gap-x-[2%] px-[1%] md:px-[0%] md:gap-y-[2%] md:pt-[0%] pt-[2%]">
                  
                  <div  v-if="photos.length>0" v-for="img in photos" class=" main flex flex-col w-[49%] md:w-[19%] ">
                      <div class="text-black relative cursor-pointer group rounded-3xl  mb-[2%]  md:mb-[5%] transition-all  duration-100 animate-bg lazy">
                       
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

                         <div :data-src="img.urls.regular" :class="`lazy rounded-3xl transition-all  duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"  :style="`background-image:url(${img.urls.regular})`" alt=""></div>
                        </div>


                        
                  </div>

                  <div v-if=" !not_found && photos_all[0].length==0" v-for="i in 5" class=" flex flex-col ">
                      <div class="text-black  mb-[2%] md:mb-[5%] transition-all  duration-300 animate-bg lazy" v-for="j in 12">
                          <div   :class="`lazy  transition-all  duration-300 pb-[150%] bg-cover bg-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`"   alt=""></div>
                      </div>
                  </div>

                  <div v-if="not_found ">nothing</div>
                


          </div>

          <div :class="`w-full flex items-center cursor-default justify-center py-[5%] md:py-[0%] view_more pb-[20%]`">
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

                              <label v-if="photos.length===0" class="  mt-[5%] md:text-[130%] font-bold" for="">Getting photos for you
                                            please wait 
                              </label>


                  </div>
          </div>


</template>


<style>



</style>