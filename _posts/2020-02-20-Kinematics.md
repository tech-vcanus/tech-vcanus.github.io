---
title: "Kinematics"
data: 2020-02-20 00:00:00 -0000
categories: research
tags: ForwardKinematics, InverseKinematics, DHParameter, HomogeneousMatrix
---

Written by BGKim, VCANUS

# Homogeneous Matrix(동차 행렬)

 방향성을 가진 점을 좌표와 축을 이용해 표현한 행렬
```
|r11, r12, r13, x|
|r21, r22, r23, y|
|r31, r32, r33, z|
|  0,   0,   0, 1|
```
r11 r21 r31 : x축 벡터<br>
r12 r22 r32 : y축 벡터<br>
r13 r23 r33 : z축 벡터<br>
x y z : 좌표

# DH(Denavit-Hartenberg) Parameter

 각각의 Axis 관계를 4개의 parameter로 표현한 방식
## table

i | alpha | a | d | theta
---|---|---|---|---
1 | ~ | ~ | ~ | ~
...| ~ | ~ | ~ | ~
n | ~ | ~ | ~ | ~

alpha(Twist) : x축을 기준으로 변환 각도<br>
a(Length) : x축을 기준으로 거리<br>
d(Offset) : z축을 기준으로 거리<br>
theta(Angle) : z축 기준으로 변환 각도<br>

*x축 : arm의 기준 축 <br>
*z축 : arm의 회전 축 <br>
*기본적으로 오른손 법칙을 따른다

# Forward Kinematics(정기구학)

 축의 관계를 통해 마지막 점의 vector와 point를 얻는 이론
```
ex)
R = R_1 * R_2 * R_3 * R_4 * R_5 * R_6
// R1..R6는 각 축의 동차행렬을 의미
// R은 모든 축의 영향을 받은 동차행렬이 반환된다.
```

## Get each axis Homogeneous Matrix
```
R_n = RotZ(theta) * Trans(0,0,d) * Trans(a,0,0) * RotX(alpha)

function RotZ(v){
    return Matrix[
        [cos(v), -sin(v), 0, 0]
        [sin(v), cos(v), 0, 0]
        [0, 0, 1, 0]
        [0, 0, 0, 1]
    ]
}
    
function RotX(v){
    return Matrix[
        [1, 0, 0, 0]
        [0, cos(v), -sin(v), 0]
        [0, sin(v), cos(v), 0]
        [0, 0, 0, 1]
    ]
}

Trans(x, y, z){
    return Matrix[
        [1, 0, 0, x]
        [0, 1, 0, y]
        [0, 0, 1, z]
        [0, 0, 0, 1]
    ]
}
```
*위 식을 보기 전 알아야 할 개념은 현재 축에서 다음 축으로 이동하기 위해서 어떻게 이동하고 어떻게 각도를 변환 할 지 아는 것이다.<br>
*각 arm axis를 점,축 그림으로 그려 축사이의 관계를 볼 줄 알아야 한다

# Inverse Kinematics(역기구학)

 정기구학과 반대되는 개념으로, 끝점의 좌표와 vector를 알 때 각 축의 회전각을 구하는 이론이다. 

## Analytical Solution

 정기구학 식(R = R_1 * .. *R_n)에서 R_1...R_n을 역행렬을 취하면서 theta_1..theta_n의 방정식을 구하는 방식이다
```
ex)
R[2,2] = r33
(R_1 * .. *R_n)[2,2] = -cos(theta2) 일 때

theta2 = acos(-r33)
```

## Approximating Solution With Jacobian

 근삿값을 구하는 이론으로, 각 theta의 오차를 줄여가면서 목적 좌표에 도달하게 한다<br> 
 R_1 * .. *R_n의 식이 복잡하여 수식을 풀기 까다로워 질 때 사용하면 유용하다 

```
ex)
px = R_1 * .. *R_n[0,3]
py = R_1 * .. *R_n[1,3]
pz = R_1 * .. *R_n[2,3]

*diff(식, 미분대상) : 미분 함수
JacobianMatrix = 
[
    [diff(px, theta1), diff(py, theta1), diff(pz, theta1)]
    [diff(px, theta2), diff(py, theta2), diff(pz, theta2)]
    ...
    [diff(px, thetaN), diff(py, thetaN), diff(pz, thetaN)]
]


*Jacobian 풀이
do{
    resutTheta_n+1 = resutTheta_n 
        + invJacobianMatrix(resutTheta_n) * (targetPosition - presentPosition)
}while(resutTheta_n+1 - resultTheta_n < epsilon)

```


