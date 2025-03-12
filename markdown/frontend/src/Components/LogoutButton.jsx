import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className=" bg-transparent text-white  border-b rounded-none border-slate-300  hover:bg-slate-600 px-2 w-15 mx-5 h-full 
        transition ease-in-out delay-20 hover:scale-110" 
     onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Logout
    </button>
  );
};

export default LogoutButton;