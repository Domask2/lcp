import React from "react";
type IProtalsInside = {
    type: string
    text: string
}

const NotifyList: React.FC<IProtalsInside> = ({ type, text}) => {
    return (
        <>
            <div className={`portals-text-${type}`}>
                {type === "error" ? <i className='bx bx-confused'/> : <i className='bx bxs-cart-download'/>}
                <p>{text}</p>
            </div>
        </>
    )
}

export default NotifyList;