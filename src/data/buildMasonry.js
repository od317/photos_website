export const calculateHeight = (data)=>{
       let res = 0
       const w  = window.innerWidth
       let arr = []

       //vals is colmnus heights
       
       let [vals,per] = getVals(w)

       
       data.forEach((v,i)=>{
        let dec = ((((w*96/100)*per/100)/v.width)*100)
        // console.log((v.height*dec)/100,v.urls.small)
        let x = getMin(vals)
        arr.push([x,vals[x]])
        vals[x] += (v.height*dec)/100
        res=Math.max(res,vals[x])
       })
       return [res,arr]
}

const getMin = (vals)=>{
      let ans=0
      let min = vals[0]
      vals.forEach((v,i)=>{
        if(v<min){
            min = v
            ans = i
        }
      })
      return ans
} 


export function getVals(w){
          if(w>=1024)
           return [[0,0,0,0,0],20]
         
           else if(w>=768)
           return [[0,0,0,0],25]
         
           else if(w>=640)
           return [[0,0,0],33]      
         
           return [[0,0],50]
}

// (96% screen ) -> (24% card)
// 
// 