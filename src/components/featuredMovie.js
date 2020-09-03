import React from 'react';
import './featuredMovie.css';

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 300){
        description = description.substring(0, 300) + '...';
    }

    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='featured_vertical'>
                <div className='featured_horizontal'>
                    <div className='featured_name'>{item.original_name}</div>
                    <div className='featured_info'>
                        <div className='featured_points'>{item.vote_average}</div>
                        <div className='featured_year'>{firstDate.getFullYear()}</div>
                        <div className='featured_seasons'>{item.number_of_seasons} Temporada{item.number_of_seasons  !== 1 ? 's': ''}</div>
                        <div className='featured_description'>{description}</div>

                        <div className='featured_buttons'>
                            <a className='featured_watchButton' href={`/watch/${item.id}`}>► Assistir</a>
                            <a className='featured_mylistButton' href={`/list/add/${item.id}`}>+ Minha Lista</a>
                        </div>

                        <div className='featured_genres'><strong>Gêneros:</strong> {genres.join(', ')}.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}