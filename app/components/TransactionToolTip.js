const TransactionToolTip = ({ active, payload, label }) => 
{
	if (active && payload && payload.length) 
	{
		const type = payload[0].payload.Type
		const transactions = payload[0].payload.Count

	  	return (
		<div style={{ backgroundColor: 'white', color: 'black', padding: '5px', border: '1px solid #ccc', fontSize: '12px'  }}>
		  <h4>{label}</h4>
		  <p>Transaction Type: {type}</p>
		  <p>Transactions: {transactions}</p>
		</div>
	  );
	}
}

export default TransactionToolTip