import { useState } from "react";
import styled from "styled-components"
const Container = styled.div`
display:flex;
flex-direction: column;
align-items:center;
padding:10px 22px;
font-size:18px;
width:100%;
gap:10px;
margin: 30px 0 10px;
font-family: Montserrat;
font-weight:bold;

input{

padding:10px 12px;
border-radius:12px;
background:#e6e8e9;
border:1px solid #e6e8e9;
outline:none;
width:100%;
}
`;

const Cell = styled.div`
display:flex;
flex-direction:row;
padding:10px 15px;
font-size:14px;
border-radius:2px;
align-items:center;
font-weight:normal;
width:100%;
justify-content:space-between;
border-right:4px solid #e6e8e9;
border-right: 4px solid ${(props)=>(props.isExpense?"red":"green")};

`


const TransactionCell = (props) => {
    return(<Cell isExpense={props.payload?.type ==="EXPENSE"}>

    <span>{props.payload.desc}</span>
    <span>{props.payload.amount}</span>
    </Cell>)
}
const TransactionComponent = (props)=>{
    const[SearchText,updateSearchText] = useState("");
    const[filteredTransaction,updateTxn] = useState(props.transations);
   const filterData = ()=>{
    if(!SearchText || !SearchText.trim().length){
        updateTxn(props.transations);
        return;
    }
    let txn = [...props.transations];
txn = txn.filter((payload)=>
    payload.desc.toLowerCase().includes(SearchText.toLowerCase().trim()));
updateTxn(txn);

}
   return(
<Container>Transaction
<input placeholder = "search" value={SearchText} 
onChange={(e)=>{
    updateSearchText(e.target.value)
    filterData(e.target.value);
}}
    />
 {filteredTransaction?.length
                ? filteredTransaction.map((payload) => (
                    <TransactionCell payload={payload} key={payload.id} />
                )):""
}
</Container>
    )
}
export default TransactionComponent