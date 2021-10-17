function calculateAuthorParams(author) {
    const params = {
      'min': 9,
      'max': 0
    };
    for (let author in authors) {
      console.log(author + ' is used ' + authors[author] + ' times');
      params.max = Math.max(authors[author], params.max);
      params.min = Math.min(authors[author], params.min);
    }
  
    return params;
  }
  calculateAuthorParams();
  
  function calculateAuthorClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumer = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    console.log(classNumer)
  
  
    return optCloudClassPrefix + classNumer;
  }
  
  
  function generateAuthor() {
    /* [NEW] create a new variable allTags with an empty object */
    let allAuthor = {};
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
  
    for (let article of articles) {
  
      const AuthorWrapper = article.querySelector(optArticleAuthorSelector);
  
      const articleAuthor = article.getAttribute('data-author');
  
      const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      // article.insertAdjacentHTML('afterend', linkHTML);
      AuthorWrapper.innerHTML = linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allAuthors.hasOwnProperty(author)) {
          /* [NEW] add generated code to allTags object */
          allAuthor[author] = 1;
        } else {
          allAuthor[author]++;
        }
  
        /* END LOOP: for each tag */
      }
  
      /* insert HTML of all the links into the tags wrapper */
  
  
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');
    /* NEW */
    const authorsParams = calculateAuthorParams(allAuthor);
    console.log('authorsParams:', authorsParams)
  
    /*Create variable for all links HTML code*/
    let allAuthorHTML = '';
    /* Start loop : for each tag in allTags */
    
      /* generate code of a link and add it to allTagsHTML */
      const authorLinkHTML = calculateAuthorClass(allAuthors[author], authorsParams);
      // console.log('taglinkHTML', tagLinkHTML);
  
  
      allAuthorHTML += ' <a class="' + authorLinkHTML + '"  href="#author-' + author + '"><span>' + author + '' + '</span></a>';
  
  
    
    /* End loop */
  
    /* add html grom allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML
    console.log(tagList.innerHTML);
  }
  
  
  generateAuthor();