import data from "./data"

const refreshGraphData = (id, key, url, f) => {
    fetch(url).then(
        (res) => res.json()).then(
            (json) => {(key[0]==='temp' ? data['Area6'].data[id][key[0]].data[key[1]] = json.data : data['Area6'].data[id][key].data = json.data); f();}
    ).catch(e => console.log(e))
}

export default refreshGraphData;