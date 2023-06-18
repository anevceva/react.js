import { useState, useEffect, useMemo, useRef} from "react";
import SongBox from "./SongBox";
import "./SongContainer.css"



const div = {
    width: "100%",
    position: "absolute"


};

const dbSongs = [
    {
        id: 1,
        title: 'The best',
        artistName: 'Tina Turner',
        duration: 4,
       

    },
    {
        id: 2,
        title: 'Flowers',
        artistName: 'Miley Cirus',
        duration: 2,
        
    },

    {
        id: 3,
        title: 'Beliver',
        artistName: 'Imagine Dragons',
        duration: 3,
        
    },
    {
        id: 4,
        title: 'Run the word',
        artistName: 'Beyonce',
        duration: 6,
        
    },
    {
        id: 5,
        title: 'Shallow',
        artistName: 'Lady Gaga',
        duration: 7,
       

        
    }
];



export default function SongContainer() {

    const [songs, setSongs] = useState([]);
    const [playList, setPlayList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [duration, setDuration] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        setSongs(dbSongs);
    }, []);

    useEffect(() => {
        const newDuration = playList.reduce((acc, song) => {
          return acc + Math.round(song.duration);
        }, 0);
    
        setDuration(newDuration);
      }, [playList]);

    const filteredSongs = useMemo(() => {
        return songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [songs, searchTerm]);

    const addToPlayList = id => {
        const songToAdd = songs.find(song => song.id === id)
        setPlayList(prevPlayList => [
            ...prevPlayList,
            songToAdd
        ]);

        setSongs(prevSongs =>  prevSongs.filter(song => song.id !== id) );
    }

    const removeFromPlayList = id => {
        const songsToRemove = playList.find(song => song.id === id);
        setSongs(prevSongs => [songsToRemove, ...prevSongs]);
        setPlayList(prevPlayList =>
            prevPlayList.filter(song => song.id !== id)
        );

    };




    return (

        <div style={div} >
           
            <div className="leftContainer" >
            <input
                className="inputText"
                type="search"
                ref={inputRef}
                placeholder="Search"
                onChange={e => setSearchTerm(e.target.value)}
            />
            
                {filteredSongs.map(song => (
                    <SongBox
                        key={song.id + "initial-song"}
                        id={song.id}
                        title={song.title}
                        artistName={song.artistName}
                        duration={song.duration}
                        addToPlayList={addToPlayList}
                        removeFromPlayList={removeFromPlayList}
                        showAddButton={true}

                    />
                ))}

            </div>
            <div className="rightContainer">
                <h3 style={{ flexBasis: "100%" }}>Duration: {duration} min</h3>
                {playList.map(song => (
                    <SongBox
                        key={song.id + "play-list-songs"}
                        id={song.id}
                        title={song.title}
                        artistName={song.artistName}
                        duration={song.duration}
                        addToPlayList={addToPlayList}
                        removeFromPlayList={removeFromPlayList}
                        showAddButton={false}
                    />
                ))}
            </div>

        </div>

    );
}

