#!/usr/bin/env zsh

print "Hello [$USER]"
print "Restoring i3 config from dotfiles backup"
cp .config/i3/config ~/.config/i3/config
print "Done"
print "Restoring i3status config from dotfiles backup"
cp .config/i3status/config ~/.config/i3status/config
print "Done"
print "Restoring .zshrc config from dotfiles backup"
cp .zshrc ~/.zshrc
print "Done"
print "Source .zshrc config"
source ~/.zshrc
print "Done"
print "Restore Complete"
