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
                        <button class="btn btn-success">Get Lyrics</button>
                    </div>`
            }
        })
})