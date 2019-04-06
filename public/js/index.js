function onClickLikeBook(e) {
  e.preventDefault();

  const bookId = e.target.dataset.bookId;

  e.target.innerText = "Loading..."

  axios.post(`/books/${bookId}/like`)
    .then((response) => {
      e.target.innerText = `${response.data.likes} Likes`;
    })
    .catch(console.log)
}

function initMap() {
  const mapContainer = document.getElementById("map")

  if (!mapContainer) return;

  const myMap = new MyMap(mapContainer)
  
  myMap.init()

  if (document.getElementById("users-form")) {
    setFormMapListeners(myMap)
  } else if (document.getElementById("users-list")) {
    addUsersToMap(myMap)
  }
}

function addUsersToMap(myMap) {
  axios.get('/users/coordinates')
    .then(response => {
      response.data.forEach(coordinate => {
        myMap.addMarker(
          coordinate.coordinates[1],
          coordinate.coordinates[0]
        )
      })
    })
    .catch(console.log)
}

function setFormMapListeners(myMap) {
  myMap.onClick((event) => {
    const { lat, lng } = event.latLng.toJSON()

    myMap.clearMarkers()
    myMap.addMarker(lat, lng)

    document.getElementById("lat").value = lat.toFixed(3)
    document.getElementById("lng").value = lng.toFixed(3)
  })
}