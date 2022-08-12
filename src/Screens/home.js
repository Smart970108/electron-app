import React from "react";
import styled from "styled-components";
import mouseTrap from "mousetrap";
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";
import { logOut, settings, plus } from "react-icons-kit/feather";
import firebase from "./../config/firebase";

import Logo from "./../Components/logo";
import Tabs from "./../Components/tabs";
import Snippets from "./../Components/snippets";
import Input from "./../Components/searchInput";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      dialog: false,
      activetab: "snippets", 
      selectedSnipID: -1,
      searchTerm: ""
    };
    this._righttab = this._righttab.bind(this);
    this._lefttab = this._lefttab.bind(this);
    this._nextSnip = this._nextSnip.bind(this);
    this._prvSnip = this._prvSnip.bind(this);
  }

  componentDidMount() {
    // Check if user exists
    const UID = localStorage["uid"];
    if (!UID) {
      this.props.history.push("/login");
    }

    // Onboard user for the first time
    const onboard = localStorage["onboard"];
    if (onboard === "false") {
      localStorage.setItem("onboard", true);
      this.props.history.push("/onboard");
    }

    // get userdata from firestore to display the list

    firebase.getUser(UID).then(user => {
      this.setState({ user: firebase.user });
    }); 
    

    // initialize the keyboard shortcuts
    mouseTrap.bind(["left", "alt+l"], this._lefttab);
    mouseTrap.bind(["right", "alt+r"], this._righttab);
    mouseTrap.bind(["down", "alt+r"], this._nextSnip);
    mouseTrap.bind(["up", "alt+r"], this._prvSnip);
    mouseTrap.bind(["enter", "alt+l"], () => {
      this.props.history.push("/" + this.state.selectedSnipID);
    });
  }
  componentWillUnmount() {
    mouseTrap.unbind(["left", "alt+l"], this.lefttab);
    mouseTrap.unbind(["down", "alt+r"], this._nextSnip);
    mouseTrap.unbind(["up", "alt+r"], this._prvSnip);
    mouseTrap.unbind(["enter", "alt+l"], this._gotoSnip);
  }
  _lefttab() {
    this.setState({ activetab: "snippets" });
  }
  _righttab() {
    this.setState({ activetab: "projects" });
  }
  _nextSnip() {
    this.setState({
      selectedSnipID:
        this.state.selectedSnipID === this.state.user.snips.length - 1
          ? this.state.user.snips.length - 1
          : this.state.selectedSnipID + 1
    });
  }
  _prvSnip() {
    this.setState({
      selectedSnipID:
        this.state.selectedSnipID !== 0 ? this.state.selectedSnipID - 1 : 0
    });
  }
  // Key bindings
  onChange = e => {
    const { target } = e;
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Wrapper>
        <Header />
        <section style={{ flex: 1 }}>
          <Input
            type="search"
            placeholder="Search for projects,tags or snippets"
            icon="search"
            name="searchTerm"
            onChange={this.onChange}
            value={this.state.searchterm}
          />
          {this.state.searchTerm === "" ? (
            <>
              <Tabs
                activetab={this.state.activetab}
                lefttab={this._lefttab}
                righttab={this._righttab}
              />
              {this.state.activetab === "snippets"  ? (
                // <Snippets
                //   snips={this.state.user.snips}
                //   selectedSnip={this.state.selectedSnipID}
                //   onSelect={id => this.setState({ selectedSnip: id })}
                // />
                <div>asdasd</div>
              ) : (
                <div />
              )}
            </>
          ) : (
            <div>sample Search</div>
          )}
        </section>
        <Footer />
      </Wrapper>
    );
  }
}

// Components
const Header = () => (
  <header style={{ display: "flex" }}>
    <Logo />
    <h2 style={{ margin: 0, padding: ".5em", flex: 1, textAlign: "center" }}>
      Snipcode
    </h2>
    <Link to="/settings">
      <Icon icon={settings} style={{ padding: "1em" }} />
    </Link>
    <Icon
      icon={logOut}
      style={{ padding: "1em", cursor: "pointer" }}
      tooltip="Sign Out "
      onClick={() => {
        firebase.signOut();
        localStorage.clear();
        this.props.history.push("/login");
      }}
    />
  </header>
);

const Footer = () => (
  <Link
    to="/new"
    style={{
      position: "fixed",
      zIndex: 999,
      padding: 15,
      background: "#87C895",
      borderRadius: "5em",
      bottom: 5,
      right: 10,
      color: "#222"
    }}
  >
    <Icon icon={plus} />
  </Link>
);

// styles
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: fixed;
  background: #1b2022;
  color: #fff;
`;
export default Home;

// background: ${props => console.log(props.theme)};
