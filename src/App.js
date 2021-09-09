import {React,useEffect,useState} from "react";
import './App.css';
import Pagination from "./Pagination";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const[data,setdata]=useState([]);
  const[currentpage,setcurrentpage]=useState(1);
  const[postsPerPage,setpostsperpage]=useState(5);
const  k=async ()=>{
  const response= await fetch("http://www.mocky.io/v2/59b3f0b0100000e30b236b7e");
  const response2=await fetch("http://www.mocky.io/v2/59ac28a9100000ce0bf9c236");
  const i=await response2.json();
  const y=await response.json();
  setdata([...i.posts,...y.posts]);

}
useEffect(() => {
  k();
},[]);
const indexoflastpost=currentpage*postsPerPage;
const indexoffirstpost=indexoflastpost-postsPerPage;
const currentposts=data.slice(indexoffirstpost,indexoflastpost);
console.log(currentposts);

function dynamicsort(property,order) {
  var sort_order = 1;
  if(order === "desc"){
      sort_order = -1;
  }
  return function (a, b){
      // a should come before b in the sorted order
      if(a[property] < b[property]){
              return -1 * sort_order;
      // a should come after b in the sorted order
      }else if(a[property] > b[property]){
              return 1 * sort_order;
      // a and b are the same
      }else{
              return 0 * sort_order;
      }
  }
}

const paginate = pageNumber => setcurrentpage(pageNumber);
 return (  <Router>
    <div className="App">
      <Switch>
      <Route exact path="/">
            
              {currentposts.map((curr)=>{
                   return <div className="box"><h3>event date:{curr.event_date}<br/>
                   <img src={curr.thumbnail_image} width="300px" height="300px"alt="rose"/><br/>
                   event name:{curr.event_name}<br/>
                   likes:{curr.likes}<br/>
                   shares:{curr.shares}
                   views:{curr.views}</h3></div>
              }
              )
            }
        </Route>
        <Route path="/likes">
            {currentposts.sort(dynamicsort("likes","asc"))}
              {currentposts.map((curr)=>{
                   return <div className="box"><h3>event date:{curr.event_date}<br/>
                   <img src={curr.thumbnail_image} width="300px" height="300px"alt="rose"/><br/>
                   event name:{curr.event_name}<br/>
                   likes:{curr.likes}<br/>
                   shares:{curr.shares}
                   views:{curr.views}</h3></div>
              }
              )
            }
            </Route>
            <Route path="/shares">
            {currentposts.sort(dynamicsort("shares","asc"))}
              {currentposts.map((curr)=>{
                   return <div className="box"><h3>event date:{curr.event_date}<br/>
                   <img src={curr.thumbnail_image} width="300px" height="300px"alt="rose"/><br/>
                   event name:{curr.event_name}<br/>
                   likes:{curr.likes}<br/>
                   shares:{curr.shares}
                   views:{curr.views}</h3></div>
              }
              )
            }
            </Route>
            <Route path="/views">
            {currentposts.sort(dynamicsort("views","asc"))}
              {currentposts.map((curr)=>{
                   return <div className="box"><h3>event date:{curr.event_date}<br/>
                   <img src={curr.thumbnail_image} width="300px" height="300px"alt="rose"/><br/>
                   event name:{curr.event_name}<br/>
                   likes:{curr.likes}<br/>
                   shares:{curr.shares}
                   views:{curr.views}</h3></div>
              }
              )
            }
            </Route>
        </Switch>
      {
        currentposts.map((curr)=>{
             return <div className="box"><h3>event date:{curr.event_date}<br/>
             <img src={curr.thumbnail_image} width="300px" height="300px"alt="rose"/><br/>
             event name:{curr.event_name}<br/>
             likes:{curr.likes}<br/>
             shares:{curr.shares}
             views:{curr.views}</h3></div>
        }
        )
   
      }
     <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      
    </div>

    </Router>
  );
}

export default App;

