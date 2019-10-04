---
title: "Git command"
data: 2019-10-04 00:00:00 -0000
categories: tool 
tags: development environment git
---

Written by SGLee

# git command

## general process
```
$ git init
$ git config --global user.name "<user mail>"
$ git config --global user.email <user email>
$ git remote add origin <repository url>
$ git fetch origin
$ git pull origin master (develop, feature/topic)
$ git add <file name>
// to all files
$ git add --
$ git commit -m "<message>"
$ git push origin master (develop, feature/topic)
```
## make branch and checkout
```
// first 2~6 digits are ok
$ git checkout <commit_id>

// -b is for the new branch
// there is no branch in remote and local repository
$ git checkout -b develop
$ git checkout -b feature/subject
// update branch
$ git fetch 
// -t is for tracking
// branch name exsists in a remote repository
$ git checkout -t origin/develop 
```
## add remote repository
```
// add remote origin
$ git remote add origin <https://github.com/***.git>
// add remote upstream (usually original repository before fork)
$ git remote add upstream <https://github.com/***.git>
// check remote
$ git remote -v
```

## manage branch
```
// delete a local git branch
$ git branch -d branch_name 
// delete a remote git branch
$ git push <remote name> --delete <branch name> 
$ git push origin --delete branch_name
```

## merge branch
```
// merge feature/topic => develop
$ git checkout develop
$ git merge feature/topic
```

## request pull
```
$ git fetch origin
$ git pull origin develop
$ git checkout -b feature/topic
// do not merge feature/topic to develop

// make codes
// ...

// add, commit, push
$ git add --all
$ git commit -m "<message>"
$ git push origin feature/topic

// request pull
// ...

// update upstream repository's info.
$ git fetch upstream
// merge upstream/master to local
$ git merge upstream develop
// update origin/develop with upstream data
$ git push origin develop

$ git branch -D feature/topic
```

## etc
```
// cancel git add
$ git reset 
// git history
$ git log --graph --all --decorate --oneline 
```

https://gist.github.com/heiswayi/350e2afda8cece810c0f6116dadbe651
