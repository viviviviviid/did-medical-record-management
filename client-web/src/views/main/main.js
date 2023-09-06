import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import "./main.css";
import { useNavigate } from 'react-router-dom';

function QrCard() {
    const navigate = useNavigate();
    return (
        <div className='qr-card pointer'
            onClick={() => {
                navigate("/qr-code");
            }}>
            <div className='upper-card'>
                <p>DID QR 코드</p>
            </div>
            <div className='qr-card-content'>
                <p className='qr-card-title'>이름</p>
                <p className='qr-card-text'>{sessionStorage.getItem("name")}</p>
                <p className='qr-card-title'>생년월일</p>
                <p className='qr-card-text'>{sessionStorage.getItem("birthday")}</p>
            </div>

        </div>
    )
}

export default function Main() {
    sessionStorage.setItem("jwt", "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwidXNlckluZm8iOnsibmFtZSI6Iu2ZjeyKueyerCIsImVtYWlsIjoic2pob25nOThAaWNsb3VkLmNvbSIsImJpcnRoZGF5IjoiOTgwOTAxIiwicGhvbmVOdW1iZXIiOiIwMTAtMjg5Mi02NDA4IiwiaXNEb2N0b3IiOnRydWUsImFkZHJlc3MiOiIweGMwMkM5NDRmNmQzOUM3QjREMzk3M2QyMTc1OWJCYzFBZDQ1RmYzMjcifSwibWVkaWNhbFJlY29yZHMiOiI0ZjUzY2RhMThjMmJhYTBjMDM1NGJiNWY5YTNlY2JlNWVkMTJhYjRkOGUxMWJhODczYzJmMTExNjEyMDJiOTQ1IiwiZG9jdG9yTGljZW5zZSI6bnVsbH19LCJzdWIiOnsiZGlkIjoiZGlkOmV0aHI6Z29lcmxpOjB4YzAyQzk0NGY2ZDM5QzdCNEQzOTczZDIxNzU5YkJjMUFkNDVGZjMyNyIsImFkZHJlc3MiOiIweGMwMkM5NDRmNmQzOUM3QjREMzk3M2QyMTc1OWJCYzFBZDQ1RmYzMjcifSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4NWFkYzQ4QUE5NzQ5MzE0NWJBM0ZmQzkwMjQ1RTUzNEM5MzU1YzczMCJ9.o9IBQ_fE2Dj_hyEIibbOYZX8Sp7FsQjLI6XdunLDOFkT6XwaJLwJaOszUcidEMdXpqTRgl80OCibkxh4vbZJ7AE");
    sessionStorage.setItem("did", "did:ethr:goerli:0xc02C944f6d39C7B4D3973d21759bBc1Ad45Ff327");
    sessionStorage.setItem("address", "0xc02C944f6d39C7B4D3973d21759bBc1Ad45Ff327")
    
    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <QrCard />
            </div>
            <Footer />
        </div>
    )
}