import React from 'react'
import Layout from '../../../components/Layout'
import { Button, Table } from 'semantic-ui-react'
import {Link} from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow';
function index(props) {
    const {Header, Row, HeaderCell , Body}=Table;
    const items= props.requests.map((request,index)=>{
        return <RequestRow key={index} id={index} request={request} address={props.address} approversCount={props.approversCount}/>
    })
    return (
        <div>
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom:10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>DESCRIPTION</HeaderCell>
                            <HeaderCell>AMOUNT</HeaderCell>
                            <HeaderCell>RECIPIENT</HeaderCell>
                            <HeaderCell>APPROVAL COUNT</HeaderCell>
                            <HeaderCell>APPROVE</HeaderCell>
                            <HeaderCell>FINALIZE</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {items}
                    </Body>
                </Table>
                <div>Found {props.requestCount} requests</div>
            </Layout>
        </div>
    )
}
index.getInitialProps= async (props)=>{
    const {address}=props.query;
    const campaign=Campaign(address);
    const requestCount=await campaign.methods.getRequestsCount().call();
    const approversCount=await campaign.methods.approversCount().call();
    const requests=await Promise.all(
        Array(parseInt(requestCount)).fill().map((element,index)=>{
            return campaign.methods.requests(index).call();
        })
    )
    return {address, requests, requestCount, approversCount};
}
export default index
