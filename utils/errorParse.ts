import { ErrorsObject } from './types';

export const errorParse = (error: any) => {
    const errors: ErrorsObject = {};
    if (error.inner) {
        error.inner.forEach((el: any) => {
            errors[el.path] = el.message;
        });
    } else {
        errors.global = 'Something went wrong. Please try again.';
    }
    return errors;
};
