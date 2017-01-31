const crypto = require("crypto")

const getPassword = input => {
  let password = new Array(8)
  for(var i=0; i<Number.MAX_VALUE && password.includes(undefined); i++) {
    let md5sum = crypto.createHash("md5").update(input+i)
    let digest = md5sum.digest("hex")
    if(digest.startsWith("00000")) {
      let pos = Number.parseInt(digest.charAt(5))
      if(password[pos] === undefined && pos<8) {
        password[pos] = digest.charAt(6)
      }
    }
  }
  return password.join('')
}

console.log( "password:", getPassword( "uqwqemis" ) )
