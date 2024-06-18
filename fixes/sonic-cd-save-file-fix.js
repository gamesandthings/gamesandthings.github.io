function convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    console.log(array);
    return array;
}
let sonic_cd_save_file = window.localStorage.getItem('sonic_cd_save_file');
if (sonic_cd_save_file != null) {
    FS.writeFile('/SData.bin', convertDataURIToBinary("data:application/octet-stream;base64," + sonic_cd_save_file));
}
window.setInterval(() => {
    if (FS.readdir('/').includes('SData.bin')) {
        var bb = new Blob([FS.readFile('/SData.bin')]);
        var f = new FileReader();
        f.onload = function (e) {
            window.localStorage.setItem('sonic_cd_save_file', e.target.result.replace("data:application/octet-stream;base64,", ""))
        };
        f.readAsDataURL(bb);
    }
}, 1000);