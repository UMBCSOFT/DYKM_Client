import React from 'react'
import {Nav, Row} from "react-bootstrap";

const Header = (activeKey = "/") => {
    return (
        <Nav id="Header" className="w-100 m-0 position-absolute top-0 left-0" as={Row} variant="pills" defaultActiveKey={activeKey}>
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
