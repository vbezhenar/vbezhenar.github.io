---
title: Caps as Ctrl using udev
---

```text
# evtest
...
/dev/input/event3:	AT Translated Set 2 keyboard
...
Select the device event number [0-15]: 3
Input driver version is 1.0.1
Input device ID: bus 0x11 vendor 0x1 product 0x1 version 0xab83
...
Press Caps Lock
...
Event: time 1724100071.543479, -------------- SYN_REPORT ------------
Event: time 1724100075.002355, type 4 (EV_MSC), code 4 (MSC_SCAN), value 3a
Event: time 1724100075.002355, type 1 (EV_KEY), code 58 (KEY_CAPSLOCK), value 1
Event: time 1724100075.002355, -------------- SYN_REPORT ------------
Event: time 1724100075.002712, type 17 (EV_LED), code 1 (LED_CAPSL), value 1
Event: time 1724100075.002712, -------------- SYN_REPORT ------------
Event: time 1724100075.260580, type 4 (EV_MSC), code 4 (MSC_SCAN), value 3a
Event: time 1724100075.260580, type 1 (EV_KEY), code 58 (KEY_CAPSLOCK), value 2
Event: time 1724100075.260580, -------------- SYN_REPORT ------------
Event: time 1724100075.280859, type 4 (EV_MSC), code 4 (MSC_SCAN), value 3a
Event: time 1724100075.280859, type 1 (EV_KEY), code 58 (KEY_CAPSLOCK), value 0
Event: time 1724100075.280859, -------------- SYN_REPORT ------------
...
```

bus=`0011` vendor=`0001` product=`0001` version=`AB83` scan=`3A`

`/etc/udev/hwdb.d/caps-to-ctrl.hwdb`:

```text
evdev:input:b0011v0001p0001eAB83-*
 KEYBOARD_KEY_3A=leftctrl
```

```
systemd-hwdb update
udevadm trigger
```

[more](https://wiki.archlinux.org/title/Map_scancodes_to_keycodes)
