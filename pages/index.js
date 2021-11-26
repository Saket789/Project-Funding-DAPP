
import React, {useState,useEffect} from 'react'
import { Card , Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes'
function index(props) {
    console.log(props.campaigns);
    const items= props.campaigns.map( (ele)=>{
        return {
            header: ele,
            description:
            (
             <Link route={`campaigns/${ele}`}>
                <a>View Details</a>
             </Link>
            ),
            fluid:true
        }
    })
    return (
        <Layout>
        <div>
            <h3>Active Projects</h3>
            <Link route="campaigns/new">
            <a>
            <Button
                floated="right"
                content="create a Project Funding" 
                icon="add circle"
                primary={true}
            />
            </a>
            </Link>
            <Card.Group items={items}/>
        </div>
        </Layout>
    )
}
index.getInitialProps = async ()=>
{
    const campaigns=await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
}
export default index
