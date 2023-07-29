// https://www.theodinproject.com/lessons/node-path-javascript-library

// https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript 
// refactor with Class syntax e.g. https://javascript.info/class

// Event
window.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#addBookBtn').addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('.formDiv').style.visibility = 'visible';
    })
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        document.querySelector('.formDiv').style.visibility = 'hidden';
        let titleInput = document.querySelector('#title')
        let authorInput = document.querySelector('#author')
        let pagesInput = document.querySelector('#pages')
        let isReadInput = document.querySelector('#isRead')
        // error prevention
        if (!titleInput.value) return clearAllInput();
        if (!authorInput.value) return clearAllInput();
        if (!pagesInput.value) return clearAllInput();
        let newBook = new Book({
            author: authorInput.value,
            title: titleInput.value,
            numOfPages: pagesInput.value,
            isRead : isReadInput.checked,
        })
        myLibrary.addBookToLibrary(newBook)
        clearAllInput();
    })
    document.querySelector('#closeBtn').addEventListener('click', (e) => {
        // e.preventDefault();
        document.querySelector('.formDiv').style.visibility = 'hidden';
        clearAllInput();
    })
    addRandomBook(); // initialise 3 random books into library
    
    
})
class Book {
    constructor({ author, title, numOfPages, isRead }) {
        this.author = author;
        this.title = title;
        this.numOfPages = numOfPages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.library = []
    }
    displayBook() {
        let container = document.querySelector('div')
        // delete previous
        const divArray = [...container.querySelectorAll('.card')]
        divArray.forEach(x => x.remove())

        // add book-card
        this.library.forEach((x, i) => {
            let card = document.createElement('div')
            let newNode1 = document.createElement('h3')
            let newNode2 = document.createElement('p')
            let newNode3 = document.createElement('p')
            let newNode4 = document.createElement('div')
            let newNode4Btn1 = document.createElement('img')
            let newNode4Btn2 = document.createElement('img')
            card.classList.add('card')
            card.classList.add(x.isRead ? 'done-read' : 'not-read')
            newNode1.textContent = x.title
            newNode2.textContent = `by : ${x.author}`
            newNode3.textContent = `${x.numOfPages} pages`
            // trash / undo / done icon
            newNode4Btn1.setAttribute('src', './images/trashCan.svg')
            if (x.isRead) {
                newNode4Btn2.setAttribute('src', './images/undo.svg')
                newNode4Btn2.classList.add('to-undo')
            } else {
                newNode4Btn2.setAttribute('src', './images/tick.svg')
                newNode4Btn2.classList.add('to-tick')
            }
            // on-click event, trash-icon remove
            newNode4Btn1.addEventListener('click', e => {
                let index = e.target.parentNode.parentNode.getAttribute('data-index')
                this.removeBookfromLibrary(index)
            })
            // on-click event, trash-icon remove
            newNode4Btn2.addEventListener('click', e => {
                let index = e.target.parentNode.parentNode.getAttribute('data-index')
                this.toggleIsReadOfBook(index)
            })
            newNode4.classList.add('selectionDiv')
            newNode4.appendChild(newNode4Btn1)
            newNode4.appendChild(newNode4Btn2)
            card.appendChild(newNode1)
            card.appendChild(newNode2)
            card.appendChild(newNode3)
            card.appendChild(newNode4)
            card.setAttribute('data-index', `${i}`)
            container.appendChild(card)
        })
    }
    addBookToLibrary(book) {
        this.library.push(book)
        this.displayBook()
    }
    removeBookfromLibrary(index) {
        this.library.splice(index, 1)
        this.displayBook()
    }
    toggleIsReadOfBook(index) {
        this.library[index].isRead = !this.library[index].isRead;
        this.displayBook()
    }
}


function clearAllInput() {
    document.querySelector("form").reset();
}

function addRandomBook() {
    let book1 = new Book({
        author: 'Yc-Wong',
        title: 'Javascript Book #1',
        numOfPages: 10,
        isRead: true
    })
    let book2 = new Book({
        author: 'Yc-Wong',
        title: 'Javascript Book #2',
        numOfPages: 20,
        isRead: true
    })
    let book3 = new Book({
        author: 'Yc-Wong',
        title: 'Javascript Book #3',
        numOfPages: 30,
        isRead: false
    })
    // Main
    myLibrary.addBookToLibrary(book1)
    myLibrary.addBookToLibrary(book2)
    myLibrary.addBookToLibrary(book3)
}


let myLibrary = new Library()