
import * as React from 'react';
import { Button, Html } from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
  call:string;
  info:string
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  call,
  info
}) => (
  <div>

  <Html>
    <h1>Hii {firstName} </h1>
    <h4> {call} </h4>
    <h5>{info}</h5>
    
      <Button
        href="http://localhost:3000/"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>

  </div>
);
