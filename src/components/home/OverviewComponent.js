import styled from "styled-components"
import React, { useState } from "react";

const Container = styled.div`
display:flex;
flex-direction: column;
align-items:center;
margin: 30px 0 10px;
font-family: Montserrat;
width:100%;
`;

const BalanceBox = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
font-size:18px;
width:100%;
`
const AddTransaction = styled.button`
background:black;
color:white;
padding: 5px 10px;
border-radius:9px;
cursor:pointer;
font-weight:bold;
font-size:15px;
`;
const AddTransactionContainer = styled.div`
display: flex;
flex-direction:column;
// width:100px;
border:1px solid;
gap:10px;
padding:15px 20px;
margin:20px;
&input{
outline: none;
padding:10px 12px;
border-radius:4px;
border:1px solid #e6e8e9;
}
`;

const RadioBox = styled.div`
    display:flex;
    flex-direction:row; 
    width:100%;
    align-items: center;
`;
const ExpenseContainer = styled.div`
display:flex;
flex-direction:row;
gap:12px;
margin:20px;
`
const ExpenseBox = styled.div`
display:flex;
flex-direction:column ;
border-radius:4px;
border:1px solid #e6e8e9;
padding:15px 20px;
width:135px;
font-size:14px;
span{
font-weight:bold;
font-size:20px;
color:${(props)=>(props.isIncome  ? "green" : "red")};
}

`
const AddTransactionView = (props) =>{

    const [amount,setAmount] = useState();
    const [desc,setDesc] = useState();
    const [type,setType] = useState("Expense");
    const addTransaction=()=>{
    props.addTransaction({amount:Number(amount),desc,type,id:Date.now()})
    props.toggleAddTxn();
    };
    return(
        <AddTransactionContainer>
            <input type= "number" placeholder="Amount" value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            />
            <input placeholder="Discription" value={desc} 
            onChange={(e) => setDesc(e.target.value)}/>
            <RadioBox>
                <input type="radio" id="expense" name="type" value="EXPENSE"
                onChange={(e)=>setType(e.target.value)}
                />
                <label htmlFor="expense">Expense</label>
                
                <input type="radio" id="income" name="type" value="INCOME" checked={type==="INCOME"}
                    onChange={(e)=>setType(e.target.value)
                }/>
                <label htmlFor="income">Income</label>
            </RadioBox>
            <AddTransaction onClick={addTransaction}>AddTransaction</AddTransaction>
        </AddTransactionContainer>
    );
};

const OverviewComponent = (props)=>{
    const [isAddTxnVisible,toggleAddTxn] = useState(false);
    return(
<Container>
<BalanceBox>
Balance:${props.income-props.expense}
<AddTransaction onClick={()=> toggleAddTxn(!isAddTxnVisible)}>
    {isAddTxnVisible ? "Cancel":"ADD"}
    </AddTransaction>
</BalanceBox>
{isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction}/>}
<ExpenseContainer>
<ExpenseBox isIncome={false}>
    Expense<span>{props.expense}</span>
</ExpenseBox>
<ExpenseBox isIncome={true}>
    Income<span>{props.income}</span>
</ExpenseBox>

</ExpenseContainer>
</Container>

    )
}
export default OverviewComponent