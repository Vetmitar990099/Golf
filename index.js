const parrow = document.querySelector('.parrow')
const yardrow = document.querySelector('.yardrow')
const hcprow = document.querySelector('.hcprow')
const playerrow = document.querySelector('.playerrow')
let tabletemplatepar = document.getElementById('tabletemplatepar')
let players = document.getElementById('players')
let player = document.getElementById('player')
let playerform = document.querySelector('.playerform')
let playerinfo = playerrow.querySelector('.playerinfo')
let playerinput = playerrow.querySelector('.playerinput')
let playersdata = []

let playerCount = 0
let teeBoxSelectHtml = ''

  // Selecting a course
  async function getAvailableCourses() {
      return fetch('https://golf-courses-api.herokuapp.com/courses/')
          .then(response => response.json())
          .then(data => data.courses)
  }
  function printCourses(courses) {
    let courseOptionsHtml = '';
    courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });
    document.getElementById('course-select').innerHTML = courseOptionsHtml;
    console.log(courses)
}


// Changing in the Tee
  async function getCourseInfo(courseId) {
      return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
          .then(response => response.json())
          .then(data => data.data);
  }
  async function printTees() {
    getCourseTeeBoxes(getTees)
    
  }


  function renderTeeBoxes(teeBoxes) {
    let teeBoxSelectHtml = '';
    teeBoxes.forEach(function (teeBoxItem, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBoxItem.teeType.toUpperCase()}, ${
    teeBoxItem.yards
   } yards</option>`

    });   
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
}


(async function initializeLoad() {
    const courses = await getAvailableCourses()

    printCourses(courses);

    document.getElementById('course-select').addEventListener('change',async (e) => {
        var courseId = e.target.value
        const courseInfo = await getCourseInfo(courseId);
        const teeBoxes = courseInfo.holes[0].teeBoxes
        var element = parrow.querySelectorAll("td")
        element.forEach(td => {
          td.remove()
        })
        var element = yardrow.querySelectorAll("td")
        element.forEach(td => {
          td.remove()
        })
        var element = hcprow.querySelectorAll("td")
        element.forEach(td => {
          td.remove()
        })
        renderTeeBoxes(teeBoxes)
        newTableData(courseInfo.holes)

    })   
})()

playerform.addEventListener('submit', e => {
  e.preventDefault()
  const newplayer = document.getElementById("newplayer").value
  if (newplayer == null || newplayer === '') return
  var newplayerdataitem = {name: newplayer, id: Date.now(), scores: new Array(18).fill(0)}
  playersdata.push(newplayerdataitem)

  renderNewPlayer(newplayerdataitem)
  
})

function newTableData(holes) {
   const pars = getListOfPar(1, holes)
   const yards = getListOfYards(1, holes)
   const hcp = getListOfHcp(1, holes)
   document.querySelector('#tee-box-select').addEventListener('change', async (e) => {
    var element = parrow.querySelectorAll("td")
    element.forEach(td => {
      td.remove()
    })
    var element = yardrow.querySelectorAll("td")
    element.forEach(td => {
      td.remove()
    })
    var element = hcprow.querySelectorAll("td")
    element.forEach(td => {
      td.remove()
    })
    renderpar(pars)
    renderyards(yards)
    renderhcp(hcp)
    
})  
}

function getListOfPar(teeTypeId, holes) {
  return holes.map(hole => hole.teeBoxes.find(teeBox => teeBox.teeTypeId === teeTypeId).par)
}
function getListOfYards(teeTypeId, holes) {
  return holes.map(hole => hole.teeBoxes.find(teeBox => teeBox.teeTypeId === teeTypeId).yards)
}
function getListOfHcp(teeTypeId, holes) {
  return holes.map(hole => hole.teeBoxes.find(teeBox => teeBox.teeTypeId === teeTypeId).hcp)
}

function renderpar(pars){
  pars.forEach((parItem, index) => {
    const parElement = tabletemplatepar.content.querySelector("td").cloneNode(true);
    parElement.textContent = parItem;
    parrow.appendChild(parElement);
  })
}
function renderyards(yards){
  yards.forEach((yardItem, index) => {
    const yardElement = tabletemplatepar.content.querySelector("td").cloneNode(true);
    yardElement.textContent = yardItem;
    yardrow.appendChild(yardElement);
  })
}
function renderhcp(hcp){
  hcp.forEach((hcpItem, index) => {
    const hcpElement = tabletemplatepar.content.querySelector("td").cloneNode(true);
    hcpElement.textContent = hcpItem;
    hcprow.appendChild(hcpElement);
  })
}
function renderNewPlayer(player){
  const playerElement = players.content.querySelector('tr').cloneNode(true);
  playerElement.querySelector("th").textContent = player.name.toUpperCase()
  playerrow.appendChild(playerElement);
}

function getplayerscores(playerinfo) {f
  if(playerinfo === undefined){
    console.log('invalidplayerinfo')
    console.log(playerinfo)
  }else {
    playerinfo.forEach(playerinput.textContent)
      let playerscore = []
      playerscore += playerinput.textContent 
  }
}
function getTotalPlayerScore(playerId) {
  const playerDataItem = getPlayerDataItem(playerId);
  const scores = playerDataItem.scores;
  
  return scores.reduce((sum, scoreItem) => sum + scoreItem, 0)

}

function getPlayerDataItem(playerId) {
  return playersdata.find(p => p.id === playerId)
}