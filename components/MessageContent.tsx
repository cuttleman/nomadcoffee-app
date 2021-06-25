import React from "react";
import styled from "styled-components/native";
import { Cpts } from "types";

const Message = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MessageTxt = styled.Text<{ hasChildren: boolean }>`
  font-size: 16px;
  margin-top: ${(props) => (props.hasChildren ? 10 : 0)}px;
`;

const MessageContent: React.FC<Cpts.MessageContetProps> = ({
  text,
  children,
}) => {
  const hasChildren = Boolean(children);
  return (
    <Message>
      {children}
      <MessageTxt hasChildren={hasChildren}>{text}</MessageTxt>
    </Message>
  );
};

export default MessageContent;
