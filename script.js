 let accessKey = "95unXWt1NNl-qz60bvCWfNt-VRy9_Fjgx-SZidCnGXs";
 let page = 1;
 let keyword =" ";



let input = document.querySelector(".inputBox");
let searchBtn = document.querySelector(".searchBtn");
let images = document.querySelector(".images")
let more = document.querySelector(".more");
 



let download = (imgurl) =>{
     fetch(imgurl).then(res => res.blob()).then(file=>{
       let a = document.createElement("a")
       a.href = URL.createObjectURL(file)
       a.download=new Date().getTime();
       a.click();
     }).catch(() =>alert("failed download"))
}

async function  getResponse() {

    keyword=input.value;

    let url =`https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page = 12`
    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;
    if(page == 1){
        images.innerHTML = " ";
         
     }
     more.style.display = "block";
    results.map((result) =>{
        let li = document.createElement("li");
        li.classList.add("image");
        let html = `<img src="${result.preview_photos[0].urls.small}" alt="img" class="photo">
         <div class="details">
         <div class="user">
         <img src="camera.svg" alt="img">
         <span class="title">${result.title}</span>
         </div>
         <div class="download" onclick = download('${result.preview_photos[0].urls.small}')>
         <img src="download.svg" alt="img">
         </div>
        </div>`
        li.innerHTML = html;
        images.appendChild(li);
    })
}

searchBtn.addEventListener('click',()=>{
    if(input.value === ""){
         speak("");
    }else{
        speak(`generating different images of ${input.value} please wait`);
        page = 1;
        getResponse();
    }

});
more.addEventListener("click" , () =>{
    page++;
    getResponse();
})

input.addEventListener("keyup",(e)=>{
    page = 1;
    if(e.key=="Enter"){
  
        getResponse();
    }
})


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

