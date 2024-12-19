import { isAuthenticated } from "@/app/util/isAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
      const auth = isAuthenticated;
  
  
      useEffect(() => {
        if (!auth) {
          return redirect("/login");
        }
      }, []);
  
      if (!auth) {
        return null;
      }
  
      return <Component {...props} />;
    };
  }
  