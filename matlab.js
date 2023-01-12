const fs = require("fs");
const { exec } = require("child_process");
const shell = require("shelljs");

const matlabPath = "/Applications/MATLAB_R2022b.app/bin/matlab"
const tempfileName = 'temp.m'

const hasMATLAB = () => {
    return !shell.which("matlab");
};

const createTempFile = async (input) => {
    try {
        if (fs.existsSync(`./${tempfileName}`)) {
            await fs.unlink(tempfileName, function (err) {
                if (err) throw err;
            });
            console.log('File deleted')
        }
        await fs.appendFile(tempfileName, input, function (err) {
            if (err) throw err;
        });
        console.log('File created')
    } catch (error) {
        console.log(error)
    }
}

const deleteTempFile = async () => {
    try {
        if (await fs.existsSync(`./${tempfileName}`)) {
            await fs.unlink(tempfileName, function (err) {
                if (err) throw err;
            });
            console.log('File deleted')
        }
    } catch (error) {
        console.log(error)
    }
}

const run = async (input) => {
    try {
        if (!hasMATLAB()) {
            return "You must have MATLAB installed";
        } else {
            createTempFile(input)
            return new Promise((resolve, reject) => {
                exec(
                    `${matlabPath} -nosplash -batch "run('./${tempfileName}'); exit;"`,
                    (error, stdout, stderr) => {
                        if (error) {
                            reject(stderr.trim());
                        } else {
                            deleteTempFile()
                            resolve(stdout.replace(/\s/g, '').split("=")[1])
                        }
                    }
                );
            });
        }
    } catch (error) {
        return error;
    }
};

module.exports = { run }