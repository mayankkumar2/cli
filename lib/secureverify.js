module.exports = {
    VerifyPackage: (where) => {
        console.log('Verifying package...')
        // get env variable IS_SECURE_VERIFY_DISABLED
        let isSecureVerifyDisabled = process.env.IS_SECURE_VERIFY_DISABLED;
        if (isSecureVerifyDisabled === 'true') {
            console.log('Safe verify is disabled');
            return;
        }
        // execute command
        const { execSync } = require('child_process');
        // get env variable SECURE_VERIFY_COMMAND
        let secureVerifyCommand = process.env.SECURE_VERIFY_COMMAND;
        execSync(`${secureVerifyCommand || 'secure_verify'} --path ${where} --generate-sbom --error-on-not-found`, { cwd: where, stdio: 'inherit' });
    }
}