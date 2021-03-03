const form = document.getElementById('form');
const search = document.getElementById('lyricsInput');
const output = document.getElementById('output');

const apiURL= "https://api.lyrics.ovh";
//get input value

form.addEventListener('submit', e=> {
    e.preventDefault();
    let searchValue = search.value.trim();
    
    if(!searchValue){
        alert('Nothing to see here, please enter a song or Artiste.')
    
    }else{
        startSearch(searchValue);
    }
})
//search function

async function startSearch(searchValue){
    const searchResult =await fetch(`${apiURL }/suggest/${searchValue }`);
    
    const data = await searchResult.json();
    // console.log(data)
    displayData(data);
}
//display searchResult 

function displayData(data){
    output.innerHTML = `
    <ul class="songs">
        ${data.data.map(song => `
        <li>
            <div><strong>${song.artist.name}</strong> - ${song.title}</div>
            <span class= "getlyric" data-artist= "${song.artist.name}" data-songtitle= "${song.title}"> Get Lyrics </span>
        </li>
        
        `).join('')}

    </ul>
`;
}
//get lyrics function

output.addEventListener('click', e => {
    const clickedElement = e.target;
    
    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle);
    }

})

async function getLyrics(artist, songTitle){
    var response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    
    var data = await response.json();
    const lyrics = data.lyrics.replace(/(\r\n|\n)/g, `<br>`);
    
    output.innerHTML= ` <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <p>${lyrics}</p>
`;
}