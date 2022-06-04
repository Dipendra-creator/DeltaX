import { useEffect, useState } from "react";

export var rate = 0;
function StarRating() {
    const [rating, setRating] = useState(0);
    
    return(
        <>
        <div className="rating text-2xl">
    	    <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
        </div>    
        </>
    )
}

export default StarRating;