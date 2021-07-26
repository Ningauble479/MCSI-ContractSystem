import axios from 'axios'

export default async (type, url, postData,) => {

    if(type == 'get'){
        let {data} = await axios.get(url, {withCredentials: true})
        return await data
    }
    else if(type === 'post'){
        let {data} = await axios.post(url, postData, {withCredentials: true})
        console.log(data)
        return await data
    }
    else {
        return 'Please specify type'
    }

}