import React,{useState} from 'react'
import {Form,Button,Input,Message} from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import {Link,Router} from '../../../routes'
function Requestnew(props) {
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const onsubmit=async (e)=>
    {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const campaign=Campaign(props.address);
        try{
            const accounts=await web3.eth.getAccounts();
            await campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipient).send(
                {
                    from:accounts[0]
                }
            )
            Router.pushRoute(`/campaigns/${props.address}/requests `);
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
                <Link route={`/campaigns/${props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a Request</h3>
            <Form onSubmit={onsubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={description} onChange={e=>setDescription(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input value={value} onChange={e=>setValue(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={e=>setRecipient(e.target.value)} />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading} >Create</Button>
            </Form>
            </Layout>
        </div>
    )
}
Requestnew.getInitialProps= async (props)=>{
    const {address}=props.query;
    return {address};
}
export default Requestnew
