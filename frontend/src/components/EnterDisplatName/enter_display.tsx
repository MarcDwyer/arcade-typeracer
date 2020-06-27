import React, { useState } from "react";
import { UserNameInput } from "../../styled-components/inputs";
import { PayloadTypes } from "../../enums";

type Props = {
  ws: WebSocket;
};

export default function EnterDisplay({ ws }: Props) {
  const [username, setUsername] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (username.length) {
          const data = {
            type: PayloadTypes.joinRoom,
            payload: {
              username,
            },
          };
          ws.send(JSON.stringify(data));
        }
      }}
    >
      <UserNameInput
        value={username}
        color="white"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a display name"
      />
    </form>
  );
}
