import React,{Component} from 'react'
import { Card,Grid,Button } from 'semantic-ui-react';
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3' 
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes'
function show(props) {
    const {minimumContribution,balance,requestsCount,approversCount,manager}=props;
    const items=[
        {
            header: manager,
            meta: 'Address of manager',
            description: 'Manager created this project and request to withdraw ethereum',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution (Wei)',
            description: 'You must donate at least this much Wei to become a patron'
        },
        {
            header: requestsCount,
            meta:  'Number of Requests',
            description: 'A request tries to withdraw ethereum from a contract. Requests must be approved by approvers'
        },
        {
            header: approversCount,
            meta: 'Number of approvers',
            description: 'Number of approvers who had already donated'
        },
        {
            header: web3.utils.fromWei(balance,'ether'),
            meta: 'Balance (Ether)', 
            description: 'The Balance is how much the project has received this now'
        }
    ]
    return (
        <div>
            <Layout>
                <h3>Project Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}> 
                            <Card.Group items={items}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Link route={`/campaigns/${props.address}/requests`}>
                                <a>
                                    <Button primary>
                                    View Requests
                                    </Button>
                                </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        </div>
    )
}
show.getInitialProps=async (props)=>{
    const campaign=Campaign(props.query.address)
    const summary=await campaign.methods.getSummary().call();
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}
export default show
