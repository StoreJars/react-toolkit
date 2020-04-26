export default function imageValidator(file) {
  if (
    file.type !== 'image/jpeg'
    && file.type !== 'image/jpg'
    && file.type !== 'image/png'
  ) {
    window.alert('Please select a valid image');
    throw new Error('invalid file');
  }

  if (file.size > 2000000) {
    window.alert('Image is too large, image should be less than 2MB');
    throw new Error('file too large');
  }
}
