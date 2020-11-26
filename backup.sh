#!/usr/bin/env zsh

print "Hello [$USER]"
print "Copying i3 config from ~/.config/i3 to dotfiles folder"
cp ~/.config/i3/config ~/dotfiles/.config/i3/config
print "Backup done"
print "Copying i3status config from ~/.config/i3status to dotfiles folder"
cp ~/.config/i3status/config ~/dotfiles/.config/i3status/config
print "Backup done"
print "Copying i3blocks config from ~/.config/i3blocks to dotfiles folder"
cp -R ~/.config/i3blocks dotfiles/.config/i3blocks
print "Done"
print "Copying .zshrc config from ~/.zshrc to dotfiles folder"
cp ~/.zshrc ~/dotfiles/.zshrc
print "Backup done"
print "Changing directory to dotfiles folder"
cd ~/dotfiles
print "------------------------------------------------------------------"
print "Pushing to Github"
print "------------------------------------------------------------------"
git add -A
git commit -m "Backup dotfiles"
git push -u origin
