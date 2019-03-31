### mongod

```js
show dbs; 显示数据库
show collections; 显示集合
db 当前数据库
db.dorpDatabase() 删除数据库
db.user.drop() 删除集合
在集合中插入内容 db.user.inser() / save() 会更新
db.user.find() 在集合中读取内容
update $set $unset $inc 自增 $push $pop 'hobby.0' $ne $addToSet 去重
db.user.remove() 默认会把匹配的都删除 删除一条设置{justOne: true}

$in $nin $not $lt $gt $lte 小于等于 {_id: 0} 不返回id
1表示出现 0表示不出现 但是不能一起出现
```