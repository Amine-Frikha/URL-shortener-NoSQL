import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, {Component} from 'react';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.changelongUrl=this.changelongUrl.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.state={
      longUrl:'',
      shortenedUrl :[],
      urls:[]
    }
  }
  changelongUrl(event){
    this.setState({
      longUrl : event.target.value 
    })
  }
  

  onSubmit = async (event) => {
    event.preventDefault()
    const registered={
      longUrl: this.state.longUrl
    }
    await axios.post('http://localhost:5000/api/url/shorten',registered)
    await axios.get('http://localhost:5000/')
      .then(response => {
          this.setState({ urls: response.data });
          console.log(this.state.urls)
      })
      this.setState({
        shortenedUrl: this.state.urls.filter(url => url.longUrl === this.state.longUrl).map(filteredUrl => (
            filteredUrl.shortUrl 
        ))
      })

    console.log(this.state.shortenedUrl)
    this.setState({
      longUrl:''
    })
  }
  render(){
    return( 
    <div className="App">
    <header className="App-header">
      <form onSubmit={this.onSubmit} style={{
      display: 'flex',
      flexDirection: 'column'}}>
      <TextField value={this.state.longUrl} onChange={this.changelongUrl}
      style={{ marginBottom: 22 }} className="textfield" id="outlined-basic" 
      label="Please Input Your Link" variant="outlined" />
      <Button style={{
      marginBottom: 22,
      backgroundColor: "#47597E",
      padding: "10px 20px",
      fontSize: "18px"}} 
      variant="contained" type= 'Submit'>Shorten</Button>
      </form>
      Your Shortened URL : 
      <Box component="span" sx={{ p: 2, border: '0.5px dashed grey' }}>
      <a href={this.state.shortenedUrl}> {this.state.shortenedUrl} </a>
      </Box>
    </header>
  </div>)
   
  }
}


export default App;
