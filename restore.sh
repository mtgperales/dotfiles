#!/usr/bin/env zsh

print "Hello [$USER]"
print "Restoring i3 config from dotfiles backup"
mkdir ~/.config/i3
cp -R .config/i3/ ~/.config/i3/
print "Done"
print "Restoring i3status config from dotfiles backup"
mkdir ~/.config/i3status
cp -R .config/i3status ~/.config/i3status
print "Done"
print "Restoring i3blocks config from dotfiles backup"
mkdir ~/.config/i3blocks
cp -R .config/i3blocks ~/.config/i3blocks
print "Done"
print "Restoring .zshrc config from dotfiles backup"
cp .zshrc ~/.zshrc
print "Done"
print "Source .zshrc config"
source ~/.zshrc
print "Done"
print "Restore Complete"
print "Restarting i3"
i3-msg restart
print "Done"
