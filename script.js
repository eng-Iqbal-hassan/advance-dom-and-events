'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  // As we move a bit up and still the button is seen we click on the button and modal is opened and page is moved to the top. This is the default behavior as the button is actually anchor whose href is # which moves the page by default to top.In order to avoid this thing we use the event.preventDefault();      
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// this for loop is the old school we can use the forEach method instead of it. The syntax will be like:
btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal)) 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// DOM is the interface between Js and browser.
// addEventListener is used to listen different types of event for an element like click, hover etc.

// (1): Selecting the elements in Js does happens in the following ways 
console.log(document.documentElement);

// In console we get the entire page. It is necessary that if we want to add the style for complete page like background. It is not possible by document alone as it is not a DOM node. One of the DOM node is documentElement. 
// Similarly the other nodes are head and body.
console.log(document.head);
console.log(document.body);
// we need not for the querySelector for head and body. We use querySelect to select a single DOM node and querySelectorAll for multiple nodes.
const header = document.querySelector('.header')
// As we have multiple node of the class section
const allSections = document.querySelectorAll('.section');  
console.log('sections',allSections);


// there are other selectors exist in Js 
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button')
console.log('buttons',allButtons)

// It is being seen that in case of querySelectorAll DOM nodes are printed while in case getElementsByTagName the HTML collection is printed. So, it means that whenever there is the variation happens with these buttons add or remove the button, the collection will be changed.

//let say we have deleted the section,  in console the result is still same for querySelectorAll because the result is printed at the time when the section does exist and querySelectorAll does not change with the change in the DOM afterwards.

console.log(document.getElementsByClassName('btn'))
// HTML collection is shown against this console 

// Not only the documents are used for these selectors we can select any of the element to access its child elements 

// (2): Creating and inserting elements 
// .insertAdjacentElement: The insertAdjacentElement() method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.
// insertAdjacentElement(position, element)
// Position will be of following 
// beforeBegin: before start of the element
// afterBegin: Add inside the element before the first child node
// beforeEnd: Add inside the element after the last child node
// afterEnd: after the end of the element

/*
  <!-- beforebegin -->
  <p>
    <!-- afterbegin -->
    foo
    <!-- beforeend -->
  </p>
  <!-- afterend -->
*/

// (2): Creating the DOM elements: 
const message = document.createElement('div')
// In this we can create a DOM element and we will not get anything about this in inspect because it is just created and not available anywhere.
// we can give it the className, write its content or innerHTML by the following ways
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analytics'
message.innerHTML = 'we use cookies for improved functionality and analytics <button class="btn btn--close-cookie"> Got it!</button>'
// so we have created a div of class cookie-message and have some text and button in it
// To get this element node in the DOM, we need to insert it anywhere in the DOM
// header.prepend(message);
// prepending is the add element inside other element as first child element.
// There is append method which is used to add element as last child of the element
header.append(message);
// prepend and append can not happen both at single time. So in the user interface we have seen that append is applied. We get the element at the last only and not at the start.
// So to get both at single. we will create the copy of the node and append at the bottom and then we will have elements both at  top and bottom.
// header.append(message.cloneNode(true))  

// There also exists the method like before and after by which the element can be added before and after respectively of the selected element

// header.before(message)
// header.after(message)

// Similarly, we can do the remove of the element by method
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove()
  // So the click of the button will remove the DOM element. 
  // this thing can be done by DOM traversing whose syntax is given below 
  // message.parentElement.removeChild(message);
})
