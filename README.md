# tcy-modules

均支持AMD

源码都在 `src` 文件夹里

[check-img-square](#check-img-square "判断图片是否为正方形，并返回图片的一些信息(实际宽、高)。")

## check-img-square

判断图片是否为正方形，并返回图片的一些信息(实际宽、高)。

checkImgSquare({params}, callback(ret))


### params

url：

- 类型：字符串
- 默认值：无
- 描述：图片地址。例如：
    - '../img/logo.png'
    - 'http://www.apicloud.com/img/mobile/wx_logo.jpg'
    - '/storage/emulated/0/UZMap/...'

side：

- 类型：JSON 对象
- 默认值：无
- 描述：（可选项）如果图片为正方形时，将判断是否符合指定高度。不传则不判断
- 内部字段：
```javascript
{
    min: 100,  // 数字类型。单位：px像素。图片最小高度，不传则不判断
    max: 800   // 数字类型。单位：px像素。图片最大高度，不传则不判断
}
```

### callback(ret)

ret：

- 类型：JSON 对象
- 描述：回调
- 内部字段：
```javascript
{
    status: true,  // 布尔类型
    height: "",    // 数字类型。图片的真实高度
    width: "",     // 数字类型。图片的真实宽度
    code: "",      // 数字类型。如果status为true,则不返回此字段
                     //错误码：
                     // 2(缺少url参数)
                     // 3(图片不是正方形)
                     // 4(大于最小值)
                     // 5(大于最大值)
}
```

## 实例

```javascript
checkImgSquare({
    url: 'http://www.apicloud.com/img/mobile/wx_logo.jpg',
}, function(ret) {
    console.log(JSON.stringify(ret));
});

// 图片为正方形，且大于100，小于800
checkImgSquare({
    url: '../img/149639839823668.jpg',
    side: {
        min: 100,
        max: 800,
    },
}, function(ret) {
    console.log(JSON.stringify(ret));
});


```

