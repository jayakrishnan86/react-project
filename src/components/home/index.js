import styled from "styled-components"
import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent"
import TransactionComponent from "./TransactionComponent"
const Container = styled.div`
display:flex;
flex-direction: column;
align-items:center;
margin: 30px 0 10px;
font-family: Montserrat;
width:360px;
`;

const HomeComponent = (props)=>{
    const [transations,updateTransaction] = useState([]);
    const[expense,updateExpense] = useState(0);
    const[income,updateIncome] = useState(0);
    const addTransaction = (payload) =>{
        const transationArray=[...transations];
        transationArray.push(payload);
        updateTransaction(transationArray);

    };
    const calculateBalance=()=>{
        let exp = 0;
        let inc = 0;
        transations.map((payload=>{
            payload.type==="EXPENSE"
            ?(exp = exp + payload.amount)
            :(inc = inc + payload.amount)
        }));
        updateExpense(exp);
        updateIncome(inc);
    };
    useEffect(()=>calculateBalance(),[transations])
    return(
<Container>
<OverviewComponent addTransaction={addTransaction} expense={expense} income={income}/>
<TransactionComponent transations={transations}/>
</Container>
    );
};
export default HomeComponent