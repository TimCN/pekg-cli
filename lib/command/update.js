const program = require("commander")
const path = require("path");
const fs = require("fs");
const ora = require("ora")


const pathSplit = (rawPath, spliter = ".") => {
  return rawPath.split(spliter).filter(path => path)
}


program
  .command('update')
  .description('simple to update package.json content')
  .option('-k, --key <key>', "target key")
  .option('-v, --val <val>', "target key's value")
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
    targetObj[lastKey] = option.val;
    // write back
    fs.writeFileSync(targetPkg, JSON.stringify(pkg, null, "\t"))
    spinner.succeed("update succeed.")

  })




program.parse(process.argv);