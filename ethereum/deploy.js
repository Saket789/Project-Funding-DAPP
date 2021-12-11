const HDWalletProvider=require('@truffle/hdwallet-provider');
const Web3=require('web3');
const compiledFactory=require('./build/CampaignFactory.json');


const provider=new HDWalletProvider(
	'metal such atom caught tape iron auction gloom point capable travel item',
	'https://rinkeby.infura.io/v3/671e9890e4814973bf56371b3569ed83'
);
const web3=new Web3(provider);
const deploy= async ()=>{
	const accounts=await web3.eth.getAccounts();
	console.log('Attempting to deploy with',accounts[0]); 
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
	.deploy({data:compiledFactory.bytecode})
	.send({gas:'5000000',from: accounts[0]});
	console.log('Contract deployed to',result.options.address);
	provider.engine.stop();
};
deploy();
