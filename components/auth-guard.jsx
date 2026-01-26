"use client";

import { useMe } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export  function ProtectedLayout({ children }) {
  const { data, isLoading, isError } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/login");
    }
  }, [isLoading, isError, router]);

  if (isLoading) return <p>Loading...</p>;

  return children;
}




