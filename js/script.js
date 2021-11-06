'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authors-cloud-link').innerHTML),
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  const articleSelector = clickedElement.getAttribute('href');
  const activeArticles = document.querySelectorAll('.posts article.active');
  const targetArticle = document.querySelector(articleSelector);
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  targetArticle.classList.add('active');
}
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
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
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    let html = '';
    const tagLink = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTMLData = {id:'tag-'+tag, title: tag};

      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagLink.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {
    tags: []
  };
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();


function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  const targetTags = document.querySelectorAll('a[href="' + href + '"]');
  for (let activeTag of tags) {
    activeTag.classList.remove('active');
  }
  for (let targetTag of targetTags) {
    targetTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {
  const clickLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let clickLink of clickLinks) {
    clickLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = {
      author: articleAuthor
    };
    const linkHTML = templates.authorLink(linkHTMLData);
    authorWrapper.innerHTML = linkHTML;
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  const authorList = document.querySelector('.authors');
  const tagsParams = calculateTagsParams(allAuthors);
  let allAuthorData = {
    allAuthors: []
  };
  for (let author in allAuthors) {
    allAuthorData.allAuthors.push({
      author: author,
      number: allAuthors[author],
      className: calculateTagClass(allAuthors[author], tagsParams)
    });
    authorList.innerHTML = templates.authorCloudLink(allAuthorData);
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authors = document.querySelectorAll('a[href^="#author-"]');
  const targetAuthors = document.querySelectorAll('a[href="' + href + '"');
  for (let author of authors) {
    author.classList.remove('active');
  }
  for (let targetAuthor of targetAuthors) {
    targetAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthor() {
  const clickLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let clickLink of clickLinks) {
    clickLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthor();
