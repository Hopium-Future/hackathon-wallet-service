/**
 * Do NOT allow using `npm` as package manager.
 */
if (process.env.npm_execpath.indexOf('yarn') === -1) {
    console.error('\x1b[30m\x1b[103mYou must use Yarn to install dependencies:\x1b[0m');
    console.error('\x1b[30m\x1b[103m  $ yarn install\x1b[0m');
    process.exit(1);
}
