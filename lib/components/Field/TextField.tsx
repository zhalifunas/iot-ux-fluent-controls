import * as React from 'react';
import {MethodNode} from '../../Common';
import {TextInput, TextInputAttributes} from '../Input/TextInput';
import {FormField, FormFieldAttributes} from './FormField';

let instanceCount = 0; // maintain count to ensure unique IDs (ARIA)

export interface TextFieldType {}

export interface TextFieldProps extends React.Props<TextFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string;
    /** HTML input element placeholder */
    placeholder?: string;
    /**
     * HTML input element type
     *
     * Default: text
     */
    type?: string;

    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Set error field to display: none */
    hideError?: boolean;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Class to append to prefix container */
    prefixClassName?: string;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    /** Class to append to postfix container */
    postfixClassName?: string;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Read only HTML input element */
    readOnly?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;
    
    /** Callback for the blur event */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;
    /** Extra action to render at the far side of the label */
    labelFarSide?: React.ReactNode;
    /** Label to be announced before the error message to announce to the user that there's an error */
    errorAriaLabel?: string;

    attr?: TextInputAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 *
 * @param props Control properties (defined in `TextFieldProps` interface)
 */
export const TextField: React.StatelessComponent<TextFieldProps> = (props: TextFieldProps) => {
    const errorId = `${props.name}-error-${instanceCount++}`;
    let describedby = errorId;

    const textAttr: TextInputAttributes = {
        container: props.attr?.container,
        input: Object.assign({
            'aria-label': props.label,
            'aria-describedby': describedby,
            'aria-required': props.required
        }, props.attr?.input),
        inputContainer: props.attr?.inputContainer,
        prefix: props.attr?.prefix,
        postfix: props.attr?.postfix,
        clearButton: props.attr?.clearButton
    };
    const fieldAttr: FormFieldAttributes = {
        fieldLabel: props.attr?.fieldLabel,
        fieldError: Object.assign({
            id: errorId
        }, props.attr?.fieldError),
        fieldContent: props.attr?.fieldContent,
        fieldContainer: props.attr?.fieldContainer
    };

    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            hideError={props.hideError}
            loading={props.loading}
            required={props.required}
            tooltip={props.tooltip}
            className={props.className}
            attr={fieldAttr}
            labelFarSide={props.labelFarSide}
            errorAriaLabel={props.errorAriaLabel}
            disabled={props.disabled}
        >
            <TextInput
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                type={props.type}
                prefix={props.prefix}
                prefixClassName={props.prefixClassName}
                postfix={props.postfix}
                postfixClassName={props.postfixClassName}
                error={!!props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={props.inputClassName}
                autoFocus={props.autoFocus}
                required={props.required}
                attr={textAttr}
            />
        </FormField>
    );
};

TextField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    type: 'text',
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        input: {},
        inputContainer: {},
        prefix: {},
        postfix: {},
        clearButton: {},
    }
};

export default TextField;
