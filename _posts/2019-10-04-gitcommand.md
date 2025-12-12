---
title: "Git command"
data: 2019-10-04 00:00:00 -0000
categories: tool 
tags: development environment git command
---

Written by SGLee, VCANUS

# git command

## general process
```
$ git init
$ git config --global user.name "user name"
$ git config --global user.email <user email>
$ git remote add origin <repository url> (in case of using origin)
$ git remote add vcanus <repository url>

# 체크아웃
$ git checkout -b develop # 최초 생성. 원격 저장소에 develop 브랜치 존재하지 않을 경우
$ git checkout -t vcanus/develop # 원격 저장소에 기존 존재하는 develop으로 체크아웃

# commit & push 일반
$ git add --all
$ git commit -m "<message>"
$ git push vcanus <branch> # 원격 저장소로 푸시

$ git pull vcanus <branch> # <branch> 최신 데이터 유지

$ git checkout -b feature/<topic> # 신규 작업 브랜치 생성
$ git add --all
$ git commit -m "message"
$ git push vcanus feature/<topic>

# Github에서 PR 수행 (feature -> develop)
$ git checkout develop
$ git pull vcanus develop

# 작업 중인 브랜치에서 최신 develop 내용 반영하기 1)
$ git fetch
$ git checkout develop
$ git pull vcanus develop
$ git checkout feature/<topic>
$ git rebase develop

# 작업 중인 브랜치에서 최신 develop 내용 반영하기 2) fetch, rebase를 한 번에 수행
$ git checkout feature
$ git pull --rebase origin develop

# conflict 발생할 경우
$ conflict 파일 수정 ...
$ git add --all
$ git commit -m "conflict 수정 사항 입력"
$ git rebase --continue # 매우 중요
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
// fetch upstream and checkout -t origin/develop of upstream
$ git fetch upstream
$ git checkout -t upstream/develop
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
$ git reset --hard <version>
// git history
$ git log --graph --all --decorate --oneline 
```

https://gist.github.com/heiswayi/350e2afda8cece810c0f6116dadbe651


## 작업 branch develop으로 merge 방법
1. 작업 branch commit
2. git rebase develop
3. git checkout develop
4. git merge 작업 branch : fast-forward merge가 일어남
