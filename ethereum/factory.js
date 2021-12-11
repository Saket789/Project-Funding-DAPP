import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(
JSON.parse(campaignFactory.interface),
'0x3D2a5FCcB1D13897eE0a8bB0fb248dF21e2079D7'
);



export default instance;