var ID=1;
function Item(id,name,src,price){
    this.id=id;
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
        item.src.forEach(function(element){
       var div=document.createElement('DIV');
    var img=document.createElement("IMG");
    img.src=element;
    div.appendChild(img);
    
    
    container.appendChild(div);     
        });
    });
}
}



window.onload=function() {
var container=document.getElementById('container');
var asus=new Item(ID,"Asus Laptop",["assets/images/asus.jpg",
"assets/images/asus2.jpg","assets/images/asus3.jpg","assets/images/asus4.jpg"],1200);
var laptops=new Category("Laptops",[asus,asus]);
laptops.displayItems(container);

document.addEventListener("mouseover", function(element){
    if(element.target.tagName=="A"){
        
    }
});

    
};