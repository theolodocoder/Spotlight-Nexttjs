import { Store } from "@/types";
import Header from "./header";
import Hero from "./hero";

type Props = {
  store: Store;
};

const TopSection = ({ store }: Props) => {
  return (
    <div>
      <Header logoImg={store.logo} name={store.name} />
      <Hero store={store} />
    </div>
  );
};

export default TopSection;
