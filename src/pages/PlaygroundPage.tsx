import Onboarding from "../components/Onboarding";
import SearchBox from "../components/SearchBox";

const PlaygroundPage = () => {
  return <SearchBox onChange={function (text: string): void {
   console.log(text)
  } } />;
};

export default PlaygroundPage;
