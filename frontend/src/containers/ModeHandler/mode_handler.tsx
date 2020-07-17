import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { isDev } from "../../util";

import SinglePlayer from "../SinglePlayer/single_player";
import MultiPlayer from "../MultiPlayer/multi_player";

import {
  ModeHandlerDiv,
  ModeDisplayDiv,
} from "../../styled-components/mode_handler_styles";

import { RouteModes } from "../../enums";

import "./mode_handler.scss";

function ModeHandler() {
  const { mode } = useParams();

  return (
    <ModeHandlerDiv>
      <ModeDisplayDiv>
        {(() => {
          switch (mode) {
            case RouteModes.single:
              return <SinglePlayer />;
            case RouteModes.multi:
              return <span>gamer</span>;
            default:
              return <span>Path not found</span>;
          }
        })()}
      </ModeDisplayDiv>
    </ModeHandlerDiv>
  );
}

export default ModeHandler;
