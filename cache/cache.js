let cache;

const storage = (data)=>{
    cache = data;
}

const getCache = () =>{
    return cache;
}

module.exports = {storage, getCache};