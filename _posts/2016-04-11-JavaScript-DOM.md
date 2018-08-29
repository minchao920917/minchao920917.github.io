---
layout: post
title:  "脚本化文档"
date:   2016-04-11 23:33:54
categories: JavaScript
tags: JavaScript
excerpt:	文档对象模型(DOM)是表示和操作HTML和XML文档内容的基础API。API不是特别复杂，但是需要理解大量的结构细节
mathjax: true
author:	闵超
---

* content
{:toc}

#		脚本化文档

##		DOM概览
文档对象模型(DOM)是表示和操作HTML和XML文档内容的基础API。API不是特别复杂，但是需要理解大量的结构细节。首先，应该理解HTML或XML文档的嵌套元素在DOM树对象的表示。HTML文档的树状结构包含表示HTML标签或元素和表示文本字符串的节点，它也可能包含表示HTML注释的节点。

##		选取文档的元素
大多数客户端JavaScript程序运行时总是在操作一个或多个文档元素。当这些程序启动时，可以使用全局变量document来引用Document对象。但为了操作文档元素，必须通过某种方式获取这些引用文档元素的Element对象。DOM定义许多方式来选取元素，查询文档的一个或多个元素有如下方法;
	
-	用指定的id属性;
-	用制定的name属性；
-	用指定的标签名字;
-	用指定的CSS类；
-	匹配指定的CSS选择器。

###		通过ID选取元素
任何HTML元素可以有一个id属性，在文档中该值必须唯一。
	
	var section1 = document.getElementById("section1");
在低于IE8版本的浏览器中，getElemnetById（）对匹配元素的ID不区分大小写，而且也返回匹配name属性的元素。

###		通过名字选取元素
HTML的name属性最初打算为表单元素分配名字，在保单数据提交到服务器时，使用该属性的值。类似id属性，name是给元素分配名字，但是区别与id，name属性的值不是必须唯一：多个元素可能有相同的名字，在表单中，单选和复选按钮通常是这种情况。
	
	var radiobuttons = document.getElementsByName("favorite_color");

###		通过标签选取元素
Document对象的getElementsByTagName()方法可用来选取指定类型(标签名)的所有HTML或XML元素。
	
	var spans = document,getElementsByTagName("span");

	var firstpara = document.getElementsByTagName("p")[0];

###		通过CSS类选取元素
HTML文档和HTML元素上都可以调用getElementsByClassName()，它的返回值是一个实时的NodeList对象，包含文档或元素所有匹配的后代节点。getElementsByClassName()只需要一个字符串参数，但是该字符串可以由多个空格隔开的标识符组成。只有当元素class属性值包含所有指定的标识符时才匹配。

	//查找其class属性值中包含"warning"的所有元素
	var warnings = document.getElementsByClassName("warning");
	//查找以"log"命名并且有"error"和"fatal"类的元素的所有后代
	var log = document.getElementById("log");
	var fatal = log.getElementsByClassName("fatal error");

###		通过CSS选择器选取元素
CSS样式表有一种非常强大的语法，那就是选择器，它用来描述文档中的若干或多组元素。CSS选择器语法的全部细节介绍超出了本书的范围，但是这里有一些例子来说明基本的语法。元素可以用ID、标签或类来描述：

	#nav  //id="nav"的元素
	div   //所有<div>元素
	.warning //所有在class属性值中包含了"warning'的元素
更一般地，元素可以基于属性值来选取：
	
	p[lang="fr"]		//所有使用语法的段落，如:<p lang="fr">
	*[name="x"]			//所有包含name="x"属性的元素
这些基本的选择器可以组合使用：
	
	span.fatal.error 		//class中包含"fatal"和"error"的所有<span>元素
	span[lang="fr"].warning//所有使用语法的且其中class中包含"warning"的<span>元素
选择器可以指定文档结构：

	#log span  //id="log"元素的后代元素中所有<span>元素
	#log > span //id="log"元素的子元素中的所有<span>元素
	body>h1:first-child	//<body>中的子元素中的第一个h1元素
获取匹配一个给定选择器的元素的JavaScript方法。该API的关键是Document方法querySelectorAll()。它接受包含一个CSS选择器的字符串参数，返回一个表示文档中匹配选择器的所有NodeList对象。与前面描述的选取元素的方法不同，querySelectorAll()返回的NodeList对象并不是实时的：它包含在调用时刻选择器所匹配的元素，但它并不更新后续文档的变化。如果没有匹配的元素，querySelectorAll()将返回一个空的NodeList对象。如果选择器字符串非法，querySelectorAll()将抛出一个异常。

所有当前的浏览器都支持querySelector()和querySelectorAll()方法。但是注意，这些方法的规范并不要求支持CSS3选择器：鼓励浏览器支持和在样式表中一样的选择器集合。


##		文档结构和遍历
一旦从文档中选取了一个元素，有时需要查找文档中与之在结构上相关的部分(父亲、兄弟和子女)。文档从概念上可以看做是一颗节点对象树。

###		作为父节点树的文档
Documenet对象、它的Element对象和文档中表示文本的Text对象都是Node对象。Node定义了一下重要的属性：

-	parentNode
	
	该节点的父亲节点，或针对类似Document对象应该是null，因为它没有父亲节点。

-	childNodes
	
	只读的类数组对象(NodeList对象)，它是该节点的子节点的实时表示。

-	firstChild、lastChild
	
	该节点的子节点中的第一个和最后一个，如果该节点没有子节点则为null。
	
-	nextSibling、previoursSibling
	
	该节点的兄弟节点中的前一个和下一个。具有相同父节点的两个节点为兄弟节点。节点的顺序反映了它们在文档中出现的顺序。这两个属性将节点之间以双向链表的形式链接起来。

-	nodeType
		
	该节点的类型。9代表Document节点，1代表Element节点，3代表Text节点，8代表Comment节点，11代表DocumentFragment节点。

-	nodeValue
	
	Text节点或Comment节点的文本内容。

-	nodeName
	
	元素的标签名，以大写形式表示

###		作为元素树的文档
将文档看做是Element对象树，忽略部分文档，Text和Comment节点。

基于元素的文档遍历API的第二部分是Element属性，后者类似Node对象的子属性和兄弟属性:

-	firstElementChild,lastElementChild
	
	类似firstChild和LastChild，但只代表子Element

-	nextElementSibling,previousElementSibling
	
	类似nextSibling和previousSibling但只代表兄弟Element。

-	childElementCount
	
	子元素的数量。返回的值和children.length值相等。	

##		属性
HTML元素由一个标签和一组称为属性(attribute)的名/值对组成。DOM还定义了另外的API来获取或设置XML属性值和非标准的HTML属性。

###		HTML属性作为Element的属性
表示HTML文档元素的HTMLElement对象定义了读/写属性，它们映射了元素的HTML属性。HTMLElement定义了通用的HTTP属性。
例如：查询一张图片的URL，可以使用表示&lt;img&gt;元素的HTMLElement对象的src属性：
	
	var img = document.getElementById("myimage");
	var imgurl = img.src;//src属性是图片的URL
	img.id === "myimage"		//判定要查找图片的id
同样的，可以为一个&lt;form&gt;表单元素设置表单提交属性:

	var f = document.forms[0];	//文档中的第一个<form>
	f.action = "http://wwww.example.com/submit.do";//设置提交至的URL
	f.method = "POST";		//HTTP请求类型
HTML属性名不区分大小写，但JavaScript属性名则大小敏感。从HTML属性名转换到JavaScript属性名应该采用小写。但是，如果属性包含不止一个单词，则将除了第一个单词以外的单词的首字母大写。

###		获取和设置非标准HTML属性
HTMLElement和其子类型定义了一些属性，它们对应于元素的标准HTML属性。Element类型还定义了getAttribute()和setAttribute()方法来查询和设置非标准的HTML属性，也可以用来查询和设置XML文档中元素上的属性。
	
	var image = document.images[0];
	var width = parseInt(image.getAttribute("WIDTH"));
	image.setAttribute("class","thumbnail");


###		数据集属性
可以用getAttribute()和setAttribute()来读和写非标准属性的值。但为此付出的代价是文档将不再是合法有效的HTML。

###		作为Attr节点的属性
还有一种使用Element的属性的方法。Node类型定义了attributes属性。针对Element对象的任何节点，该属性为null。对于Element对象，attributes属性是只读的类数组对象。
	
	document.body.attributes[0]		//<body>元素的第一个属性
	document.body.attributes.bgcolor	//<body>元素的bgcolor属性
	document.body.attributes["ONLOAD"]	//<body>元素的onload属性
当索引attributes对象时得到的值是Attr对象。Attr对象是一类特殊的Node，但从来不会像Node一样去用。Attr的name和value属性返回该属性的名字和值。

##		元素的内容
-	内容是HTML字符串"Thise is a &lt;i>simple &lt;i> document"。
-	内容是纯文本字符串"This is a simple document"。
- 	内容是一个Text节点、一个包含了一个Text子节点的Element节点和另外一个Text节点。

###			作为HTML的元素内容
Element的innerHTML属性作为字符串标记返回那个元素的内容。

Web浏览器很擅长解析HTML，通常设置innerHTML效率非常高。甚至在指定的值需要解析时效率也相当不错。


###		作为纯文本的元素内容
有时需要查询纯文本形式的元素内容，或者在文档中插入纯文本(不必转义HTML标记中使用的尖括号和&符号)

	var para = document.getElementsByTagName("p")[0]; //文档中第一个<p>
	var text = para.textContent; 		//文本是"This is a simple document."
	para.textContent = "Hello World!";		//修改段落内容
textContent除了IE浏览器都支持，在IE中，可以使用Element的innerText属性来代替。

###		作为Text节点的元素内容
还有一种方法处理元素的内容是当做一个子节点列表，每个子节点可能有它自己的一组子节点。当考虑元素的内容时，通常感兴趣的是它的Text的子类型。使用nodeValue。


##		创建、插入和删除节点
我们已经看到了HTML和纯文本字符串如何来查询和修改文档内容，也已经看到我们能够遍历Document来检查组成Document的每一个Element和Text节点。

Docuement类定义了创建Element和Text对象的方法，Node类型定义了在节点树种插入、删除和替换的方法。

###		创建节点
可以使用document.createElement()方法。给方法传递元素的标签名，对HTML文档来说不区分大小写。对XML文档区分大小写。

Text节点用类似的方法创建：

	var newnode = document.createTextNode("text node content");
Document也定义了一些其他的工厂方法，如不经常使用的createComment()和createDocumentFragment()方法。

###		插入节点
一旦create出了node节点，就可以使用Node的方法appendChild()或insertBefore()将它插入到文档中。
appendChild()是在需要插入的Element节点上调用的。它插入指定的节点使其成为那个节点的最后一个子节点。

insertBefore()就像appendChild()一样，除了它接受两个参数。第一个参数就是待插入的节点，第二个参数是已存在的节点，新节点将插入该节点的前面。该方法应该是在新节点的父节点上调用，方法第二个的参数必须是父节点的子节点，如果传递null作为第二个参数，insertBefore()的行为类似appendChild()，它将节点插入在最后。


###		删除和替换节点
removeChild()方法实是从文档树中删除一个节点。但是请小心：该方法不是在待删除的节点上调用，而是在其父节点上调用。

		n.parentNode.removeChild(n);//删除自己
replaceChild()方法删除一个子节点并用一个新的节点取而代之。在父节点上调用该方法，第一个参数是新节点，第二个参数是需要被代替的节点。

	n.parentNode.replaceChild(document.createTextNode("[REDACTED]"),n);

###		使用DocumentFragment
DocumentFragment是一种特殊的Node，它作为其他节点的一个临时的容器。像这样创建一个DocumnetFragment:
	
	var frag = document.createDocumentFragment();
像Docunment节点一样，DocumnentFragment是独立的，而不是任何其他文档的一部分。它的parentNode总是为null。但类似Element，它可以有任意多的子节点。可以用appendChild()、insertBefore()等方法来操作它们。

**后续的生成目录表、文档和元素的几何形状和滚动、HTML表单、其他文档特性后续会补上。**