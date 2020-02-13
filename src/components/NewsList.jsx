/* 
 * API 요청 및 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트
 */ 

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';


const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'https://google.com',
    urlToImage: 'https://via.placeholder.com/160'
};

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // async 를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);

            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=25981a230a9049aebdb8dc79e277454a`,);
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            } 
            setLoading(false);
        };

        fetchData();
    }, [category]);

    // 대기 중
    if(loading) {
        return <NewsListBlock>대기중 ...</NewsListBlock>;
    }

    // 아직 articles 값이 설정되지 않았을 경우
    if(!articles) {
        return null;
    }

    // article 데이터가 유효할 경우
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;