import React from "react";
import styled from "styled-components";
// Icons
import Icon from "react-icons-kit/";
import { check } from "react-icons-kit/feather";

// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-mono_industrial";

// Compoenents
import Logo from "./../Components/logo";

require("ace-builds/src-noconflict/mode-javascript");
class New extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      snip: {
        title: "untitled",
        tags: [],
        code: "",
        language: "",
        project: "default",
        notes: "",
        starred: false
      },
      activetab: "editor",
      tagvalue: "",
      selectProject: false
    };
    this.onSave = this.onSave.bind(this);
    this.changeTitleProject = this.changeTitleProject.bind(this);
  }
  componentDidMount() {}
  onSave() {
    alert(this.state.snip.title);
  }
  changeTitleProject(title, project) {
    const snip = this.state.snip;
    if (title) {
      snip.title = title;
      this.setState({ snip: snip });
    }
    if (project) {
      snip.project = project;
      this.setState({ snip: snip });
    }
  }
  render() {
    return (
      <Wrapper>
        <Header
          title={this.state.snip.title}
          project={this.state.snip.project}
          selectProject={() => {
            alert("select project here");
            this.setState({ selectProject: !this.state.selectProject });
          }}
          changeTitleProject={this.changeTitleProject}
          onSave={this.onSave}
        />
        <Tags tags={this.state.snip.tags} />
        <Editor
          code={this.state.snip.code}
          language={this.state.snip.language}
          onDataChange={(code, language) => {
            var snip = this.state.snip;
            snip.language = language;
            snip.code = code;
            this.setState({ snip: snip });
          }}
        />
        <Footer />
      </Wrapper>
    );
  }
}

export default New;

const Wrapper = styled.div`
  background: #1b2022;
  height: 100%;
  width: 100%;
  color: #eee;
`;
// Header compoenent
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: true,
      editProject: false,
      snipTitle: "",
      project: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {}
  onChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.setState({ [name]: value });
  }
  onKeyDown(e) {
    if (e.key === "Enter") {
      this.props.changeTitleProject(this.state.snipTitle, this.state.project);
      this.setState({ editTitle: false });
    }
  }
  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Button onClick={this.props.selectProject} style={{ color: "#aaa" }}>
            {this.props.project}
          </Button>
          /
          {this.state.editTitle ? (
            <Input
              name="snipTitle"
              placeholder="Enter Snippet Title"
              onChange={this.onChange}
              value={this.state.snipTitle}
              onKeyDown={this.onKeyDown}
              onBlur={() => {
                this.setState({ editTitle: false });
                this.props.changeTitleProject(
                  this.state.snipTitle,
                  this.state.project
                );
              }}
            />
          ) : (
            <Button
              onClick={() => {
                this.setState({ editTitle: !this.state.editTitle });
              }}
            >
              {this.props.title}
            </Button>
          )}
        </div>
        <Button onClick={() => this.props.onSave()}>
          <Icon icon={check} />
        </Button>
      </HeaderWrapper>
    );
  }
}
const HeaderWrapper = styled.header`
  padding: 10px;
  display: flex;
  text-align: center;
  flex: 1;
`;
const Button = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
`;
const Input = styled.input`
  background: inherit;
  color: inherit;
  border: none;
  outline: none;
  margin-left: 10px;
`;

const TagsUL = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 2px;
`;
const Tag = styled.li`
  display: flex;
  flex-direction: row;
  background: #080a0b;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 0.3em;
`;
const TabIndicator = styled.i`
  display: block;
  height: 0.5em;
  width: 0.5em;
  margin: 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
  background: ${props => (props.selected ? "#87C895" : "transparent")};
`;

// Tags Compoenent
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagValue: "",
      tags: this.props.tags
    };
    this.onEnter = this.onEnter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  onEnter(e) {
    var tags = this.state.tags;
    if (e.key === "Enter" && this.state.tagValue !== " ") {
      var id = this.state.tagValue
        .split(/[ ,]+/)
        .join("_")
        .toUpperCase();
      var tag = { name: this.state.tagValue.toUpperCase(), id: id };
      var x =
        tags.length === 0
          ? tags.push(tag)
          : tags.find(t => {
              return tag.id === t.id;
            })
          ? null
          : tags.push(tag);
      this.setState({ tags: tags, tagValue: "" });
      return x;
    }
    if (e.key === "Backspace" && this.state.tagValue === "") {
      tags.pop();
      this.setState({ tags: tags });
    }
  }
  onChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.setState({ [name]: value });
  }
  removeTag(i) {
    const tags = this.state.tags.filter(t => {
      return t.id !== i ? t : null;
    });
    this.setState({ tags: tags });
  }
  componentDidMount() {
    // this.setState({ tags: this.props.tags });
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.state.tags.length === 0 ||
        this.state.tags === undefined ? null : (
          <TagsUL>
            {this.state.tags.map((t, i) => (
              <Tag key={i}>
                {t.name}
                <TabIndicator
                  selected={true}
                  onClick={() => {
                    this.removeTag(t.id);
                  }}
                />
              </Tag>
            ))}
          </TagsUL>
        )}
        <Input
          name="tagValue"
          placeholder="Add new Tag"
          type="text"
          style={{ flex: 1, padding: "5px" }}
          onKeyDown={this.onEnter}
          onChange={this.onChange}
          value={this.state.tagValue}
        />
      </div>
    );
  }
}

// Editor Component

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      theme: "mono_industrial",
      languages: ["abap", "javascript", "java"],
      language: "javascript"
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(newValue) {
    // console.log("change", newValue);
  }
  handleChange(e) {
    const lang = e.target.value;
    e.persist();
    import(`ace-builds/src-noconflict/mode-` + lang).then(module => {
      this.setState({
        language: lang
      });
    });
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      wordWrap: true,
      renderLineHighlight: "gutter",
      maxLines: Infinity,
      showInvisibles: true
      // maxLines: 15
    };

    return (
      <>
        <AceEditor
          mode={this.state.language}
          theme="mono_industrial"
          width="100%"
          options={options}
          // height="500px"
          value={this.state.code}
          onChange={this.onChange}
          name="editor"
          wrapEnabled={true}
          // enableBasicAutocompletion={true}
          // enableLiveAutocompletion={true}
          enableSnippets={true}
          editorProps={{
            $blockScrolling: true
          }}
          ref={instance => {
            this.ace = instance;
          }}
        />
        <select
          id="lang"
          onChange={this.handleChange}
          value={this.state.language}
        >
          {this.state.languages.map((lan, i) => {
            return (
              <option value={lan} key={lan}>
                {lan}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{ position: "fixed", bottom: 0, padding: 10, zIndex: 999 }}>
        Footer
      </div>
    );
  }
}
