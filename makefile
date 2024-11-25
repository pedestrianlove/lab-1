# generate vmlinux header
vmlinux.h:
	bpftool btf dump file /sys/kernel/btf/vmlinux format c > vmlinux.h 

# build bpf kernel object file
%.bpf.o: %.bpf.c vmlinux.h
	clang -g -O2 -target bpf -c $< -o $@

# generate skeleton
tcprtt.skel.h tcprtt_tp.skel.h: %.skel.h: %.bpf.o
	bpftool gen skeleton $< > $@

# build app
%: %.c %.skel.h
	clang -g $< -lbpf -lelf -lz -o $@
