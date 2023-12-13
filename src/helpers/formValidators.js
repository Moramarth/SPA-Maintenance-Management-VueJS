import { helpers } from '@vuelidate/validators';

const MAX_FILE_SIZE_IN_MB = 1;

const phoneNumberValidator = helpers.regex(/^\+\d{9,15}$/gm);

export { MAX_FILE_SIZE_IN_MB, phoneNumberValidator };
