/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Device, User } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DeviceUpdateFormInputValues = {
    deviceID?: string;
    devicetype?: string;
    Users?: User[];
};
export declare type DeviceUpdateFormValidationValues = {
    deviceID?: ValidationFunction<string>;
    devicetype?: ValidationFunction<string>;
    Users?: ValidationFunction<User>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DeviceUpdateFormOverridesProps = {
    DeviceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    deviceID?: PrimitiveOverrideProps<TextFieldProps>;
    devicetype?: PrimitiveOverrideProps<TextFieldProps>;
    Users?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type DeviceUpdateFormProps = React.PropsWithChildren<{
    overrides?: DeviceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    device?: Device;
    onSubmit?: (fields: DeviceUpdateFormInputValues) => DeviceUpdateFormInputValues;
    onSuccess?: (fields: DeviceUpdateFormInputValues) => void;
    onError?: (fields: DeviceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DeviceUpdateFormInputValues) => DeviceUpdateFormInputValues;
    onValidate?: DeviceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DeviceUpdateForm(props: DeviceUpdateFormProps): React.ReactElement;
