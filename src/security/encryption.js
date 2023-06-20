var aesjs = require('aes-js');
var scrypt = require('scrypt-js')

const N = 1024, r = 8, p = 1;
const dkLen = 32;

function stringKeyAsPasswordKey(key){
    let keyAsBytes = aesjs.utils.utf8.toBytes(key.normalize('NFKC'))
    let salt=aesjs.utils.utf8.toBytes((key+"tinyjournalapp").normalize('NFKC'))
    return scrypt.syncScrypt(keyAsBytes, salt, N, r, p, dkLen)
}

export function encrypt(body, key){
    let bodyAsBytes = aesjs.utils.utf8.toBytes(body)
    let pwdKey = stringKeyAsPasswordKey(key)
    let aesCtr=new aesjs.ModeOfOperation.ctr(pwdKey, new aesjs.Counter(5))
    let encryptedBytes=aesCtr.encrypt(bodyAsBytes)

    return aesjs.utils.hex.fromBytes(encryptedBytes)
}

export function decrypt(body, key){
    let pwdKey = stringKeyAsPasswordKey(key)
    try{
        let encryptedBytes = aesjs.utils.hex.toBytes(body)
        let aesCtr=new aesjs.ModeOfOperation.ctr(pwdKey, new aesjs.Counter(5))

        let decryptedBytes = aesCtr.decrypt(encryptedBytes)
        return aesjs.utils.utf8.fromBytes(decryptedBytes)
    } catch{
        return body
    }
}