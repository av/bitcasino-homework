import Screens, { useScreens } from "./Screens";
import { useEffect } from "react";

export default function LoadingContent({ isLoading, loading, content }) {
  const screens = useScreens();

  console.log("LOADING RENDER", isLoading);
  
  useEffect(() => {
    console.log("LOADING EFFECT", isLoading);
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
