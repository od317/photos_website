const AccessKey = 'Tj7kO8KhPyJ1xonByecV2i6py0mranMD8W18AzR_uWI'

export const fetchData = async (query,pagenum)=>{
    if(query.length>0){
        const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${AccessKey}&pre_page=20&page=${pagenum}&&query=${query}`)
        const data = await res.json()
        return data.results
    }
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${AccessKey}&pre_page=20&page=${pagenum}`)
    const data = await res.json()
    return data
}

