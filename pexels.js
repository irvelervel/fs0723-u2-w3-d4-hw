document
  .querySelector('section .btn-primary')
  .addEventListener('click', function () {
    // click su bottone principale
    console.log('click 1')
    pexelsFetch('kittens')
  })

document
  .querySelector('section .btn-secondary')
  .addEventListener('click', function () {
    // click su bottone secondario
    console.log('click 2')
    pexelsFetch('puppies')
  })

const pexelsFetch = function (query) {
  fetch('https://api.pexels.com/v1/search?query=' + query, {
    headers: {
      authorization: 'ITIkOLdo8aaRVGwwlhqHiCZ9xc6VdA6NL3mKbxo8WwdQhUJKF3CJuHwF',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('problema nella fetch')
      }
    })
    .then((data) => {
      console.log(data)
      //   data.photos
      // prendo TUTTE le immagini presenti in ogni card

      if (data.photos.length >= 9) {
        let allTheExistingImageTags = document.querySelectorAll(
          '.bd-placeholder-img'
        )

        const allTheEditButtons = document.querySelectorAll(
          '.btn-group .btn-sm:nth-of-type(2)'
        )
        console.log(allTheEditButtons)

        const allThe9Mins = document.querySelectorAll('.card .text-muted')
        allThe9Mins.forEach((label, i) => {
          label.innerText = data.photos[i].id
        })

        allTheEditButtons.forEach((btn) => {
          btn.innerText = 'Hide'
          btn.addEventListener('click', function (e) {
            console.log(e.target)
            e.target.closest('.col-md-4').remove()
          })
        })

        console.log(allTheExistingImageTags)

        for (let i = 0; i < allTheExistingImageTags.length; i++) {
          allTheExistingImageTags[i].src = data.photos[i].src.medium
        }

        //   allTheExistingImageTags.forEach((imgTag, i) => {
        //     imgTag.src = data.photos[i].src.medium
        //   })
      } else {
        alert("risultati insufficienti, fai un'altra ricerca")
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

document
  .getElementById('custom-search-button')
  .addEventListener('click', () => {
    const inputField = document.getElementById('custom-search-input')
    pexelsFetch(inputField.value)
  })
