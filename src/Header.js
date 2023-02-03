import React from 'react'
import {Nav} from "react-bootstrap";

const Header = (activeKey = "/") => {
    return (
        <Nav variant="pills" defaultActiveKey={activeKey}>
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/page/howtoplay">How To Play</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/page/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/page/productpage">Product Page</Nav.Link>
            </Nav.Item>
            {/*<Nav.Item>*/}
            {/*    <Nav.Link eventKey="disabled" disabled>*/}
            {/*        Disabled*/}
            {/*    </Nav.Link>*/}
            {/*</Nav.Item>*/}
        </Nav>
    );
};
export default Header;
