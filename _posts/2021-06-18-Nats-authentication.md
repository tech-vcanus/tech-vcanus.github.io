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

- Create operator and out nats config
operation을 등록하고 해당 설정을 내보내서 nats server를 구동

```shell
# nsc add operator -n <Name> --sys
# nsc edit operator --account-jwt-server-url nats://<nats ip>:<nats port>

inspect setup
# nsc list keys --all
# nsc descirbe operator

export config file
# nsc generate config --nats-resolver > nats-auth.config
```

- Run Nats-server with config file

```shell
$ mkdir jwt
$ docker run --name jwt_nats -d -v $PWD/nsc/nats-auth.config:/nats-auth.config -v $PWD/jwt:/jwt -p 4222:4222 nats:latest -c /nats-auth.config
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

- Use client-side authentication

```text
생성한 user이름.creds파일 자체를 사용하거나 파일에서 정보를 취득
creds파일 위치 : ./nsc/nkeys/creds/생성operation/생성account/user이름.creds

creds 파일 내용 example(jwt와 nkey로 구성)

-----BEGIN NATS USER JWT-----
eyJ0eXAiOiJKV1QiLCJhbGciOiJlZDI1NTE5LW5rZXkifQ.eyJqdGkiOiJOUDRJM1VHMlNSRk9YU1dUMkVBSzVSWkVYRUFXNkMzT1I0S0EzSFVWRzZDN1pETUlaS0JRIiwiaWF0IjoxNjQxMTgzMzQ0LCJpc3MiOiJBQlZONzNHU0JYQ0M3VTZLUkFGUVdCRVZRWlZQSFBNVUhYNUQ1UUs2UFBZMkZTTks1S1FIT01WNCIsIm5hbWUiOiJ1c2VyYSIsInN1YiI6IlVDT1ZTTzJZV1pMMjRJRkRTSFozRERZTzJVM0VXVUlSV1JWRDJVQlNNRENWS1BIRlFYVzI1RERYIiwibmF0cyI6eyJwdWIiOnt9LCJzdWIiOnt9LCJzdWJzIjotMSwiZGF0YSI6LTEsInBheWxvYWQiOi0xLCJ0eXBlIjoidXNlciIsInZlcnNpb24iOjJ9fQ.P4qAGyOHlB_OdnPzzwOiqQU2BmErAKVtZzwAHZG1vVr15yM8qXT2La_xDRqigVPshV-bkj_dtJ4KDCgCzdoZCw
------END NATS USER JWT------

************************* IMPORTANT *************************
NKEY Seed printed below can be used to sign and prove identity.
NKEYs are sensitive and should be treated as secrets.

-----BEGIN USER NKEY SEED-----
SUAMFALQFBXJX4ZXTJ4Z7UOSWGRSDFEH355CXZRZADEBLYEYQ2YYIH52WM
------END USER NKEY SEED------

*************************************************************
```

### Notice(계정 사용 유의사항)

- nats server는 처음 동작할때 config에 입력된 operator정보와 nsc가 push해주는 account 정보만 가지고 있다
- account를 기반으로 만들어지는 user는 nats server에 저장되지 않음
- 따라서 한번 발급된 user credential(jwt)은 만료기한(expire date)가 설정되지 않았다면 상위 account계정이 삭제되거나 만료되기까지는 지속적으로 사용가능
  - 예를 들어 만료기간이 없는 user를 생성하고 그 credential(jwt)을 사용자에게 배포후에, nsc에서 user를 삭제하여도 기존에 발급된 user credential(jwt)가 그대로 정상 작동하게 된다.
- user를 수정하게 되면 creds파일 내용(jwt)가 변동. 해당 내용으로 사용자에게 재배포 하여야 해당 내용이 적용 가능
- account도 수정후 수정된 내용을 적용하기 위해선 반드시 nats server로 push 해줘야 한다(nsc push)


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
