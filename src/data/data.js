import Cookies from 'js-cookie'

const AccessKey = 'Tj7kO8KhPyJ1xonByecV2i6py0mranMD8W18AzR_uWI'

export const fetchData = async (query,pagenum,src)=>{
    if(query.length>0){
        const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&per_page=15&page=${pagenum}&&query=${query}`)
        const data = await res.json()
        return data.results
    }
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${AccessKey}&per_page=15&page=${pagenum}`)
    const data = await res.json()
    return data
}

export const getPhoto = async (id)=>{
    const res = await fetch(`https://api.unsplash.com/photos/${id}/?client_id=${AccessKey}`)
    const photo = await res.json()
    return photo
}

export const editCookie = (query,img)=>{
            // ps preacSearch
            if(!img)
               return
            img = img.urls.small
            let ps = Cookies.get('prevSearch') || ''
            if(checkDuplicate(query,formatCookies(ps))){
                return []
            }
            ps = ps.split(',')
            let cur = query+"++++"+img
            if(ps.length>7){
               ps = [...ps.slice(1),cur]
            }
            else
               ps = [...ps,cur]
            Cookies.set('prevSearch', ps , { expires: 7 })
            return formatCookies(Cookies.get('prevSearch'))
}

export const removeItem = (item)=>{
       let ps = Cookies.get('prevSearch') || ''
       ps = ps.split(',')
       ps = ps.filter((v)=>{
              return v.split('++++')[0]!== item
       })
       Cookies.set('prevSearch', ps , { expires: 7 })
}

export const checkDuplicate = (q,arr)=>{
    let match = false
    arr.forEach((v,i)=> {
        if(v[0]===q)
          match = true
    })
    return match
}


export const formatCookies = (arr)=>{
       arr = arr.split(',')
       arr = arr.map((v,i)=>{
       return v.split('++++')
       })
       return arr
}


export const savePhoto = (photo)=>{
    // let ps = Cookies.get('savedPhotos') ? JSON.parse(Cookies.get('savedPhotos')) :[]
    let ps = localStorage.getItem('savedPhotos') ? JSON.parse(localStorage.getItem('savedPhotos')) :[]
    ps = [...ps,{
        id:photo.id,
        height:photo.height,
        width:photo.width,
        user:{
            profile_image:{
                small: photo.user.profile_image.small 
            },
            username:photo.username
        },
        color:photo.color,
        alt:photo.alt,
        urls:{
            small:photo.urls.small
        }
    }]
    localStorage.setItem('savedPhotos',JSON.stringify(ps))
    // Cookies.remove('savedPhotos')
}

export const removePhoto = (photo)=>{
    let ps = localStorage.getItem('savedPhotos') ? JSON.parse(localStorage.getItem('savedPhotos')) :[]
        ps = ps.filter((v,i)=>{
            return v.id !== photo.id
        })
        localStorage.setItem('savedPhotos',JSON.stringify(ps))
}

export const checkPhotoSaved = (photo)=>{
    let ps = localStorage.getItem('savedPhotos') ? JSON.parse(localStorage.getItem('savedPhotos')) :[]
    for(let i =0;i<ps.length;i++){
        if(ps[i].id === photo.id){
            return true
        }
    }
    return false
}

export const getSavedPhotos = ()=>{
    return localStorage.getItem('savedPhotos') ? JSON.parse(localStorage.getItem('savedPhotos')) :[]
}


const formatCookiesQs = (arr)=>{
      let s = ''
      arr.splice(0,4).forEach((v,i)=>{
        if(v[0].length>0)
        s= s+""+v[0]+","
      })
      s=s.substring(0,s.length-1)
      console.log(s)
      return s
}

export const popularData = [
    {
        photo:'https://images.unsplash.com/photo-1511875762315-c773eb98eec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwyfHxNb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fHwxNzA5NTUyNTExfDA&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Movie Posters'
    },
    {
        photo:'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwxfHxBYnN0cmFjdCUyMEFydHxlbnwwfHx8fDE3MDk1NTI2MDl8MA&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Abstract Art'
    },
    {
        photo:'https://images.unsplash.com/photo-1511300636408-a63a89df3482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwxfHxQYyUyMFdhbGxwYXBlcnN8ZW58MHx8fHwxNzA5NTUyNjMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Pc Wallpapers'
    },
    {
        photo:'https://images.unsplash.com/photo-1519638399535-1b036603ac77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwxfHxBbmltZXxlbnwwfHx8fDE3MDk1NTI2NTF8MA&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Anime'
    },
    {
        photo:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwxfHxDYXRzfGVufDB8fHx8MTcwOTU1MjY4MXww&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Cats'
    },
    {
        photo:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfHNlYXJjaHwxfHxjYXJzfGVufDB8fHx8MTcwOTU1MjcxNXww&ixlib=rb-4.0.3&q=80&w=1080',
        name:'Cars'
    }
]


export const downloadImage = (imageUrl) => {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            // Create a temporary anchor element
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            // Extract the filename from the URL
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

            // Set the download attribute and filename
            link.setAttribute('download', filename);
            document.body.appendChild(link);

            // Simulate a click on the anchor element to start the download
            link.click();

            // Clean up the temporary anchor element
            link.parentNode.removeChild(link);

            // Set the downloaded image URL to display on the page
            setImageUrl(url);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
        });
    }

// const photo = 
// {
//     "id": "OxucP0JIORU",
//     "slug": "a-person-jumping-a-dirt-bike-in-the-air-OxucP0JIORU",
//     "created_at": "2024-03-02T23:58:25Z",
//     "updated_at": "2024-03-03T08:15:23Z",
//     "promoted_at": "2024-03-03T08:15:23Z",
//     "width": 3500,
//     "height": 2333,
//     "color": "#d9d9d9",
//     "blur_hash": "L#M%v2t6I;t6.ToeoeWW9aWVWVWB",
//     "description": null,
//     "alt_description": "a person jumping a dirt bike in the air",
//     "breadcrumbs": [],
//     "urls": {
//         "raw": "https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8&ixlib=rb-4.0.3",
//         "full": "https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8&ixlib=rb-4.0.3&q=85",
//         "regular": "https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8&ixlib=rb-4.0.3&q=80&w=1080",
//         "small": "https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8&ixlib=rb-4.0.3&q=80&w=400",
//         "thumb": "https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8&ixlib=rb-4.0.3&q=80&w=200",
//         "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1709423377982-fbe2169e5b67"
//     },
//     "links": {
//         "self": "https://api.unsplash.com/photos/a-person-jumping-a-dirt-bike-in-the-air-OxucP0JIORU",
//         "html": "https://unsplash.com/photos/a-person-jumping-a-dirt-bike-in-the-air-OxucP0JIORU",
//         "download": "https://unsplash.com/photos/OxucP0JIORU/download?ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8",
//         "download_location": "https://api.unsplash.com/photos/OxucP0JIORU/download?ixid=M3w1NjcyNjF8MHwxfGFsbHwxNXx8fHx8fDJ8fDE3MDk0NTg2MDF8"
//     },
//     "likes": 2,
//     "liked_by_user": false,
//     "current_user_collections": [],
//     "sponsorship": null,
//     "topic_submissions": {},
//     "user": {
//         "id": "fbPZwdKgWWs",
//         "updated_at": "2024-03-03T08:15:23Z",
//         "username": "jeremybishop",
//         "name": "Jeremy Bishop",
//         "first_name": "Jeremy",
//         "last_name": "Bishop",
//         "twitter_username": null,
//         "portfolio_url": "https://www.jeremybishopphotography.com",
//         "bio": "I love supporting and inspiring creatives around the world.\r\nMy passion is the ocean and water photography, and I strive to capture the adventure and beauty of this world in the most meaningful ways. ",
//         "location": "California",
//         "links": {
//             "self": "https://api.unsplash.com/users/jeremybishop",
//             "html": "https://unsplash.com/@jeremybishop",
//             "photos": "https://api.unsplash.com/users/jeremybishop/photos",
//             "likes": "https://api.unsplash.com/users/jeremybishop/likes",
//             "portfolio": "https://api.unsplash.com/users/jeremybishop/portfolio",
//             "following": "https://api.unsplash.com/users/jeremybishop/following",
//             "followers": "https://api.unsplash.com/users/jeremybishop/followers"
//         },
//         "profile_image": {
//             "small": "https://images.unsplash.com/profile-1610519305252-c9d552283aaaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
//             "medium": "https://images.unsplash.com/profile-1610519305252-c9d552283aaaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
//             "large": "https://images.unsplash.com/profile-1610519305252-c9d552283aaaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
//         },
//         "instagram_username": "stillbish",
//         "total_collections": 19,
//         "total_likes": 3592,
//         "total_photos": 1004,
//         "total_promoted_photos": 503,
//         "accepted_tos": true,
//         "for_hire": true,
//         "social": {
//             "instagram_username": "stillbish",
//             "portfolio_url": "https://www.jeremybishopphotography.com",
//             "twitter_username": null,
//             "paypal_email": null
//         }
//     }
// }