export default function imageValidator(file) {
  if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
    window.alert('Please select a valid image');
    throw new Error('invalid file');
  }
}
