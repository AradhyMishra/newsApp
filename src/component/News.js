import React,{useCallback, useState} from 'react'
import { useEffect } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News= (props) => {
    
    const [articles, setArticleState] = useState([]);
    const [loading, setLoadingState] = useState(false);
    const [page, setPageState] = useState(1);
    const [totalResults, setTotalResultsState] = useState(0);
    

//this function is used to fetch the data for the first time i.e for the first page, and also shows the spinner below the navbar till the data is fetched
const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page}&pageSize=${props.pageSize}`; 
    setLoadingState(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticleState(parsedData.articles)
    setTotalResultsState(parsedData.totalResults)
    setLoadingState(false)
    props.setProgress(100);
}

    //use Effect is used instead of componentDidMount, COmponentdidmount was used to initally display some
    //component while data was being fetched, then it was updated
    
    /* const componentDidMount = async()=>{
        fetchData();
    } */


   ////this function is used to fetch next news
    const fetchData =async() =>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page+1}&pageSize=${props.pageSize}`;
        setPageState(page+1) ;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        if (parsedData.articles) { // Check if articles exist
            setArticleState((prevArticles) => prevArticles.concat(parsedData.articles));
            setTotalResultsState(parsedData.totalResults);
        }
        setTotalResultsState(parsedData.totalResults)
    }
    useEffect(() => {
        document.title = `${props.category.slice(0,1).toUpperCase()+props.category.slice(1)}-NewsMonkey`;
        updateNews(); 
    },[])
    /*  handleNext = async()=>{ 
        
            this.setState({page: this.state.page+1,loading: false}) //icrementing page in the current state 
            //for the button 
            this.updateNews();
        
    }
    handlePrev= async()=>{  
        
        this.setState({page: this.state.page-1,loading: false}) //icrementing page in the current state 
        //for the button 
        this.updateNews();
    } */
  
    return (
      <div className = "container my-2">
        <h1 className = "text-center" style = {{margin: '20px',marginTop : '80px'}}><strong> News Monkey-{props.category.slice(0,1).toUpperCase()+props.category.slice(1)} Top headlines</strong></h1>
         {loading  &&<Spinner/>}
        <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={fetchData}
            hasMore={(articles.length !== totalResults)}
            loader={<Spinner/>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
        >
        <div className='container'>
            <div className="row g-3">
            {/* !this.state.loading && this.state.articles && */articles.map((element, index) => { //the news can be only be displayed when loading is false
                return (<div className="col-md-4 my-3" key = {`${element.url}-${index}`}>
                <NewsItem newsTitle={element.title ? element.title.slice(0, 44) : 'No Title Available'}
                newsDesc={element.description ? element.description.slice(0, 88) : 'No Description Available'} imageUrl = {element.urlToImage} newsUrl = {element.url} newsDate = {element.publishedAt} newsAuthor = {element.author} newsSource = {element.source.name}/>
                </div>);
            })}
            
            </div>
        </div>
        
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between ">
            <button type="button" disabled = {this.state.page<=1} className="btn btn-dark" onClick = {this.handlePrev}>&larr;Previous</button>
            {!this.state.loading && <div className="bg-dark rounded"
                style={{ height: '40px',width: '140px',color: 'white',textAlign: 'center',display: 'flex',alignItems: 'center',
                    justifyContent: 'center',}}>Current Page: {this.state.page} / {this.state.totalWindow}
            </div> }         
            <button type="button" disabled = {this.state.totalWindow === this.state.page} className="btn btn-dark" onClick = {this.handleNext}>Next&rarr;</button>
        </div> */}
        </div>
    )
  
}
/* News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
} */
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News