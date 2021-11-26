import React,{useState} from 'react'
import {Form,Input,Button,Message} from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3  from '../ethereum/web3';
import {Router} from '../routes';
function ContributeForm(props) {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const onsubmit=async (e)=>{
        e.preventDefault();
        const campaign=Campaign(props.address);
        try
        {
            setLoading(true);
            setErrorMessage('');
            const accounts=await web3.eth.getAccounts();
            await campaign.methods.contribute().send(
                {
                    from: accounts[0],
                    value: web3.utils.toWei(value,'ether')
                }
            )
            Router.replaceRoute(`/campaigns/${props.address}`);
        }
        catch(err)
        {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <Form onSubmit={onsubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input label="ether" labelPosition="right" value={value} onChange={e=>setValue(e.target.value)}/>
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>
                    Contribute
                </Button>
            </Form>
        </div>
    )
}

export default ContributeForm
