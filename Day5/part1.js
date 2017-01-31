const crypto = require("crypto")

const getPassword = input => {
  let password = ""
  for(var i=0; i<Number.MAX_VALUE && password.length<8; i++) {
    let md5sum = crypto.createHash("md5").update(input+i)
    let digest = md5sum.digest("hex")
    if(digest.startsWith("00000")) {
      password += digest.charAt(5)
    }
  }
  return password
}

console.log( "password:", getPassword( "uqwqemis" ) )
