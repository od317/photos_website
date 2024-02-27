import Cookies from 'js-cookie'

const AccessKey = 'Tj7kO8KhPyJ1xonByecV2i6py0mranMD8W18AzR_uWI'

export const fetchData = async (query,pagenum)=>{
    if(query.length>0){
        const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&per_page=10&page=${pagenum}&&query=${query}`)
        const data = await res.json()
        return data.results
    }
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${AccessKey}&per_page=10&page=${pagenum}`)
    const data = await res.json()
    return data
}

export const editCookie = (query)=>{
            // ps preacSearch
            let ps = Cookies.get('prevSearch') || ''
            ps = ps.split(',')
            if(new Set(ps).has(query)){
                console.log('already exist')
                return []
            }
            if(ps.length>7){
               ps = [...ps.slice(1),query]
            }
            else
               ps = [...ps,query]
            Cookies.set('prevSearch', ps , { expires: 7 })
            return ps
            // Cookies.remove('prevSearch')
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

export const fetchFormPhotos = async (prevSearch)=>{
    const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&per_page=1&page=1&&query=cat`)
    const data = await res.json()
    console.log('from data is',data)
}