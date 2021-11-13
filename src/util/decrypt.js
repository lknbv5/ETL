//************************************************************************ */
//解密
import CryptoJS from 'crypto-js' 

function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
				out += str.charAt(i - 1);
				break;
			case 12: case 13:
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
				break;
		}
	}
	return out
}
function hextoString(hex) {
	let out = "";
	let len = hex.length / 2;
for (var i = 0; i < len; i++) {
	out += String.fromCharCode(parseInt(hex.substr(i * 2, 2), 16));
}
// 解决乱码问题
return utf8to16(out);
}
function Decrypt(str) {
	const key = CryptoJS.enc.Utf8.parse("GT&RJSYZGT&RJSYZ");
   const iv = CryptoJS.enc.Utf8.parse("GTlRJSYZGTtRJSYZ");
	var decrypt = CryptoJS.AES.decrypt(str, key, {
		keySize: 128 / 8,
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr;
}

export  {Decrypt,hextoString}
//************************************************************************ */