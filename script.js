document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfor();
        showWarning('Carregando...');
    

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=07712026b4d6f18027d3d837aac60058&units=metric&lang=pt_br`

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200){
        showInfor({
            nome: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed, 
            windAngle: json.wind.deg
        })
    } else {
        clearInfor()
        showWarning('Não encontramos esta localização.');
    }
    } else {
        clearInfor();
    }

});

function showInfor(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.nome}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfor(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}