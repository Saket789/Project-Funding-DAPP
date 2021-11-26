import React from 'react'
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign';
function RequestRow(props) {
    const {Row ,Cell}=Table;
    const {request,approversCount}=props;
    const onapprove= async (e)=>{
        const campaign=Campaign(props.address);
        const accounts=await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send(
            {
                from:accounts[0]
            }
        )
    }
    const onfinalize= async (e)=>{
        const campaign=Campaign(props.address);
        const accounts=await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send(
            {
                from:accounts[0]
            }
        )
    }
    const readyToFinalize=request.approvalCount>approversCount/2;
    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{props.id}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
                { request.complete?null:(
                <Button color="green" basic onClick={onapprove}>Approve</Button>
                )}                   
            </Cell>
            <Cell>
                { request.complete?null:(
                <Button color="teal" basic onClick={onfinalize}>Finalize</Button>
                )}
            </Cell>
        </Row>
    )
}

export default RequestRow
