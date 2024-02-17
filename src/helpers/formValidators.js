import { helpers } from '@vuelidate/validators';

const MAX_FILE_SIZE_IN_MB = 1;

const phoneNumberValidator = helpers.regex(/^\+\d{9,15}$/gm);

function validateImg(file) {
  return file.size > MAX_FILE_SIZE_IN_MB * 1024 * 1024;
}
export { MAX_FILE_SIZE_IN_MB, phoneNumberValidator, validateImg };
