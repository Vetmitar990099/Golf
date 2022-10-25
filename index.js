// let getcourses = document.querySelector('#getCourses').addEventListener('click', getTees)
// let id = ''

// const LOCAL_STORAGE_LIST_KEY = 'list.list'
// const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'list.SelectedListId'
// let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
// let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

// function saveandrender() {
// save()
// render()
// }

// function render() {
//     clearElement(listsContainer)
//     renderlists()
//     let selectedList = lists.find(list => list.id === selectedListId)
//     if (selectedListId === null) {
//       todolistdisplay.style.visibility = 'hidden'
//     } else {
//       todolistdisplay.style.visibility = 'visible'
//       todotitle.innerText = selectedList.name
//       clearElement(todolist)
//       rendertasks(selectedList)
//     }
// }

// function save() {
// localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
// localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
// }
// function getAvailableCourses() {
//     fetch('https://golf-courses-api.herokuapp.com/courses/',
//         {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             resolve(data.courses)
//         })
// }
// getAvailableCourses();

// function resolve(courses) {
//     let courseOptionsHtml = ''
//     courses.forEach((course) => {
//         courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`
//     });
//     document.getElementById('course-select').innerHTML = courseOptionsHtml
//     id = document.getElementById('course-select').value
//     console.log(id)
// }
// // document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
// function getTees() {
//     fetch('https://golf-courses-api.herokuapp.com/courses/${id}',
//         {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//         })
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             resolve(data.data)
//             console.log(data)
//         })
//         console.log('return')
//         saveandrender()
// }
// function resolve(id) {
//     let teeOptionsHtml = ''
//     id.forEach((tee) => {
//         teeOptionsHtml += `<option value="${tee.id}">${tee.name}</option>`
//     });
//     document.getElementById('tee-select').innerHTML = teeOptionsHtml
//     id = document.getElementById('tee-select').value
//     console.log(id)
// }
const parrow = document.querySelector('#parrow')
const tasktemplatepar = document.querySelector('#tasktemplatepar')
let currentTee = 0
  let currentCourse = 18300
  let playerCount = 0
  let players = []
  let teeBoxSelectHtml = ''
//   const selectCourse = getElementById('#course-select')
  class Player {
      constructor(name, scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
          this.name = name;
          this.id = Util.newGuid('player');
          this.scores = scores;
      }
  }
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

//   function getCourseTeeBoxes(courseId) {
//     fetch(`https://golf-courses-api.herokuapp.com/courses/${currentCourse}`)
//         .then(response => response.json())
//         .then(data => data.data.holes[0].teeBoxes);
//         console.log(1)
//   }
  function renderTeeBoxes(teeBoxes) {
    let teeBoxSelectHtml = '';
    teeBoxes.forEach(function (teeBoxItem, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBoxItem.teeType.toUpperCase()}, ${
    teeBoxItem.yards
   } yards</option>`

    });   
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
}

function newTableData(par, holes, teeBoxes) {
    const tableelement = document.importNode(tabletemplatepar.content, true)
    teeBoxes.forEach(element => {
        document.queryselector('par') = element
        parrow.appendChild(tableelement)
    })

}

(async function initializeLoad() {
    const courses = await getAvailableCourses()

    printCourses(courses);

    document.getElementById('course-select').addEventListener('change',async (e) => {
        const courseId = e.target.value
        const courseInfo = await getCourseInfo(courseId);
        const teeBoxes = courseInfo.holes[0].teeBoxes
        const par = courseInfo.holes[0].teeBoxes[0].par
        const holes = courseInfo.holes[0]

        renderTeeBoxes(teeBoxes)
        newTableData(par, holes, teeBoxes)
    })     
})()

