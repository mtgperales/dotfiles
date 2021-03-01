#!/usr/bin/env zsh

print "Hello [$USER]"
print "Copying .config"
cp -R ~/.config ~/dotfiles
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
