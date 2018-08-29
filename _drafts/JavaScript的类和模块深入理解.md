#	JavaScript中的类和模块

上一篇介绍了JavaScript的基本数据类型之一——对象类型，通过上一章我们知道了，每一个JavaScript对象都是一个属性集合，相互之间没有任何联系。设想一下，如果JavaScript让每一个对象都共享某些属性，这种"共享"的特性是非常有用的。C++和java中，让每一个互不联系的对象具有共享特性，是定义的类（class）来实现面对对象编程。在JavaScript中也可以定义对象的类。

类的成员或实例都包含一些属性，用于存放或定义它们的状态。其中一些属性定义它们的行为(页脚方法)。这些行为通常是由类定义的。所有由该类创建的实例对这些属性进行共享。

例如，Comlex的类用来表示复数。同样还定义了一些复数运算。一个comlex实例应该包含复数的实部和虚部属性，还应该具有Comlex类定义的复数加减乘除操作（行为，也叫方法）。

###		类以及类的创建
在JavaScript中，JavaScript本身并不支持面向对象，它没有访问控制符(public、protected、default、private)，也没有定义类的关键字Class，也没有支持继承的extend或冒号，它也没有用来支持虚函数的virtual,面向对象的语言如C++和java中，类(class)是对象(object)的模板，定义了同一组对象(实例)共有的属性和方法。

不过，JavaScript是一门灵活的语言，虽然JavaScript语言不支持直接定义"类"，但是我们充分发挥JavaScript的灵活性，模拟出类来。
下面先描述三种定义类的方法：

1.	构造函数法
	
	这是经典的方法，它用构造函数模拟"类"，在其内部使用this关键字，指代实例对象。
		
		function Cat(){
			this.name = "小花";
		}
	生成实例时用，new 关键字，这是和java等面向对象编程语言相同
		
		var cat1 = new Cat();
		console.log(cat1.name);//"小花"
	类的属性和方法，还可以定义在构造函数的prototype对象上
		
		Cat.prototype.speak = function(){
			console.log("喵喵喵");
		}
		
	缺点：采用“构造函数法”的主要缺点是，比较复杂，用到了this和prototype，编写和阅读都很费力。

2.	Object.create()方法
	
	为了解决方法一的缺点，ES5提出了Object.create()方法，专门用来简单快捷的创建对象。	
	
	使用这个方法

		var Cat = {
			name = "小花",
			speak : function(){
				console.log("喵喵喵");
			}
		};
	这样就定义了一个对象，而不是函数。接下来，直接用Object.create()生成实例，不需要用到new了
	
		var cat1 = Object.create(Cat);
		console.log(cat1.name);//小花
		cat1.speak(); //喵喵喵

	缺点：目前，各大浏览器的最新版本都(包括IE9)都部署了这个方法，如果遇到老的浏览器会报错，解决办法是，自行使用下面的代码进行部署
		
		if(!Object.create){
			Object.create = function (o){
				function F(){}
				F.prototype = o;
				return new F();
			};
		}

3.	极简主义法
	
	荷兰程序员Gabor de Mooij提出了一种比Object.create()更好的新方法，称为"极简主义法"。
	
	-	封装
	这种方法不使用this和prototype,代码部署起来非常简单，首先，它也是用一个对象模拟"类"。在这个类里面，定义了构造函数createNew()，用来生成实例
		
			var Cat = {
				creatNew: function(){
					//...
				}
			};
	然后在createNew()里面，定义一个实例对象，把这个实例对象作为返回值。
	
			var Cat = {
				createNew :function(){
					var cat = {};
					cat.name = "小花";
					cat.speak = function(){
						console.log("喵喵喵");
					}
					return cat;
				}
			};
	使用的时候，调用createNew()方法，就可以得到实例对象。
	
		var cat1 = Cat.createNew();
		console.log(cat1.name); //小花
		cat1.speak();//喵喵喵
	
		优点是:容易理解，结构清晰优雅，符合传统的"面向对象编程"的构造函数，因此可以方便地部署下面的特性。

	-	继承
	
		让一个类继承另一个类，实现起来也很方便。只要在前者的createNew()方法中，调用后者的createNew()方法即可。
	
		先定义一个Animal类。
	
			var Animal ={
			createNew: function(){
					var animal = {};
					animal.sleep = function (){
						console.log("睡懒觉");
					};
					return animal;
				}
				};
		然后在Cat的createNew()方法中，调用Animal的createNew()方法。
			
			var Cat = {
	
				createNew : function(){
	
					var cat = Animal.createNew();
	
					cat.name = "小花";
					cat.speak = function(){
						console.log("喵喵喵");	
					};
					return cat;
				}
			};
		这样就得到了Cate实例，就会同时继承Cat类和Animal类
			
			var cat1 = Cat.createNew();
			cat1.sleep() //睡懒觉

	-	私有属性和方法
	
		在createNew()方法中，只要不是定义在cat对象上的方法和属性，都是私有的。
		
			var Cat = {
				
				createNew : function (){
					
					var cat = {};
					cat.name = "小花";
					var sound = "喵喵喵";
					cat.speak = function (){
						console.log(sound);
					};
					return cat;
				}
			};
		里面的局部变量sound,外部无法读取，只有通过cat的方法speak()来读取。
	
			var cat1 = Cat.createNew();
			console.log(cat1.sound); //undefined
			console.log(cat1.name);
			cat1.speak();
	
	-	数据共享
		
		有时候，我们需要所有实例对象，能够读写同一项内部数据，这个时候，只要把这个内部数据，封装在类对象的里面、createNew()方法的外面即可。
	
			var Cat = {
				sound:"喵喵喵",
				createNew: function(){
					var cat = {};
					cat.speak = function (){
						console.log(Cat.sound);
					};
					cat.changeSpeak = function(x){
						Cat.sound = x;
					};
					return cat;
				}
			};
		然后生成两个实例对象:
			
			var cat1 = Cat.createNew();
			var cat2 = Cat.createNew();
			cat1.speak();//喵喵喵
		
			cat2.changeSpeak("汪汪汪");
			cat2.speak(); //汪汪汪
			cat1.speak();//汪汪汪
		如果一个实例对象，修改了共享数据，另一个对象会收到影响


##		类的原型
由类创建可以看出。类的所有实例对象都是从同一个原型对象上继承属性。所以，原型对象是类的核心

JavaScript的继承机制是基于原型，而不是类，因此，要理解JavaScript的继承，需要深入了解原型对象。

###		原型的常见写法。
-	prototype
	
	C.prototype:用于引用new C()创建的对象的原型对象

-	getPropertypeOf()

	Object.getPropertypeOf(obj) :是获取obj对象的原型对象的标准写法

-	_ _proto _ _

	obj.__proto _ _	:是获取对象的原型对象的非标准方法。
	
		function Person(name, age) {    
	    	this.name = name;    
	    	this.age = age;  
		}    
		Person.prototype.sayName = function(){    
		    alert(this.name);    
		}    
		    
		var p1 = new Person("Jack", 32);  
		var p2 = new Person("Zhang", 30);    
		p1.sayName();   //Jack    
		p2.sayName();   //Zhang    
		  
		Object.getPrototypeOf(p1) === Person.prototype    //true  
		Object.getPrototypeOf(p2) === Person.prototype    //true  
		  
		p1.__proto__ === Person.prototype  //true  
		p2.__proto__ === Person.prototype  //true  


	
##		类和构造函数
构造函数是用来初始化新创建的对象的。上面的方法一种，使用关键字new来调用构造函数。使用new 调用构造函数会自动创建一个新对象，因此构造函数本身只需要初始化这个新对象的状态即可。调用构造函数的一个重要特征是，**构造函数的prototype属性被用作新对象的原型**。这就意味着，通过同一个构造函数创建所有对象都继承自同一个对象，因此它们都是同一类的成员。






	
	
	
