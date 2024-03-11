/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { User, Device, DeviceUser } from "../models";
import {
  fetchByPath,
  getOverrideProps,
  useDataStoreBinding,
  validateField,
} from "./utils";
import { DataStore } from "aws-amplify/datastore";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userID: "",
    devices: [],
  };
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [devices, setDevices] = React.useState(initialValues.devices);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord, devices: linkedDevices }
      : initialValues;
    setUserID(cleanValues.userID);
    setDevices(cleanValues.devices ?? []);
    setCurrentDevicesValue(undefined);
    setCurrentDevicesDisplayValue("");
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  const [linkedDevices, setLinkedDevices] = React.useState([]);
  const canUnlinkDevices = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(User, idProp)
        : userModelProp;
      setUserRecord(record);
      const linkedDevices = record
        ? await Promise.all(
            (
              await record.devices.toArray()
            ).map((r) => {
              return r.device;
            })
          )
        : [];
      setLinkedDevices(linkedDevices);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord, linkedDevices]);
  const [currentDevicesDisplayValue, setCurrentDevicesDisplayValue] =
    React.useState("");
  const [currentDevicesValue, setCurrentDevicesValue] =
    React.useState(undefined);
  const devicesRef = React.createRef();
  const getIDValue = {
    devices: (r) => JSON.stringify({ id: r?.id }),
  };
  const devicesIdSet = new Set(
    Array.isArray(devices)
      ? devices.map((r) => getIDValue.devices?.(r))
      : getIDValue.devices?.(devices)
  );
  const deviceRecords = useDataStoreBinding({
    type: "collection",
    model: Device,
  }).items;
  const getDisplayValue = {
    devices: (r) => `${r?.deviceID ? r?.deviceID + " - " : ""}${r?.id}`,
  };
  const validations = {
    userID: [],
    devices: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userID,
          devices,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const devicesToLinkMap = new Map();
          const devicesToUnLinkMap = new Map();
          const devicesMap = new Map();
          const linkedDevicesMap = new Map();
          devices.forEach((r) => {
            const count = devicesMap.get(getIDValue.devices?.(r));
            const newCount = count ? count + 1 : 1;
            devicesMap.set(getIDValue.devices?.(r), newCount);
          });
          linkedDevices.forEach((r) => {
            const count = linkedDevicesMap.get(getIDValue.devices?.(r));
            const newCount = count ? count + 1 : 1;
            linkedDevicesMap.set(getIDValue.devices?.(r), newCount);
          });
          linkedDevicesMap.forEach((count, id) => {
            const newCount = devicesMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                devicesToUnLinkMap.set(id, diffCount);
              }
            } else {
              devicesToUnLinkMap.set(id, count);
            }
          });
          devicesMap.forEach((count, id) => {
            const originalCount = linkedDevicesMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                devicesToLinkMap.set(id, diffCount);
              }
            } else {
              devicesToLinkMap.set(id, count);
            }
          });
          devicesToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const deviceUserRecords = await DataStore.query(DeviceUser, (r) =>
              r.and((r) => {
                return [
                  r.deviceId.eq(recordKeys.id),
                  r.userId.eq(userRecord.id),
                ];
              })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(deviceUserRecords[i]));
            }
          });
          devicesToLinkMap.forEach((count, id) => {
            const deviceToLink = deviceRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new DeviceUser({
                    user: userRecord,
                    device: deviceToLink,
                  })
                )
              );
            }
          });
          const modelFieldsToSave = {
            userID: modelFields.userID,
          };
          promises.push(
            DataStore.save(
              User.copyOf(userRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userID: value,
              devices,
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          if (errors.userID?.hasError) {
            runValidationTasks("userID", value);
          }
          setUserID(value);
        }}
        onBlur={() => runValidationTasks("userID", userID)}
        errorMessage={errors.userID?.errorMessage}
        hasError={errors.userID?.hasError}
        {...getOverrideProps(overrides, "userID")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userID,
              devices: values,
            };
            const result = onChange(modelFields);
            values = result?.devices ?? values;
          }
          setDevices(values);
          setCurrentDevicesValue(undefined);
          setCurrentDevicesDisplayValue("");
        }}
        currentFieldValue={currentDevicesValue}
        label={"Devices"}
        items={devices}
        hasError={errors?.devices?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("devices", currentDevicesValue)
        }
        errorMessage={errors?.devices?.errorMessage}
        getBadgeText={getDisplayValue.devices}
        setFieldValue={(model) => {
          setCurrentDevicesDisplayValue(
            model ? getDisplayValue.devices(model) : ""
          );
          setCurrentDevicesValue(model);
        }}
        inputFieldRef={devicesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Devices"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Device"
          value={currentDevicesDisplayValue}
          options={deviceRecords
            .filter((r) => !devicesIdSet.has(getIDValue.devices?.(r)))
            .map((r) => ({
              id: getIDValue.devices?.(r),
              label: getDisplayValue.devices?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentDevicesValue(
              deviceRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentDevicesDisplayValue(label);
            runValidationTasks("devices", label);
          }}
          onClear={() => {
            setCurrentDevicesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.devices?.hasError) {
              runValidationTasks("devices", value);
            }
            setCurrentDevicesDisplayValue(value);
            setCurrentDevicesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("devices", currentDevicesDisplayValue)
          }
          errorMessage={errors.devices?.errorMessage}
          hasError={errors.devices?.hasError}
          ref={devicesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "devices")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
