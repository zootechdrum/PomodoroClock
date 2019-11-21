function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      timer: false,
      breakStatus: false,
      breakLength: 0,
      time: 1500,
      setTime: 1500 });_defineProperty(this, "pressToStart",



    () => {
      this.setState({ timer: !this.state.timer });
      //This needs to be false because the above code does
      // execute immediatly so this.state.time will still be false in this function
      if (this.state.timer === false) {
        this.runTime = setInterval(this.startCountDown, 1000);
      } else {
        clearInterval(this.runTime);
      }
    });_defineProperty(this, "startCountDown",


    () => {
      //checks if time is 0 and if break is false to change time === to breaklength
      if (this.state.time === 0 && this.state.breakStatus === false) {
        this.setState(prevState => {
          return {
            breakStatus: !this.state.breakStatus,
            //added 1 to show the acutal number held in state
            //if you do not add 1 it will subtract 1 from state to quickly
            time: prevState.breakLength + 1 };

        });
        //Below if statement checks if timer time should be set to time
      } else if (this.state.time === 0 && this.state.breakStatus === true) {
        this.setState({
          breakStatus: !this.state.breakStatus,
          //added 1 to show the acutal number held in state
          //if you do not add 1 it will subtract 1 from state to quickly
          time: this.state.setTime + 1 });

      }

      if (this.state.timer) {
        this.setState(prevState => {
          return { time: prevState.time - 1 };
        });
      }
    });_defineProperty(this, "pressToStop",

    () => {
      this.setState({ timer: false });
      clearInterval(this.runTime);
    });_defineProperty(this, "reset",

    () => {
      this.pressToStop();

      this.setState({
        timer: false,
        time: 1500,
        breakLength: 300 });

    });_defineProperty(this, "addMinute",

    type => {
      if (this.state.time >= 60) {
        this.setState(prevState => {
          return {
            time:
            type == "addMinute" ?
            prevState.setTime + 60 :
            prevState.setTime - 60 };

        });
      }
      if (this.state.time < 60) {
        this.setState(prevState => {
          return {
            time:
            type === "addMinute" ? prevState.setTime + 60 : prevState.setTime };

        });
      }
      this.setState(prevState => {
        return { setTime: prevState.time };
      });
    });_defineProperty(this, "breakMinute",


    type => {
      if (this.state.breakLength <= 60) {
        this.setState(prevState => {
          return {
            breakLength:
            type == "add" ? prevState.breakLength + 60 : prevState.breakLength };

        });
      }
      if (this.state.breakLength > 60) {
        this.setState(prevState => {
          return {
            breakLength:
            type === "add" ?
            prevState.breakLength + 60 :
            prevState.breakLength - 60 };

        });
      }
    });_defineProperty(this, "formatTime",


    time => {
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

      //formats the time to be in 00:00 format
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return minutes + ":" + seconds;
    });}

  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "pomoClock_container" },
      React.createElement("div", { class: "pomo-item" },
      React.createElement(Break, {
        breakMinute: this.breakMinute,
        breakLength: this.formatTime(this.state.breakLength) })),


      React.createElement("div", { class: "pomo-item" },
      React.createElement(StartandStop, {
        pressToStart: this.pressToStart,
        pressToStop: this.pressToStop,
        reset: this.reset })),


      React.createElement("div", { class: "pomo-item" },
      React.createElement(MinuteController, { addMinute: this.addMinute }))),


      React.createElement("div", { class: "display_time" },
      React.createElement(DisplayTime, {
        time: this.state.time,
        showTime: this.formatTime(this.state.time) }))));




  }}

//Component for the break session
class Break extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "text-center breakSession_container" },
      React.createElement("h2", null, "Break Session"),
      React.createElement("div", { className: "breakSession_btns" },
      React.createElement("button", {
        onClick: () => this.props.breakMinute("add"),
        className: "breakSession_btn_add btn btn-info",
        id: "break-increment" }, "+"),



      React.createElement("button", {
        onClick: () => this.props.breakMinute("sub"),
        className: "breakSession_btn_sub btn btn-light",
        id: "break-decrement" }, "-")),




      React.createElement("div", { id: "break-label" }, " Sessions: ", this.props.breakLength.slice(0, 2))));


  }}


class MinuteController extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "add_sub_buttons" },
      React.createElement("button", { class: "btn btn-primary", onClick: () => this.props.addMinute("addMinute") }, "add "),
      React.createElement("button", { class: "btn btn-warning", onClick: () => this.props.addMinute("subtract") },
      " ", "Subtract",
      " ")));



  }}


class StartandStop extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "buttonOptions" },
      React.createElement("button", { class: "btn btn-primary", onClick: this.props.pressToStart }, "Start"),
      React.createElement("button", { class: "btn btn-warning", onClick: this.props.pressToStop }, "Stop"),
      React.createElement("button", { class: "btn btn-secondary", onClick: this.props.reset }, "Reset")));


  }}


//shows the actual time starting at 25:00
class DisplayTime extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("h1", { id: "time" }, this.props.showTime)));


  }}


ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));