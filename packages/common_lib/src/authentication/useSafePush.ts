import { useNavigate } from "react-router";

const useSafePush = () => {
  const nav = useNavigate();
 

  return { safePush:nav };
};

export default useSafePush;
