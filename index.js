var form = document.querySelector('#form1');
var forms = document.querySelector('.forms');
var city = document.querySelector('#city');
var adults = document.querySelector('#adults');
var children = document.querySelector('#children');
var date = document.querySelector('#date');
let comments = document.querySelector('.comments')
let commentsForm = document.querySelector('.form')
let username = document.querySelector('#name')
let comment = document.querySelector('#comment')
let commentBtn =    document.querySelector('#comment-submit')

var cityId;

let cityName = document.querySelector('.city-name');
let hostCards = document.querySelector('.cards');

addEventListener('DOMContentLoaded', (event) => {
    // prompt("Welcome")
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
});

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

async function getCityID() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '51f72f5404mshefd32d435acb7fep1a2afejsnbbf6a110b1f9',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    return (await fetch('https://airbnb19.p.rapidapi.com/api/v1/searchDestination?query=' + city.value, options)).json();
}
async function loadHosts() {

    const placeOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '51f72f5404mshefd32d435acb7fep1a2afejsnbbf6a110b1f9',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    return (await fetch('https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace?id=' + cityId + '&totalRecords=12&currency=USD&adults=' + adults.value + '&children='+  children.value + '&checkin=' + date.value, placeOptions)).json();

}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    var cityData = [];

    cityData = await getCityID();
    console.log(cityData);

    cityId = cityData["data"][0]["id"].toString();
    cityName.innerHTML = cityData["data"][0]["location_name"].toString();
    await delay()

    var hosts = [];
    hosts = await loadHosts();
    console.log(hosts);

    hosts['data'].forEach(host => {



        hostCards.innerHTML += ' <div class="properties-card"><img class="card-img"src="'+ host['images'][0] +'" alt="" /><div class="card-txt"><h5 class="apt-title">' + host['listingName'] + '</h5><div class="row"><div class="col col-left"><p class="apt-loc center"><i class="ph-map-pin-line apt-icon"></i>' + host['publicAddress'] + '</p><p class="apt-beds center"><i class="ph-bed apt-icon"></i>' + host['listingBedLabel'] + '</p><p class="apt-guests center"><i class="ph-user apt-icon"></i>' + host['listingGuestLabel'] + '</p></div><div class="col col-right"><div class="apt-rating center"><i class="ph-asterisk-simple apt-icon"></i>' + host['avgRating'] +'</div><p class="apt-baths center"><i class="ph-toilet apt-icon"></i>' + host['listingBathroomLabel'] +'</p><p class="apt-price center"><i class="ph-money apt-icon"></i>' + host['accesibilityLabel'] + '</p></div></div></div></div>'

    });

    document.querySelector('.hidden').classList.remove('hidden');

    document.getElementById('hosts').scrollIntoView({
        behavior: 'smooth'
    }, false);
})

function formatDate(date, format) {
    
}

commentBtn.addEventListener('click', (event) => {
    event.preventDefault()
    var today = moment().format('D MMMM YYYY, hh:mma');
    comments.innerHTML += '<div class="comment"><div class="title"><p class="name">'+username.value+'</p><p class="date">~ '+today+'</p></div><p>'+comment.value+'</p></div>'
    commentsForm.reset()
})