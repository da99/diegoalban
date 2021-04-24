

if status --is-interactive
  set -x EDITOR nvim
  set -x SUDO_EDITOR nvim
  abbr --add pi "sudo xbps-install -S"
  abbr --add pq "xbps-query -Rs"
  abbr --add pr "sudo xbps-remove -R"
  abbr --add pu "sudo xbps-install -Su"
end #


set -x PATH "$HOME/progs/my-bdrm-01/bin" $PATH
set -x PATH "$HOME/progs/crystal/current/bin" $PATH
