import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

    // useEffect가 뭐지?
    useEffect(() => {
        // 포트 번호가 같아야 함!
        axios.get('/api/hello')
        .then(response => {console.log(response.data)}) // 서버에서 받은 (서버가 send해준) 응답 내용을 다음의 코드로 처리한다.
    }, [])
    
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
