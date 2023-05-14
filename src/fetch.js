

  async function  fetchapi(){
      let resp = await fetch('https://api.unsplash.com/photos/?client_id=HTL9MKeQo9sIg9IWnvw5xitzO3g6DiOpojpIo1E4oDs')
      let data = await resp.json()
      console.log(data)
      return data   
  }

export default fetchapi