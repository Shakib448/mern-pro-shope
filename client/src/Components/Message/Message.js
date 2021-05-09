import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (!children) {
  //     setVisible(false);
  //     return;
  //   }
  //   setVisible(true);
  //   const timer = setTimeout(() => {
  //     setVisible(false);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [children]);

  // if (!visible) return null;

  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
