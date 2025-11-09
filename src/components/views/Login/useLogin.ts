import { useState } from "react";

const useLogin = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisible = () => setIsVisible(!isVisible);

  return {
    isVisible,
    toggleVisible,
  };
};

export default useLogin;
