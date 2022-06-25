import React, {useState} from 'react';
import Main from './Main';
import Amplify, {API} from 'aws-amplify';

const myAPI = 'api9ff8983c'
const path = "/test/"

function App() {
  const [inp, setInp] = useState("")

  API.get(myAPI, path).then(res => {console.log(res); setInp(res);}).catch(e => {console.log(e);})
  return (
    <div style={{display : 'block'}}>
	    {inp}
    </div>
  );
}

export default App;
