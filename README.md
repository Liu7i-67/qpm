柒的神奇宝贝百科

自用工具，有需要自取

# 安卓开发

- 清空缓存

```bash
cd android

gradlew clean
```

- 打包

```bash
cd android

./gradlew assembleRelease
```

- 构建时如果下载包的速度很慢，自行修改`android/gradle.properties`中的代理配置,例如：

```bash
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
```
