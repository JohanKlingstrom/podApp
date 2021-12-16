fetch('http://api.sr.se/api/v2/programs/index?pagination=false&format=json')
    .then(res => res.json())
    .then(data => console.log(data))