## 代码开源协议不完全指南

### Apache v2 License
来源 | 是否允许修改 | 是否允许再发布
---|:-----:| :-----: |
Apache | 是 | 是

需要满足的条件和BSD类似

1. 给用户 Apache Licence
2. 修改代码需要说明
3. 延伸代码要带协议
4. 再发布是，Notice 文件中需带有 Apache License


#### 应用场景
商业应用

### MIT License
来源 | 是否允许修改 | 是否允许再发布
---|:-----:| :-----: |
MIT | 是 | 是


需要满足的条件和`3-clause BSD license`类似,但权力更大限制更少

1. 在软件和软件的所有副本中都必须包含版权声明和许可声明。
2. 此授权条款并非属copyleft的自由软体授权条款，允许在自由/开放源码软体或非自由软体（proprietary software）所使用。（与`3-clause BSD license`的本质区别）
3. MIT条款可与其他授权条款并存。
4. 是自由软体基金会（FSF）所认可的自由软体授权条款，与GPL相容。


### GPL v2
与 BSD、 Apache License 最大区别：不需修改后和衍生的代码作为闭源的商业软件发布和销售

来源 | 是否允许修改 | 是否允许再发布
---|:-----:| :-----: |
GPL | 是 | 否

#### 应用场景
商业软件或者对代码有保密要求的部门不适合

### Artistic License 2.0
艺术许可协议，自由软件授权条款。

来源 | 是否允许修改 | 是否允许再发布
---|:-----:| :-----: |
Larry Wall | / | /

#### 应用场景
官方发布的 Perl 解释器和大部分 CPAN 模块的授权

### BSD 2-Clouse license

来源 | 是否允许修改 | 是否允许再发布
---|:-----:| :-----: |
BSD | 是 | 是

#### 规则
1. 再发布的产品中包含源代码，则源代码中必须带有原来代码中的 BSD 协议
2. 再发布的是二进制库/软件， 则需要在类库/ 软件的文档和版权声明中包含原来代码的 BSD 协议


### Affero GPL

来源：Affero | Inc

适用场景：应用于在网络上运行的应用程式（如Web应用）

### LGPL v2.1

来源 | 是否允许修改 | 是否允许再发布 | 是否允许销售
---|:-----:| :-----: | :-----:|
 / | 是 | 是 | 是

#### 应用场景
类库.
LGPL协议的开源代码很适合作为第三方类库被商业软件引用，但不适合希望以LGPL协议代码为基础，通过修改和衍生的方式做二次开发的商业软件采用。

### BSD (3-Clause) License

来源 | 是否允许修改 | 是否允许再发布 | 是否允许销售
---|:-----:| :-----: | :-----:|
 / | 是 | 是 | 否
 
 
###  Eclipse Public License v1.0

 来源 | 是否允许修改 | 是否允许再发布 | 是否允许销售
---|:-----:| :-----: | :-----:|
 / | 是 | 是 | 是



### LGPL v3
相对于LGPL v2，不仅要求用户公布修改的源代码，还要求公布相关硬件。


### GPL v3
GPL v3与GPL v2类似。区别在于，不仅要求用户公布修改的源代码，还要求公布相关硬件。


### Mozilla Public License Version 2.0

 来源 | 是否允许修改 | 是否允许再发布 | 是否允许销售
---|:-----:| :-----: | :-----:|
Netscape的 Mozilla小组 | 是 | 是 | 是


相比而言MPL的不同之处:

- MPL允许一个企业在自己已有的源代码库上加一个接口，除了接口程序的源代码以MPL 许可证的形式对外许可外，源代码库中的源代码就可以不用MPL许可证的方式强制对外许可。
- MPL许可证允许被许可人将经过MPL许可证获得的源代码同自己其他类型的代码混合得到自己的软件程序。
- 对软件专利的态度：MPL许可证要求源代码的提供者不能提供已经受专利保护的源代码，也不能在将这些源代码以开放源代码许可证形式许可后再去申请与这些源代码有关的专利。
- 对源代码的定义： “源代码指的是对作品进行修改最优先择 取的形式，它包括:所有模块的所有源程序，加上有关的接口的定义，加上控制可执行作品的安装和编译的‘原本’（原文为‘Script’），或者不是与初始 源代码显著不同的源代码就是被源代码贡献者选择的从公共领域可以得到的程序代码。”
- MPL许可证第3条有专门的一款是关于对源代码修改进行描述的规定，就是要求所有再发布者都得有一个专门的文件就对源代码程序修改的时间和修改的方式有描述。


### Public Domain
Public Domain 是人类的一部分作品与一部分知识的总汇，可以包括文章、艺术品、音乐、科学、发明等等。对于领域内的知识财产，任何个人或团体都不具所有权益（所有权益通常由版权或专利体现）。这些知识发明属于公有文化遗产。

---
## 总结

1.  想要一个简单宽松的许可证：**MIT许可证**。
	- 这是一个宽松的、简明扼要的许可证，只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。使用该许可证的项目：jQuery、Rails2.  

2. 关心专利： **Apache许可证**。
	- 这类似于MIT许可证，但它同时还包含了贡献者向用户提供专利授权相关的条款。使用该许可证的项目：Apache、SVN和NuGet3.  

3. 关心项目的共享改进：**GPL（ V2或 V3）许可证**。
	- 这是一种copyleft许可证，要求修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。V3版本与V2类似，但其进一步约束了在某些限制软件更改的硬件上的使用范围。使用该许可证的项目：Linux、Git4. 

4. 开源项目不是代码： **Creative Commons**。
	- 这是一个相对宽松的版权协议。它只保留几种了权利（some rights reserved）。使用者可以明确知道所有者的权利，不容易侵犯对方的版权，作品可以得到有效传播。

### 作为作者，你可以选择以下1~4种权利组合:

1. 署名（Attribution，简写为BY）：必须提到原作者。
2. 非商业用途（Noncommercial，简写为NC）：不得用于盈利性目的。
3. 禁止演绎（No Derivative Works，简写为ND）：不得修改原作品, 不得再创作。
4. 相同方式共享（Share Alike，简写为SA）：允许修改原作品，但必须使用相同的许可证发布。



> 参考链接
> 1. [开源许可证都有什么区别,一般开源项目用什么许可证? - 童仲毅的回答 - 知乎](https://www.zhihu.com/question/28292322/answer/40238421)
> 2. [码云文档](https://gitee.com/oschina/git-osc/wikis/pages?title=License&parent=)
> 3. [如何为你的代码选择一个开源协议](http://www.cnblogs.com/Wayou/p/how_to_choose_a_license.html)











