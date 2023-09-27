import { storgae } from '@/appwrite';
import { Image } from '@/typings';

const getUrl = async (image: Image) => {
  const url = storgae.getFilePreview(image.bucketId, image.fileId);
  return url;
};

export default getUrl;
