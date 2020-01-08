import { Core } from 'flyteidl';
import * as Long from 'long';
import { InputValue } from '../types';
import { ConverterInput, InputHelper } from './types';

const integerRegexPattern = /^-?[0-9]+$/;

function toLiteral({ value }: ConverterInput): Core.ILiteral {
    const integer =
        value instanceof Long ? value : Long.fromString(value.toString());
    return {
        scalar: { primitive: { integer } }
    };
}

export function isValidInteger(value: InputValue): boolean {
    if (value instanceof Long) {
        return true;
    }
    if (typeof value === 'number' && Number.isInteger(value)) {
        return true;
    }
    if (typeof value === 'string' && value.match(integerRegexPattern)) {
        return true;
    }
    return false;
}

function validate({ value }: ConverterInput) {
    if (!isValidInteger(value)) {
        throw new Error('Value is not a valid integer');
    }
}

export const integerHelper: InputHelper = {
    toLiteral,
    validate
};