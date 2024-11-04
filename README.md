# tutorial-simple-example

- This repository contains 2 example eBPF programs: `minimal` and `bootstrap`.
- 如需在codespace/devcontainer內編譯`bootstrap`，則需在編譯參數LD的地方加上`/usr/lib/libargp.a`

## 1. Observe the file structure
- `some_program.bpf.c` :  
  This is the eBPF program we're going to load into the Kernel.

- `some_program.c` :  
  This file is our frontend in the userspace, and it is responsible for loading the eBPF program into Kernel.
