document.getElementById("load").addEventListener("click", () => {
    document.getElementsByClassName("search-result").innerHTML = `display='none'`;
    let songName = document.getElementById("song-name").value
    // console.log(songName)
    document.getElementById("song-name").value = ""
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(response => response.json())
        // .then(data => console.log(data.data[0]));
        .then(data => {
            /* let titleName = data.data[0].album.title
            let artistName = data.data[0].artist.name
            // console.log(titleName)
            // console.log(artistName)
            document.getElementById("title-name").textContent = titleName
            document.getElementById("artist-name").textContent = artistName */
            document.getElementById("results").innerHTML = ``
            fechedData = data
            for (let i = 0; i < 10; i++) {
                const titleName = data.data[i].album.title
                
                const artistName = data.data[i].artist.name
                // console.log(titleName)
                // console.log(artistName)

                document.getElementById("results").innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name"><span id="title-name">${titleName}</span></h3>
                        <p class="author lead">Album by <span id="artist-name">${artistName}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="showLyrics(${i})"
                            class="btn btn-success">Get Lyrics</button>
                    </div>`
            }
        })
})
function showLyrics(index) {
    const title = fechedData.data[index].title
    const artist = fechedData.data[index].artist.name
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.lyrics)
            const lyrics = data.lyrics
            if (lyrics == undefined) {
                alert("lyrics not found")
            }
            document.getElementById("single-lyrics").innerHTML = `<pre>${lyrics}</pre>`
        })
}
