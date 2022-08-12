import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default props => (
  <ListBox>
    {props.snips[0] === undefined ? (
      <>No Snippets Found</>
    ) : (
      props.snips.map((s, i) => {
        return (
          <Link to={"/" + s.id} key={s.id} style={{ marginTop: 10 }}>
            <ListItem
              selected={i === props.selectedSnip}
              tabIndex={i === props.selectedSnip ? 0 : 1}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  alert("selected" + i);
                }
              }}
              onClick={() => props.onSelect(s.id)}
            >
              <div style={{ padding: ".12em" }}>{s.todo}</div>
              <TagWrapper>
                {s.project !== undefined
                  ? s.project.map((p, it) => <Tag key={it}>Android</Tag>)
                  : null}
              </TagWrapper>
            </ListItem>
          </Link>
        );
      })
    )}
  </ListBox>
);

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  /* width: 300px; */
  flex-direction: column;
`;
const ListItem = styled.li`
  padding: 0.5em;
  max-width: 400px;
  flex: 1;
  background: ${props => (props.selected ? "#0f1113" : "transparent")};
  border-left: ${props =>
    props.selected ? "2px solid #87C895" : "2px solid transparent"};
  outline: none;
  a {
  /* margin: ${props => (props.selected ? "10px" : "0px")}; */
  transiton:all 1s ease;
    color: #fff;
    text-decoration: none;
  }
  &:hover,
  &:focus {
    background: #0f1113;
    border-left: 2px solid #87C895;
    outline: none;
    /* margin:10px; */
    transiton:all 1s ease;
  }
`;

const TagWrapper = styled.div`
  padding: 0.5em;
`;
const Tag = styled.span`
  padding: 0.32em;
  margin-left: 0.5em;
  background: #222b2f;
  color: #fff;
  border-radius: 0.2em;
`;
