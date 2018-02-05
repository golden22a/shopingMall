var ID=1;
var shoppingList=[];
var totalshoppingcart=0;
categories=[];
var laptops=new Category("Laptops",[new Item("Asus Laptop","assets/images/asus.jpg",1200),new Item("ASUS X540UA ","assets/images/asus_X540UA.jpg",419.99),new Item("ASUS VivoBook S510UA","assets/images/asus_VivoBook.jpg",779.99),new Item("DELL Laptop  3580 ","assets/images/dell_Latitude.jpg",419.99),new Item("Lenovo ThinkPad E570 ","assets/images/lenovo.jpg",879.00),new Item("HP Laptop R4 Series","assets/images/hp.jpg",471.99)]);
function Item(name,src,price){
    this.id=ID;
    this.name=name;
    this.src=src;
    this.price=price;
    ID++;
    
}
function Category(name,items){
    this.name=name;
    this.items=new Array().concat(items);
this.addItem=function(item){
    this.items.push(item);
}
this.displayItems=function(container){
    this.items.forEach(function(item){       
    var div=document.createElement('DIV');
        div.className="imgContainer";
    var img=document.createElement("IMG");
    var title=document.createElement("FIGCAPTION");
    var desc=document.createTextNode(item.name);
    var input= document.createElement("INPUT");
        input.setAttribute("type","number");
        input.setAttribute("id",item.id);
        input.defaultValue=1;
    var label=document.createElement("LABEL");
    label.setAttribute("for",item.id);
    var labeltext=document.createTextNode(` ${item.price} \$`);
        label.appendChild(labeltext);
    var addButton=document.createElement("Button");
        addButton.setAttribute("onclick",`getItemInfo(${item.id});`);
    var plusSigne=document.createElement("I");
        plusSigne.className="fa fa-plus";
        plusSigne.setAttribute("aria-hidden","true");
     addButton.appendChild(plusSigne);
    title.appendChild(desc);
    img.src=item.src;
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(input); 
        div.appendChild(label);     
        div.appendChild(addButton);
    
    container.appendChild(div);     
        });
    }
}
function ShoppingItem(item,qt){
        this.item=item;
        this.qt=qt;
    ShoppingItem.addToList = function(element,eqt){
        var newItem= new ShoppingItem(element,eqt);
        shoppingList.push(newItem);
    }
}
function getItemInfo(id){
    var input=document.getElementById(id);
    var value=input.value;
    if(value<=0){
        value=1;
    }
    categories.forEach(function(category){
        for (var item of category.items){
            if(item.id==id){
        var newItem= new ShoppingItem(item,value);
        shoppingList.push(newItem);
            totalshoppingcart+=item.price*value;
            break;
            }
        }
    });
}




window.onload=function() {
var container=document.getElementById('container');

var s8=new Item("Samsung Galaxy S8+ (Plus) G955FD Dual SIM GSM ","assets/images/s8.jpg",1100);
var hw=new Item("Huawei MediaPad T3 10 53019409 Qualcomm  ","assets/images/hw.jpg",900);
var tablets=new Category("Tablets",[hw,hw,hw,hw,hw,hw]);
var smartphones=new Category("smartphones",[s8,s8,s8,s8,s8,s8]);
 categories=[laptops,tablets,smartphones];


document.addEventListener("mouseover", function(element){
    if(element.target.tagName=="A" && element.target.id !="Shope"){
         container.innerHTML="";  
            categories.forEach(function(item){
           if(item.name==element.target.id)
            item.displayItems(container);
          
        
    });
        }
    else if (element.target.tagName=="A" && element.target.id=="Shope"){
        container.innerHTML="";  
        var table=document.createElement('TABLE');
        table.innerHTML="<tr><th>Product Name</th><th>Product Price</th><th>Qt</th><th>Product total price</th><th>Total Price</th></tr>";
        shoppingList.forEach(function(element){
        table.innerHTML+=`<tr><td>${element.item.name}</td><td>${element.item.price} \$</td><td>${element.qt}</td><td>${element.qt*element.item.price} \$</td></tr>`;            
        });
        table.innerHTML+=`<tr><td></td><td></td><td></td><td>TAX</td><td>${totalshoppingcart*0.1} \$</td></tr>`; 
        table.innerHTML+=`<tr><td></td><td></td><td></td><td></td><td>${totalshoppingcart*1.1} \$</td></tr>`; 
        container.appendChild(table);
        }
    
    }
    );
}


    