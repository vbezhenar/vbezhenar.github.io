---
title: gdb cheatsheet
---

target remote 127.0.0.1:4242
p/z $r0 # print, z: hex; t: two
x/z 0x40021008 # eXamine
display/z $r0
display/4i $pc - 1
display/z *((int*)$sp)@4
stepi # step instruction
info registers
