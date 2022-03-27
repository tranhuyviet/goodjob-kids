import * as Yup from 'yup';

// USER
const name = Yup.string()
    .min(1, 'Name must be at least 1 characters!')
    .max(12, 'Name cannot be longer than 12 characters!')
    .required('Name cannot be empty!');

// JOB
const jobName = Yup.string()
    .min(3, 'Job must be at least 3 characters!')
    .max(32, 'Job cannot be longer than 32 characters!')
    .required('Job cannot be empty!');
const jobImage = Yup.string().max(
    255,
    'Image url cannot be longer than 255 characters!'
);
const jobStar = Yup.number()
    .integer('Star must be positive integer number')
    .positive()
    .min(1, 'Star must be bigger or equal than 1')
    .max(100, 'Star can not be bigger than 100')
    .required('Star must be positive number');

// HISTORY
const comment = Yup.string().max(
    500,
    'Short comment cannot be longer than 500 characters!'
);

export const signupValidate = Yup.object({ name });

export const jobValidate = Yup.object({
    name: jobName,
    image: jobImage,
    star: jobStar,
});

export const historyValidate = Yup.object({ comment });
