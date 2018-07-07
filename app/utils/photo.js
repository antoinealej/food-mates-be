import { fsmkdir, filemv } from './fs';

export async function uploadPhoto(file, itemId) {
  const path = `${process.cwd()}/data/${itemId}`;
  const newName = `${new Date().getTime()}_${file.name}`;

  try {
    await fsmkdir(`${process.cwd()}/data/`);
  } catch (e) {
    // not an empty block
  }

  try {
    await fsmkdir(path);
  } catch (e) {
    // not an empty block
  }

  try {
    await filemv(file, `${path}/${newName}`);
  } catch (e) {
    throw new Error({
      message: e.message,
      code: 'food-mates.uploadPhoto.filemv.failed'
    })
  }

  return `/item/${itemId}/photo/${encodeURI(newName)}`;
}