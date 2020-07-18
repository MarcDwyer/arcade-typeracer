import React, { useContext, useEffect } from "react";
import { Theme } from "../../themes/theme_colors.";
import { useSpring, animated } from "react-spring";
import { observer } from "mobx-react";

import Store from "../../stores/main";

import "./error_modal.scss";

const ErrorModal = observer(() => {
  const store = useContext(Store);
  const errorDiv = useSpring({
    from: {
      transform: "translateX(+100%)",
    },
    transform: "translateX(0%)",
    reverse: store.error === null,
  });

  useEffect(() => {
    if (store.error) {
      setTimeout(() => store.error = null, 6500);
    }
  }, [store.error]);
  return (
    <animated.div className="error-parent" style={errorDiv}>
      <div
        style={{ backgroundColor: Theme.shadeColor }}
        className="inner-parent"
      >
        {store.error && <span>{store.error}</span>}
      </div>
    </animated.div>
  );
});

export default ErrorModal;
