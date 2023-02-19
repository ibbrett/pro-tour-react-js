import React from "react";
export const RegularList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}) => {
  console.log("<RegularList>", "items", items);
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [resourceName]: item }} />
      ))}
    </>
  );
};
