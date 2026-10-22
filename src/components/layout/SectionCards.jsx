import { Children } from "react";

export default function SectionCards({ children }) {
  return Children.map(children, (child) =>
    child ? <div className="section-frame">{child}</div> : null,
  );
}
