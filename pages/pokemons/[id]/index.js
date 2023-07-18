import { useRouter } from "next/router";
import {useState,useEffect} from 'react';
import Link from 'next/link';

function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query; //grabs id from line 34 of index.js

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setIsLoading(false);
                setPokemon(json);
            });
    }, [router.isReady]); //only when router has fetched id then will fetch from pokeapi

    return (
        <div className='container'>
            {isLoading ? (
                <div class='spinner-border' role='status'>
                    <span class='visually-hidden'>Loading...</span>
                </div>
            ) : null}
            {pokemon ? (
        < div className='card'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                className='card-img.top'
                alt='...'
                style={{ height: '500px', width: '500px' }}
            />
            <div className='card-body'>
                <h5 className='card-title'>{pokemon.name}</h5>
                <p className='card-text'>Weight: {pokemon.weight}</p>
                <Link href='/' className='btn btn-primary'>
                        back
                </Link>
            </div>
        </div>
    ) : null}
    </div>
    );
}
    



export default Pokemon;