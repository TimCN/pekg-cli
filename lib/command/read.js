const program = require("commander")
const path = require("path");
const ora = require("ora")
const fs = require("fs");


const pathSplit = (rawPath, spliter = ".") => {
  return rawPath.split(spliter).filter(path => path)
}


program
  .command('read')
  .description('simple to read package.json content')
  .option('-k, --key <key>', "target key")
  .option('-e  , --env <env>', "output key")
  .action(function (option) {
    const spinner = ora("starting...").start();
    // TODO: 
    const execPWD = process.cwd();
    const targetPkg = path.resolve(execPWD, "package.json");
    const pkg = require(targetPkg);
    const keys = pathSplit(option.key)
    const lastKey = keys.pop();
    let targetObj = pkg;
    keys.forEach((key) => targetObj = targetObj[key])
    const val = targetObj[lastKey]
    console.log("val", val)
    const dotShFile = ".pekg.sh"
    const outputParamName = option.env ? option.env : lastKey;
    fs.writeFileSync(path.resolve(execPWD, dotShFile), `export ${outputParamName}=${val}`)
    // output
    spinner.succeed(`read succeed and set to ${dotShFile} file.`)

  })




program.parse(process.argv);