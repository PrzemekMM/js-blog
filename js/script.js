'use strict';

function titleClickHandler(event) {
  const clickedElement = this;
  console.log('Link was clicked!');
  event.preventDefault();


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');




  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');


}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    /*get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    //  titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}




generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);


    /* make html variable with empty string */

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      article.insertAdjacentHTML('beforeend', linkHTML);

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */


    /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tags);

  /* START LOOP: for each active tag link */
  for (let activeTag of tags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTags);

  /* START LOOP: for each found tag link */
  for (let targetTag of targetTags) {

    /* add class active */
    targetTag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const clickLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(clickLinks);
  /* START LOOP: for each link */
  for (let clickLink of clickLinks) {

    /* add tagClickHandler as event listener for that link */
    clickLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles) {

    const AuthorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(AuthorWrapper);

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    console.log(linkHTML);
    // article.insertAdjacentHTML('afterend', linkHTML);
    AuthorWrapper.innerHTML = linkHTML;

  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();


  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const author = href.replace('#author-', '');
  console.log(author);
  const authors = document.querySelectorAll('a[href^="#author-"]');
  console.log(authors);
  const targetAuthors = document.querySelectorAll('a[href="' + href + '"');
  console.log(targetAuthors);

  for (let targetAuthor of targetAuthors) {

    targetAuthor.classList.add('active');

  }
}

function addClickListenersToAuthor() {
  const clickLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(clickLinks);
  /* START LOOP: for each link */
  for (let clickLink of clickLinks) {

    /* add tagClickHandler as event listener for that link */
    clickLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthor();