import React from "react";

import "./Content.scss";

interface Props {
  children: any;
}

function Content({ children }: Props) {
  return <div className="Content">{children}</div>;
}

export default Content;
