//this is the primary key for each item
var ID=1;
var shoppingList=[];
var totalshoppingcart=0; //Total shoppingcart price
var categories=[];
//Initializing an Array that holds all the items of each Category
var laptops=new Category("Laptops",[new Item("Asus Laptop","assets/images/asus.jpg",1200),new Item("ASUS X540UA ","assets/images/asus_X540UA.jpg",419.99),new Item("ASUS VivoBook S510UA","assets/images/asus_VivoBook.jpg",779.99),new Item("DELL Laptop  3580 ","assets/images/dell_Latitude.jpg",419.99),new Item("Lenovo ThinkPad E570 ","assets/images/lenovo.jpg",879.00),new Item("HP Laptop R4 Series","assets/images/hp.jpg",471.99)]);
var tablets=new Category("Tablets",[new Item("Huawei MediaPad T3 10 53019409 Qualcomm  ","assets/images/hw.jpg",900),new Item("Huawei MediaPad M3 Lite 10 ","assets/images/hw10.jpg",249.00),new Item("ASUS ZenPad 10 Z301M-A2-WH","assets/images/asustab.jpg",199.00),new Item("SAMSUNG Galaxy Tab A SM-P580NZWAXAR ","assets/images/samsung.jpg",329.99),new Item("ASUS ZenPad 3S Z500M-C1-GR","assets/images/zenpad.jpg",298,00),new Item("Apple iPad 9.7 Wi-Fi 32 GB - Gold, 2017","assets/images/ipad.jpg",331,09)]);
var smartphones=new Category("Smartphones",[new Item("Samsung Galaxy S8+ ","assets/images/s8.jpg",1100),new Item("Apple iPhone 8 Plus 256GB ","assets/images/iphone.jpg",1149.00),new Item("Samsung Galaxy s7 64GB","assets/images/s7.jpg",349.99),new Item("Samsung Galaxy Note 8 Dual SIM Unlocked ","assets/images/note8.jpg",839.00),new Item("LG G6+ US997U 128GB Unlocked GSM & CDMA 4G ","assets/images/lg.jpg",699.99),new Item("OnePlus 5T 8GB 128GB Snapdragon 835 Octa Core","assets/images/oneplus.png",726.99)]);
//Item class 
function Item(name,src,price){
    this.id=ID;
    this.name=name;
    this.src=src;
    this.price=price;
    ID++; //ID incrementation (auto increment)
    
}
//Category Class
function Category(name,items){
    this.name=name;
    this.items=new Array().concat(items);
this.addItem=function(item){
    this.items.push(item);
}//creating item card with 
this.displayItems=function(container){
    this.items.forEach(function(item){       
    var div=document.createElement('DIV');
        div.className="imgContainer";
    var img=document.createElement("IMG");
    var title=document.createElement("FIGCAPTION");
    var desc=document.createTextNode(item.name);
    var input= document.createElement("INPUT");
        input.setAttribute("type","number");
        input.setAttribute("id",item.id); //assigning the id of the item to the id of the input
        input.defaultValue=1;
    var label=document.createElement("LABEL");
    label.setAttribute("for",item.id);
    var labeltext=document.createTextNode(` ${item.price} \$`);
        label.appendChild(labeltext);
    var addButton=document.createElement("Button");
        addButton.setAttribute("onclick",`getItemInfo(${item.id});`); // function call and item id as argument
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
}
//get the item information through its ID
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
//remove element from list by index
function supElement(i){
    var element=shoppingList.splice(i,1);
    //re adjusting the price after remove and re displaying the new list
    totalshoppingcart-= (element[0].item.price)*element[0].qt;
    displayList();
}
//display the shopping list in a table format
function displayList(){
     container.innerHTML="";  
        var table=document.createElement('TABLE');
        table.innerHTML="<tr><th>Edit</th><th>Product Name</th><th>Product Price</th><th>Qt</th><th>Product total price</th><th>Total Price</th></tr>";
        var i=0;
        shoppingList.forEach(function(element){
        table.innerHTML+=`<tr><td><a href="#" onclick="supElement(${i});"><i class="fa fa-remove" aria-hidden="true"></i></a></t></td><td>${element.item.name}</td><td>${element.item.price} \$</td><td>${element.qt}</td><td>${(element.qt*element.item.price).toFixed(2)} \$</td></tr>`; 
            i++;
        });
        table.innerHTML+=`<tr><td></td><td></td><td></td><td></td><td>TAX</td><td>${(totalshoppingcart*0.1).toFixed(2)} \$</td></tr>`; 
        table.innerHTML+=`<tr><td></td><td></td><td></td><td></td><td>Total</td><td>${(totalshoppingcart*1.1).toFixed(2)} \$</td></tr>`; 
        container.appendChild(table);
        
}



window.onload=function() {
var container=document.getElementById('container');

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
       displayList();
        }
    
    }
    );
}


    