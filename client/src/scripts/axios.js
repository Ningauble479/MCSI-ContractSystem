import axios from 'axios'

export default async (type, url, postData,) => {

    if(type == 'get'){
        let {data} = await axios.get(url, {withCredentials: true})
        return data
    }
    else if(type === 'post'){
        let {data} = axios.post(url, postData, {withCredentials: true})
        return data
    }
    else {
        return 'Please specify type'
    }

}