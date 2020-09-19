const YdotToken = artifacts.require('./YdotToken.sol')
const fs = require('fs')

module.exports = function (deployer) {
  var name = "YouTube Funding Token";
  var symbol = "YDT";

  deployer.deploy(YdotToken, name, symbol)
    .then(() => {
      if (YdotToken._json) {
        fs.writeFile(
          'deployedABI',
          JSON.stringify(YdotToken._json.abi),
          (err) => {
            if (err) throw err
            console.log("파일에 ABI 입력 성공");
          })
      }

      fs.writeFile(
        'deployedAddress',
        YdotToken.address,
        (err) => {
          if (err) throw err
          console.log("파일에 주소 입력 성공");
        })
    })
}