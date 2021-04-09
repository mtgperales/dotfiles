# initialize start x
if [ -z "${DISPLAY}" ] && [ "$(fgconsole)" -eq 1 ]; then
  exec startx
fi


# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

xinput set-prop 11 300 -48 -48

# bindkey
bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word

# alias
alias e="exit"
alias c="clear"

alias install="sudo xbps-install -S"
alias update="sudo xbps-install -Su"
alias remove="sudo xbps-remove -R"
alias search="sudo xbps-query -Rs"

alias svstatus="sudo sv status"
alias svstatus-all="sudo sv status /var/service/*"
alias svup="sudo sv up"
alias svdown="sudo sv down"
alias svrestart="sudo sv restart"
alias list-service="sudo ls /etc/sv"

alias vim="nvim"
alias ga="git add -A"
alias gc="git commit -m"
alias gp="git push -u origin"
alias se="sudo edit"

# path
export EDITOR="nvim"

source ~/.config/zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source ~/.config/zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.config/zsh/powerlevel10k/powerlevel10k.zsh-theme
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
