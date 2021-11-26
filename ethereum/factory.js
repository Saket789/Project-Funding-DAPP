import web3 from './web3';
import campaignFactory from './build/campaignFactory.json';

const instance= new web3.eth.Contract(
JSON.parse(campaignFactory.interface),
'0xBe0a2871312fEc1abEab312c313D05AEe4842783'
);


export default instance;