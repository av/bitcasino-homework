import Screens, { useScreens } from "./Screens";
import { useEffect } from "react";

export default function LoadingContent({ isLoading, loading, content }) {
  const screens = useScreens();

  useEffect(() => {
    screens.current.setScreen(isLoading ? "loading" : "content");
  });

  return (
    <Screens
      ref={screens}
      defaultScreen="loading"
      screens={{
        loading,
        content,
      }}
    />
  );
}
