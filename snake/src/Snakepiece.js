import React from "react";

export default props => {
  return (
    <div>
      {props.snakepieces.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className="snake-piece" key={i} style={style} />;
      })}
    </div>
  );
};
