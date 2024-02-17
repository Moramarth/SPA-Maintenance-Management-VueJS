import { validateImg } from './formValidators';

export function manageFile(file, currentImageState) {
  currentImageState.hasValidationError = validateImg(file);
  if (file && !currentImageState.hasValidationError) {
    currentImageState.imageName = file.name.slice(0, file.name.length / 2);
    const reader = new FileReader();
    const extension = file.type.replace('image/', '');
    currentImageState.imageType = `.${extension}`;
    reader.onload = () => {
      currentImageState.uploadedImage = reader.result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }
}
