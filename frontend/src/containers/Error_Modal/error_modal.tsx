import React, { useContext, useEffect } from "react";
import { Theme } from "../../themes/theme_colors.";
import { useSpring, animated } from "react-spring";
import { observer } from "mobx-react";

import ErrorStore from "../../stores/errorStore";

import "./error_modal.scss";

const ErrorModal = observer(() => {
  const errStore = useContext(ErrorStore);
  const errorDiv = useSpring({
    from: {
      transform: "translateX(+100%)",
    },
    transform: "translateX(0%)",
    reverse: errStore.error === null,
  });

  useEffect(() => {
    if (errStore.error) {
      setTimeout(() => errStore.error = null, 6500);
    }
  }, [errStore.error]);
  return (
    <animated.div className="error-parent" style={errorDiv}>
      <div
        style={{ backgroundColor: Theme.shadeColor }}
        className="inner-parent"
      >
        {errStore.error && <span>{errStore.error}</span>}
      </div>
    </animated.div>
  );
});

export default ErrorModal;
