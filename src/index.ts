import { platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const PREFIX = (() => {
  const cmake = 'cmake-3.21.3-';
  switch (platform()) {
    case 'win32': return `${cmake}windows-x86_64`;
    case 'darwin': return `${cmake}macos-universal/CMake.app/Contents`;
    default: return `${cmake}linux-x86_64`;
  }
})();

const HOME = join(__dirname, '..', 'binary');
const execFile = promisify(_execFile);

export default <Binary>{
  homeDir: join(HOME, PREFIX),

  binaryDir: join(HOME, PREFIX, 'bin'),

  env: {},

  async version() {
    const { stdout } = await execFile(join(this.binaryDir, 'cmake'), ['--version']);
    return stdout.split('\n')[0].trim();
  }
};
