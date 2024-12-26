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

///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')

// Lecture #7 : implementation of smooth scrolling

// getBoundingClientRect() provides co-ordinates, width, height and many more properties about the element with with this method is attached.

btnScrollTo.addEventListener('click', function(e){
  console.log(e.target.getBoundingClientRect())
  // it is being seen that top property of the element is relative to the height from top of view port. I clicked when this button is at the bottom it gives me large value i reload the page and scroll to top and then click the button again now this top value is less
  const s1coords = section1.getBoundingClientRect();
  // We can also get how much we scrolled on x-axis and y-axis
  console.log('scroll X/Y axis', window.pageXOffset, window.pageYOffset)

  // if we want to get the view port height and width in which a screen does exist, then this thing happens in this way
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)
  // window.scrollTo(s1coords.left, s1coords.top)  
  // the solution is not right because it gives the value from top relative to the top-view and not relative to the sectios so it kept on changing so we will add pageYOffset in s1coords.top to get the complete height so our result will always be correct
  // Also to add window.pageXOffset in the s1coords.left rather it is not required

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  // so the correct scroll result is that position from top + scroll from top then it will give the position of the second element from the start of page.

  // Now the issue is resolved scrollTo method in Js provides us the scrolling of an element 
  // To get the smooth scrolling we need to pass in the object to scrollTo method in the following way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })

  // The more modern way is to use scrollIntoView function which requires no calculations like this
  section1.scrollIntoView({behavior: 'smooth'})
})

///////////////////////////////////////

// Lecture 11 : Event Delegation

// So when we click on any of the link in header it will be smoothly scroll to there corresponding sections


/*
document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e) {
    e.preventDefault();
    // So we have call back inside call back. e.preventDefault() stops the default behavior of the movement to see the respective at the top of the screen when we click on the anchor tag
    const id = this.getAttribute('href')
    // Here we get its respective section on each click of href.
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})
*/

// So the thing is done we have smoothly scroll to the respective section by the method above but we have applied the same event handler on three li elements Let say there are 10 li's and we are applying the same event handler 10 times. This will cause the performance issues.

// this thing is resolved by using the event delegation which will do this thing by bubbling
// It happens in two steps
// 1: Add event listener to the common parent element
// 2: Determine which element is originating the event.

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()
  // console.log(e.target)
  // So e.target in the console is showing is that from where this event does happens.
  // when i click on the first anchor in console i get its element
  // when i click on the second anchor, console gives its element
  // when i click between first and second element then in console i get that event is originated from parent element
  // It is very important thing that we want to deal with the events which are originated from the anchor
  // so we need to apply the matching strategy
  if(e.target.classList.contains('nav__link')) {
    console.log('link')
    console.log(e.target)
    // So in the console i get the link printed whenever i click on the link only 
    const id = e.target .getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

///////////////////////////////////////

// Lecture 13 : Building tabbed components

// Tabbed components

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

// Now we want to add the eventListener on each of the tab be like

// tabs.forEach(t=>t.addEventListener('click',()=>console.log('tab')))

// this thing will give the click but let say there are 100 tabs then it slow down the performance.
// We will use event delegation for the eventListener

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)
  // in this way, By using closest each time one click rather it is click on the button or span, it always point to that button

  // Guard clause
  if (!clicked) return;

  // Remove the active class from all other elements before adding to the clicked element

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  // Remove the active class from each content element before adding to the specific content

  tabsContent.forEach(c => c.classList.remove('operations__content--active') )

  // Activate content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  

})

///////////////////////////////////////

// Lecture 14 : Passing Arguments to event Handler

// Requirement: When any of the element in header like li or button is hovered all other elements are fade out

// opposite of mouseover is mouseout and opposite of mouseenter is mouseleave

// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//     const logo = link.closest('.nav').querySelector('img')
    
//     siblings.forEach(el => {
//      if (el !== link) { 
//       el.style.opacity = opacity
//      }
//     })
//     logo.style.opacity = opacity
//   }
// }
 
// nav.addEventListener('mouseover', function(e){
//  handleHover(e, 0.5)
// })

// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1 )
// })

///////////////////////////////////////

// Lecture 15: Implementing sticky navigation to scroll

// We have to add the sticky class as soon as the first section appears at the top of screen
// getBoundingClientRect will help us in this regard



// const initialCoord = section1.getBoundingClientRect()

// window.addEventListener('scroll', function() {
//   if (window.scrollY > initialCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

// this thing is done and we have made the header sticky when the first section does appear but it is not a good approach to use because due to scroll event keeps firing for the smallest change

// A better way is the use of observer intersection API's

///////////////////////////////////////

// Lecture 16 : Observer Intersection API's :-

// this API allows our code to observe changes to the way a certain element intersect with other element or the way it intersect with the view port

// We have to observe when header is going out of the view of the screen then we will apply the header sticky

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  console.log(entry);
  // It is being observed that when the header is out of the view completely then isIntersecting value is false and when isIntersecting value is true then header is in the view port completely or partially. This property will be used to add the class sticky to the header
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header)

///////////////////////////////////////

// Lecture 17 : Revealing sections while scrolling -> Again the use case of intersectionObserver API

const allSections = document.querySelectorAll('.section');

const revealSections = function(entries,observer) {
  const [entry] = entries;

  // Guard clause
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSections,{
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})
///////////////////////////////////////

// Lecture 18: Lazy loading images
// One more time we need intersectionObserver API.

const imageTarget = document.querySelectorAll('img[data-src]')

const loadImg = function(entries,observer) {
  const [entry] = entries

  // Guard clause
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imageTarget.forEach(img=>imgObserver.observe(img ))

///////////////////////////////////////

// Lecture 19, 20: Building slider

const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s,i)=> (s.style.transform = `translateX(${100*(i-slide)}%)`));
}

goToSlide(0);

const nextSlide = function() {
  if (curSlide === maxSlide -1  ) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide)
}

const prevSlide = function() {
  if (curSlide === 0  ) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide)
} 

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

// Now apply the slider movement with arrow left and arrow right keys

document.addEventListener('keydown',function(e){
  if (e.key === 'ArrowLeft') prevSlide()
  e.key === 'ArrowRight' && nextSlide()
})

///////////////////////////////////////

// Lecture 5 : 
// DOM is the interface between Js and browser.
// addEventListener is used to listen different types of event for an element like click, hover etc.

// (1): Selecting the elements in Js does happens in the following ways 
console.log(document.documentElement);

// In console we get the entire page. It is necessary that if we want to add the style for complete page like background. It is not possible by document alone as it is not a DOM node. One of the DOM node is documentElement. 
// Similarly the other nodes are head and body.
console.log(document.head);
console.log(document.body);
// we need not for the querySelector for head and body. We use querySelect to select a single DOM node and querySelectorAll for multiple nodes.
// const header = document.querySelector('.header')
// As we have multiple node of the class section
// const allSections = document.querySelectorAll('.section');  
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

///////////////////////////////////////

// lecture # 6: styles, attribute and classes
// styles

// to give the style to an element, use element.style.propertyName -> property name should be camel case
message.style.background = '#37383d';
// message.style.setProperty('background','#37383d')
message.style.width = '120%'
// the style we set over here is the inline style 
console.log(message.style.background)  // #37383d
// in console we get only inline style. Any style written in the CSS will not be get in the console by js.
console.log(message.style.color) 
// it will not give anything in the console. Although the style is present in the stylesheet but does not access in the console
// To get the overall styles of an element use getComputedStyle 
// console.log(getComputedStyle(message)) 
// -> it is giving the overall style of an element. To get the single style we can put:
console.log(getComputedStyle(message).color) 
// rgb(187, 187, 187) is the color which we get in the console

// other thing is that we set the css variable in :root in css file -> this thing is equivalent to the document in the Js. So any variable property can be changed in Js by the following way
document.documentElement.style.setProperty('--color-primary', 'orangered')
// So the primary color which was set in the CSS. It was green before but is changed to orangered now and is shown in the UI.
// setProperty('background', '#000') in this way setProperty can be used to set styles

// Attributes: src, alt, even the class and id are also the attribute of an element
// we can access this attribute in the Js and change them 
const logo = document.querySelector('.nav__logo');
console.log('src',logo.src)
// logo.alt = 'Beautiful minimalist logo'
console.log('alt',logo.alt)
console.log(logo.designer)
console.log(logo.getAttribute('designer'))
console.log(logo.setAttribute('company', 'bankist'))

// Data Attributes 
console.log(logo.dataset.versionNumber)

// classes 
logo.classList.add('c') // to add class
logo.classList.remove('k') // to remove class
logo.classList.toggle('j') // base on some condition this classList property is added
console.log('contains',logo.classList.contains('n')) // it returns true if element contains class and false if not.

// logo.className ='abc'  -> Never use this because it will remove all the classes and add only one class 

///////////////////////////////////////

// lecture: 8 -> Types of event and event handler
// event is the signal which is generated by DOM node and signal means that something has happened.
// For example , mouse hover and a click happens etc.
// So event always keep happening in the interface, rather we listen it or not. Like when the button is clicked, click event happens rather we catch it or not in our Js.
// the most important events are mouse events and keyboard events. 

const h1 = document.querySelector('h1');
// const alertH1 = function(){
//   alert('Great! You are reading the heading h1 :D')
//   h1.removeEventListener('mouseenter', alertH1)
// } 
// h1.addEventListener('mouseenter', function(){
//   alert('Great! You are reading the heading h1 :D')
// })
h1.addEventListener('mouseenter', alertH1)

// the other way to get this mouseeneter event is onmouseenter property

// h1.onmouseenter = function(){
//   alert('Great! You are reading the heading h1 :D')
// };

// So fer each event this property with the name started with on can be use to listen the event.But this is old school way of listening the event. We always use addEventListener. One of the reason is that by using addEventListener, we can add multiple events but when we use on property then after adding one more event the previous event will be overwritten by the new one and gone 

// mouse enter event is like the hover effect in CSS
// From MDN reference all ind of events can be explored 

// we can remove the event 
setTimeout(()=>h1.removeEventListener('mouseenter', alertH1),3000)

// So using setTimeOut we can also remove the eventListener 
// the other way is to add the eventListener on html element which is written in html page

///////////////////////////////////////

// Lecture 9: Event propagation bubbling and capturing

// Consider an anchor which is placed inside p tag which is inside section tag which is inside body tag
// as there is no event listener defined by ourselves in the code but this event happens in the document level. Here its capturing phase start and this event start traveling down the track like document -> html -> body -> section -> p -> a
// Here the target phase does start
// After the target is completed the event moves moves back to the up like
// a -> p -> section -> body -> html -> document . This phase is called bubbling phase
// so if an event does happen in the section by us then js handle both one by the document and one by itself

// The event can be handled in target and bubbling phase
// This is called event is propagating from one place to the other place.

///////////////////////////////////////

// Lecture 10 : Event Propagation in practice

// How can we get the random color

const randomInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)
const randomColor = ()=> `rgb(${randomInt(0,225)},${randomInt(0,225)},${randomInt(0,225)})`
console.log(randomColor())

// By this way we can get the random number 

// Event Propagation is simple we have nav , ul and li the events are attached to the nav, ul and li which is that changing the background when click does happen it has been observed that when we click on li ul and nav also get the  background color due to bubbling . Similarly clicking the ul gives the background to nav due to bubbling. So an event gets the listener due to target and bubbling. 

// .addEventListener has click and function 
// in event listener the this keyword is pointing to the element with which the event Listener is attached 
// Also e.currentTarget === this -> true
// the third argument can be passed to the eventListener to be true then it will start getting the eventListener in capturing phase and target phase while with false the events are captured in the target phase and bubbling phase.  
// So set the third argument false or not setting anything any third argument are doing the same thing.

///////////////////////////////////////

// Lecture 12: DOM Traversing: it is walking through the DOM, it means we can select one element on the base of other element.
// sometime we need to check the directChild or directParent element on the run time and we even do not know the DOM structure at that time . So in this case DOM traversing will be helpful

// const h1 = document.querySelector('h1'); declared at the top

// Going downwards : child

console.log(h1.querySelectorAll('.highlight'))
// it has given the element inside h1 who has className highlight
console.log(h1.childNodes)
// it has given everything in the console which h1 contains also comments, text and HTML elements
console.log(h1.children)
// it has given HTML elements which are inside h1
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'
// So firstElementChild is for the first html element inside h1 and lastChildElement is for last HTML element inside h1. Here , it is shown that the elements getting from Traversing can be modified using it.

// Going upward parent
console.log(h1.parentNode)
// it has given me the parent node of the h1
console.log(h1.parentElement)
// it has given me the parent element of the h1
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// it has find the element with class header which is closest to h1 and then apply the background on it. Might be there can be three element with class header. That element which is closest in DOM will get this style 
// h1.closest('h1').style.background = 'var(--gradient-primary)'
// As i have seen that closest to h1 is itself h1 so the background is given to this h1 element.
// So this closest and querySelector do the same thing querySelector does for the child element and closest does for the parent element

// Going sideways : siblings

console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)
// it will give the direct sibling elements before and after the h1 as there is no element before h1 so it returns null and there is h4 after h1 so nextElementSibling gives the h4

// There is one way of getting all the sibling elements is to move up the parent element and then get all the siblings by children
console.log(h1.parentElement.children) 
// So in console we have h1, h4, img, button as html elements

// Have small exercise -> selecting one element apply property to all other element
// [...h1.parentElement.children].forEach(function(el){
//   if(el !== h1) {
//     el.style.transform = 'scale(0.5)'
//   }
// }) 
// From here the html collection is converting to array and style is applied to all of the elements except h1


///////////////////////////////////////


