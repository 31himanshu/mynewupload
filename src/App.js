import React from "react";
import axios from "axios";
import "./styles.css"
import Swal from "sweetalert2";
class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      selectedFile:[]
    }
  }
   onChangeHandler=event=>{

  this.setState({
    selectedFile:event.target.files[0],
    loaded:0,
  })

}
confirm=()=>{
Swal.fire({
title:"Upload Picture?",
showCancelButton:true,
confirmButtonColor:"#3085d6",
cancelButtonColor:"red",
confirmButtonText:"Yes",
}).then((result)=>{
 if(result.value){

this.onClickHandler();

 }

})
}
onClickHandler=()=>{
  const data= new FormData();
  data.append('file',this.state.selectedFile);
  axios.post("http://localhost:8000/upload",data)
    .then((res) => {
      this.setState({ selectedFile: [res.data, ...this.state.selectedFile] });
  })
.then(res=>{
  console.log(res.statusText);
})
}
render(){
  return (
    
<div className="container">
	<div className="row">
	  <div className="col-md-6">
	      <form method="post" action="#" id="#">
            <div className="form-group files"><br/><br/>
              <div className="card">
                <label className="head" ><b> Profile Card :</b> </label>
                <input type="file" className="form-control"  multiple="" onChange={this.onChangeHandler}/>
                <br/>
               
             <button type="button" className="btn btn-success btn-block" onClick={this.confirm}>Upload</button>
              </div>
              <div>
            
              {this.state.selectedFile.map(photo => (
          <img src={`http://localhost:3000/${photo.filename}`} alt="" />
        ))}
  
              </div>
            </div>
          </form>
	      </div>
	      </div>
	  </div>
  );
}
}
export default App;
