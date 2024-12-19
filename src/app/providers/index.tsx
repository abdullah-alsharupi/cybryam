"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { ScrollProvider } from "../main/book/ScrollProvider";
import ReactQueryProvider from "../react-query-provider/page";

const Proveiders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <ReactQueryProvider>
      <ScrollProvider>
        <SessionProvider>{children}</SessionProvider>
      </ScrollProvider>
      </ReactQueryProvider>
    </>
  );
};

export default Proveiders;
