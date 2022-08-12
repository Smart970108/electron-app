import React from "react";
import styled from "styled-components";

export default ({ activetab, lefttab, righttab }) => (
  <Tabs>
    <Tab onClick={() => lefttab()}>
      <TabTitle selected={activetab === "snippets" ? true : false}>
        Snippets
      </TabTitle>
      <TabIndicator selected={activetab === "snippets" ? true : false} />
    </Tab>
    <Tab onClick={() => righttab()}>
      <TabTitle selected={activetab !== "snippets" ? true : false}>
        Projects
      </TabTitle>
      <TabIndicator selected={activetab !== "snippets" ? true : false} />
    </Tab>
  </Tabs>
);

const Tabs = styled.div`
  list-style: none;
  display: flex;
  margin: 0px;
  padding: 0.2em;
`;
const Tab = styled.span`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => (props.selected ? "#87C895" : "transparent")};
`;
const TabTitle = styled.span`
  color: ${props => (props.selected ? "#87C895" : "#fff")};
`;
const TabIndicator = styled.i`
  display: block;
  height: 0.3em;
  width: 0.3em;
  margin: 0.5em;
  border-radius: 0.3em;
  background: ${props => (props.selected ? "#87C895" : "transparent")};
`;
