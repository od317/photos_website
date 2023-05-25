import {saveAs} from 'file-saver'

const save = (url,name)=>{
    console.log(url)
    saveAs(url, name+`.jpg`)
}

export default save