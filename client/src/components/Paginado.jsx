import React from "react";
import "../styles/Paginado.css"

export default function Paginado({ currentPage,charactersPerPage, allCharacters, paginado }) {
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allCharacters / charactersPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav className="crumbs">
            
                {pageNumbers && pageNumbers.map(number => (
                    <button key={number} onClick={() => paginado(number)}>
                        {number}
                    </button>
                ))}
            
        </nav>
    )}
    // return (
    //     <div className="crumbs">
    //       <nav className="guiliano">
    //           {currentPage > 1 ? (
    //             <li onClick={() => paginado(currentPage - 1)}>
    //               <button className="crumb">Prev</button>
    //             </li>
    //           ) : null}
    //         <ul className="crumbs">
              
    //            {
    //                 pageNumbers&&
    //                 pageNumbers.map(number => {
    //                     if(number < currentPage + 3 && number > currentPage - 2){
    //                         return (<button key={number} onClick={() => paginado(number)}>
    //                     {number}
    //                     </button>)
    //                     }}
                        
    //                 )   }
    //                      </ul>
    //         {currentPage < allCharacters / charactersPerPage ? (
    //             <li onClick={() => paginado(currentPage + 1)}>
    //               <button className="crumb">Next</button>
    //             </li>
    //           ) : null}
    //       </nav>
    //     </div>
    //   );

