import { RegularList } from "./RegularList";
import { MobileSurferListItem } from "../Surfers/MobileSurferListItem";

const Rankings = ({ items }) => {
  console.log("<Rankings>", "items", items);
  return (
    <RegularList
      items={items}
      resourceName="surfer"
      itemComponent={MobileSurferListItem}
    />
  );
};

export { Rankings };
