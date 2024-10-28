# tutorial-simple-example

- This repository contains 2 example eBPF programs: `minimal` and `bootstrap`.

## 1. Observe the file structure
- `some_program.bpf.c` :  
  This is the eBPF program we're going to load into the Kernel.

- `some_program.c` :  
  This file is our frontend in the userspace, and it is responsible for loading the eBPF program into Kernel.
