import * as download from 'download';
import { rm } from 'fs/promises';
import { platform } from 'os';
import { join } from 'path';

const PREFIX = 'https://cdn.iflyos.cn/public/lisa-binary/cmake/';

const SUFFIX = (() => {
  switch (platform()) {
    case 'win32': return 'windows-x86_64.zip';
    case 'darwin': return 'macos-universal.tar.gz';
    default: return 'linux-x86_64.tar.gz';
  }
})();

const NAME = `cmake-3.21.3-${SUFFIX}`;
const HOME = join(__dirname, '..', 'binary');

(async () => {

  try {
    await rm(HOME, { recursive: true });
  } catch (e) {
  }

  await download(`${PREFIX}${NAME}`, HOME, {
    extract: true,
  });

})();
