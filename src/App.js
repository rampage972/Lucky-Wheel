import LuckyDraw from './LuckyDraw/LuckyDraw';

import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      listUser: ['Bùi Trung Dũng', 'Dũng Trung Bùi', 'Trung Dũng Bùi', 'Bùi Dũng Trung'],

    }
    this.listNameFileUpload = React.createRef()
  }
  componentDidMount = () => {
    document.addEventListener("keydown", this.my_onkeydown_handler)
  }
  my_onkeydown_handler = (event) => {
    console.log(event.keyCode)
    switch (event.keyCode) {
      case 73: // 'I'
        this.handleClickInputFile()
        break;
    }
  }

  handleInputListName = (e) => {
    const reader = new FileReader()
    reader.onload = event => {
      let listUser = event.target.result.split("\n")
      this.setState({ listUser })
    } // desired file content
    reader.onerror = error => console.log(error)
    reader.readAsText(e.target.files[0])
  }
  handleClickInputFile = () => {
    this.listNameFileUpload.current.click()
  }


  removeItem = (value) => {
    let { listUser } = this.state
    listUser.splice(listUser.indexOf(value), 1)
    this.setState({ listUser })
  }
  render() {
    return (
      <div className="App">
        <audio controls autoPlay={true} style={{ display: "none" }}>
          <source src="/background.mp3" type="audio/mpeg" />
        </audio>

        <input type="file" onInput={this.handleInputListName} ref={this.listNameFileUpload} style={{ display: "none" }} />
        <div className="container-fluid" style={{ height: "100vh" }}>
          <div className="row" style={{ background: "#faddcd" }}>
            <div className="col-md-5" style={{ paddingLeft: "0" }}>
              <img src="/leftbgc.jpg" alt="" style={{ width: "100%", height: "100vh", }} />

            </div>
            <div className="col-md-6">
              <div className="lucky-container content-middle">
                <img src="/frameWheel.png" alt="" style={{ width: "100%", height: "100vh", position: "absolute", left: 0 }} />
                <LuckyDraw listUser={this.state.listUser} removeItem={(e) => this.removeItem(e)} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
