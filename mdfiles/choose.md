1. use ```$("xxx")``` to select all the ```xxx``` element.

1. use ```$("#xxx")``` to select element by id.

1. use ```$(".xxx")``` to select element by class.

1. ```$("*")```	选取所有元素

1. ```$(this)```	选取当前 ```HTML``` 元素	

1. ```$("p.intro")```	选取 class 为 intro 的 ```<p>``` 元素	

1. ```$("p:first")```	选取第一个 ```<p>``` 元素	

1. ```$("ul li:first")```	选取第一个 ```<ul>```元素的第一个 ```<li>``` 元素(unordered list, list), ```<ol>```means ordered list.

1. ```$("ul li:first-child")```	选取每个 ```<ul>``` 元素的第一个 ```<li>```元素	

1. ```$("[href]")```	选取带有 ```href``` 属性的元素	

1. ```$("a[target='_blank']")```	选取所有 target 属性值等于 "_blank" 的 ```<a>``` 元素	在线实例
   ```<a>``` mostly are used in hyperlinks. For example:  
    ```
    <a href="/example/html/lastpage.html">
        <img border="0" src="/images/test.jpeg" />  
    </a>

    ``` 
    turns out: <a href="/example/html/lastpage.html"><img src="../images/test.jpg" width="100" height="80">
    </a>

1. ```$("a[target!='_blank']")```	选取所有 target 属性值不等于 "_blank" 的 ```<a>``` 元素

1. ```$(":button")```	选取所有 type="button" 的 ```<input>``` 元素 和 ```<button>``` 元素	


1. ```$("tr:even")```	选取偶数位置的 ```<tr>``` 元素


1. ```$("tr:odd")```	选取奇数位置的 ```<tr>``` 元素