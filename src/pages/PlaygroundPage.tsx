import { Toaster } from "react-hot-toast";
import Onboarding from "../components/Onboarding";
import SearchBox from "../components/SearchBox";
import TagList from "../components/TagList";
import ToastDemo from "../components/ToastDemo";
import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  return <OrderStatusSelector onChange={value => console.log(value)}/>;
};

export default PlaygroundPage;
