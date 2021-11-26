import React from 'react'
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
function Header() {
    return (
        <div>
            <Menu style={{marginTop:'10px'}}>
                <Link route="/">
                    <a className="item">
                    Project-Funding
                    </a>
                </Link>
                <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">
                    Campaigns
                    </a>
                </Link>
                {/* <Menu.Item>
                    Campaigns
                </Menu.Item> */}
                 <Link route="/campaigns/new">
                    <a className="item">
                    +
                    </a>
                </Link>
                {/* <Menu.Item>
                    +
                </Menu.Item> */}
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default Header
