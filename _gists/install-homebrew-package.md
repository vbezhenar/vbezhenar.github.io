---
title: Install homebrew package
---

How to install binary homebrew package without homebrew.

Example URLs:
```
https://formulae.brew.sh/formula/stlink
 https://formulae.brew.sh/api/formula/stlink.json
  .bottle.stable.arm64_ventura.url:
  https://ghcr.io/v2/homebrew/core/stlink/blobs/sha256:37bc6182a2709fbcd5046be4c1cb93936475f12d2ee42983e9f7802ed89bc97c
 https://formulae.brew.sh/api/formula/libusb.json
  .bottle.stable.arm64_ventura.url:
  https://ghcr.io/v2/homebrew/core/libusb/blobs/sha256:ea8a4a04b5cc81eff38d0c5cdfe2fbac519ca2c7652c64371074f4abaf766a0b
```

Keychain Access, Certificate Assistant, Create a Certificate, Code Signing

```sh
curl -L -H 'Authorization: Bearer QQ==' -o 'stlink-bottle.tar.gz' 'https://ghcr.io/v2/homebrew/core/stlink/blobs/sha256:37bc6182a2709fbcd5046be4c1cb93936475f12d2ee42983e9f7802ed89bc97c'
curl -L -H 'Authorization: Bearer QQ==' -o 'libusb-bottle.tar.gz' 'https://ghcr.io/v2/homebrew/core/libusb/blobs/sha256:ea8a4a04b5cc81eff38d0c5cdfe2fbac519ca2c7652c64371074f4abaf766a0b'
tar -x -f stlink-bottle.tar.gz
tar -x -f libusb-bottle.tar.gz
mkdir stlink-1.7.0
mv stlink/1.7.0/bin/* stlink-1.7.0/
mv libusb/1.0.26/lib/libusb-1.0.0.dylib stlink-1.7.0/
otool -L stlink-1.7.0/st-flash
install_name_tool -change '@@HOMEBREW_PREFIX@@/opt/libusb/lib/libusb-1.0.0.dylib' '/opt/stlink-1.7.0/libusb-1.0.0.dylib' stlink-1.7.0/st-flash
install_name_tool -change '@@HOMEBREW_PREFIX@@/opt/libusb/lib/libusb-1.0.0.dylib' '/opt/stlink-1.7.0/libusb-1.0.0.dylib' stlink-1.7.0/st-info
install_name_tool -change '@@HOMEBREW_PREFIX@@/opt/libusb/lib/libusb-1.0.0.dylib' '/opt/stlink-1.7.0/libusb-1.0.0.dylib' stlink-1.7.0/st-trace
install_name_tool -change '@@HOMEBREW_PREFIX@@/opt/libusb/lib/libusb-1.0.0.dylib' '/opt/stlink-1.7.0/libusb-1.0.0.dylib' stlink-1.7.0/st-util
codesign -s 'Vladimir Bezhenar' -f stlink-1.7.0/st-flash
codesign -s 'Vladimir Bezhenar' -f stlink-1.7.0/st-info
codesign -s 'Vladimir Bezhenar' -f stlink-1.7.0/st-trace
codesign -s 'Vladimir Bezhenar' -f stlink-1.7.0/st-util
sudo cp -r stlink-1.7.0 /opt/stlink-1.7.0
```