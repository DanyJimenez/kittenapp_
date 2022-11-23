const url_ =  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_IyzNG6NbqFsAQG6Itg6Bz7DTwEAa78zPBuzQFib2I2ESsPoEUKWJvFdGk87O3ZS9";
const url_Favorites =  "https://api.thecatapi.com/v1/favourites?api_key=live_IyzNG6NbqFsAQG6Itg6Bz7DTwEAa78zPBuzQFib2I2ESsPoEUKWJvFdGk87O3ZS9";
const url_Favorites_Delete = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_IyzNG6NbqFsAQG6Itg6Bz7DTwEAa78zPBuzQFib2I2ESsPoEUKWJvFdGk87O3ZS9`;
const url_Favorites_Upload =  "https://api.thecatapi.com/v1/images/upload"


const spanError = document.getElementById("error");

/*
async function getAcat(){
    const resp = await fetch(url);
    const data = await resp.json();
    const img = document.querySelector("img");
    img.src = data[0].url;
}
const button = document.querySelector("button");
button.onclick = getAcat;
*/

async function getAcat(){
    const resp = await fetch(url_);
    const data = await resp.json();
    
    console.log(data)
    
    if (resp.status !==200){
        spanError.innerHTML = "System error: " + resp.status + data.status;
    }else{
        const image1 = document.getElementById("img1");
        const image2 = document.getElementById("img2");
        const image3 = document.getElementById("img3");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");

        image1.src = data[0].url;
        image2.src = data[1].url;
        image3.src = data[2].url;

        btn1.onclick = () => saveFavoriteCat(data[0].id);
        btn2.onclick = () => saveFavoriteCat(data[1].id);
        btn3.onclick = () => saveFavoriteCat(data[2].id);
    }
}
 //Activar la función para que carguen las imágenes al refrescar la ventana

const newTitle = document.querySelector("h1");
newTitle.textContent = "GATITOS!" //MODIFICA EL TEXTO EN HTML
newTitle.innerHTML = "<b>Kittens App </b>"; //Con innerHTML permite modificar el texto y también los atributos (<b> negrilla)

 // shift + alt + a  selecciona para comentar varias lineas


 async function loadFavoriteCats(){
    const resp = await fetch(url_Favorites);
    const data = await resp.json();
    console.log(data)
    console.log("random")

    if(resp.status !== 200) {
        spanError.innerHTML = "Error system: " + resp.status + data.message;
    }else{
        const section = document.getElementById("favoriteCats")
        section.innerHTML = "";
        //const h2 = document.createElement("h2");
        //const h2Text = document.createTextNode("Favorite kittens"); // NO ES NECESARIO PORQUE YA SE SOLUCIONÓ
        //h2.appendChild(h2Text);
        //section.appendChild(h2); 
        data.forEach(cat => {
            
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const btnText = document.createTextNode("❌");

            img.src = cat.image.url;
            button.appendChild(btnText);
            button.onclick = () => deleteFavoriteCat(cat.id)
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);

        })
    }
}

async function saveFavoriteCat(id) {
    const resp = await fetch(url_Favorites, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await resp.json();

    

    if (resp.status !==200) {
        spanError.innerHTML ="Error System: "+ resp.status+ data.message;
    }else{
        console.log("Kitten saved in favorites")
        loadFavoriteCats();
    }
}

async function deleteFavoriteCat(id) {
    const resp = await fetch(url_Favorites_Delete(id), {
        method: "DELETE",
    });
    const data = await resp.json();

    if (resp.status !==200) {
        spanError.innerHTML ="Error System: "+ resp.status+ data.message;
    }else{
        console.log("Kitten delete from favorites")
        loadFavoriteCats();
    }
}



const button = document.querySelector("#reload");
button.onclick = getAcat;


async function uploadphoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const res = await fetch(url_Favorites_Upload, {
        method: "POST",
        headers: {
           // "Content-Type": "multipart/form-data",
            "X-API-KEY": "live_IyzNG6NbqFsAQG6Itg6Bz7DTwEAa78zPBuzQFib2I2ESsPoEUKWJvFdGk87O3ZS9",
        },
        body: formData,
    })
   const data = await res.json();

   if(res.status !== 201){
    spanError.innerHTML = "Error"+ res.status + data.message
    console.log({data})
   }else {
    console.log("Upload photo")
    console.log(data.url)
    saveFavoriteCat(data.id)
   }
}

//imágen pequeña =>

const previewImage = () => {
    const file = document.getElementById("file").files;
    console.log(file);
    if (file.length > 0) {
      const fileReader = new FileReader();
  
      fileReader.onload = function(e) {
        document.getElementById("preview").setAttribute("src", e.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }
  }

getAcat();
loadFavoriteCats();
