## 5 用戶資訊

用戶資料的操作，包括註冊新用戶、修改用戶資訊、刪除用戶資訊等



### 5.1 註冊新用戶

```
POST /api/user
```

註冊新的用戶

#### Request: String in HTTP Header, Parameter(s) in HTTP Body

Headers

| Name | Type | Description |
| ---- | ---- | ----------- |
| `Authorization` | `string` | **(必填)** bearer token |


Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| `serialNo` | `text` | **(必填)** 編號(不可與其他用戶重複) |
| `email` | `text` | **(必填)** 電子郵件 |
| `loginName` | `text` | **(必填)** 帳號(可與email相同) |
| `pin` | `text` | **(必填)** 密碼 |
| `fullName` | `text` | 全名 |
| `tel` | `text` | 電話 |
| `birthday` | `text` | 生日；格式為 `yyyy-mm-dd` |
| `gender` | `text` | 性別；枚舉值為 `male`, `female` |
| `zipCode` | `text` | 郵遞區號 |
| `street` | `text` | 街道地址 |
| `scope[]` | `text` | 授權範圍，必須是客戶已登錄的其中一個授權範圍(OAuthScope) |

```
serialNo: {{$randomLastName}}{{$randomInt}}
email: {{$randomExampleEmail}}
loginName: {{$randomExampleEmail}}
pin: {{$randomPassword}}
fullName: {{$randomFullName}}
tel: {{$randomPhoneNumber}}
birthday: 1942-01-08
gender: male
zipCode: 104
street: {{$randomStreetAddress}}
scope[]: post:product
scope[]: put:product

```

#### Response: 成功 204

```
Status: 204 No Content
```

#### Response: 失敗 400|401

```
Status: 401 Unauthorized
```
```json
{
  "message": "token invalid"
}
```


### 5.2 修改用戶資料

```
PUT /api/user/{{userSerialNo}}
```

修改已註冊用戶的個人資料

#### Request: String in HTTP Header, Parameter(s) in HTTP Body

Headers

| Name | Type | Description |
| ---- | ---- | ----------- |
| `Authorization` | `string` | **(必填)** bearer token |


Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| `serialNo` | `text` | 編號(不可與其他用戶重複) |
| `email` | `text` | 電子郵件 |
| `loginName` | `text` | 帳號(可與email相同) |
| `pin` | `text` | 密碼 |
| `fullName` | `text` | 全名 |
| `tel` | `text` | 電話 |
| `birthday` | `text` | 生日；格式為 `yyyy-mm-dd` |
| `gender` | `text` | 性別；枚舉值為 `male`, `female` |
| `zipCode` | `text` | 郵遞區號 |
| `street` | `text` | 街道地址 |

```
serialNo: {{$randomLastName}}{{$randomInt}}
email: {{$randomExampleEmail}}
loginName: {{$randomExampleEmail}}
pin: {{$randomPassword}}
fullName: {{$randomFullName}}
tel: {{$randomPhoneNumber}}
birthday: 1942-01-08
gender: male
zipCode: 104
street: {{$randomStreetAddress}}

```

#### Response: 成功 204

```
Status: 204 No Content
```

#### Response: 失敗 400|401

```
Status: 401 Unauthorized
```
```json
{
  "message": "token invalid"
}
```


### 5.3 刪除用戶

```
DELETE /api/user/{{userSerialNo}}
```



#### Request: String in HTTP Header

Headers

| Name | Type | Description |
| ---- | ---- | ----------- |
| `Authorization` | `string` | **(必填)** bearer token |


#### Response: 成功 204

```
Status: 204 No Content
```

#### Response: 失敗 400|401

```
Status: 400 Bad Request
```
```json
{
  "message": "can not find user"
}
```


### 5.4 新增授權範圍

```
POST /api/user-scope/{{userSerialNo}}
```

新增指定用戶的授權範圍。

#### Request: String in HTTP Header, Parameter(s) in HTTP Body

Headers

| Name | Type | Description |
| ---- | ---- | ----------- |
| `Authorization` | `string` | **(必填)** bearer token |


Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| `scope[]` | `text` | 授權範圍，必須是客戶已登錄的其中一個授權範圍(OAuthScope) |

```
scope[]: post:product
scope[]: delete:product

```



### 5.5 移除授權範圍

```
DELETE /api/user-scope/{{userSerialNo}}
```

移除指定用戶的授權範圍。

#### Request: String in HTTP Header, Parameter(s) in HTTP Body

Headers

| Name | Type | Description |
| ---- | ---- | ----------- |
| `Authorization` | `string` | **(必填)** bearer token |


Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| `scope[]` | `text` | 授權範圍，必須是客戶已登錄的其中一個授權範圍(OAuthScope) |

```
scope[]: post:product
scope[]: delete:product

```




