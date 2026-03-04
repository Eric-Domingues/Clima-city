
const form = document.querySelector("#input-form > form")
const input: HTMLInputElement | null = document.querySelector("#input-local")
const sectionTempoInfo = document.querySelector("#tempo-info")
const themaColor = document.querySelector("#Thema-Button")
const body = document.querySelector("body") as HTMLBodyElement

let darkThema = false

themaColor?.addEventListener("click",(e)=>{
    darkThema = !darkThema

    if(darkThema){
        body.style.backgroundColor = "#2d2c2cff"
        body.style.color = "rgb(226, 224, 224)"
    }else{
        body.style.backgroundColor = "rgb(194, 191, 191)"
        body.style.color = "rgb(226, 224, 224)"
    }
})

form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!input || !sectionTempoInfo ) return;

    const localizacao = input.value;

    console.log(localizacao)

    if(localizacao.length < 3) {
        alert("O local tem menos de 3 caracteres")
    }

  
    const resposta = await fetch(
    `http://localhost:3000/weather?city=${localizacao}`
    );

    const dados = await resposta.json();

    console.log(dados);

    const info = {
        nome: dados.name,
        tempe: Math.round(dados.main.temp),
        img: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    }
    sectionTempoInfo.innerHTML = `
        <div id="tempo-dados">
        <h2>${info.nome}</h2>
        <span>${info.tempe}°C</span>
        </div>
        <img src="${info.img}"/>
    `;
});