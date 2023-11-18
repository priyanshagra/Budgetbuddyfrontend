import { Button } from "@material-ui/core";
import React from "react";
// import {calendar, comment, dollar, trash } from '../../utils/Icons'

function incomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}){
    return(
        <incomeItemStyled>
            <div className="icon">

            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="innerContent">
                    <p> {amount}</p>
                    <p> {date}</p>
                    <p>
                        {/* {comment}
                        {description} */}
                    </p>
                </div>
                <div className="delButton">
                    <Button
                        // onClick={()=>handleDelete(id)}
                    />
                </div>
            </div>
        </incomeItemStyled>
    )
}

// const incomeItemStyled = styled.div`

// `;

export default incomeItem