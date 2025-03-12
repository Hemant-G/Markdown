import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="text-slate-200 px-6 py-3 border border-violet-300
          rounded-full text-xl transition hover:scale-125"
   onClick={() => loginWithRedirect()}>Start Writing</button>;
};

export default LoginButton;