import '../App.css';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Table from 'react-bootstrap/Table'
import axios from 'axios';



export default class URLTable extends Component {

  constructor() {
    super();
    this.state = {urls: []};
}

componentDidMount() {
  // get a list of all urls from the database
  axios.get('http://localhost:5000/')
      .then(response => {
          this.setState({ urls: response.data });
          
      })
      .catch(function (error){
          console.log(error);
      })
}


  render(){
    return (
      <div className="App-header">
        <header className="App-header">
          List Of All Shortened URLs : 
          <Table striped bordered hover size="sm">
            <thead style={{ background: '#47597E' }}>
              <tr>
                <th style={{fontWeight: 'normal',color: "#FFFFFF",}}>Long URL</th>
                <th style={{fontWeight: 'normal',color: "#FFFFFF",}}>Shortened URL</th>
                <th style={{fontWeight: 'normal',color: "#FFFFFF",}}>Clicks</th>
              </tr>
            </thead>
            <tbody>
            {this.state.urls.map((url) => (
              <tr key={url._id}>
                <td className="expanded-container" style={{wordBreak: 'break-all' ,width: 500, maxWidth: 500,}}><a href ={url.longUrl}> {url.longUrl}</a></td>
                <td><a href ={url.shortUrl}> {url.shortUrl}</a></td>
                <td>{url.clicks}</td>
              </tr>
            ))}
            </tbody>
          </Table>
      </header>
      </div>
    );
  }
 
}