#!/usr/bin/env zsh

print "Change directory"
cd /opt
print "Cloning yay git repo"
sudo git clone https://aur.archlinux.org/yay-git.git
print "Changing file permission"
sudo chown -R tecmint:tecmint ./yay-git
print "Change directory"
cd yay-git
print "Building package"
makepkg -si
