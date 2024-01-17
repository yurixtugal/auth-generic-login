"use client"

import { logOutServerAction } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logOutServerAction();
  }

  return (
    <div className="p-10 rounded-xl">
     
        <button type="submit" onClick={onClick}>Logout</button>
      
    </div>
    );
}
 
export default SettingsPage;