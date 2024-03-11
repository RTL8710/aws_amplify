/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { User } from "../models";
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
export declare type DeviceCreateFormInputValues = {
    deviceID?: string;
    devicetype?: string;
    Users?: User[];
};
export declare type DeviceCreateFormValidationValues = {
    deviceID?: ValidationFunction<string>;
    devicetype?: ValidationFunction<string>;
    Users?: ValidationFunction<User>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DeviceCreateFormOverridesProps = {
    DeviceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    deviceID?: PrimitiveOverrideProps<TextFieldProps>;
    devicetype?: PrimitiveOverrideProps<TextFieldProps>;
    Users?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type DeviceCreateFormProps = React.PropsWithChildren<{
    overrides?: DeviceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DeviceCreateFormInputValues) => DeviceCreateFormInputValues;
    onSuccess?: (fields: DeviceCreateFormInputValues) => void;
    onError?: (fields: DeviceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DeviceCreateFormInputValues) => DeviceCreateFormInputValues;
    onValidate?: DeviceCreateFormValidationValues;
} & React.CSSProperties>;
export default function DeviceCreateForm(props: DeviceCreateFormProps): React.ReactElement;
