import { useEffect, useState } from "react";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1650);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <h1 style={{ textAlign: "center" }}>
      {isLoading ? "Loading..." : "Page not found!"}
    </h1>
  );
}
