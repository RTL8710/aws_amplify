/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Device } from "../models";
import {
  createDataStorePredicate,
  getOverrideProps,
  useDataStoreBinding,
} from "./utils";
import { SortDirection } from "@aws-amplify/datastore";
import HeroLayout1 from "./HeroLayout1";
import { Collection } from "@aws-amplify/ui-react";
export default function DeviceList(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsFilterObj = {
    and: [
      { field: "id", operand: 123, operator: "eq" },
      { field: "devicetype", operand: 12345678, operator: "eq" },
    ],
  };
  const itemsFilter = createDataStorePredicate(itemsFilterObj);
  const itemsPagination = { sort: (s) => s.id(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Device,
    criteria: itemsFilter,
    pagination: itemsPagination,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    setItems(itemsDataStore);
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="list"
      isSearchable={true}
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={20}
      direction="column"
      alignItems="stretch"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "DeviceList")}
      {...rest}
    >
      {(item, index) => (
        <HeroLayout1
          device={item}
          height="auto"
          width="auto"
          margin="0 0 10px 0"
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></HeroLayout1>
      )}
    </Collection>
  );
}
