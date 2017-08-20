import React, { Component } from "react";
var firebase = require('firebase');
var uuid = require('uuid');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCfpiNcnAtbPxo9nFnBmPpkNgZUdZZEexc",
  authDomain: "react-survey-firebase.firebaseapp.com",
  databaseURL: "https://react-survey-firebase.firebaseio.com",
  projectId: "react-survey-firebase",
  storageBucket: "react-survey-firebase.appspot.com",
  messagingSenderId: "559803444513"
};
firebase.initializeApp(config);

class Survey extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    }

    this.submitName = this.submitName.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.submitQuestions = this.submitQuestions.bind(this);
  }

  submitName(e) {
    e.preventDefault();
    var studentName = this.refs.name.value;
    this.setState({
      studentName: studentName
    }, function() {
      console.log(this.state);
    });
  }

  answerSelected(e) {
    var answers = this.state.answers
    if(e.target.name === 'answer1'){
      answers.answer1 = e.target.value
    }else if(e.target.name === 'answer2'){
      answers.answer2 = e.target.value
    }else {
      answers.answer3 = e.target.value
    }

    this.setState({
      answers: answers
    }, function() {
      console.log(this.state);
    });
  }

  submitQuestions() {
    firebase.database().ref('Survey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({
      isSubmitted: true
    })
  }

  render() {
    var studentName, questions;

    if(!this.state.studentName && !this.state.isSubmitted){
      studentName = <div>
          <h1>Please enter your name</h1>
          <form onSubmit={this.submitName}>
            <input type="text" placeholder="Enter your name" ref="name" />
          </form>
        </div>;
      questions='';  
    }else if(this.state.studentName && !this.state.isSubmitted){
      studentName = <h1>Hey {studentName}, welcome to Survey</h1>;

      questions = <div>
        <h2>Here are some questions.</h2>
        <form onSubmit={this.submitQuestions}>
          <div className="card">
            <label>What kind of courses you like most?</label><br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> Technology<br />
            <input type="radio" name="answer2" value="Design" onChange={this.answerSelected} /> Design<br />
            <input type="radio" name="answer3" value="Marketing" onChange={this.answerSelected} /> Marketing
          </div>
          <div className="card">
            <label>Yor are?</label><br />
            <input type="radio" name="answer1" value="A Student" onChange={this.answerSelected} /> A Student<br />
            <input type="radio" name="answer2" value="Searching for a job" onChange={this.answerSelected} /> Searching for a job<br />
            <input type="radio" name="answer3" value="Already working" onChange={this.answerSelected} /> Already working
          </div>
          <div className="card">
            <label>Is online learning useful?</label><br />
            <input type="radio" name="answer1" value="Yes" onChange={this.answerSelected} /> Yes<br />
            <input type="radio" name="answer2" value="No" onChange={this.answerSelected} /> No<br />
            <input type="radio" name="answer3" value="May be" onChange={this.answerSelected} /> May be
          </div>
          <input type="submit" className="feedback-button" value="Submit" />
        </form>
      </div>;
    }else if(this.state.isSubmitted){
      studentName = <h1>Thanks, {this.state.studentName}</h1>;
    }

    return (
      <div>
        {studentName}
        -----------------------------------
        {questions}
      </div>
    );
  }
}

export default Survey;