# EMPIRE Ecosystem 官网

这是一个适合部署到 Vercel 的 Next.js + Tailwind CSS 官网项目。内容集中放在 `data/content.ts`，后续你主要改这个文件，就能更新页面上的文案、服务、联系方式、创始人信息和主题配置。

## 你现在拥有的东西

- 一个完整可运行的公司官网
- 黑金版 / 白金版 / 自动主题切换
- Founder 创始人介绍区
- 联系表单展示区
- 微信号复制提示
- 页面批注工具
- 适合以后部署到 Vercel 的代码结构
- 适合以后接入 Sanity / TinaCMS / Builder.io 的内容结构

## 日常维护最简单流程

1. 打开网站本地预览：`http://localhost:3000`
2. 看哪里不满意。
3. 点击左下角“批注”。
4. 点击“开始圈选”。
5. 用鼠标圈出要修改的位置。
6. 写下修改意见。
7. 保存批注。
8. 点“复制全部批注给 Codex”。
9. 把复制的内容发给 Codex。
10. Codex 根据你的批注改页面。

你不需要懂代码，只要像改海报一样指出哪里要改。

## 页面批注工具怎么用

网站左下角有一个“批注”按钮。

使用方式：

1. 点击“批注”。
2. 点击“开始圈选”。
3. 在网页上按住鼠标拖动，圈出你要修改的位置。
4. 松开鼠标。
5. 在弹出的输入框里写修改意见。
6. 点击“保存批注”。
7. 可以继续圈选下一个地方。
8. 全部写完后，点击“复制全部批注给 Codex”。
9. 回到 Codex，把批注粘贴给我。

批注示例：

```text
这里标题想更高级一点
这个按钮颜色太金了，低调一点
Founder 这里想换成老板真人照片
这个服务卡片顺序调整一下
手机端这里太挤
```

## 页面内上传图片和改文字怎么用

网站右下角有一个“维护”按钮。

它可以做两件事：

1. 直接上传图片预览。
2. 打开文字编辑模式，直接点页面文字修改。

可上传图片位置：

- Logo
- 首页背景图
- 服务网络图
- 老板照片

使用方式：

1. 点击右下角“维护”。
2. 如果要换图片，点击对应的“选择图片”。
3. 如果要改文字，点击“文字编辑模式”的“开启”。
4. 页面上出现带金色虚线的文字后，直接点击文字修改。
5. 修改完成后，点击页面其他地方，内容会保存在本机浏览器。
6. 点击“复制修改记录给 Codex”。
7. 把复制内容发给 Codex，让 Codex 帮你正式写进项目。

重要说明：

这个“维护”面板适合你像改海报一样快速试效果。它的修改会先保存在你当前浏览器里，方便预览，但不会自动写进代码和服务器。

正式上线前，请把“复制修改记录给 Codex”的内容发给 Codex，由 Codex 帮你固化到：

- `data/content.ts`
- `public/images`
- 对应组件文件

如果你想清空本机预览修改，点击“维护”面板里的“清空本机预览修改”。

## 怎么关闭页面批注工具

如果网站准备正式上线，不想让访客看到左下角“批注”按钮：

1. 打开 `data/content.ts`
2. 找到：

```ts
maintenance: {
  annotationEnabled: true
}
```

3. 改成：

```ts
maintenance: {
  annotationEnabled: false
}
```

保存后，批注按钮就不会显示。

## 本地怎么运行网站

1. 打开 Windows 终端或 VS Code 终端。
2. 进入项目文件夹：`C:\Users\31651\Documents\EMPIRE`
3. 第一次运行先安装依赖：

```bash
npm install
```

4. 启动本地预览：

```bash
npm run dev
```

5. 看到类似 `http://localhost:3000` 就算成功。
6. 打开浏览器，访问 `http://localhost:3000`。

## 怎么修改文案

打开 `data/content.ts`，里面集中存放了官网绝大多数文字：

- 首页 Hero：找 `hero`
- 客户问题：找 `problem`
- 六大服务：找 `services`
- 身份流程：找 `identityJourney`
- 为什么选择我们：找 `whyEmpire`
- 创始人：找 `founder`
- 集团资质：找 `credentials`
- 服务网络：找 `network`
- 联系方式：找 `contact`

修改后保存文件，浏览器通常会自动刷新。

## 怎么修改邮箱

打开 `data/content.ts`，找到：

```ts
contact: {
  email: "3165142438@qq.com",
  emailHref: "mailto:3165142438@qq.com"
}
```

把两个地方都换成新邮箱。`emailHref` 前面要保留 `mailto:`。

## 怎么修改微信号

打开 `data/content.ts`，找到：

```ts
wechat: "EPTeam"
```

把 `EPTeam` 改成新的微信号即可。页面里所有“复制微信号”按钮都会自动使用新微信号。

## 怎么修改创始人信息

打开 `data/content.ts`，找到 `founder` 字段。你可以修改：

- `name`：英文名
- `displayName`：中文展示名
- `role`：身份定位
- `slogan`：核心短句
- `vision`：长期愿景
- `bio` 和 `secondBio`：人物介绍
- `highlights`：资历亮点卡片
- `accounts`：内容账号
- `image`：创始人照片路径

## 怎么替换创始人照片

1. 打开 `public/images` 文件夹。
2. 把老板照片放进去。
3. 推荐命名为：`founder-lawrence.jpg`
4. 如果使用这个文件名，不需要改代码。
5. 如果想换其他文件名，打开 `data/content.ts`，把：

```ts
image: "/images/founder-lawrence.jpg"
```

改成新的文件名，例如：

```ts
image: "/images/lawrence-new.jpg"
```

## 怎么添加创始人账号链接

打开 `data/content.ts`，找到：

```ts
accounts: [
  { name: "香港老板Lawrence", platform: "内容账号", url: "" }
]
```

如果 `url` 是空字符串，页面只展示账号名称，不跳转。
如果填入真实链接，点击账号会打开对应链接。

## 怎么换 Logo

当前网站已经使用 `public/images/logo.svg` 作为网页 Logo。

如果你手上是 `.ai` 文件：

1. 用 Adobe Illustrator 打开 `.ai`。
2. 选择 `文件` → `导出`。
3. 推荐导出为 `SVG` 或透明背景 `PNG`。
4. 如果导出为 SVG，命名为 `logo.svg`，放到 `public/images` 里覆盖原文件。
5. 如果导出为 PNG，命名为 `logo.png`，放到 `public/images` 里，然后打开 `data/content.ts`，把：

```ts
logo: "/images/logo.svg"
```

改成：

```ts
logo: "/images/logo.png"
```

网页不能直接显示 `.ai` 文件，所以一定要先导出成 SVG 或 PNG。

## 怎么使用语言切换

网站右上角有语言图标，可以选择：

- 繁體中文
- 简体中文
- English

当前页面默认设置为繁體中文，并会保存用户选择。正式做完整三语官网时，建议把 `data/content.ts` 升级成多语言内容结构，例如：

```ts
content.zhHant
content.zhHans
content.en
```

这样每种语言都可以有完整独立文案，不会依赖自动翻译。

## 怎么换图片

所有图片建议放在 `public/images`。

推荐文件名：

- `logo.png`
- `hong-kong-city.jpg`
- `office.jpg`
- `service-network.jpg`
- `founder-lawrence.jpg`

图片路径可以集中写在 `data/content.ts` 的 `assets` 字段里。当前没有真实图片时，页面会先显示高级占位区域。

## 首页香港背景图怎么换

首页 Hero 当前使用一张固定的香港商务城市背景图：

```text
public/images/hero-hong-kong.svg
```

如果你想换成照片，建议导出为 JPG，并放到：

```text
public/images/hero-hong-kong.jpg
```

然后打开 `data/content.ts`，找到：

```ts
heroCity: "/images/hero-hong-kong.svg"
```

改成：

```ts
heroCity: "/images/hero-hong-kong.jpg"
```

建议选择商务风、金融感、干净高级的香港城市或维港图片。页面已经在图片上叠加了渐变，确保主标题和正文不会被背景抢走。

## 服务网络图片怎么换

服务网络区域会读取：

```ts
/images/service-network.jpg
```

你可以把办公室或服务网络图片放到：

```text
public/images/service-network.jpg
```

如果文件名不同，就打开 `data/content.ts`，找到：

```ts
network: "/images/service-network.jpg"
```

改成你的新文件名。

## 怎么切换主题模式

网站右上角有三个按钮：

- 自动图标：跟随用户电脑 / 手机系统深色或浅色模式
- 太阳图标：白天白金版
- 月亮图标：晚上黑金版

用户手动选择白金或黑金后，会保存到浏览器，下次打开仍然使用上一次选择。

如果你想改默认逻辑，打开 `data/content.ts`，找到：

```ts
theme: {
  defaultMode: "system"
}
```

可选值：

- `"system"`：跟随用户电脑 / 手机系统设置
- `"time"`：按照东八区时间自动切换，07:00 - 18:59 白金，19:00 - 06:59 黑金
- `"manual"`：由用户手动选择黑金或白金

更底层的主题函数在 `lib/theme.ts`，里面已经写好注释，方便以后调整。

## 怎么部署到 Vercel

1. 注册并登录 Vercel。
2. 把这个项目上传到 GitHub。
3. 在 Vercel 点击 `Add New Project`。
4. 选择这个 GitHub 项目。
5. Framework Preset 选择 `Next.js`。
6. 点击 `Deploy`。
7. 部署成功后，Vercel 会给你一个临时网址。

## 零基础上线步骤

上线可以理解成三件事：

1. 把代码放到 GitHub。
2. 让 Vercel 读取 GitHub 代码并生成网站。
3. 把你的域名绑定到 Vercel。

推荐流程：

1. 先在本地确认 `http://localhost:3000` 能正常打开。
2. 确认文案、图片、联系方式基本没有问题。
3. 把 `maintenance.annotationEnabled` 改成 `false`，关闭批注工具。
4. 上传到 GitHub。
5. 进入 Vercel，导入这个 GitHub 项目。
6. Vercel 自动部署。
7. 部署成功后，把 Vercel 临时网址发给客户或团队预览。
8. 购买域名后，在 Vercel 绑定域名。

如果你不会上传 GitHub，可以让 Codex 后续继续协助。

## 怎么绑定域名

1. 在 Vercel 项目里进入 `Settings`。
2. 找到 `Domains`。
3. 输入你购买的域名。
4. 按照 Vercel 给出的提示，到域名购买平台添加 DNS 记录。
5. 等待生效后，你的官网就可以用自己的域名打开。

## 上线前检查清单

- 首页标题是否正确
- 联系邮箱是否正确
- 微信号是否正确
- 创始人姓名、Title、照片是否正确
- 集团公司名称是否正确
- 地址是否正确
- 牌照号码是否需要补充
- 手机端菜单是否正常
- 白金 / 黑金主题是否都好看
- “复制微信号”是否弹出提示
- `maintenance.annotationEnabled` 是否已改成 `false`

## 如何让表单真正可用

当前表单是前端静态展示，点击提交后会显示提示：

`信息已记录。正式上线后可接入表单系统或邮件通知。`

正式上线后可以接入：

- Formspree
- Resend
- EmailJS
- Vercel Serverless Function
- Sanity / TinaCMS / Builder.io 的表单或内容能力

## 后续如何升级成可视化编辑

当前项目适合长期官网、SEO、部署和扩展。短期先改 `data/content.ts` 最稳定。

中期可以接入：

- Sanity
- TinaCMS
- Builder.io

如果你想真正像设计工具一样拖拽式编辑，可以考虑：

- Framer
- Webflow

## 我如何像改海报一样维护这个网站

短期：改 `data/content.ts` 就能改内容。

修改联系邮箱：打开 `data/content.ts`，找到 `contact.email` 和 `contact.emailHref`，把邮箱替换成新的即可。`emailHref` 要写成 `mailto:你的邮箱`。

修改微信号：打开 `data/content.ts`，找到 `contact.wechat`，把 `EPTeam` 改成新的微信号即可。

修改创始人信息：打开 `data/content.ts`，找到 `founder` 字段，可以修改创始人姓名、显示名称、title、slogan、vision、bio、highlights、accounts、image。

替换创始人照片：把老板照片放到 `public/images` 目录下，命名为 `founder-lawrence.jpg`。如果想换其他文件名，需要同步修改 `data/content.ts` 里的 `founder.image`。

添加账号链接：打开 `data/content.ts`，找到 `founder.accounts`，把对应账号的 `url` 从空字符串改成真实链接即可。如果 `url` 为空，页面只展示账号名称，不跳转。如果 `url` 有内容，点击账号可以打开对应链接。

修改主题逻辑：

- 打开 `data/content.ts` 或 `lib/theme.ts`
- 找到 `theme.defaultMode`
- 设置为 `"system"`：跟随用户电脑 / 手机系统的深色或浅色模式
- 设置为 `"time"`：按照东八区时间，白天白金，晚上黑金
- 设置为 `"manual"`：由用户手动选择黑金或白金

微信联系逻辑说明：由于网页无法稳定直接打开微信联系人，本项目采用“复制微信号 + 提示用户前往微信粘贴搜索”的方式，兼容性更好。

表单接入说明：当前版本先做前端静态展示和 `mailto` 邮件跳转，后续可以接入 Formspree、Resend、EmailJS、Vercel Serverless Function 或 CMS 表单工具。

中期：可以接入 Sanity / TinaCMS 做可视化内容管理。

如果你想真正拖拽式视觉编辑，可以考虑 Framer / Webflow。

当前代码项目更适合长期官网、SEO、部署和扩展。
