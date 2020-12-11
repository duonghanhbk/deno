# deno

# Create/update the lock file "lock.json".

deno cache --lock=lock.json --lock-write --unstable deps.ts

# checking each resource.

deno cache --reload --lock=lock.json --unstable deps.ts

# clone

git clone https://github.com/duonghanhbk/deno.git
