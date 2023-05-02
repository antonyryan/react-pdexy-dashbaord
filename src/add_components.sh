#!/bin/bash

if [ ! -e components ]
then
	mkdir components
fi

cd components

hg clone http://dev.os3.it/hg/os3/react-mod-auth auth
#hg clone ssh://hg@dev.os3.it/os3/react-mod-posts posts
#hg clone ssh://hg@dev.os3.it/os3/react-mod-comments comments
#hg clone ssh://hg@dev.os3.it/os3/react-mod-friends friends
