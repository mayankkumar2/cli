module.exports = {
    VerifyPackage: (where) => {
        console.log('Verifying package...')
        // get env variable IS_SECURE_VERIFY_DISABLED
        let isSecureVerifyDisabled = process.env.IS_SECURE_VERIFY_DISABLED;
        if (isSecureVerifyDisabled === 'true') {
            console.log('Secure verify is disabled');
            return;
        }
        // execute command
        const { execSync } = require('child_process');
        // get env variable SECURE_VERIFY_COMMAND
        let secureVerifyCommand = process.env.SECURE_VERIFY_COMMAND;
        let { error } = execSync(`${secureVerifyCommand || 'secure_verify'} verify-npm-package --path ${where}`, { cwd: where, stdio: 'inherit' });
        if (error) {
            console.log('Secure verify failed');
            throw error;
        }
    }
}