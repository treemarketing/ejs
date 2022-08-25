const socket = io();

socket.on("connection", () => {
    console.log("me conecte!");
    });



 let prod = [];    
socket.on("products", (data) => {
    
    // se puede hacer con un for 
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

    document.getElementById("products").innerHTML = htmlToRender;
    });