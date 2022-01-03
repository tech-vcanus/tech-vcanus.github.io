---
title: NATS AUTHENTICATION
date: 2021-06-18
tags: nats auth
toc: true
toc_sticky: true
comments: true
---

Written By [David Roh](https://github.com/tsedek), VCANUS

# NATS AUTHENTICATION

## USERNAME / PASSWORD

### Start option(only single user)

```
$ nats-server --user a --pass b
```

### Set Configuration

- single user

```config
authorization: {
    user: "username",
    password: "password" 
}
```

- multi user

```config
authorization: {
	users: [
		{user: "username", password: "password"},
		{user: "username", password: "password"},
	]
}
```

[Document](https://docs.nats.io/nats-server/configuration/securing_nats/auth_intro/username_password)


### Using client-side username and pass

- Go, Java, JS, Python, Ruby, TypeSciprt, C : 
[Document](https://docs.nats.io/developing-with-nats/security/userpass)

- C#

```csharp
var option = ConnectionFactory.GetDefaultOptions();
option.Servers = new List<string>() {
	"nats://localhost:4222"
};
option.User = "username";
option.Password = "password";

var connection = new ConnectionFactory().CreateConnection(option);
```

## JWT

### Make JWT using nsc

- Install nats-box on Docker

```shell
$ docker pull synadia/nats-box
$ mkdir nsc
$ docker run -v $PWD/nsc:/nsc --rm -it synadia/nats-box
```

- Create nats config

```shell
# nsc add operator -n <Name> --sys
# nsc edit operator --account-jwt-server-url nats://<nats ip>:<nats port>

inspect setup
# nsc list keys --all
# nsc descirbe operator

export config file
# nsc generate config --nats-resolver > nats-auth.config
```

- Path about auth file in container

```
nsc/
├── accounts
│   ├── nats
│   │   └── <Operator Name>
│   │       ├──<Operator Name>.jwt
│   │       └── accounts
│   │           └──<Account Name>
│   │               ├──<Account Name>.jwt
│   │               └── users
│   │                   └──<User Name>
│   │                       └──<User Name>.jwt
│   └── nsc.json
└── nkeys
    ├── creds
    │   └── <Operator Name>
    │       └──<Account Name>
    │           └── <UserName>.creds
    └── keys
        ├── A
        │   └── DE
        │       └── ADETPT36WBIBUKM3IBCVM4A5YUSDXFEJPW4M6GGVBYCBW7RRNFTV5NGE.nk
        ├── O
        │   └── AF
        │       └── OAFEEYZSYYVI4FXLRXJTMM32PQEI3RGOWZJT7Y3YFM4HB7ACPE4RTJPG.nk
        └── U
            └── DB
                └── UDBD5FNQPSLIO6CDMIS5D4EBNFKYWVDNULQTFTUZJXWFNYLGFF52VZN7.nk
```

- Run Nats-server with config file

```shell
$ mkdir jwt
$ docker run --name jwt_nats -d -v $PWD/nsc/nats-auth.config:/nats-auth.config -v $PWD/jwt:/jwt -p 4222:4222 nats:latest -c /nats-auth.config
```

- Create account

```shell
# nsc add account -n <Account Name>
# nsc add user -a <Account Name> -n <User Name>
```

- Modify user/account expires

```shell
# nsc edit account <Account Name> --expiry 10m
# nsc edit user <User Name> --expiry 10m

0 - infinity
m - minute
h - hour
d - day
M - month
y - year
yyyy-mm-dd - until date
```

- Modify user/account pub/sub rule

```shell
# nsc edit account(or user) <User Name> --allow-pub "pub rule"[,"pub rule"] --allow-sub "sub rule"[,"sub rule"]
# nsc edit account(or user) <User Name> --deny-pub "pub rule"[,"pub rule"] --deny-sub "sub rule"[,"sub rule"]
# nsc edit account(or user) <User Name> --rm "string" // remove rule allow/deny pub/sub
```

- Push jwt to nats-server

```
# nsc push -a <Account Name>
# nsc push --all(-A)
```

- Delete account

```shell
$ nsc delete account <Account Name>
$ nsc push --prune(-P)
```

### Notice
한번 발급된 user credential은 expire date가 설정되지 않았다면 account계정이 삭제되거나 만료되기까지는 지속적으로 사용가능  
예를 들어 expire기간이 없는 user를 생성하고 그 credential을 배포시 user를 삭제하고 push하여도 유효한 credential로 작동(상위 account의 유효기간 내)  

- 권장 계정 사용방법  

user의 경우 수정에 따른 creds file의 교체가 필요함으로
account에 expire date를 설정하고 account의 expire date를 업데이트하는 방식으로 사용하는 것이 바람직하다.  
user는 detail 규칙 세분화 용도로 사용


### Using client-side jwt

- creds file include jwt, privateNkey

- Go, Java, JS, Python, Ruby, TypeSciprt, C : 
[Document](https://docs.nats.io/developing-with-nats/security/creds)

- C#

```csharp
// creds file
var option = ConnectionFactory.GetDefaultOptions();
option.Servers = new List<string>() {
   "nats://localhost:4222"
};
option.SetUserCredentials(credentialFilePath);

var connection = new ConnectionFactory().CreateConnection(option);
```

```csharp
// jwt, privateNKey
var option = ConnectionFactory.GetDefaultOptions();
option.Servers = new List<string>() {
   "nats://localhost:4222"
};
 option.SetJWTEventHandlers(
	 (sender, args) => { args.JWT = jwtString; }, 
	 (sender, args) =>
                {
                    string seed = privateNkey;

                    // Generate a NkeyPair
                    NkeyPair kp = Nkeys.FromSeed(seed);

                    // Sign the nonce and return the result in the SignedNonce
                    // args property.  This must be set.
                    args.SignedNonce = kp.Sign(args.ServerNonce);
                });

var connection = new ConnectionFactory().CreateConnection(option);
```
