'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authors-cloud-link').innerHTML),
};

function titleClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');


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

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /*get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    /* insert link into titleList */
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    'min': 9,
    'max': 0
  };
  for (let tag in tags) {

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}
calculateTagsParams();

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumer = Math.floor(percentage * (optCloudClassCount - 1) + 1);



  return optCloudClassPrefix + classNumer;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */

  for (let article of articles) {
    let html = '';
    const tagLink = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTMLData = {id:'tag-'+tag, title: tag};

      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;



      /* add generated code to html variable */
      // article.insertAdjacentHTML('beforeend', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    console.log(html);
    tagLink.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* NEW */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /*Create variable for all links HTML code*/
  const allTagsData = {
    tags: []
  };
  /* Start loop : for each tag in allTags */
  for (let tag in allTags) {

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }
  console.log(allTagsData);
  /* End loop */
  /* add html grom allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
  /* START LOOP: for each link */
  for (let clickLink of clickLinks) {

    /* add tagClickHandler as event listener for that link */
    clickLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  for (let article of articles) {

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = {
      author: articleAuthor
    };
    const linkHTML = templates.authorLink(linkHTMLData);
    // article.insertAdjacentHTML('afterend', linkHTML);
    authorWrapper.innerHTML = linkHTML;
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add generated code to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  const authorList = document.querySelector('.authors');
  /* NEW */
  const tagsParams = calculateTagsParams(allAuthors);
  console.log('tagsParams:', tagsParams);
  /*Create variable for all links HTML code*/
  let allAuthorData = {
    allAuthors: []
  };
  /* Start loop : for each tag in allTags */
  for (let author in allAuthors) {


    allAuthorData.allAuthors.push({
      author: author,
      count2: allAuthors[author],
      className: calculateTagClass(allAuthors[author], tagsParams)
    });
    console.log(allAuthorData);
    authorList.innerHTML = templates.authorCloudLink(allAuthorData);
    console.log(authorList.innerHTML);
    console.log(author);
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
  for (let author of authors) {

    author.classList.remove('active');
  }
  const targetAuthors = document.querySelectorAll('a[href="' + href + '"');
  console.log(targetAuthors);
  for (let targetAuthor of targetAuthors) {

    targetAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
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
