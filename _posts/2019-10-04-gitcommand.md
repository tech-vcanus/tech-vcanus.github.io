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
$ git fetch (default is origin, in case of using origin)
$ git fetch vcanus (target remote(upstream) is vcanus)
$ git pull vcanus master (ex. develop, feature/<topic>)
$ git add <file name>
// to all files
$ git add --all
$ git commit -m "<message>"
$ git push vcanus master (ex. develop, feature/topic)
$ git checkout -b develop (check -b and -t)
$ git add --all
$ git commit -m "<message>"
$ git push vcanus develop
$ git checkout -b feature/<topic>
$ git add --all
$ git commit -m "<message>"
$ git checkout develop
$ git pull vcanus develop
$ git checkout feature/<topic>
$ git rebase develop (to avoid conflict)
$ git add --all
$ git commit -m "<message>"
$ git push vcanus feature/<topic>
$ git checkout develop
$ git merge feature/<topic>
```

## case study
```
$ git init // 최초 실행
$ git remote add vcanus https://github.com/vcanus/<repositoryname>.git // 해당 repository 등록, origin이 아닌 vcanus upstream 사용, git config는 global로 사전 설정 가정
$ git fetch vcanus // vcanus upstream의 branch 정보 가져오기
$ git pull vcanus master // 마스터 pull
$ git checkout -b develop // -b: 신규, -t: 기존
$ git pull vcanus develop // develop 최신 pull
$ git checkout -b feature/<topic> // -b: 신규, -t 기존
$ ... update
$ git add --all
$ git commit -m "feature/<topic> 수정 내용"
$ git checkout develop
$ git pull vcanus develop // feature<topic> 수정 시 upstream develop이 변경될 수 있기에 pull
$ git checkout feature/<topic>
$ git rebase develop // feature/<topic> 생성 시 develop 버전이 아닌 신규 버전이 있는 경우 반영
$ git push vcanus feature/<topic>
$ git checkout develop 
$ git merge feature/<topic> // topic merge
$ git push vcanus develop
$ git checkout master
$ git merge develop // develop 버전 merge, 또는 github web에서 Pull Request할 것 (develop branch에서)
$ git push vcanus master
$ git checkout -b release/<v0.0.1> // release<version>명으로 브랜치 생성
$ git merge master
$ git push vcanus release/<v0.0.1>
$ mvn clean & compile
$ mvn package
$ mvn deploy -DskipTests // -DskipTests는 option
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
