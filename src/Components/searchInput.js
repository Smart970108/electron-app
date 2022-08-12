import React from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { search, command } from "react-icons-kit/feather";
const InputWrapper = styled.div`
  display: flex;
  background: #0f1113;
  margin: 10px;
  border-radius: 5px;
  max-width: 400px;
`;
const IconWrapper = styled.span`
  padding: 10px;
`;
const Input = styled.input`
  border: none;
  padding: 0px 10px;
  outline: none;
  background: transparent;
  color: inherit;
  flex: 1;
`;

export default props =>
  props.icon ? (
    <InputWrapper>
      <IconWrapper>
        <Icon icon={search} />
      </IconWrapper>
      <Input {...props} />
      <IconWrapper>
        <Icon icon={command} />
      </IconWrapper>
    </InputWrapper>
  ) : (
    <Input type="search" {...props} />
  );
