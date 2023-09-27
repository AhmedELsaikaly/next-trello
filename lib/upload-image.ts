import { ID, storgae } from '@/appwrite';

const uploadImage = async (file: File) => {
  if (!file) return;
  const fileUploaded = await storgae.createFile(
    '64fd7bf31f5cd81f4b35',
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;
