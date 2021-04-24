

full_cmd = ARGV.join(' ')

def run_cmd(*args)
  full_cmd = args.join(' ')
  STDERR.puts "=== #{full_cmd}"
  system(*args)
end # def

case
when full_cmd == "remote upload"
  run_cmd("rsync -av $PWD/my-bdrm-01 my-bdrm-01:/progs")
else
  STDERR.puts "!!! Unknown command: #{full_cmd}"
  exit 1
end # case
