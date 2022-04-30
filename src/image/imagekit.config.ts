// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ImageKit from 'imagekit';

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_API_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});
