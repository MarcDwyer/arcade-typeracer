import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";
import { Theme } from "../../themes/theme_colors.";
import { useSpring, animated } from "react-spring";

import "./error_modal.scss";

function ErrorModal() {
  const error = useSelector((store: ReduxStore.State) => store.error);
  console.log(error);
  const errorDiv = useSpring({
    from: {
      transform: "translateX(+100%)",
    },
    transform: "translateX(0%)",
    reverse: error === null,
  });
  return (
    <animated.div className="error-parent" style={errorDiv}>
      <div
        style={{ backgroundColor: Theme.shadeColor }}
        className="inner-parent"
      >
        {error && <span>{error}</span>}
      </div>
    </animated.div>
  );
}

export default ErrorModal;
