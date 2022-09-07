const socket = io();

socket.on("connection", () => {
    console.log("me conecte!");
    });



 let prod = [];    
socket.on("products", (data) => {
    
    // se puede hacer con un for o map
    let = htmlToRender = "";

    for (let i = 0; i < data.length; i++){
        htmlToRender = htmlToRender + `
        <tr>
        <td><h1>${ data[i].title }</h1></td>
        <td><h1>${ data[i].price }</h1></td>
        <td><img class="product-img" src="${ data[i].thumbnail }"></img></td>
        
        </tr>
        `
    }

    //La mejor forma es con reduce lo hago desde la base de datos de prod
    

    let htmlReduce = data.reduce((previewHtml, currentHtml) => 
        previewHtml + `
        <tr>
        <td><h1>${ currentHtml.title }</h1></td>
        <td><h1>${ currentHtml.price }</h1></td>
        <td><img class="product-img" src="${ currentHtml.thumbnail }"></img></td>
        
        </tr>
        `,""
    )
    document.getElementById("products").innerHTML = htmlReduce;
    });



    socket.on("chat", (data)=>{
        
        let htmlReduce = data.reduce((previewHtml, currentHtml) => 
            previewHtml + `
            <tr>
            <td><h1 class="email">${ currentHtml.email }</h1></td>
            <td><h1 class="msg"> "${ currentHtml.msg}"</h1></td>
            <td><h1 class="date"> ${ currentHtml.date}</h1></td>
            
            </tr>
            `,""
        )
        document.getElementById("message").innerHTML = htmlReduce;
    })

    function addMessage(mensaje){
        let messageToAdd = {
            email: mensaje.email.value,
            msg: mensaje.messageChat.value,
            date: new Date().toLocaleDateString(),
            
        }   
        socket.emit("newMassage", messageToAdd )
    }



    function addProduct(product){
        let productToAdd = {
            title: product.productName.value,
            price: product.price.value,
           thumbnail: product.thumbnail.value,
            
        }   
        socket.emit("addProduct", productToAdd )
    }