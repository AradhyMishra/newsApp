import React from 'react'

const NewsItem =(props) => {
  
    let{newsTitle, newsDesc,imageUrl, newsUrl,newsDate,newsAuthor,newsSource}= props;
    return (
      <div>
        <div className="card">
        <div style = {{display: 'flex', justifyContent: 'flex-end', position: 'absolute',right: '0'}}>
            <span className="badge rounded-pill bg-dark" style = {{color: 'white'}}>{newsSource}</span>
        </div>
        <img className="card-img-top" alt = "newsImg" src = {!imageUrl?"https://dims.apnews.com/dims4/default/523412d/2147483647/strip/true/crop/5793x3259+0+3/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F7e%2Fe1%2Fc564bbe1dd157dc65f4bd440d81a%2F8235fdcd06a94161b157dd1cdd691ebe":imageUrl}/>
        <div className="card-body">
            <h5 className="card-title">{newsTitle}...</h5>
            <p className="card-text">{newsDesc}...</p>
            <footer className="blockquote-footer tex-danger">By {newsAuthor?newsAuthor:"Unknown"} on {new Date(newsDate).toGMTString()}</footer>
            <div className="my-3">
               <a href= {newsUrl} className="btn btn-primary">Read More</a>
            </div>  
        </div>
        </div>
      </div>
    )
  
}

export default NewsItem