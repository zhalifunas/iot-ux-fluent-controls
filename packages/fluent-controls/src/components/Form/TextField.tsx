import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
import {TextInput} from './TextInput';
const cssName = classNames.bind(require('./TextField.scss'));

export interface TextFieldType {}

export interface TextFieldProps extends React.Props<TextFieldType> {
    name: string;
    value: string;
    placeholder?: string;
    
    label: React.ReactNode;
    error?: React.ReactNode;
    
    disabled?: boolean;
    required?: boolean;

    onChange: (newValue: string) => void;
    onClear: () => void;

    className?: string;
}

export const TextField = (props: TextFieldProps) => {
    const labelClass = cssName('label');
    const containerClass = cssName({
        'input-container': true,
        'input-error': props.error,
        'required': props.required,
    }, props.className);
    const inputClass = cssName({
        'input': true,
        'input-error': props.error
    });
    const errorClass = cssName('field-error');    

    return (
        <div className={containerClass} >
            <label className={labelClass} htmlFor={props.name} >
                {props.label}
            </label>
            <TextInput
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onClear={props.onClear}
                disabled={props.disabled}
                error={!!props.error}
            />

            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};
