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
$ ... update contents, 신규 기능 추가 및 내용 변경
$ git add --all
$ git commit -m "feature/<topic> 수정 내용"
$ git fetch vcanus develop // upstream vcanus의 develop 변경 사항 fetch
$ git rebase vcanus/develop // upstream vcanus/develop 브랜치로 rebase 수행
// conflict 발생할 경우 시작
$ conflict 파일 수정 ...
$ git add --all
$ git commit -m "conflict 수정 사항 입력"
$ git rebase --continue // 매우 중요
$ git push vcanus feature/<topic> // 선택 사항
// conflict 발생할 경우 끝
$ git checkout develop
$ git pull vcanus develop // 매우 중요, feature merge 하기 전에 최신 develop 브랜치로 pull
$ git merge feature/<topic> // 앞에서 수정한 feature 브랜치를 merge
$ git push vcanus develop
// 이하 다른 option
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
