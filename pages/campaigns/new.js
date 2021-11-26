import React, {useState} from 'react'
import Layout from '../../components/Layout'
import {Form,Button,Input,Message} from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3';
import {Router} from '../../routes'
function Camapignnew() {
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try{
            const accounts=await web3.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribution)
            .send(
                {
                    from: accounts[0]
                }
            )
            Router.pushRoute('/');
        }
        catch(err)
        {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <Layout>
           <h3>Create a Campaign</h3>
            <Form onSubmit={submitHandler} error={errorMessage.length>0}>
                <Form.Field >
                    <label>Minimum Contribution</label>
                    <Input label="Wei" labelPosition="right" value={minimumContribution} onChange={e=>setMinimumContribution(e.target.value)}/>
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} primary>Create!</Button>
            </Form>
            </Layout>
        </div>
    )
}

export default Camapignnew
