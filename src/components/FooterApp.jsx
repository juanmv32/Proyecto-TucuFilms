import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexto/ContextoBD";

const FooterApp = () => {
  const contexto = useContext(UserContext)
  return <div>{contexto}</div>;
};

export default FooterApp;