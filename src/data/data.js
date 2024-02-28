import Cookies from 'js-cookie'

const AccessKey = 'Tj7kO8KhPyJ1xonByecV2i6py0mranMD8W18AzR_uWI'

export const fetchData = async (query,pagenum)=>{
    if(query.length>0){
        const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&per_page=20&page=${pagenum}&&query=${query}`)
        const data = await res.json()
        editCookie(query,data.results[0])
        return data.results
    }
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${AccessKey}&per_page=20&page=${pagenum}`)
    const data = await res.json()
    console.log(data)
    return data
}

export const editCookie = (query,img)=>{
            // ps preacSearch
            img = img.urls.small
            let ps = Cookies.get('prevSearch') || ''
            if(checkDuplicate(query,formatCookies(ps))){
                console.log('already exist')
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
            return ps
}

export const removeItem = (item)=>{
       let ps = Cookies.get('prevSearch') || ''
       ps = ps.split(',')
       console.log('before',ps)
       ps = ps.filter((v)=>{
              return v!== item
       })
       console.log('after',ps)       
}

export const checkDuplicate = (q,arr)=>{
    let match = false
    arr.forEach((v,i)=> {
        if(v[0]===q)
          match = true
    })
    console.log(match)    
    return match
}


export const formatCookies = (arr)=>{
       arr = arr.split(',')
       arr = arr.map((v,i)=>{
       return v.split('++++')
       })
       return arr
}