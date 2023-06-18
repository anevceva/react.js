import "./SongBox.css"

export default function SongBox(
    {
        title,
        id,
        artistName,
        duration,
        addToPlayList,
        removeFromPlayList,
        showAddButton

    }

) {

    return (
        <div className="songBox">
            <h2>{title}</h2>
            <p>{artistName}</p>
            <p>{duration}</p>
            

            {
                showAddButton ? (

                    <button type="button"  className ="btn" onClick={() => addToPlayList(id)} >Add to Play List</button>

                ) : (

                    <button type="button" className ="btn"  onClick={() => removeFromPlayList(id)} >Remove</button>

                )
            }


        </div>


    )
}


